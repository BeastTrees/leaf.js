import typescript from "rollup-plugin-typescript2";
import { babel } from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";
import packageFile from "./package.json";
import { uglify } from "rollup-plugin-uglify";

export default [
  {
    input: "src/index.js",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
  {
    input: "src/index.js",
    output: [
      {
        file: packageFile.main,
        format: "cjs",
      },
      {
        file: packageFile.module,
        format: "es",
      },
    ],
    external: [
      ...Object.keys(packageFile.dependencies || {}),
      ...Object.keys(packageFile.peerDependencies || {}),
    ],
    plugins: [
      typescript({
        typescript: require("typescript"),
      }),
      babel({
        exclude: "node_modules/**",
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      //uglify(),
    ],
  },
];
