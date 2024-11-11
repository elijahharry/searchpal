import path from "path";
import fs from "fs";
import { resolveRoot, rootdir } from "./rootdir";
import { forEntries } from "amenities";
import { readPackageJson } from "./fs";

const distFiles = {
  types: "index.d.ts",
  main: "index.js",
  module: "index.mjs",
} as const;

const exportDistKeys = {
  types: "types",
  module: "import",
  main: "require",
} as const;

type FileKey = keyof typeof distFiles;
type ExportKey = (typeof exportDistKeys)[FileKey];

const safePick = (object: any, ...keys: string[]) => {
  const result: Record<string, any> = {};

  keys.forEach((key) => {
    if (!(key in object)) {
      console.error(`Key '${key}' not found in object.`);
      process.exit(1);
    }
    result[key] = object[key];
  });

  return result;
};

const makeDistribution = () => {
  const dist = resolveRoot("./dist");

  try {
    fs.rmSync(dist, { recursive: true, force: true });
  } catch (e) {}

  fs.mkdirSync(dist);

  const lib = resolveRoot("./lib");

  const entries: Record<string, any> = {},
    exports: Record<string, Record<string, any>> = {},
    files: string[] = [];

  {
    const indexExports = (exports["."] = {}) as Record<ExportKey, string>;

    const libDist = path.resolve(lib, "dist");
    forEntries(distFiles, ([key, file]) => {
      const type = key as FileKey;
      fs.copyFileSync(path.resolve(libDist, file), path.resolve(dist, file));
      const exportKey = exportDistKeys[type];
      entries[type] = file;
      indexExports[exportKey] = `./${file}`;
      files.push(file);
    });
  }

  const rootPackageJson = readPackageJson(rootdir),
    libPackageJson = readPackageJson(resolveRoot("./lib"));

  const packageJson = {
    ...safePick(
      rootPackageJson,
      "name",
      "version",
      "description",
      "license",
      "author",
      "homepage",
      "repository"
    ),
    ...entries,
    exports,
    files,
    ...safePick(libPackageJson, "peerDependencies", "sideEffects"),
    ...safePick(rootPackageJson, "keywords"),
  };

  const resolveDist = (...args: string[]) => path.resolve(dist, ...args);

  fs.writeFileSync(
    resolveDist("package.json"),
    JSON.stringify(packageJson, null, 2)
  );

  fs.copyFileSync(resolveRoot("./README.md"), resolveDist("./README.md"));
};

export { makeDistribution };
