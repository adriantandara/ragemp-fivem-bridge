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
└─ index.js
```

> ### The `ui/` folder is required
>
> Your NUI files **must** live in a folder literally named `ui/`, and `ui_page` must point
> inside it (`ui_page 'ui/host.html'`). This is a hard convention, not a suggestion:
>
> - The bridge runtime is served at `ui/_bridge.js`, and relative browser URLs
>   (`mp.browsers.new("index.html")`) resolve **relative to `host.html`** — i.e. against
>   `cfx-nui-<resource>/ui/`. Put pages elsewhere and relative URLs point at the wrong path.
> - In **bundled / CLI** mode the build writes your UI to `ui/` and injects `_bridge.js`
>   there; the generated `fxmanifest.lua` references `ui/index.html`.
>
> If you skip the `ui/` folder, the host shell and your pages won't load correctly. Keep
> everything under `ui/`.

No need to copy `_bridge.js` — your pages load it straight from the bridge resource
(`https://cfx-nui-ragemp-fivem-bridge/ui/_bridge.js`). Just keep `ragemp-fivem-bridge`
`ensure`d before your resource.

`fxmanifest.lua`:

```lua
ui_page 'ui/host.html'
files {
  'ui/host.html',
  'ui/index.html',
  'ui/index.css',
  'ui/index.js',
}
```

`ui/host.html` — just loads the runtime straight from the bridge resource (no local copy needed):

```html
<!doctype html>
<html><body>
  <script src="https://cfx-nui-ragemp-fivem-bridge/ui/_bridge.js"></script>
</body></html>
```

`ui/index.html` — your page loads the runtime the same way (it auto-detects it's in an iframe):

```html
<!doctype html>
<html>
  <head><link rel="stylesheet" href="index.css" /></head>
  <body>
    <div id="app">Hello from CEF</div>
    <script src="https://cfx-nui-ragemp-fivem-bridge/ui/_bridge.js"></script>
    <script src="index.js"></script>
  </body>
</html>
```

> ### Loading `_bridge.js`
>
> **Recommended — reference the bridge resource directly** (shown above). No copying, one source of truth, always up to date with the installed bridge:
> ```html
> <script src="https://cfx-nui-ragemp-fivem-bridge/ui/_bridge.js"></script>
> ```
> Works because `ui/_bridge.js` is declared in the bridge's `files {}`. Just `ensure ragemp-fivem-bridge` **before** your resource in `server.cfg`. This works from any resource — perfect for splitting UI across resources (e.g. a separate `login` page).
>
> **Alternatives:**
> - **Local copy** — copy `ragemp-fivem-bridge/ui/_bridge.js` into your `ui/` and use `<script src="_bridge.js"></script>`. Fine, but you must re-copy it when the bridge updates.
> - **Auto-injection** — the NUI runtime injects `_bridge.js` into pages that don't load it themselves, so a page with no `<script>` at all often still works. Referencing it explicitly (above) is more reliable.
>
> `<script src="@ragemp-fivem-bridge/ui/_bridge.js">` does **not** work — the `@resource/path` syntax is for `mp.browsers.new(...)` and FiveM scripts, **not** valid in HTML. Use the full `https://cfx-nui-…` URL in `<script>` tags.
>
> The CLI handles all of this for you in bundled mode.

## Using browsers

### Browser URL formats

Three URL styles are supported:

| Style | Example | Resolves to |
| --- | --- | --- |
| Relative | `"login.html"` | file inside the same resource's `ui/` folder (relative to `host.html`) |
| `@resource/path` | `"@ragemp-server/client/login/index.html"` | a file **inside another FiveM resource** |
| Absolute | `"https://cfx-nui-ragemp-server/client/login/index.html"` | same as above, explicit |

The `@resource/path` shorthand is the recommended way to split your game UI across multiple
resources. The bridge translates it to `https://cfx-nui-{resource}/{path}` automatically.

> **Requirement:** the target resource must list the file in its `fxmanifest.lua` `files {}`
> block. FiveM will refuse to serve any file not declared there.

```lua
-- in ragemp-server/fxmanifest.lua
files {
  'client/login/index.html',
  'client/login/index.css',
  'client/login/index.js',
  'client/login/_bridge.js',  -- each page needs its own copy of _bridge.js
}
```

Every page that uses `mp.*` must load `_bridge.js` regardless of which resource it lives in.

### Creating browsers

Client:

```js
const browser = mp.browsers.new("index.html"); // relative: same resource's ui/

// load a page from a different resource
this.loginBrowser = mp.browsers.new("@ragemp-server/client/login/index.html");

// or explicit absolute URL
const hud = mp.browsers.new("https://cfx-nui-my-hud/index.html");

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
