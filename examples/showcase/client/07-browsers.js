let hud = null;

function openHud() {
  if (hud) return;

  hud = mp.browsers.new("index.html");
  mp.gui.cursor.visible = true;
}

function closeHud() {
  if (!hud) return;
  hud.destroy();
  hud = null;
  mp.gui.cursor.visible = false;
}

mp.events.add("showcase:toggleUI", () => {
  if (hud) closeHud();
  else openHud();
});

mp.events.add("showcase:uiClose", () => closeHud());

mp.events.add("showcase:hudReady", () => {
  mp.events.callRemote("showcase:requestHudUpdate");
});

mp.events.add("showcase:uiButton", (label) => {
  mp.gui.chat.push(`!{#4ade80}Browser button clicked: ${label}`);
});
