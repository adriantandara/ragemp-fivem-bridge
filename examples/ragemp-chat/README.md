# ragemp-chat

A RAGE:MP-style chat resource for the bridge. It is a **drop-in replacement** for
FiveM's default `chat` resource: it consumes the exact events the bridge's
`mp.gui.chat` API already emits, so your gamemode needs no changes.

## What it wires up

| Bridge API | Effect |
| --- | --- |
| `mp.gui.chat.push(text)` | Adds a line (parses RAGE:MP `!{#rrggbb}` colour codes). |
| `player.outputChatBox(text)` (server) | Same — arrives on the client as a chat line. |
| `mp.gui.chat.activate(state)` | Enables/disables opening the input box. |
| `mp.gui.chat.show(state)` | Shows/hides the chat. |
| `mp.gui.chat.clear()` *(emit `chat:clear`)* | Clears the log. |

## Input → commands & messages

- Press **T** to open the input box.
- Type `/command args` → runs as a command, reaching `mp.events.addCommand` on the server.
- Type a plain message → the bridge fires `playerChat(player, text)` and, unless a
  handler returns `false`, this resource echoes `name: message` to everyone
  (RAGE:MP default).
- **↑ / ↓** cycle input history, **Esc** cancels.

## Where the default echo lives

The **bridge core renders no chat at all** — it only owns the `playerChat` event
lifecycle. After an uncancelled `playerChat`, the bridge raises a local
`ragemp:chat:output` hook; the default `name: message` broadcast is implemented
here, in [`server.js`](server.js). Without this resource loaded, a plain message
produces no output. To change the formatting (timestamps, colours, channels) or
suppress the default entirely, edit or remove the handler in `server.js`.

## Install

Place this folder in `resources/` and load it **before** your gamemode, and make sure
FiveM's stock `chat` is not also running (don't `ensure chat`):

```cfg
ensure ragemp-fivem-bridge
ensure ragemp-chat
ensure your-gamemode
```

Colour codes: `mp.gui.chat.push("!{#4ade80}Hello!")` renders "Hello!" in green.
FiveM `^1`–`^9` codes are also supported.
