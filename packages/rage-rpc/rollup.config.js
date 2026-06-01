import esbuild from "rollup-plugin-esbuild";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import { tsResolve } from "../../rollup.workspace.js";

const isDev = process.env.DEV === "1";

export default {
  input: "src/index.ts",
  output: { file: "dist/index.js", format: "esm", sourcemap: isDev },
  plugins: [
    tsResolve(),
    resolve({ extensions: [".ts", ".tsx", ".mjs", ".js", ".json"] }),
    esbuild({ target: "es2020" }),
    !isDev && terser(),
  ].filter(Boolean),
};
