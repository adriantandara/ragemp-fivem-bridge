


mp.events.add("playerJoin", (player) => {
  console.log(`[server] ${player.name} joined (id=${player.id})`);
  player.outputChatBox(`Welcome ${player.name}!`);
});

mp.events.addCommand("pos", (player) => {
  const p = player.position;
  player.outputChatBox(`Your position: ${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}`);
});

mp.events.addCommand("veh", (player, _fullText, model) => {
  if (!model) {
    player.outputChatBox("Usage: /veh <model>");
    return;
  }
  const veh = mp.vehicles.new(model, player.position, { dimension: player.dimension });
  player.putIntoVehicle(veh, -1);
});
