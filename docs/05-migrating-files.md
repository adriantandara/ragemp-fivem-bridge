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

FiveM's script host does not run a module graph for you, so you have two options:

**A. Bundle it yourself.** Point any JS bundler (rollup, esbuild, webpack…) at your
`index.js` entrypoint and emit a single **IIFE** file (FiveM's v8 host does not load
native ES modules). List the bundled output in `fxmanifest.lua` after the bridge:

```lua
server_scripts {
  '@ragemp-fivem-bridge/server.js',   -- bridge first
  'dist/server.js',                   -- your bundled output
}
```

- You do **not** import `mp` — it's the global the bridge installs. Treat it as external
  (e.g. mark it global in your bundler so it isn't resolved/inlined).
- Prefer ES `import` over CommonJS `require` if your bundler resolves ESM.

**B. Flatten it** into independent scripts and use Case 2 below — usually simplest if the
files only ever talked through the global `mp`.

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

No. The manifest's script list *is* the load order. Keep an `index.js` only if you like
having one place for bootstrap logic — list it last. (If you bundle a module graph
yourself, that bundle has its own internal entrypoint, but FiveM still just loads the one
output file you list.)

## Load order matters

- The **bridge** must initialize before your code — list `@ragemp-fivem-bridge/server.js`
  (and `client.js`) first.
- A file that defines something another file uses *at load time* must be listed first.
  Code inside event handlers runs later, so handler-registration order rarely matters.

## CEF / client_packages UI

Your RAGE CEF pages become NUI pages. Set the resource `ui_page` to the bridge **host**
shell and open pages with `mp.browsers.new(url)` — details in
[06-nui-and-chat](06-nui-and-chat.md).
