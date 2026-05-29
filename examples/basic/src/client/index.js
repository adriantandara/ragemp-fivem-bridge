


mp.events.add("playerReady", () => {
  mp.gui.chat.push("Bridge ready. Welcome!");
});

mp.events.add("render", () => {
  
});


mp.keys.bind(0x71, true, () => {
  mp.gui.cursor.visible = !mp.gui.cursor.visible;
});
