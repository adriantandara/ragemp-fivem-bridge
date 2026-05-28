# RAGE:MP → FiveM Bridge

Run your RAGE:MP JavaScript gamemode on a FiveM server with minimal changes.

The bridge reimplements the full `mp.*` API surface on top of FiveM natives — players, vehicles, events, commands, blips, checkpoints, markers, colshapes, pickups, dummies, browsers, voice, world, game utilities, and RPC.

> **JavaScript gamemodes only.** TypeScript declarations are included for IDE autocomplete.

**Built with collaboration from [ghosty2004](https://github.com/ghosty2004). Thank you.**

---

## Modes

|            | Standalone                                      | Bundled (CLI)                                     |
| ---------- | ----------------------------------------------- | ------------------------------------------------- |
| Best for   | Existing FiveM servers with multiple resources  | RAGE:MP gamemodes shipped as a single resource    |
| Setup      | Add one shared resource, opt in via `@`-imports | Use the CLI to compile everything into one output |
| Build step | None                                            | `mp-fivem build`                                  |

---

## Standalone mode

Install the bridge once, shared across any resource that opts in.

**1. Get the bridge resource**

```bash
npx mp-fivem pack-bridge --out /your/fivem/resources
```

Or download a release and drop the `ragemp-fivem-bridge/` folder into your `resources/` directory.

**2. `server.cfg`**

```cfg
ensure ragemp-fivem-bridge
ensure my-gamemode
```

**3. Your resource's `fxmanifest.lua`**

```lua
fx_version 'cerulean'
game 'gta5'

server_scripts {
  '@ragemp-fivem-bridge/server.js',
  'server/index.js'
}

client_scripts {
  '@ragemp-fivem-bridge/client.js',
  'client/index.js'
}
```

Your scripts can now use `mp.*` directly, exactly as on RAGE:MP.

**CEF / NUI**

```lua
ui_page 'ui/index.html'
files {
  'ui/**/*',
  '@ragemp-fivem-bridge/ui/_bridge.js'
}
```

In `ui/index.html`, load the bridge before your own scripts:

```html
<script src="/_bridge.js"></script>
```

This gives the NUI context `mp.events.add()`, `mp.trigger()`, and `mp.rpc`.

---

## Bundled mode (CLI)

The CLI compiles your RAGE:MP gamemode and the bridge into a single self-contained FiveM resource.

**Scaffold a new project**

```bash
npx mp-fivem init my-server
cd my-server
```

This creates a ready-to-run project with server, client, and NUI entry points, installs dependencies, and generates `bridge.config.json`.

**Start development**

```bash
npm run dev
# or
npx mp-fivem dev
```

Rebuilds on every file change and outputs to `dist/my-server/`.

**Production build**

```bash
npm run build
# or
npx mp-fivem build
```

**Deploy directly to your FiveM server**

```bash
npx mp-fivem build --server /path/to/fivem/resources
```

Or set it once in `bridge.config.json`:

```json
{
  "name": "my-server",
  "server": "src/server/index.js",
  "client": "src/client/index.js",
  "cef": "src/cef",
  "output": "dist",
  "serverPath": "/path/to/fivem/resources"
}
```

Then `npm run build` deploys automatically.

---

## CLI reference

```
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
  --minify / --no-minify
  --source-map        Emit inline source maps.

OPTIONS (init)
  --no-install        Skip automatic dependency installation.

OPTIONS (deploy)
  --server <dir>      FiveM resources folder.

OPTIONS (pack-bridge)
  --out <dir>         Output directory  [default: ./dist/ragemp-fivem-bridge]
```

---

## `bridge.config.json`

```json
{
  "name": "my-server",
  "server": "src/server/index.js",
  "client": "src/client/index.js",
  "cef": "src/cef",
  "assets": [],
  "output": "dist",
  "minify": true,
  "serverPath": "/optional/path/to/fivem/resources"
}
```

| Field        | Description                               |
| ------------ | ----------------------------------------- |
| `name`       | Resource name (folder name in `output/`)  |
| `server`     | Server entry point                        |
| `client`     | Client entry point                        |
| `cef`        | NUI source directory                      |
| `assets`     | Extra files/globs to copy into the output |
| `output`     | Build output directory                    |
| `minify`     | Minify output (default `true`)            |
| `serverPath` | Auto-deploy destination (optional)        |

---

## What's supported

### Players

`position`, `heading`, `health`, `armour`, `name`, `ip`, `ping`, `dimension`, `model`, `weapon`, `weaponAmmo`, `alpha`, `vehicle`, `seat`, `streamedPlayers`, `hairColor`, `headBlend`, `headOverlays`, `faceFeatures`, `clothes`, `props`, `decorations`, `eyeColor`, `isAiming`, `isInVehicle`, `isClimbing`, `isJumping`, `isReloading`, `isOnLadder`

`kick`, `ban`, `spawn`, `outputChatBox`, `notify`, `call`, `callProc`, `giveWeapon`, `removeWeapon`, `removeAllWeapons`, `putIntoVehicle`, `removeFromVehicle`, `setClothes`, `setProp`, `setHairColor`, `setHeadBlend`, `setHeadOverlay`, `setFaceFeature`, `setCustomization`, `setDecoration`, `clearDecorations`, `playAnimation`, `stopAnimation`, `playScenario`, `enableVoiceTo`, `disableVoiceTo`, `setVariable`, `getVariable`, `eval`, `invoke`

### Vehicles

`position`, `heading`, `health`, `engine`, `rotation`, `velocity`, `model`, `plate`, `livery`, `dimension`, `alpha`, `color`, `paintType`, `mod`, `neon`, `neonColor`, `tire`, `extra`, `dashboard`, `pearlescentColor`, `wheelColor`, `trimColor`, `movable`, `highbeams`, `rocketBoost`, `taxiLights`, `steerAngle`, `siren`, `horn`

`repair`, `explode`, `spawn`, `setMod`, `setExtra`, `destroy`, `call`, `setVariable`, `getVariable`

### Events

`mp.events.add`, `mp.events.remove`, `mp.events.call`, `mp.events.callRemote`, `mp.events.addCommand`, `mp.events.addProc`, `mp.events.callRemoteProc`

Built-in server events: `playerJoin`, `playerQuit`, `playerReady`, `playerDeath`, `playerSpawn`, `playerChat`, `playerCommand`, `playerEnterVehicle`, `playerExitVehicle`, `playerEnterCheckpoint`, `playerExitCheckpoint`, `playerStreamIn`, `playerStreamOut`, `packagesLoaded`, `serverShutdown`, `incomingConnection`, `vehicleDeath`, `vehicleDamage`

Built-in client events: `playerReady`, `playerDeath`, `playerSpawn`, `playerChat`, `playerCommand`, `playerWeaponChange`, `playerWeaponShot`, `playerEnterVehicle`, `playerLeaveVehicle`, `playerEnterCheckpoint`, `playerExitCheckpoint`, `playerStreamIn`, `playerStreamOut`, `render`, `click`, `browserCreated`, `browserDomReady`

### Pools

`mp.players`, `mp.vehicles`, `mp.objects`, `mp.blips`, `mp.colshapes`, `mp.checkpoints`, `mp.markers`, `mp.labels`, `mp.peds`, `mp.pickups`, `mp.dummies`, `mp.browsers`

All pools implement: `new`, `at`, `atHandle`, `exists`, `forEach`, `toArray`, `length`

### World, game, GUI

`mp.world.time`, `mp.world.weather`, `mp.world.trafficLights`, `mp.game.*` (client-side GTA5 natives), `mp.gui.chat`, `mp.gui.cursor`, `mp.gui.takeScreenshot`

### RPC (`mp.rpc`)

Vendored port of [rage-rpc](https://github.com/micaww/rage-rpc). Same API — drop-in replacement.

```js
// Server
mp.rpc.register("getBalance", async (args, { player }) => {
  return await db.getBalance(player.id);
});

// Client or CEF
const balance = await mp.rpc.callServer("getBalance");
```

`callServer`, `callClient`, `callBrowser`, `callBrowsers`, `register`, `unregister`, `trigger`, `triggerServer`, `triggerClient`, `triggerBrowsers`

---

## Plugins

Built-in plugins load automatically: `spawnmanager`, `rage-rpc`, `fs-compat`, `env-loader`.

Third-party plugins can ship as FiveM resources with these metadata fields in `fxmanifest.lua`:

```lua
bridge_plugin 'yes'
bridge_plugin_name 'my-plugin'
bridge_server_script 'dist/server.js'
bridge_client_script 'dist/client.js'
```

Your plugin scripts run inside the bridge's context with `mp` and `plugin` in scope:

```js
mp.events.add("playerJoin", (player) => {
  plugin.log("player joined:", player.name);
});
```

---

## Optional dependency — `screenshot-basic`

`mp.gui.takeScreenshot` requires the [`screenshot-basic`](https://github.com/citizenfx/screenshot-basic) community resource. FiveM does not expose a native JS screen capture API.

```cfg
ensure screenshot-basic
ensure ragemp-fivem-bridge
ensure my-gamemode
```

If `screenshot-basic` is not installed, the bridge logs a warning and calls the callback with `null`. Your code will not crash.

---

## Roadmap

- [ ] Built-in plugin for server-side vehicle sync (authoritative vehicle state replication)

---

## Contributing

Contributions are welcome — bug fixes, new `mp.*` API implementations, improved CLI features, or documentation improvements.

1. Fork the repo and create a branch.
2. Make your changes. Run `pnpm build` to verify everything compiles.
3. Open a pull request with a clear description of what you changed and why.

This project can be freely used and modified for personal or commercial projects under the terms of the MIT license. If you build something with it, a mention or a star is appreciated but not required.

---

## Support

- **Discord:** adriantandara
- **Email:** adriantandara2005@gmail.com

---

## License

MIT
