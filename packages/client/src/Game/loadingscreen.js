import { createUnkProxy } from "./_helpers.js";

export class GameLoadingscreenNs {
  unk = createUnkProxy();

  shutdownLoadingScreen() { ShutdownLoadingScreen(); }
  shutdownLoadingScreenNui() { ShutdownLoadingScreenNui(); }
  isLoadingScreenActive() { return IsLoadingScreenActive(); }
}
