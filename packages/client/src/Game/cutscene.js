import { createUnkProxy } from "./_helpers.js";

export class GameCutsceneNs {
  unk = createUnkProxy();

  startCutscene(cutsceneName, flags) { StartCutscene(cutsceneName, flags ?? 0); }
  stopCutscene(bInstantly) { StopCutscene(bInstantly ?? true); }
  isCutsceneActive() { return IsCutsceneActive(); }
  isCutscenePlaying() { return IsCutscenePlaying(); }
  getCutsceneTime() { return GetCutsceneTime(); }
  wasCutsceneSkipped() { return WasCutsceneSkipped(); }
}
