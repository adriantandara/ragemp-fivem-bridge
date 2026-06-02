const openHuds = new Set();

function pushHud(player) {
  player.call("showcase:hudUpdate", [{
    players: mp.players.length,
    time: `${mp.world.time.hour}:${String(mp.world.time.minute).padStart(2, "0")}`,
  }]);
}

mp.events.addCommand("ui", (player) => {
  player.call("showcase:toggleUI");
  player.outputChatBox("!{#4ade80}Toggled the demo HUD. It shows server pushes.");
});

mp.events.addCommand("testbrowser", (player) => {
  player.call("showcase:openCrossResource", "@ragemp/ui/index.html");
  player.outputChatBox("!{#60a5fa}Opening @ragemp/ui/index.html via cross-resource browser.");
});

mp.events.addCommand("closebrowser", (player) => {
  player.call("showcase:closeCrossResource");
  player.outputChatBox("!{#f87171}Cross-resource browser closed.");
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
