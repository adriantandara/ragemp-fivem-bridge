mp.events.add("playerEnterVehicle", (vehicle, seat) => {
  mp.gui.chat.push(`!{#9ca3af}Entered a vehicle (seat ${seat}).`);
});

mp.events.add("playerLeaveVehicle", () => {
  mp.gui.chat.push("!{#9ca3af}Left the vehicle.");
});

mp.keys.bind(0x74, true, () => {
  const veh = mp.players.local.vehicle;
  if (!veh) {
    mp.gui.chat.push("You are not in a vehicle.");
    return;
  }
  mp.gui.chat.push(`In vehicle: id ${veh.id}, model ${veh.model}.`);
});
