mp.rpc.setDebugMode(false);

mp.rpc.register("getServerInfo", (args, info) => {
  return {
    players: mp.players.length,
    uptime: Math.floor(process.uptime?.() ?? 0),
    caller: info.player ? info.player.name : "unknown",
  };
});

mp.rpc.register("echo", (args) => {
  return { youSent: args, at: Date.now() };
});

mp.rpc.on("clientPing", (args, info) => {
  console.log(`[rpc] ping from ${info.player ? info.player.name : "?"}:`, args);
});

mp.events.addCommand("rpctime", async (player) => {
  try {
    const data = await mp.rpc.callClient(player, "getClientTime", null, { timeout: 5000 });
    player.outputChatBox(`!{#60a5fa}Client reports game time ${data.hour}:${String(data.minute).padStart(2, "0")}`);
  } catch (e) {
    player.outputChatBox(`!{#f87171}RPC failed: ${e}`);
  }
});

mp.events.addCommand("clientpos", async (player) => {
  try {
    const pos = await mp.rpc.callClient(player, "getClientPos", null, { timeout: 5000 });
    player.outputChatBox(`!{#60a5fa}Client pos: ${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}`);
  } catch (e) {
    player.outputChatBox(`!{#f87171}RPC failed: ${e}`);
  }
});
