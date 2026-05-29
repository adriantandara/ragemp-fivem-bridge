mp.events.addCommand("heal", (player) => {
  player.health = 100;
  player.outputChatBox("!{#4ade80}Healed to full health.");
});

mp.events.addCommand("armour", (player) => {
  player.armour = 100;
  player.outputChatBox("!{#4ade80}Armour set to 100.");
});

mp.events.addCommand("skin", (player, _full, model) => {
  if (!model) return player.outputChatBox("Usage: /skin <model>  (e.g. /skin a_m_y_skater_01)");
  player.model = mp.joaat(model);
  player.outputChatBox(`Model set to ${model}.`);
});

mp.events.addCommand("weapon", (player, _full, weapon, ammo) => {
  if (!weapon) return player.outputChatBox("Usage: /weapon <name> [ammo]  (e.g. /weapon weapon_pistol 250)");
  player.giveWeapon(mp.joaat(weapon), parseInt(ammo, 10) || 100);
  player.outputChatBox(`Gave ${weapon}.`);
});

mp.events.addCommand("setvar", (player, _full, key, ...rest) => {
  if (!key) return player.outputChatBox("Usage: /setvar <key> <value>");
  player.setVariable(key, rest.join(" "));
  player.outputChatBox(`!{#60a5fa}${key} = ${rest.join(" ")}`);
});

mp.events.addCommand("getvar", (player, _full, key) => {
  if (!key) return player.outputChatBox("Usage: /getvar <key>");
  player.outputChatBox(`${key} = ${player.getVariable(key)}`);
});

mp.events.addCommand("tp", (player, _full, x, y, z) => {
  if (z === undefined) return player.outputChatBox("Usage: /tp <x> <y> <z>");
  player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
  player.outputChatBox("Teleported.");
});

mp.events.addCommand("id", (player) => {
  player.outputChatBox(`!{#60a5fa}serial: ${player.serial || "n/a"}`);
  const ids = player.identifiers;
  for (const type of Object.keys(ids)) player.outputChatBox(`${type}: ${ids[type]}`);
});

mp.events.addCommand("save", (player, _full, ...words) => {
  const note = words.join(" ");
  mp.storage.data[`note:${player.serial}`] = note;
  player.outputChatBox(`!{#4ade80}Saved note to KVP.`);
});

mp.events.addCommand("load", (player) => {
  const note = mp.storage.data[`note:${player.serial}`];
  player.outputChatBox(`Stored note: ${note ?? "(none)"}`);
});
