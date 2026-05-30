import { createUnkProxy } from "./_helpers.js";

export class GameDlcNs {
  unk = createUnkProxy();

  getDlcPackCount() { return GetDlcPackCount(); }
  getDlcPackInstalledAt(dlcPackIndex) { return GetDlcPackInstalledAt(dlcPackIndex); }
  isPackValid(packNameHash) { return IsPackValid(packNameHash); }
  isPackPresent(packNameHash) { return IsPackPresent(packNameHash); }
}
