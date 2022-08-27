import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import typescript from "@rollup/plugin-typescript";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import cleanup from "rollup-plugin-cleanup";

const packageJson = require("./package.json");

const config = [
  {
    input: "index.ts",
    watch: {
      include: "src/**/*",
      chokidar: {
        include: "src/**/*",
      },
    },
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      cleanup({
        comments: "none",
        extensions: ["ts", "tsx", "js", "jsx"],
      }),
    ],
  },
  {
    input: "../dist/esm/index.d.ts",
    output: [{ file: packageJson.types, format: "esm" }],
    plugins: [dts()],
  },
];

export default config;
