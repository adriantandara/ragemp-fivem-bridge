# Concepts & the two modes

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

## The two modes

| | **Standalone** | **Bundled (CLI)** |
| --- | --- | --- |
| Best for | Existing FiveM servers, multiple resources | A RAGE:MP gamemode shipped as one resource |
| The bridge is… | a shared resource (`ragemp-fivem-bridge`) other resources import via `@` | compiled into your single output resource |
| Build step | none | `mp-fivem build` (rollup) |
| Multi-file gamemode | list each file in `fxmanifest.lua` (shared global `mp`) | `import`/`require` from one entrypoint, bundler stitches it |

Both modes run the **same** bridge code. The only difference is *packaging*: in standalone
the bridge lives in its own resource and is referenced with `@ragemp-fivem-bridge/...`
imports; in bundled mode the CLI inlines it ahead of your entrypoint.

### How `@ragemp-fivem-bridge/server.js` works

FiveM lets a resource reference another resource's script with an `@resource/file`
prefix in `fxmanifest.lua`. The bridge resource registers its `server.js` / `client.js`
as scripts, so when your gamemode lists `'@ragemp-fivem-bridge/server.js'` **before** its
own files, the bridge initializes `mp` first, then your code runs with `mp` available.

The bridge scripts guard themselves with `GetCurrentResourceName() !== "ragemp-fivem-bridge"`
so they only initialize `mp` inside the *consuming* resource, never in the bridge resource
itself.

## Which should I pick?

- Already have a FiveM server, or want the bridge shared across several resources, or want
  zero build tooling → **Standalone** (see [03-standalone-tutorial](03-standalone-tutorial.md)).
- Porting a single RAGE:MP gamemode that uses `require`/`import` across many files and you
  want one clean output resource → **Bundled / CLI** (see [04-cli-tutorial](04-cli-tutorial.md)).
