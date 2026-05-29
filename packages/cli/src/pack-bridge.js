import { mkdir, writeFile, rm, cp } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRIDGE_ROOT = resolve(__dirname, "..", "..");

function bridgeDist(pkg) {
  const monorepo = resolve(BRIDGE_ROOT, pkg, "dist", "index.js");
  if (existsSync(monorepo)) return monorepo;
  const nm = resolve(
    __dirname, "..", "..", "..", "node_modules",
    "@ragemp-fivem-bridge", pkg, "dist", "index.js"
  );
  if (existsSync(nm)) return nm;
  throw new Error(
    `Bridge package "@ragemp-fivem-bridge/${pkg}" not found.\nRun 'npm install' or build the bridge monorepo first.`
  );
}

const FXMANIFEST = `fx_version 'cerulean'
game 'gta5'

name 'ragemp-fivem-bridge'
description 'Standalone RAGE:MP → FiveM bridge. Exposes mp.* to other resources via @-imports.'
version '1.0.0'

ragemp_bridge 'library'

server_script 'server.js'
client_script 'client.js'

files {
    'ui/_bridge.js'
}
`;

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
}
