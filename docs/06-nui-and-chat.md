# NUI, browsers & chat

## The browser model

RAGE:MP gives you independent CEF browsers via `mp.browsers.new(url)`. FiveM gives each
resource a **single** NUI root document. To bridge the gap, the bridge's NUI runtime
(`_bridge.js`) runs in one of two roles, decided automatically:

- **Host** — when it is the top document (your resource's `ui_page`). It is a transparent
  shell that creates one `<iframe>` per `mp.browsers.new(url)` and routes client→browser
  messages to the right frame. `SendNuiMessage` only reaches the root document, so the host
  is the single receiver and forwards to frames.
- **Frame** — when it is loaded inside one of those iframes (your actual page). It talks
  back to the client directly through NUI callbacks, tagged with its own browser id.

You don't manage any of this; you just point `ui_page` at a host shell and create pages.

## Setup

```
my-gamemode/ui/
├─ host.html      ← the NUI root (host shell)
├─ index.html     ← your actual page (loaded as a browser/iframe)
├─ index.css
├─ index.js
└─ _bridge.js     ← the bridge NUI runtime (copy from the bridge resource)
```

`fxmanifest.lua`:

```lua
ui_page 'ui/host.html'
files {
  'ui/host.html',
  'ui/index.html',
  'ui/index.css',
  'ui/index.js',
  'ui/_bridge.js',
}
```

`ui/host.html` — just loads the runtime:

```html
<!doctype html>
<html><body>
  <script src="_bridge.js"></script>
</body></html>
```

`ui/index.html` — your page also loads the runtime (it detects it's in an iframe):

```html
<!doctype html>
<html>
  <head><link rel="stylesheet" href="index.css" /></head>
  <body>
    <div id="app">Hello from CEF</div>
    <script src="_bridge.js"></script>
    <script src="index.js"></script>
  </body>
</html>
```

> Copy `_bridge.js` from `ragemp-fivem-bridge/ui/_bridge.js` (standalone) into your `ui/`.
> The CLI injects it for you in bundled mode.

## Using browsers

Client:

```js
const browser = mp.browsers.new("index.html"); // url relative to ui/host.html

// client → browser
browser.call("setName", "Adrian");
browser.execute(`document.title = "hi"`);
const data = await browser.callProc("getFormData");

browser.destroy();
```

In the page (`index.js`):

```js
mp.events.add("setName", (name) => { document.getElementById("app").textContent = name; });
mp.events.addProc("getFormData", () => ({ ok: true }));

// browser → client / server
mp.trigger("uiButtonClicked", "save");          // fires a client event
const info = await mp.rpc.callServer("getInfo"); // RPC straight to the server
```

`mp.rpc` works in all three contexts (server / client / CEF). The server can push into a
browser with `mp.rpc.callBrowsers(player, "proc", args)`.

## Chat

`mp.gui.chat` emits standard events (`chat:addMessage`, `chat:toggleActive`,
`chat:toggleVisibility`, `chat:clear`). The [`ragemp-chat`](../examples/ragemp-chat/)
resource consumes them and provides a RAGE:MP-style chat with `!{#rrggbb}` colour codes
and a command/message input box.

```js
mp.gui.chat.push("!{#4ade80}Welcome!");   // green line
mp.gui.chat.activate(true);
mp.gui.chat.clear();
```

Typing `/veh adder` in the box runs as a command (reaching `mp.events.addCommand` on the
server); a plain message fires `playerChat(player, text)` server-side and, unless a
handler returns `false`, is echoed to everyone.

> If you use `ragemp-chat`, don't also run FiveM's stock `chat` resource — both react to
> `chat:addMessage`, which would double every line.
