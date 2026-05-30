import { createUnkProxy } from "./_helpers.js";

export class GameAppNs {
  unk = createUnkProxy();

  getAppData(appName) { return GetAppData(appName ?? 0); }
}
