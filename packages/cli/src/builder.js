import { rollup, watch as rollupWatch } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import { readFile, writeFile, mkdir, rm, cp, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve as resolvePath, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRIDGE_ROOT = resolvePath(__dirname, "..", "..");

function bridgeDist(pkg) {
  const monorepo = resolvePath(BRIDGE_ROOT, pkg, "dist", "index.js");
  if (existsSync(monorepo)) return monorepo;
  const nm = resolvePath(
    __dirname,
    "..",
    "..",
    "..",
    "node_modules",
    "@ragemp-fivem-bridge",
    pkg,
    "dist",
    "index.js"
  );
  if (existsSync(nm)) return nm;
  throw new Error(
    `Bridge package "@ragemp-fivem-bridge/${pkg}" not found.\nRun 'npm install' or build the bridge monorepo first.`
  );
}

async function loadConfig(configPath) {
  const fullPath = resolvePath(process.cwd(), configPath);
  if (!existsSync(fullPath)) {
    throw new Error(
      `Config not found: ${fullPath}\nRun 'mp-fivem init' to scaffold a new project.`
    );
  }
  const config = JSON.parse(await readFile(fullPath, "utf8"));
  config.name ??= "fivem-resource";
  config.output ??= "dist";
  config.minify ??= true;
  config.assets ??= [];
  return { config, configDir: dirname(fullPath) };
}

async function buildEntry({ entryFile, bridgePath, outFile, minify, sourceMap, watchMode }) {
  const virtualEntry = `import ${JSON.stringify(bridgePath)};\nimport ${JSON.stringify(entryFile)};\n`;

  const plugins = [
    {
      name: "ragemp-virtual-entry",
      resolveId(id) { if (id === "\0ve") return id; },
      load(id) { if (id === "\0ve") return virtualEntry; },
    },
    resolve(),
    minify && terser(),
  ].filter(Boolean);

  const outputOpts = {
    file: outFile,
    format: "iife",
    sourcemap: sourceMap ? "inline" : false,
  };

  if (watchMode) {
    return rollupWatch({ input: "\0ve", output: outputOpts, plugins });
  }

  const bundle = await rollup({ input: "\0ve", plugins });
  await bundle.write(outputOpts);
  await bundle.close();
  return { size: (await stat(outFile)).size };
}

function fxmanifest({ name, hasServer, hasClient, hasCef, assets }) {
  const lines = [
    `fx_version 'cerulean'`,
    `game 'gta5'`,
    ``,
    `name '${name}'`,
    `description 'Built with ragemp-fivem-bridge'`,
    `version '1.0.0'`,
    ``,
  ];
  if (hasServer) lines.push(`server_script 'server.js'`);
  if (hasClient) lines.push(`client_script 'client.js'`);
  if (hasCef || assets.length > 0) {
    if (hasCef) lines.push(`ui_page 'ui/index.html'`);
    lines.push(`files {`);
    if (hasCef) lines.push(`    'ui/**/*'`);
    for (const g of assets) lines.push(`    '${g}'`);
    lines.push(`}`);
  }
  return lines.join("\n") + "\n";
}

async function injectCefBridge({ userCefDir, outUiDir, cefBridgePath }) {
  await cp(userCefDir, outUiDir, { recursive: true });
  await cp(cefBridgePath, join(outUiDir, "_bridge.js"));

  const indexPath = join(outUiDir, "index.html");
  if (existsSync(indexPath)) {
    let html = await readFile(indexPath, "utf8");
    const tag = `<script src="_bridge.js"></script>`;
    if (!html.includes(tag)) {
      html = html.includes("</head>")
        ? html.replace("</head>", `    ${tag}\n  </head>`)
        : `${tag}\n${html}`;
      await writeFile(indexPath, html, "utf8");
    }
  }
}

async function deployTo(outDir, serverPath, resourceName) {
  const dest = join(resolvePath(serverPath), resourceName);
  if (existsSync(dest)) await rm(dest, { recursive: true, force: true });
  await cp(outDir, dest, { recursive: true });
  return dest;
}

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export async function build(flags = {}) {
  const configPath = flags.config ?? "bridge.config.json";
  const { config, configDir } = await loadConfig(configPath);

  const minify = flags.minify ?? config.minify;
  const sourceMap = flags.sourceMap ?? false;
  const watchMode = !!flags.watch;
  const deployOnly = !!flags.deployOnly;
  const serverPath = flags.server ?? config.serverPath ?? null;
  const outDir = resolvePath(configDir, flags.out ?? config.output, config.name);

  if (deployOnly) {
    if (!serverPath) throw new Error("No server path. Pass --server <dir> or set 'serverPath' in bridge.config.json.");
    if (!existsSync(outDir)) throw new Error(`Build output not found at ${outDir}. Run 'mp-fivem build' first.`);
    console.log(`\n  Deploying '${config.name}' to ${serverPath}...`);
    const dest = await deployTo(outDir, serverPath, config.name);
    console.log(`  Done → ${dest}\n`);
    return;
  }

  console.log(`\n  Building '${config.name}'`);
  if (watchMode) console.log(`  Mode:    watch`);

  if (!watchMode && existsSync(outDir)) await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const hasServer = !!config.server;
  const hasClient = !!config.client;
  const hasCef = !!config.cef;

  if (watchMode) {
    const watchers = [];

    const onEvent = (label) => (event) => {
      if (event.code === "BUNDLE_END") {
        console.log(`  [${timestamp()}] ${label} rebuilt`);
        if (serverPath) {
          deployTo(outDir, serverPath, config.name).then((dest) => {
            console.log(`  [${timestamp()}] Deployed → ${dest}`);
          }).catch(() => {});
        }
      }
      if (event.code === "ERROR") {
        console.error(`  [${timestamp()}] ${label} error:`, event.error.message);
      }
    };

    if (hasServer) {
      const entry = resolvePath(configDir, config.server);
      const w = await buildEntry({ entryFile: entry, bridgePath: bridgeDist("server"), outFile: join(outDir, "server.js"), minify: false, sourceMap, watchMode: true });
      w.on("event", onEvent("server"));
      watchers.push(w);
    }
    if (hasClient) {
      const entry = resolvePath(configDir, config.client);
      const w = await buildEntry({ entryFile: entry, bridgePath: bridgeDist("client"), outFile: join(outDir, "client.js"), minify: false, sourceMap, watchMode: true });
      w.on("event", onEvent("client"));
      watchers.push(w);
    }
    if (hasCef) {
      const userCefDir = resolvePath(configDir, config.cef);
      await injectCefBridge({ userCefDir, outUiDir: join(outDir, "ui"), cefBridgePath: bridgeDist("cef") });
    }
    if (!existsSync(join(outDir, "fxmanifest.lua"))) {
      await writeFile(join(outDir, "fxmanifest.lua"), fxmanifest({ name: config.name, hasServer, hasClient, hasCef, assets: config.assets }), "utf8");
    }

    console.log(`\n  Watching for changes... (Ctrl+C to stop)\n`);
    await new Promise(() => {});
    return;
  }

  const results = {};

  if (hasServer) {
    const entry = resolvePath(configDir, config.server);
    if (!existsSync(entry)) throw new Error(`Server entry not found: ${entry}`);
    results.server = await buildEntry({ entryFile: entry, bridgePath: bridgeDist("server"), outFile: join(outDir, "server.js"), minify, sourceMap, watchMode: false });
  }

  if (hasClient) {
    const entry = resolvePath(configDir, config.client);
    if (!existsSync(entry)) throw new Error(`Client entry not found: ${entry}`);
    results.client = await buildEntry({ entryFile: entry, bridgePath: bridgeDist("client"), outFile: join(outDir, "client.js"), minify, sourceMap, watchMode: false });
  }

  if (hasCef) {
    const userCefDir = resolvePath(configDir, config.cef);
    if (!existsSync(userCefDir)) throw new Error(`CEF directory not found: ${userCefDir}`);
    await injectCefBridge({ userCefDir, outUiDir: join(outDir, "ui"), cefBridgePath: bridgeDist("cef") });
  }

  for (const assetPath of config.assets) {
    const src = resolvePath(configDir, assetPath);
    if (!existsSync(src)) { console.warn(`  Warning: asset not found: ${src}`); continue; }
    const s = await stat(src);
    const dest = join(outDir, relative(configDir, src));
    await mkdir(dirname(dest), { recursive: true });
    await cp(src, dest, { recursive: s.isDirectory() });
  }

  await writeFile(join(outDir, "fxmanifest.lua"), fxmanifest({ name: config.name, hasServer, hasClient, hasCef, assets: config.assets }), "utf8");

  const lines = [
    hasServer && `  server.js   ${(results.server.size / 1024).toFixed(0)} KB`,
    hasClient && `  client.js   ${(results.client.size / 1024).toFixed(0)} KB`,
    hasCef && `  ui/`,
  ].filter(Boolean);

  console.log(`\n${lines.join("\n")}`);

  if (serverPath) {
    const dest = await deployTo(outDir, serverPath, config.name);
    console.log(`\n  Deployed → ${dest}`);
  } else {
    console.log(`\n  Output: ${relative(process.cwd(), outDir) || outDir}`);
    console.log(`  Drop the folder into your FiveM server's resources/ directory.`);
  }

  console.log();
}
