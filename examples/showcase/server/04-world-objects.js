mp.events.addCommand("time", (player, _full, hour, minute) => {
  mp.world.time.set(parseInt(hour) || 12, parseInt(minute) || 0);
  player.outputChatBox(`Time set to ${mp.world.time.hour}:${String(mp.world.time.minute).padStart(2, "0")}.`);
});

mp.events.addCommand("weather", (player, _full, weather) => {
  mp.world.weather = (weather || "CLEAR").toUpperCase();
  player.outputChatBox(`Weather set to ${mp.world.weather}.`);
});

mp.events.addCommand("obj", (player, _full, model) => {
  model = model || "prop_barrel_02a";
  const pos = player.position;
  mp.objects.new(mp.joaat(model), new mp.Vector3(pos.x + 2, pos.y, pos.z - 1), {
    rotation: new mp.Vector3(0, 0, player.heading),
    dimension: player.dimension,
  });
  player.outputChatBox(`Spawned object ${model} next to you.`);
});

const POI = new mp.Vector3(-425.5, 1123.5, 325.8);

mp.blips.new(1, POI, { name: "Showcase POI", color: 5, shortRange: true });

mp.blips.new(40, new mp.Vector3(-265.0, -955.0, 31.0), { name: "server", color: 1, shortRange: false });
mp.markers.new(1, new mp.Vector3(POI.x, POI.y, POI.z - 1), 1.5, {
  color: [0, 150, 255, 150],
  dimension: 0,
});
mp.checkpoints.new(1, POI, new mp.Vector3(POI.x, POI.y, POI.z), 3, {
  color: [0, 150, 255, 150],
});
mp.labels.new("~b~Showcase POI~w~\nWalk in to trigger a colshape", new mp.Vector3(POI.x, POI.y, POI.z + 1), {
  los: false,
  drawDistance: 30,
});

const poiShape = mp.colshapes.newSphere(POI, 5);

mp.events.add("playerEnterColshape", (player, shape) => {
  if (shape === poiShape) player.outputChatBox("!{#60a5fa}You entered the showcase colshape.");
});

mp.events.add("playerExitColshape", (player, shape) => {
  if (shape === poiShape) player.outputChatBox("!{#9ca3af}You left the showcase colshape.");
});

mp.events.add("playerEnterCheckpoint", (player, checkpoint) => {
  player.outputChatBox("!{#facc15}Checkpoint reached!");
});
