import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import { workspaceAlias, onwarn } from "../../rollup.workspace.js";

const isDev = process.env.DEV === "1";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "iife",
    sourcemap: isDev,
  },
  onwarn,
  plugins: [workspaceAlias(), resolve(), !isDev && terser()].filter(Boolean),
};
