# Plugins & roadmap features

## Built-in plugins

These load automatically when the bridge initializes:

| Plugin | Side | What it does |
| --- | --- | --- |
| `fs-compat` | server | Redirects `process.cwd()` to the resource path so SDK file writes (logs) work under FiveM. |
| `env-loader` | server | Loads each resource's `.env` at startup; exposes `mp.environment.loadEnv()`. |
| `rage-rpc` | both | Installs `mp.rpc` (the leonardssh/rage-rpc port). |
| `spawnmanager` | both | Player spawning with collision loading + ground-Z; `player.spawn(pos)`. |
| `vehicle-sync` | both | Authoritative vehicle state replication (below). |

## Disabling built-in plugins

Built-in plugins load automatically, but you can turn any of them off by adding
`disable_plugin` lines to a `fxmanifest.lua`. Use the plugin name from the table above:

```lua
disable_plugin 'rage-rpc'
disable_plugin 'vehicle-sync'
```

The flag is read from **two** places (union), so it works wherever you put it:
- your **gamemode** resource's `fxmanifest.lua` — disables the plugin for that gamemode;
- the **bridge** resource's `fxmanifest.lua` — disables it globally for every consumer.

List it once per name, as many lines as you need. On startup the bridge logs the disabled
set (`[bridge:plugins] disabled: rage-rpc`) so you can confirm it was picked up — if you
don't see your plugin there, the line is in neither manifest (or the resource wasn't
restarted). The same names also disable third-party plugins (matched against
`bridge_plugin_name`).

Disable a plugin when you ship your own implementation (your own RPC layer or spawn system)
and don't want the built-in one installing conflicting handlers.

## `vehicle-sync` (authoritative vehicle replication)

Cosmetic vehicle state — colour, neon, mods, livery, window tint, extras, … — is applied
**per client**. A `VehicleMp` setter broadcasts the change once. A client that streams the
vehicle in *later* (a late joiner, or anyone who drives back into range) missed that
broadcast and would see a default vehicle.

`vehicle-sync` fixes this: the server keeps the authoritative state on the `VehicleMp`
entity, and when a client streams a vehicle in, the client requests a snapshot and repaints
it. No API to call — set vehicle properties as usual and they stay consistent for everyone.

```js
const veh = mp.vehicles.new("adder", pos);
veh.setColorRGB(0, 200, 255, 10, 10, 10);
veh.setNeonColor(0, 150, 255);
veh.neonEnabled = true;
// A second player walking up later sees exactly this.
```

## `mp.prototype` — extending entities

Entity constructors are exposed on `mp`: `mp.Player`, `mp.Vehicle`, `mp.Object`, `mp.Blip`,
`mp.Colshape`, `mp.Checkpoint`, `mp.Marker`, `mp.TextLabel`, `mp.Ped`, `mp.Pickup`,
`mp.Dummy` (plus `mp.Camera` and `mp.Browser` on the client). Because the pools instantiate
these classes directly, anything you add to a prototype applies to every instance.

```js
mp.Player.prototype.greet = function () {
  this.outputChatBox(`Hi ${this.name}!`);
};

mp.Vehicle.prototype.fullTune = function () {
  for (let t = 0; t <= 16; t++) this.setMod(t, 0);
};

somePlayer.greet();
```

## RPC (`mp.rpc`)

A port of [leonardssh/rage-rpc](https://github.com/leonardssh/rage-rpc). Same API plus:

- `mp.rpc.setDebugMode(true)` — logs RPC routing.
- Large payloads are transparently chunked.
- Entity references (`mp.Player`, `mp.Vehicle`, …) survive a round trip — they're
  serialized by id and rehydrated on the other side.

```js
// server
mp.rpc.register("getBalance", (args, { player }) => db.balance(player.id));
// client / cef
const bal = await mp.rpc.callServer("getBalance");
```

Functions: `register`, `unregister`, `call`, `callServer`, `callClient`, `callBrowser(s)`,
`on`, `off`, `trigger`, `triggerServer`, `triggerClient`, `triggerBrowser(s)`, `setDebugMode`.

## Third-party plugins

Ship a plugin as a FiveM resource with these `fxmanifest.lua` metadata fields:

```lua
bridge_plugin 'yes'
bridge_plugin_name 'my-plugin'
bridge_server_script 'dist/server.js'
bridge_client_script 'dist/client.js'
```

The plugin runs inside the bridge context with `mp` and a `plugin` helper in scope:

```js
mp.events.add("playerJoin", (player) => {
  plugin.log("joined:", player.name);
});
```
