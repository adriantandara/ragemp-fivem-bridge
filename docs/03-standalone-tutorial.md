# Standalone tutorial (head to tail)

No build step for your gamemode — your scripts use the global `mp` and the bridge
resource provides it via `@`-imports. This is exactly how [`examples/showcase`](../examples/showcase/)
and the `fivem-test/resources/ragemp` test gamemode are set up.

## 1. Get the bridge resource

```bash
# from the bridge monorepo
pnpm install && pnpm run build
npx mp-fivem pack-bridge --out /path/to/server/resources
```

You now have `resources/ragemp-fivem-bridge/`.

## 2. Create your gamemode resource

```
resources/my-gamemode/
├─ fxmanifest.lua
├─ server/index.js
├─ client/index.js
└─ ui/                      (optional NUI)
```

`fxmanifest.lua` — list the bridge script **first**, then your own:

```lua
fx_version 'cerulean'
game 'gta5'

server_scripts {
  '@ragemp-fivem-bridge/server.js',
  'server/index.js',
}

client_scripts {
  '@ragemp-fivem-bridge/client.js',
  'client/index.js',
}
```

## 3. Write RAGE:MP code

`server/index.js`:

```js
mp.events.add("playerJoin", (player) => {
  player.outputChatBox(`Welcome ${player.name}!`);
});

mp.events.addCommand("veh", (player, _full, model) => {
  const veh = mp.vehicles.new(model || "adder", player.position, { dimension: player.dimension });
  player.putIntoVehicle(veh, -1);
});
```

`client/index.js`:

```js
mp.events.add("playerReady", () => mp.gui.chat.push("Ready!"));
mp.keys.bind(0x71, true, () => (mp.gui.cursor.visible = !mp.gui.cursor.visible)); // F2
```

## 4. server.cfg

```cfg
ensure ragemp-fivem-bridge
ensure my-gamemode
```

Start the server, connect, and your `mp.*` code runs.

## 5. Multiple files

You don't need a bundler. Add each script to the manifest in load order — they share the
same global `mp`:

```lua
server_scripts {
  '@ragemp-fivem-bridge/server.js',
  'server/database.js',
  'server/accounts.js',
  'server/vehicles.js',
  'server/index.js',
}
```

See [05-migrating-files](05-migrating-files.md) for turning a RAGE:MP `packages/` layout
(with or without an `index.js` entrypoint) into this list.

## 6. Add NUI / chat (optional)

For browsers, set `ui_page` to a host shell and load pages with `mp.browsers.new` — see
[06-nui-and-chat](06-nui-and-chat.md). For chat, drop in [`ragemp-chat`](../examples/ragemp-chat/).
