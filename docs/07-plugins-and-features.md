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
