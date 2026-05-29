mp.Player.prototype.greet = function greet() {
  this.outputChatBox(
    `!{#a78bfa}Hello ${this.name}, this method came from mp.Player.prototype!`,
  );
};

Object.defineProperty(mp.Player.prototype, "summary", {
  get() {
    const p = this.position;
    return `${this.name} | hp ${this.health} | (${p.x.toFixed(0)}, ${p.y.toFixed(0)}, ${p.z.toFixed(0)})`;
  },
  configurable: true,
});

mp.Vehicle.prototype.fullTune = function fullTune() {
  for (let modType = 0; modType <= 16; modType++) this.setMod(modType, 0);
  this.setColorRGB(20, 20, 20, 200, 200, 200);
};

mp.events.addCommand("greet", (player) => {
  player.greet();
  player.outputChatBox(player.summary);
});

mp.events.addCommand("tune", (player) => {
  if (!player.vehicle)
    return player.outputChatBox("Get into a vehicle first (/veh).");
  player.vehicle.fullTune();
  player.outputChatBox(
    "!{#a78bfa}vehicle.fullTune() applied (method added via prototype).",
  );
});
