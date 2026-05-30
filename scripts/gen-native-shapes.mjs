import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(ROOT, "scripts", "assets", "natives.json");
const OUT = resolve(ROOT, "packages", "client", "src", "utils", "nativeShapes.js");

const db = JSON.parse(readFileSync(SRC, "utf8"));

function pascal(snake) {
  return snake
    .split("_")
    .filter(Boolean)
    .map((w) => {
      const cap = w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
      return /^\d/.test(w) ? "_" + cap : cap;
    })
    .join("");
}

const shapes = {};
let vecCount = 0;
let outCount = 0;

for (const namespace of Object.values(db)) {
  for (const native of Object.values(namespace)) {
    const name = native.name;
    if (!name || name.startsWith("_")) continue;
    const fivemName = pascal(name);
    const params = native.params || [];
    const outs = params.filter((p) => p.type.endsWith("*"));
    const retVec = native.return_type === "Vector3";

    if (outs.length === 0) {
      if (retVec) {
        shapes[fivemName] = { vec: 1 };
        vecCount++;
      }
      continue;
    }

    const out = outs.map((p) => ({
      n: p.name,
      v: p.type.startsWith("Vector3") ? 1 : 0,
    }));
    const entry = { out };
    if (native.return_type !== "void") entry.ret = 1;
    shapes[fivemName] = entry;
    outCount++;
  }
}

const keys = Object.keys(shapes).sort();
const sorted = {};
for (const k of keys) sorted[k] = shapes[k];

const json = JSON.stringify(sorted);
writeFileSync(
  OUT,
  `export const NATIVE_SHAPES = ${json};\n`,
  "utf8",
);

console.log(
  `Wrote ${keys.length} shapes (${vecCount} vector returns, ${outCount} multi-output) to ${OUT.slice(ROOT.length + 1)} (${(json.length / 1024).toFixed(0)} KB)`,
);
