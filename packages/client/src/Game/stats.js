import { createUnkProxy } from "./_helpers.js";

export class GameStatsNs {
  unk = createUnkProxy();

  statSetInt(statName, value, save) { StatSetInt(statName, value, save ?? true); }
  statSetFloat(statName, value, save) { StatSetFloat(statName, value, save ?? true); }
  statSetBool(statName, value, save) { StatSetBool(statName, value, save ?? true); }
  statSetString(statName, value, save) { StatSetString(statName, value, save ?? true); }
  statGetInt(statName) {
    const [, out] = StatGetInt(statName, 0);
    return out;
  }
  statGetFloat(statName) {
    const [, out] = StatGetFloat(statName, 0);
    return out;
  }
  statGetBool(statName) {
    const [, out] = StatGetBool(statName, false);
    return out;
  }
  statGetString(statName) {
    return StatGetString(statName, -1);
  }
}
