import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = dirname(fileURLToPath(import.meta.url));

const PACKAGES = {
  "@ragemp-fivem-bridge/shared": resolve(ROOT, "packages/shared/src/index.js"),
  "@ragemp-fivem-bridge/plugin-manager": resolve(ROOT, "packages/plugin-manager/src/index.js"),
  "@ragemp-fivem-bridge/rage-rpc": resolve(ROOT, "packages/rage-rpc/src/index.js"),
};

export function workspaceAlias() {
  return {
    name: "workspace-alias",
    resolveId(id) {
      return PACKAGES[id] ?? null;
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
