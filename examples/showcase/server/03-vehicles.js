function targetVehicle(player) {
  if (player.vehicle) return player.vehicle;
  const last = player._showcaseVeh;
  if (last && mp.vehicles.exists(last.id)) return last;
  return null;
}

mp.events.addCommand("veh", (player, _full, model) => {
  model = model || "adder";

  if (player._showcaseVeh && mp.vehicles.exists(player._showcaseVeh.id)) {
    player._showcaseVeh.destroy();
  }

  const veh = mp.vehicles.new(mp.joaat(model), player.position, {
    heading: player.heading,
    dimension: player.dimension,
    numberPlate: "SHOWCASE",
  });
  player._showcaseVeh = veh;
  player.putIntoVehicle(veh, 0);
  player.outputChatBox(`!{#4ade80}Spawned ${model} and seated you. Try /color and /neon.`);
});

mp.events.addCommand("color", (player, _full, r, g, b) => {
  const veh = targetVehicle(player);
  if (!veh) return player.outputChatBox("!{#f87171}Get in a vehicle or spawn one with /veh first.");
  veh.setColorRGB(parseInt(r) || 255, parseInt(g) || 0, parseInt(b) || 0, 10, 10, 10);
  player.outputChatBox("Primary colour updated (replicated to all streamers).");
});

mp.events.addCommand("neon", (player) => {
  const veh = targetVehicle(player);
  if (!veh) return player.outputChatBox("!{#f87171}Get in a vehicle or spawn one with /veh first.");
  veh.setNeonColor(0, 150, 255);
  veh.neonEnabled = true;
  player.outputChatBox("Neon enabled (replicated to all streamers).");
});

mp.events.addCommand("fix", (player) => {
  const veh = targetVehicle(player);
  if (!veh) return player.outputChatBox("!{#f87171}Get in a vehicle or spawn one with /veh first.");
  veh.repair();
  player.outputChatBox("Vehicle repaired.");
});

mp.events.addCommand("dv", (player) => {
  const veh = targetVehicle(player);
  if (!veh) return player.outputChatBox("No vehicle to delete.");
  veh.destroy();
  if (player._showcaseVeh === veh) player._showcaseVeh = null;
  player.outputChatBox("Vehicle deleted.");
});

mp.events.add("playerEnterVehicle", (player, vehicle, seat) => {
  const label = vehicle ? `vehicle #${vehicle.id}` : "an untracked vehicle";
  player.outputChatBox(`!{#60a5fa}Entered ${label} (seat ${seat}).`);
});
