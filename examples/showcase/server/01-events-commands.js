mp.events.add("playerJoin", (player) => {
  console.log(`[showcase] ${player.name} joined (id=${player.id})`);
  player.outputChatBox(`!{#4ade80}Welcome, ${player.name}! Type /help for the demo commands.`);
  mp.players.forEach((p) => p.outputChatBox(`!{#9ca3af}${player.name} connected.`));
});

mp.events.add("playerQuit", (player, exitType, reason) => {
  console.log(`[showcase] ${player.name} left (${exitType}: ${reason})`);
});

mp.events.add("playerReady", (player) => {
  console.log(`[showcase] ${player.name} is fully ready (client packages loaded)`);
});

mp.events.add("playerChat", (player, message) => {
  console.log(`[chat] ${player.name}: ${message}`);
});

mp.events.addCommand("help", (player) => {
  player.outputChatBox("!{#60a5fa}Showcase commands:");
  player.outputChatBox("/pos /heal /armour /setvar /getvar /id /save /load");
  player.outputChatBox("/veh /color /neon /fix /dv");
  player.outputChatBox("/time /weather /obj /tp");
  player.outputChatBox("/rpctime /clientpos /greet /tune /ui");
});

mp.events.addCommand("pos", (player) => {
  const p = player.position;
  player.outputChatBox(`Position: ${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}`);
});
