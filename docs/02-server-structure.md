# Server structure

## A FiveM server using the bridge

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

Two options:

**Download a release.** Grab `ragemp-fivem-bridge-<version>.zip` from the GitHub releases
page and drop the extracted `ragemp-fivem-bridge/` folder into `resources/`. It already
contains `server.js`, `client.js`, `ui/_bridge.js`, and a ready `fxmanifest.lua`.

**Build from source.** Build the monorepo and copy the bundles into a resource folder:

```bash
pnpm install && pnpm run build
```

Then create `resources/ragemp-fivem-bridge/` and copy:

| From (repo) | To (resource) |
| --- | --- |
| `packages/server/dist/index.js` | `server.js` |
| `packages/client/dist/index.js` | `client.js` |
| `packages/cef/dist/index.js` | `ui/_bridge.js` |

with this `fxmanifest.lua`:

```lua
fx_version 'cerulean'
game 'gta5'

name 'ragemp-fivem-bridge'
description 'Standalone RAGE:MP -> FiveM bridge.'
version '1.0.0'

ragemp_bridge 'library'

server_script 'server.js'
client_script 'client.js'

files {
    'ui/_bridge.js'
}
```

The `ragemp_bridge 'library'` line is required — it marks the resource as the bridge
library so the scripts don't self-initialize `mp` inside it. See
[03-standalone-tutorial](03-standalone-tutorial.md) for opting your gamemode in.
