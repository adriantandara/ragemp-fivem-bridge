// Client entry — uses the RAGE:MP `mp.*` API.
// The bridge auto-loads before this file runs.

mp.events.add("playerReady", () => {
  mp.gui.chat.push("Bridge ready. Welcome!");
});

mp.events.add("render", () => {
  // Per-frame logic goes here
});

// Example: key binding (F2 = toggle cursor)
mp.keys.bind(0x71, true, () => {
  mp.gui.cursor.visible = !mp.gui.cursor.visible;
});
