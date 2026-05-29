import { createUnkProxy } from "./_helpers.js";

export class GameReplayNs {
  unk = createUnkProxy();

  activateReplayEditor() { ActivateReplayEditor(); }
  isReplayEditorActive() { return IsReplayEditorActive(); }
}
