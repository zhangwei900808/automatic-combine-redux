import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";
import requireContext from "rollup-plugin-require-context";

// browser-friendly UMD build
import pkg from "./package.json";
export default [
  {
    input: "src/index.js",
    output: {
      name: "autoCombineRedux",
      file: pkg.browser,
      format: "umd"
    },
    plugins: [
      requireContext(),
      resolve(), // so Rollup can find `ms`
      babel({
        exclude: "node_modules/**"
      }),
      commonjs(), // so Rollup can convert `ms` to an ES module,
      terser()
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/index.js",
    // external: ['ms'],
    output: [{ file: pkg.main, format: "cjs" }, { file: pkg.module, format: "es" }],
    plugins: [
      requireContext(),
      resolve(),
      babel({
        exclude: "node_modules/**"
      }),
      terser()
    ]
  }
];
