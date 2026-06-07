#!/usr/bin/env node
import { mkdir, writeFile, rm, cp } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGES_ROOT = resolve(__dirname, "..");

function bridgeDist(pkg) {
  const monorepo = resolve(PACKAGES_ROOT, pkg, "dist", "index.js");
  if (existsSync(monorepo)) return monorepo;
  const nm = resolve(
    PACKAGES_ROOT, "..", "node_modules",
    "@ragemp-fivem-bridge", pkg, "dist", "index.js"
  );
  if (existsSync(nm)) return nm;
  throw new Error(
    `Bridge package "@ragemp-fivem-bridge/${pkg}" not built.\n` +
    `Run 'pnpm run build' in the monorepo first.`
  );
}

const FXMANIFEST = `fx_version 'cerulean'
game 'gta5'

name 'ragemp-fivem-bridge'
description 'Standalone RAGE:MP -> FiveM bridge. Exposes mp.* to other resources via @-imports.'
version '1.0.0'

ragemp_bridge 'library'

-- Optional plugins (disabled by default). Uncomment a line to enable:
-- bridge_world_vehicles 'yes' -- spawn server vehicles anywhere on the map (CreateVehicleServerSetter + retry queue)

server_script 'server.js'
client_script 'client.js'

files {
    'ui/_bridge.js'
}
`;

function parseFlags(argv) {
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--out" || arg === "-o") flags.out = argv[++i];
    else if (arg.startsWith("--out=")) flags.out = arg.slice(6);
  }
  return flags;
}

export async function packBridge(flags = {}) {
  const outDir = resolve(process.cwd(), flags.out ?? "dist/ragemp-fivem-bridge");

  console.log(`\n  Packaging standalone bridge resource...`);
  console.log(`  Output: ${relative(process.cwd(), outDir) || outDir}\n`);

  if (existsSync(outDir)) await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await mkdir(join(outDir, "ui"), { recursive: true });

  await cp(bridgeDist("server"), join(outDir, "server.js"));
  console.log("  + server.js");

  await cp(bridgeDist("client"), join(outDir, "client.js"));
  console.log("  + client.js");

  await cp(bridgeDist("cef"), join(outDir, "ui", "_bridge.js"));
  console.log("  + ui/_bridge.js");

  await writeFile(join(outDir, "fxmanifest.lua"), FXMANIFEST, "utf8");
  console.log("  + fxmanifest.lua");

  console.log(`\n  Done. Drop '${relative(process.cwd(), outDir) || outDir}/' into your FiveM server's resources folder.`);
  console.log(`  Add 'ensure ragemp-fivem-bridge' to server.cfg before your gamemode.\n`);

  return outDir;
}

const invokedDirectly = resolve(process.argv[1] ?? "") === resolve(fileURLToPath(import.meta.url));
if (invokedDirectly) {
  packBridge(parseFlags(process.argv.slice(2))).catch((err) => {
    console.error(`\n  pack-bridge failed: ${err.message}\n`);
    process.exit(1);
  });
}
