import { run } from "../src/index.js";

run(process.argv.slice(2)).catch((err) => {
  console.error("\n✖", err.message ?? err);
  process.exit(1);
});
