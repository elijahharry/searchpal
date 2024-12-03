import fs, { readdirSync, renameSync } from "fs";
import path from "path";

import { defineConfig, RollupOptions, WarningHandlerWithDefault } from "rollup";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import del from "rollup-plugin-delete";
import replace from "@rollup/plugin-replace";
import cleanup from "rollup-plugin-cleanup";
import dts from "rollup-plugin-dts";

import { css } from "./rollup.css";
import { entries, get, isFunction, isString } from "amenities";
import { validateTypeExports } from "./rollup.dts";

import { bundleRequire } from "bundle-require";

const recursiveReaddir = (dir: string, files: string[] = []) => {
  const ents = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of ents) {
    const filepath = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      recursiveReaddir(filepath, files);
    } else if (ent.isFile()) {
      files.push(filepath);
    }
  }
  return files;
};

const dynamicImport = async (filepath: string) => {
  const { mod } = await bundleRequire({
    filepath: path.resolve(process.cwd(), filepath),
  });
  return mod;
};

export default defineConfig(({ watch, configDev }) => {
  const isWatching = !!watch,
    isDevelopment = !!(configDev || isWatching);

  const formats = ["cjs", "esm"] as const;

  const ext = {
    cjs: "js",
    esm: "mjs",
  };

  const replaceEnv = (env: Record<string, string>) =>
    replace({
      preventAssignment: true,
      values: Object.fromEntries(
        Object.entries(env).map(([k, v]) => [
          `process.env.${k}`,
          JSON.stringify(v),
        ])
      ),
    });

  const ignoreWarnings = (
    ...ignore: Record<string, string | number | ((value: any) => boolean)>[]
  ): WarningHandlerWithDefault => {
    return (warning, warn) => {
      const fail = () => warn(warning);
      for (const i of ignore) {
        for (const [key, value] of entries(i)) {
          const target = get(warning, key);
          if (isFunction(value)) {
            if (!value(target)) return fail();
          } else {
            if (target !== value) return fail();
          }
        }
      }
    };
  };

  const modules: RollupOptions = {
    input: "src/index.ts",
    output: formats.map((format) => ({
      format,
      file: path.resolve(process.cwd(), `dist/index.${ext[format]}`),
      sourcemap: false,
    })),
    treeshake: "smallest",
    external: ["react", "react-dom", "react/jsx-runtime"],
    plugins: [
      del({
        targets: "dist/*",
        runOnce: true,
      }),
      nodeResolve(),
      commonjs(),
      json(),
      typescript({
        compilerOptions: {
          target: "esnext",
          declaration: true,
          declarationDir: path.resolve(
            process.cwd(),
            isWatching ? "./dist" : "./dist"
          ),
        },
        include: ["src/**/*", "styles.d.ts"],
        exclude: ["node_modules", "dist"],
      }),
      css({
        outputCSS: isDevelopment,
      }),
      replaceEnv({
        TARGET: isDevelopment ? "development" : "production",
      }),
      cleanup({
        comments: [/^!/, /\s*eslint-[a-z-]+\s+[a-z-]+/],
        extensions: ["ts", "js"].flatMap((ext) => [ext, ext + "x"]),
      }),
    ],
    onwarn: ignoreWarnings({
      pluginCode: "TS6054",
      plugin: "typescript",
      message: (message) =>
        isString(message) && /searchpal\/lib\/src\/.*\.css/.test(message),
    }),
    ...(watch && {
      watch: {
        exclude: ["node_modules/**", "dist/**"],
        include: ["ts", "tsx", "css"].map((ext) => `**/*.${ext}`),
        chokidar: {
          usePolling: true,
        },
      },
    }),
  } satisfies RollupOptions;

  const dtsEntry = path.resolve(process.cwd(), "dist/index.d.ts");

  const types: RollupOptions | false = !isWatching && {
    input: dtsEntry,
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [
      dts({}),
      del({ targets: "dist/types", hook: "generateBundle", runOnce: true }),
      {
        name: "cleanup-types",
        writeBundle() {
          const clean = (dir: string) => {
            let files = readdirSync(dir, { withFileTypes: true }),
              removed = 0;
            files.forEach((ent) => {
              if (ent.isDirectory()) {
                if (!clean(path.resolve(dir, ent.name))) {
                  removed++;
                }
                return;
              }
              if (ent.isFile()) {
                if (!/\.d\.ts$/.test(ent.name)) return;
                const file = path.join(dir, ent.name);
                if (file === dtsEntry) return;
                fs.unlinkSync(path.resolve(dir, file));
                removed++;
              }
            });
            if (removed === files.length) {
              fs.rmSync(dir, { recursive: true });
              return false;
            }
            return true;
          };

          clean(path.resolve(process.cwd(), "dist"));

          validateTypeExports(fs.readFileSync(dtsEntry, "utf8"));
        },
      },
      {
        name: "make-distribution",
        writeBundle() {
          dynamicImport("../dev/makeDistribution.ts").then(
            ({ makeDistribution }) => makeDistribution()
          );
        },
      },
    ],
    onwarn: ignoreWarnings({
      code: "UNUSED_EXTERNAL_IMPORT",
      exporter: "react",
    }),
  };

  const options = [modules, types].filter((o): o is RollupOptions => !!o);

  return options;
});
