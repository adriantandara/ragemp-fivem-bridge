# Concepts

## What the bridge does

The bridge reimplements the RAGE:MP `mp.*` API on top of FiveM natives. Your gamemode
code keeps calling `mp.players`, `mp.events.add`, `mp.vehicles.new`, `mp.rpc`, etc.; the
bridge translates those into FiveM `emitNet`/`onNet`, entity natives, NUI messages, and
the command system.

`mp` is installed as a global. It is created **per resource context** that loads the
bridge script — the server bundle exposes the server API, the client bundle the client
API, and the CEF runtime the browser API.

> JavaScript gamemodes only. TypeScript declarations ship for IDE autocomplete, but the
> runtime is plain JS (the bridge is built as an IIFE because FiveM's v8 scripting host
> does not load native ES modules).

## How it's packaged

The bridge ships as a **standalone shared resource** (`ragemp-fivem-bridge`). Other
resources reference it with `@ragemp-fivem-bridge/...` imports in their `fxmanifest.lua`,
and the shared global `mp` is created inside each consuming resource. A multi-file
gamemode lists each of its files in `fxmanifest.lua` and they all share that one `mp`.

### How `@ragemp-fivem-bridge/server.js` works

FiveM lets a resource reference another resource's script with an `@resource/file`
prefix in `fxmanifest.lua`. The bridge resource registers its `server.js` / `client.js`
as scripts, so when your gamemode lists `'@ragemp-fivem-bridge/server.js'` **before** its
own files, the bridge initializes `mp` first, then your code runs with `mp` available.

The bridge resource marks itself with `ragemp_bridge 'library'` in its `fxmanifest.lua`.
The bridge scripts guard on that flag (`GetResourceMetadata(GetCurrentResourceName(),
"ragemp_bridge", 0) === "library"`) so they only initialize `mp` inside the *consuming*
resource, never in the bridge resource itself. (This is why the bridge resource can be
renamed freely — the guard keys off the flag, not the resource name.)

## Next

Set it up with the [standalone tutorial](03-standalone-tutorial.md).
