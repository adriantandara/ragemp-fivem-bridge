import esbuild from "rollup-plugin-esbuild";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import { workspaceAlias, tsResolve, onwarn } from "../../rollup.workspace.js";

const isDev = process.env.DEV === "1";

export default {
  input: "src/index.ts",
  output: { file: "dist/index.js", format: "iife", sourcemap: isDev },
  onwarn,
  plugins: [
    workspaceAlias(),
    tsResolve(),
    resolve({ extensions: [".ts", ".tsx", ".mjs", ".js", ".json"] }),
    esbuild({ target: "es2020" }),
    !isDev && terser(),
  ].filter(Boolean),
};
