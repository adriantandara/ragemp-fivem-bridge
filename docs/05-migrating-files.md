# From RAGE:MP files to FiveM

This is the part people get stuck on: a RAGE:MP gamemode is laid out as `packages/`
(server) and `client_packages/` (client), each auto-loaded from an `index.js`
entrypoint that `require()`s the rest. FiveM has no such auto-loader — a resource lists
its scripts in `fxmanifest.lua`. Here's how to map one onto the other.

## The RAGE:MP layout

```
server/
├─ packages/
│  └─ mygamemode/
│     ├─ index.js          ← RAGE runs this; it require()s the rest
│     ├─ accounts.js
│     ├─ vehicles.js
│     └─ commands/teleport.js
└─ client_packages/
   ├─ index.js             ← RAGE runs this on the client
   ├─ hud.js
   └─ browsers.js
```

- `packages/<name>/` → **server** scripts.
- `client_packages/` → **client** scripts.
- Each `index.js` is the **entrypoint** RAGE auto-executes; submodules are pulled in with
  `require("./x")`.

The key question is: **does your code form a real module graph (uses `require`/`module.exports`
to pass values between files), or is it just many scripts that all talk through the global
`mp`?** That decides the mode.

---

## Case 1 — You have an entrypoint that `require()`s other files (a module graph)

Use **Bundled / CLI** mode. The bundler starts at your entrypoint and follows the imports,
exactly like RAGE loaded `index.js`.

`bridge.config.json`:

```json
{
  "name": "mygamemode",
  "server": "packages/mygamemode/index.js",
  "client": "client_packages/index.js",
  "cef": "client_packages/ui",
  "output": "dist"
}
```

Then:

```bash
npx mp-fivem build --server /path/to/fivem/resources
```

Notes:
- Prefer ES `import` over CommonJS `require` (the bundler resolves ESM + node modules).
  `const x = require("./accounts")` → `import { x } from "./accounts.js"`.
- You do **not** import `mp` — it's the global the bridge installs.
- One output resource contains the bridge + your whole graph. No `@ragemp-fivem-bridge`
  references needed.

This is the closest 1:1 to how RAGE ran your `index.js`.

---

## Case 2 — Flat scripts that all use the global `mp` (no real exports)

A lot of RAGE:MP code is just files full of `mp.events.add(...)` / `mp.events.addCommand(...)`
that never `module.exports` anything — they were only split for tidiness. Use
**Standalone** mode and list each file in `fxmanifest.lua` in load order. They share one
global `mp` and one global scope, just like under RAGE.

```lua
server_scripts {
  '@ragemp-fivem-bridge/server.js',   -- bridge first
  'server/accounts.js',
  'server/vehicles.js',
  'server/commands/teleport.js',
  'server/index.js',                  -- entrypoint last, if you keep one
}

client_scripts {
  '@ragemp-fivem-bridge/client.js',
  'client/hud.js',
  'client/browsers.js',
}
```

Mechanical conversion:
- Move `packages/<name>/*` → `server/` and `client_packages/*` → `client/` in your resource.
- Delete the `require("./x")` lines from your old `index.js` — every listed file already
  runs in the same context. If `index.js` only did `require(...)`s, you can delete it and
  just list the files.
- If a file `module.exports`-ed a value another file consumed, either inline it, hang it
  on a global (`global.myConfig = …`), or switch to Case 1 (bundle it).

> [`examples/showcase`](../examples/showcase/) is Case 2: `server/01..07.js` and
> `client/01..07.js` are independent files listed in `fxmanifest.lua`, all using `mp`.

---

## "Do I need an `index.js` entrypoint on FiveM?"

- **Standalone:** No. The manifest's script list *is* the load order. Keep an `index.js`
  only if you like having one place for bootstrap logic — list it last.
- **Bundled/CLI:** Yes — the config points at one `server`/`client` entry, and everything
  it imports is bundled. That entry is your `index.js`.

## Load order matters

In both modes:
- The **bridge** must initialize before your code (`@ragemp-fivem-bridge/server.js` first
  in standalone; the CLI does this for you in bundled mode).
- A file that defines something another file uses *at load time* must be listed first.
  Code inside event handlers runs later, so handler-registration order rarely matters.

## CEF / client_packages UI

Your RAGE CEF pages become NUI pages. Set the resource `ui_page` to the bridge **host**
shell and open pages with `mp.browsers.new(url)` — details in
[06-nui-and-chat](06-nui-and-chat.md).
