import { createUnkProxy } from "./_helpers.js";

export class GameWaterNs {
  unk = createUnkProxy();

  getWaterHeight(x, y, z) {
    const [, h] = GetWaterHeight(x, y, z);
    return h;
  }
  testProbeAgainstWater(x1, y1, z1, x2, y2, z2) {
    const [hit, coords] = TestProbeAgainstWater(x1, y1, z1, x2, y2, z2);
    if (!hit || !coords) return null;
    return { x: coords[0], y: coords[1], z: coords[2] };
  }
  modifyWater(x, y, z, p3, p4) { ModifyWater(x, y, z, p3 ?? 1.0, p4 ?? 1.0); }
  resetWaterLevel() { ResetDeepOceanScaler(); }
}
