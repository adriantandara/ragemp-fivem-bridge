// Native fallback smoke test. None of the methods called below are explicitly
// implemented in the bridge — they all go through the runtime native fallback
// (RAGE camelCase -> FiveM PascalCase resolution + return reshaping). Press F6
// in-game to run; results print to chat and the F8 console. If every line shows
// a sensible value (vectors, numbers, booleans, objects) the fallback works.

function fmt(v) {
  if (v === null || v === undefined) return String(v);
  if (typeof v === "object") {
    if ("x" in v && "y" in v && "z" in v) {
      return `Vec3(${(+v.x).toFixed(2)}, ${(+v.y).toFixed(2)}, ${(+v.z).toFixed(2)})`;
    }
    const parts = [];
    for (const k of Object.keys(v)) {
      const inner = v[k];
      parts.push(
        `${k}: ${inner && typeof inner === "object" && "x" in inner ? `Vec3(${(+inner.x).toFixed(1)},${(+inner.y).toFixed(1)},${(+inner.z).toFixed(1)})` : inner}`,
      );
    }
    return `{ ${parts.join(", ")} }`;
  }
  if (typeof v === "number") return Number.isInteger(v) ? String(v) : v.toFixed(3);
  return String(v);
}

function runNativeTests() {
  const p = mp.players.local;
  const pos = p.position;
  const model = p.model;

  const tests = [
    ["players.local.getCoords(true)  [Vec3]", () => p.getCoords(true)],
    ["players.local.getForwardVector() [Vec3]", () => p.getForwardVector()],
    ["players.local.getRotation(2)   [Vec3]", () => p.getRotation(2)],
    ["players.local.getHeading()     [float]", () => p.getHeading()],
    ["players.local.getMaxHealth()   [int]", () => p.getMaxHealth()],
    ["players.local.getSpeed()       [float]", () => p.getSpeed()],
    ["players.local.getModel()       [hash]", () => p.getModel()],
    ["players.local.isInWater()      [bool]", () => p.isInWater()],
    ["players.local.isInAir()        [bool]", () => p.isInAir()],
    ["game.zone.getHashOfMapAreaAtCoords [hash]", () => mp.game.zone.getHashOfMapAreaAtCoords(pos.x, pos.y, pos.z)],
    ["game.gameplay.getModelDimensions [obj]", () => mp.game.gameplay.getModelDimensions(model)],
    ["game.gameplay.getGroundZFor3dCoord [obj]", () => mp.game.gameplay.getGroundZFor3dCoord(pos.x, pos.y, pos.z + 1.0, false)],
    ["game.weapon.getWeaponClipSize  [int]", () => mp.game.weapon.getWeaponClipSize(mp.game.joaat("weapon_pistol"))],
    ["game.entity.getEntitySpeedVector [Vec3]", () => mp.game.entity.getEntitySpeedVector(p.ped, true)],
    ["cameras.gameplay.getDirection()  [Vec3]", () => mp.cameras.gameplay.getDirection()],
    ["cameras.gameplay.getCoord()      [Vec3]", () => mp.cameras.gameplay.getCoord()],
  ];

  mp.gui.chat.push("!{#4ade80}=== Native fallback test (F6) ===");
  let ok = 0;
  for (const [label, fn] of tests) {
    try {
      const r = fn();
      mp.gui.chat.push(`!{#60a5fa}${label} !{#ffffff}= ${fmt(r)}`);
      console.log("[native-test]", label, "=", fmt(r));
      ok++;
    } catch (e) {
      mp.gui.chat.push(`!{#ef4444}${label} ERROR: ${e}`);
      console.log("[native-test] ERROR", label, String(e));
    }
  }
  mp.gui.chat.push(`!{#4ade80}=== ${ok}/${tests.length} native calls returned a value ===`);
}

mp.keys.bind(0x75, true, runNativeTests);

mp.keys.bind(0x51, true, () => {
  mp.gui.cursor.visible = !mp.gui.cursor.visible;
  mp.gui.chat.push(`!{#a78bfa}[cursor] Q toggled -> visible = ${mp.gui.cursor.visible}`);
});

mp.events.add("playerReady", () => {
  mp.gui.chat.push("!{#fbbf24}[native-test] F6 = native smoke test, Q = toggle cursor.");
  mp.blips.new(40, new mp.Vector3(-280.0, -955.0, 31.0), {
    name: "client",
    color: 3,
    shortRange: false,
  });
});
