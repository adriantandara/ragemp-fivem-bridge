const openHuds = new Set();

function pushHud(player) {
  mp.rpc.callBrowsers(player, "hud:update", {
    players: mp.players.length,
    time: `${mp.world.time.hour}:${String(mp.world.time.minute).padStart(2, "0")}`,
  }).catch(() => {
    openHuds.delete(player.id);
  });
}

mp.events.addCommand("ui", (player) => {
  player.call("showcase:toggleUI");
  player.outputChatBox("!{#4ade80}Toggled the demo HUD. It shows server pushes.");
});

mp.events.add("showcase:requestHudUpdate", (player) => {
  openHuds.add(player.id);
  pushHud(player);
});

mp.events.add("playerQuit", (player) => openHuds.delete(player.id));

setInterval(() => {
  for (const id of openHuds) {
    const player = mp.players.at(id);
    if (player) pushHud(player);
    else openHuds.delete(id);
  }
}, 1000);
