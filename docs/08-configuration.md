# Configuration & conventions

A single reference for every rule the bridge depends on. If something "doesn't load",
check it against this page first.

## fxmanifest.lua (standalone mode)

```lua
fx_version 'cerulean'
game 'gta5'

server_scripts {
  '@ragemp-fivem-bridge/server.js',   -- bridge FIRST
  'server/index.js',
}

client_scripts {
  '@ragemp-fivem-bridge/client.js',   -- bridge FIRST
  'client/index.js',
}

ui_page 'ui/host.html'                 -- must be inside ui/
files {
  'ui/host.html',
  'ui/index.html',
  'ui/index.js',
}

-- optional: turn off built-in plugins (one name per line)
disable_plugin 'rage-rpc'
```

### Rules that are not optional

| Rule | Why |
| --- | --- |
| `@ragemp-fivem-bridge/server.js` and `client.js` are listed **first** | The bridge must install `mp` before your code runs. |
| NUI files live in a folder named `ui/`, and `ui_page` points inside it | Relative browser URLs resolve against `cfx-nui-<resource>/ui/`; the runtime is served at `ui/_bridge.js`. See [06-nui-and-chat](06-nui-and-chat.md#the-ui-folder-is-required). |
| Every file you reference must be in `files {}` | FiveM refuses to serve any file not declared there. |
| Load order within a list matters | A file that defines something used **at load time** by another must be listed earlier. Handler-registration order rarely matters. |

## Load order (server.cfg)

```cfg
ensure screenshot-basic        # only if you use mp.gui.takeScreenshot
ensure ragemp-fivem-bridge     # the bridge — before anything using mp
ensure ragemp-chat             # optional bridge chat (don't also run stock `chat`)
ensure your-gamemode
```

## Disabling built-in plugins

Add `disable_plugin '<name>'` to your gamemode's `fxmanifest.lua` (per-gamemode) or to the
bridge resource's `fxmanifest.lua` (global) — both are honored. Names: `fs-compat`,
`env-loader`, `rage-rpc`, `spawnmanager`, `vehicle-sync`, or any third-party
`bridge_plugin_name`. The bridge logs the disabled set on startup. Details in
[07-plugins-and-features](07-plugins-and-features.md#disabling-built-in-plugins).

## Third-party plugin metadata

A plugin resource declares itself with:

```lua
bridge_plugin 'yes'
bridge_plugin_name 'my-plugin'
bridge_server_script 'dist/server.js'
bridge_client_script 'dist/client.js'
```

It runs inside the bridge context with `mp` and `plugin` in scope. See
[07-plugins-and-features](07-plugins-and-features.md#third-party-plugins).

## Quick troubleshooting

| Symptom | Likely cause |
| --- | --- |
| `mp is not defined` | Bridge script not listed first, or not `ensure`d before your resource. |
| NUI page blank / `_bridge.js` 404 | UI not under `ui/`, file missing from `files {}`, or bridge not `ensure`d first. |
| A built-in feature you replaced conflicts | `disable_plugin` the built-in one. |
| `mp.game.*` / entity method warns "Unmapped native" | That RAGE native isn't mapped yet; the call returns `undefined` instead of crashing. |
