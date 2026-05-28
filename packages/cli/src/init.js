import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { execSync } from "node:child_process";

function detectPackageManager() {
  if (existsSync("pnpm-lock.yaml")) return "pnpm";
  if (existsSync("yarn.lock")) return "yarn";
  if (existsSync("bun.lockb") || existsSync("bun.lock")) return "bun";
  return "npm";
}

function runInstall(cwd, pm) {
  const cmd = pm === "yarn" ? "yarn" : pm === "bun" ? "bun install" : `${pm} install`;
  try {
    execSync(cmd, { cwd, stdio: "inherit" });
    return true;
  } catch {
    return false;
  }
}

const FILES = {
  "bridge.config.json": (name) =>
    JSON.stringify(
      {
        name,
        server: "src/server/index.js",
        client: "src/client/index.js",
        cef: "src/cef",
        assets: [],
        output: "dist",
        minify: true,
      },
      null,
      2
    ) + "\n",

  "jsconfig.server.json": () =>
    JSON.stringify(
      {
        compilerOptions: {
          checkJs: false,
          module: "esnext",
          target: "es2020",
          types: ["@ragemp-fivem-bridge/server"],
        },
        include: ["src/server/**/*.js"],
      },
      null,
      2
    ) + "\n",

  "jsconfig.client.json": () =>
    JSON.stringify(
      {
        compilerOptions: {
          checkJs: false,
          module: "esnext",
          target: "es2020",
          types: ["@ragemp-fivem-bridge/client"],
        },
        include: ["src/client/**/*.js"],
      },
      null,
      2
    ) + "\n",

  "jsconfig.cef.json": () =>
    JSON.stringify(
      {
        compilerOptions: {
          checkJs: false,
          module: "esnext",
          target: "es2020",
          lib: ["dom", "es2020"],
          types: ["@ragemp-fivem-bridge/cef"],
        },
        include: ["src/cef/**/*.js"],
      },
      null,
      2
    ) + "\n",

  "package.json": (name) =>
    JSON.stringify(
      {
        name,
        private: true,
        version: "1.0.0",
        scripts: {
          dev: "mp-fivem dev",
          build: "mp-fivem build",
        },
        devDependencies: {
          "@ragemp-fivem-bridge/cli": "^0.1.0",
          "@ragemp-fivem-bridge/server": "*",
          "@ragemp-fivem-bridge/client": "*",
          "@ragemp-fivem-bridge/cef": "*",
        },
      },
      null,
      2
    ) + "\n",

  "src/server/index.js": () =>
    `mp.events.add("playerJoin", (player) => {
  player.outputChatBox(\`Welcome, \${player.name}!\`);
});

mp.events.addCommand("pos", (player) => {
  const { x, y, z } = player.position;
  player.outputChatBox(\`Position: \${x.toFixed(1)}, \${y.toFixed(1)}, \${z.toFixed(1)}\`);
});
`,

  "src/client/index.js": () =>
    `mp.events.add("playerReady", () => {
  mp.gui.chat.push("Bridge ready.");
});
`,

  "src/cef/index.html": () =>
    `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>UI</title>
    <style>
      html, body { margin: 0; background: transparent; color: white; font-family: sans-serif; }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script>
      mp.events.add("ui:show", (message) => {
        document.getElementById("app").textContent = message;
      });
    </script>
  </body>
</html>
`,

  ".gitignore": () => `node_modules/\ndist/\n*.log\n`,

  "README.md": (name) =>
    `# ${name}

## Development

\`\`\`bash
npm run dev
\`\`\`

## Production build

\`\`\`bash
npm run build
\`\`\`

Drop the \`dist/${name}/\` folder into your FiveM server's \`resources/\` directory and add \`ensure ${name}\` to \`server.cfg\`.
`,
};

export async function init(name, flags = {}) {
  const target = resolve(process.cwd(), name);
  if (existsSync(target)) {
    throw new Error(`Directory '${name}' already exists.`);
  }

  const pm = detectPackageManager();

  console.log(`\n  Scaffolding '${name}'...\n`);

  await mkdir(target, { recursive: true });

  for (const [relPath, contentFn] of Object.entries(FILES)) {
    const fullPath = join(target, relPath);
    await mkdir(join(fullPath, ".."), { recursive: true });
    await writeFile(fullPath, contentFn(name), "utf8");
    console.log(`  + ${relPath}`);
  }

  if (!flags.noInstall) {
    console.log(`\n  Installing dependencies with ${pm}...`);
    const ok = runInstall(target, pm);
    if (!ok) {
      console.log(`  Could not auto-install. Run '${pm} install' inside '${name}/' manually.`);
    }
  }

  console.log(`\n  Done. Get started:\n`);
  console.log(`    cd ${name}`);
  console.log(`    npm run dev`);
  console.log(
    `\n  Drop dist/${name}/ into your FiveM server's resources folder and ensure it in server.cfg.\n`
  );
}
