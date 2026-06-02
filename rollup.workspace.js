import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = dirname(fileURLToPath(import.meta.url));

const PACKAGES = {
  "@ragemp-fivem-bridge/shared": resolve(ROOT, "packages/shared/src/index.ts"),
  "@ragemp-fivem-bridge/shared/internal": resolve(ROOT, "packages/shared/src/internal/index.ts"),
  "@ragemp-fivem-bridge/plugin-manager": resolve(ROOT, "packages/plugin-manager/src/index.ts"),
};

export function workspaceAlias() {
  return {
    name: "workspace-alias",
    resolveId(id) {
      return PACKAGES[id] ?? null;
    },
  };
}

const EXTS = [".ts", ".tsx", ".mjs", ".js", ".json"];
function exists(p) {
  try { return fs.statSync(p).isFile(); } catch { return false; }
}
export function tsResolve() {
  return {
    name: "ts-resolve",
    resolveId(source, importer) {
      if (!importer || !source.startsWith(".")) return null;
      const base = resolve(dirname(importer), source);
      if (exists(base)) return base;
      if (source.endsWith(".js")) {
        const asTs = base.slice(0, -3) + ".ts";
        if (exists(asTs)) return asTs;
      }
      for (const e of EXTS) if (exists(base + e)) return base + e;
      for (const e of EXTS) {
        const idx = resolve(base, "index" + e);
        if (exists(idx)) return idx;
      }
      return null;
    },
  };
}

export function onwarn(warning, warn) {
  if (warning.code === "UNRESOLVED_IMPORT") {
    console.error(`[rollup] UNRESOLVED: ${warning.exporter ?? warning.source} — run 'pnpm install' first`);
    process.exit(1);
  }
  warn(warning);
}
