import { build } from "./builder.js";
import { init } from "./init.js";
import { packBridge } from "./pack-bridge.js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const { version } = JSON.parse(
  readFileSync(join(__dirname, "..", "package.json"), "utf8")
);

const HELP = `
mp-fivem v${version} — RAGE:MP → FiveM bridge

USAGE
  mp-fivem <command> [options]

COMMANDS
  init [name]         Scaffold a new bundled-mode project.
  build               Build the project into a FiveM resource.
  dev                 Build in watch mode with source maps (development).
  deploy              Copy the last build to your FiveM server.
  pack-bridge         Package the bridge as a standalone FiveM resource.

OPTIONS (build / dev)
  --config <path>     Path to bridge.config.json  [default: ./bridge.config.json]
  --out <dir>         Override the output directory.
  --server <dir>      FiveM resources folder to deploy into after build.
  --minify            Force minification on.
  --no-minify         Force minification off.
  --source-map        Emit source maps.

OPTIONS (init)
  --no-install        Skip automatic dependency installation.

OPTIONS (deploy)
  --config <path>     Read serverPath from bridge.config.json.
  --server <dir>      FiveM resources folder to deploy into.

OPTIONS (pack-bridge)
  --out <dir>         Output directory  [default: ./dist/ragemp-fivem-bridge]

GLOBAL
  -v, --version       Print version.
  -h, --help          Show this message.

EXAMPLES
  mp-fivem init my-server
  mp-fivem dev
  mp-fivem build --server /srv/fivem/resources
  mp-fivem deploy --server /srv/fivem/resources
  mp-fivem pack-bridge --out /srv/fivem/resources
`;

function parseArgs(argv) {
  const args = { _: [], flags: {} };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "-h" || arg === "--help") args.flags.help = true;
    else if (arg === "-v" || arg === "--version") args.flags.version = true;
    else if (arg === "--watch") args.flags.watch = true;
    else if (arg === "--minify") args.flags.minify = true;
    else if (arg === "--no-minify") args.flags.minify = false;
    else if (arg === "--source-map") args.flags.sourceMap = true;
    else if (arg === "--no-install") args.flags.noInstall = true;
    else if (arg === "--config") args.flags.config = argv[++i];
    else if (arg === "--out") args.flags.out = argv[++i];
    else if (arg === "--server") args.flags.server = argv[++i];
    else args._.push(arg);
  }
  return args;
}

export async function run(argv) {
  const args = parseArgs(argv);

  if (args.flags.version) {
    console.log(`mp-fivem v${version}`);
    return;
  }

  if (args.flags.help || args._.length === 0) {
    console.log(HELP);
    return;
  }

  const command = args._[0];

  switch (command) {
    case "init":
      await init(args._[1] ?? "fivem-resource", args.flags);
      break;
    case "build":
      await build(args.flags);
      break;
    case "dev":
      await build({ ...args.flags, watch: true, minify: false, sourceMap: true });
      break;
    case "deploy":
      await build({ ...args.flags, deployOnly: true });
      break;
    case "pack-bridge":
      await packBridge(args.flags);
      break;
    default:
      console.error(`\n  Unknown command: ${command}\n`);
      console.log(HELP);
      process.exit(1);
  }
}
