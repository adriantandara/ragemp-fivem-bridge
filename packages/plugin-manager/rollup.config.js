import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";

const isDev = process.env.DEV === "1";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "esm",
    sourcemap: isDev,
  },
  plugins: [resolve(), !isDev && terser()].filter(Boolean),
};
