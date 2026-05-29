# Bundled / CLI tutorial (head to tail)

The CLI (`mp-fivem`) compiles your RAGE:MP gamemode **and** the bridge into one
self-contained FiveM resource. Use this when your gamemode is written with
`import`/`require` across many files and you want a single output resource.

## 1. Scaffold

```bash
npx mp-fivem init my-server
cd my-server
```

This creates `bridge.config.json`, `src/server/index.js`, `src/client/index.js`, an
optional `src/cef/`, and installs dependencies. (See [`examples/basic`](../examples/basic/).)

## 2. `bridge.config.json`

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

| Field | Meaning |
| --- | --- |
| `name` | Output resource (folder) name |
| `server` / `client` | Entry points the bundler starts from |
| `cef` | NUI source folder (copied + `_bridge.js` injected) |
| `assets` | Extra files/globs copied into the output |
| `output` | Build output directory |
| `minify` | Minify output (default `true`) |
| `serverPath` | If set, the build is auto-deployed here |

## 3. Develop

```bash
npx mp-fivem dev          # watch + rebuild, source maps, optional auto-deploy
```

## 4. Build for production

```bash
npx mp-fivem build                          # → dist/my-server/
npx mp-fivem build --server /path/resources # build + deploy
```

The CLI prepends the bridge to each entry, bundles with rollup (IIFE), writes
`fxmanifest.lua`, and injects the CEF `_bridge.js` into your `ui/`.

## 5. Imports across files

Because the bundler resolves modules, you write normal JS modules:

```js
// src/server/index.js
import "./accounts.js";
import "./vehicles.js";

// src/server/accounts.js
mp.events.addCommand("login", (player, _full, pass) => { /* … */ });
```

Only the **entrypoint** is named in the config; everything it imports is pulled in
automatically. `mp` is still the global the bridge installed — you do not import it.

## 6. server.cfg

```cfg
ensure my-server
```

That's it — the bridge is inside `my-server`, so there is no separate bridge resource.
