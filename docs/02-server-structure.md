# Server structure

## A FiveM server using the bridge (standalone)

```
your-fivem-server/
├─ server.cfg
└─ resources/
   ├─ ragemp-fivem-bridge/        ← the bridge (shared). Load FIRST.
   │  ├─ fxmanifest.lua
   │  ├─ server.js                ← built bridge server bundle
   │  ├─ client.js                ← built bridge client bundle
   │  └─ ui/_bridge.js            ← built CEF/NUI runtime
   │
   ├─ ragemp-chat/                ← optional RAGE:MP-style chat (drop-in for `chat`)
   │  ├─ fxmanifest.lua
   │  ├─ client.js
   │  └─ html/…
   │
   └─ your-gamemode/              ← your RAGE:MP code, opted in via @-imports
      ├─ fxmanifest.lua
      ├─ server/…                 ← your server scripts
      ├─ client/…                 ← your client scripts
      └─ ui/                       ← your NUI (host.html + pages + _bridge.js)
```

### Load order (`server.cfg`)

The bridge must start **before** anything that uses `mp`:

```cfg
ensure ragemp-fivem-bridge
ensure ragemp-chat        # optional, if you use the bridge chat
ensure your-gamemode
```

If you use `mp.gui.takeScreenshot`, also `ensure screenshot-basic` first.

> Do **not** also run FiveM's stock `chat` resource if you use `ragemp-chat` — both
> consume `chat:addMessage`, so you'd get duplicate lines.

## Where the bridge files come from

Build the monorepo once, then pack the standalone resource:

```bash
pnpm install && pnpm run build
npx mp-fivem pack-bridge --out /path/to/your-fivem-server/resources
```

`pack-bridge` copies the freshly built `server.js`, `client.js`, and `ui/_bridge.js` into
a `ragemp-fivem-bridge/` folder with a ready `fxmanifest.lua`.

## A bundled (CLI) server

In bundled mode there is no shared bridge resource — each built gamemode is fully
self-contained:

```
your-fivem-server/resources/
└─ my-server/                     ← `mp-fivem build` output
   ├─ fxmanifest.lua
   ├─ server.js                   ← bridge + your server code, bundled
   ├─ client.js                   ← bridge + your client code, bundled
   └─ ui/                          ← your CEF, with _bridge.js injected
```

```cfg
ensure my-server
```

See the tutorials for the exact steps in each mode.
