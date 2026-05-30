# Showcase

A ready-to-run FiveM resource that demonstrates the RAGE:MP `mp.*` API through the
bridge — **one demo file per feature area** — plus the four roadmap features:

| Feature | Where |
| --- | --- |
| Events & commands | `server/01-events-commands.js`, `client/01-events.js` |
| Players & synced variables | `server/02-players.js` |
| Vehicles **+ authoritative `vehicle-sync`** | `server/03-vehicles.js` |
| World, objects, blips, markers, checkpoints, colshapes, labels | `server/04-world-objects.js` |
| **RPC** (`mp.rpc`, leonardssh/rage-rpc port) | `server/05-rpc.js`, `client/05-rpc.js` |
| **`mp.prototype`** extension | `server/06-prototype.js`, `client/06-prototype.js` |
| **Browsers / NUI** | `server/07-browsers.js`, `client/07-browsers.js`, `ui/` |
| Keys, cursor, camera, raycasting | `client/02-keys-cursor.js`, `client/04-camera-raycast.js` |

This runs in **standalone mode**: the `ragemp-fivem-bridge` resource provides `mp.*`
via `@`-imports, and each file is a plain RAGE:MP-style script using the global `mp`.

## Install

1. Get the `ragemp-fivem-bridge` resource into your server's `resources/` — download a
   release zip, or build from source and assemble it manually (see
   [docs/02-server-structure](../../docs/02-server-structure.md#where-the-bridge-files-come-from)).
2. Copy this `showcase/` folder into the same `resources/` directory.
3. Copy the bridge's NUI runtime next to the UI so the relative `<script src="_bridge.js">` resolves:
   ```bash
   cp /path/to/server/resources/ragemp-fivem-bridge/ui/_bridge.js showcase/ui/_bridge.js
   ```
4. In `server.cfg` (bridge first):
   ```cfg
   ensure ragemp-fivem-bridge
   ensure showcase
   ```

## Try it in-game

`/help` lists every command. Highlights:

- `/veh adder` → `/color 0 200 255` → `/neon`, then have a **second player walk up** —
  they see your colours and neon (this is `vehicle-sync` replicating authoritative state).
- `/greet`, `/tune` — methods added through `mp.Player.prototype` / `mp.Vehicle.prototype`.
- `/rpctime`, `/clientpos` — server→client RPC round-trips. Set `mp.rpc.setDebugMode(true)` in
  `server/05-rpc.js` to log routing.
- `/ui` — opens the NUI HUD; the server pushes live player count/time into it via
  `mp.rpc.callBrowsers`, and its buttons fire events back to the client.

Client key binds: **F2** cursor · **F3** camera · **F4** position · **F5** vehicle info ·
**F7** raycast · **F8** server RPC · **F9** prototype helper.
