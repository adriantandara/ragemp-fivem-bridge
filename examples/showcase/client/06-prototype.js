mp.Player.prototype.flashMessage = function flashMessage(text) {

  mp.gui.chat.push(`!{#a78bfa}[${this.name ?? "you"}] ${text}`);
};

Object.defineProperty(mp.Player.prototype, "isDriving", {
  get() {
    return !!this.vehicle;
  },
  configurable: true,
});

mp.keys.bind(0x78, true, () => {
  mp.players.local.flashMessage(
    mp.players.local.isDriving ? "Currently driving." : "On foot."
  );
});
