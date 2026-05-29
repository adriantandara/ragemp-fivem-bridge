mp.rpc.register("getClientTime", () => {
  return { hour: GetClockHours(), minute: GetClockMinutes() };
});

mp.rpc.register("getClientPos", () => {
  const p = mp.players.local.position;
  return { x: p.x, y: p.y, z: p.z };
});

mp.keys.bind(0x77, true, async () => {
  try {
    const info = await mp.rpc.callServer("getServerInfo", null, { timeout: 5000 });
    mp.gui.chat.push(`!{#60a5fa}Server: ${info.players} players, uptime ${info.uptime}s (you: ${info.caller})`);
  } catch (e) {
    mp.gui.chat.push(`!{#f87171}callServer failed: ${e}`);
  }

  mp.rpc.triggerServer("clientPing", { at: Date.now() });
});
