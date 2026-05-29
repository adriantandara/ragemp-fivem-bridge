let started = false;

mp.events.add("playerReady", () => {
  if (started) return;
  started = true;
  mp.gui.chat.push("!{#4ade80}Multiplayer Started");
});
