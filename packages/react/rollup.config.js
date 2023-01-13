const dts = require("rollup-plugin-dts");
const ts = require("@rollup/plugin-typescript");
const { babel } = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const external = require("rollup-plugin-peer-deps-external");

const packageJson = require("./package.json");

module.exports = [
  {
    input: "./src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        name: "react-lib",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        configFile: "../../babel.config.js",
      }),
      ts({
        tsconfig: "./tsconfig.json",
      }),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts.default({ tsconfig: "./tsconfig.json" })],
  },
];
