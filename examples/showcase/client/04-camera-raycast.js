let demoCam = null;

mp.keys.bind(0x72, true, () => {
  const ped = mp.players.local;
  const pos = ped.position;

  if (demoCam) {
    demoCam.setActive(false);
    demoCam.destroy();
    demoCam = null;
    mp.gui.chat.push("Camera reset to gameplay.");
    return;
  }

  demoCam = mp.cameras.new(
    "default",
    new mp.Vector3(pos.x + 5, pos.y + 5, pos.z + 3),
    new mp.Vector3(0, 0, 0),
    50
  );
  demoCam.pointAtCoord(pos.x, pos.y, pos.z);
  demoCam.setActive(true);
  mp.gui.chat.push("Demo camera active. Press F3 again to reset.");
});

mp.keys.bind(0x76, true, () => {
  const ped = mp.players.local;
  const start = ped.position;
  const rad = (ped.heading * Math.PI) / 180;
  const fx = -Math.sin(rad);
  const fy = Math.cos(rad);
  const end = new mp.Vector3(start.x + fx * 25, start.y + fy * 25, start.z);

  const result = mp.raycasting.testPointToPoint(start, end, 0, -1);
  if (result.hit && result.entity) {
    mp.gui.chat.push(`Raycast hit entity ${result.entity}.`);
  } else if (result.hit) {
    mp.gui.chat.push(`Raycast hit world at ${result.position.x.toFixed(1)}, ${result.position.y.toFixed(1)}.`);
  } else {
    mp.gui.chat.push("Raycast hit nothing within 25m.");
  }
});
