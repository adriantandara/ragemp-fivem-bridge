mp.keys.bind(0x71, true, () => {
  mp.gui.cursor.visible = !mp.gui.cursor.visible;
  mp.gui.chat.push(`Cursor ${mp.gui.cursor.visible ? "shown" : "hidden"}.`);
});

mp.keys.bind(0x73, true, () => {
  const p = mp.players.local.position;
  mp.gui.chat.push(`Local pos: ${p.x.toFixed(1)}, ${p.y.toFixed(1)}, ${p.z.toFixed(1)}`);
});
