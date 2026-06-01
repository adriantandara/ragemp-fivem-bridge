import { createUnkProxy } from "./_helpers.js";

export class GameReplayNs {
  unk = createUnkProxy();

  ["_0x7E2BD3EF6C205F09"](...args: any[]): any { return Citizen.invokeNative("0x7E2BD3EF6C205F09", ...args); }
  ["_0x5AD3932DAEB1E5D3"](...args: any[]): any { return Citizen.invokeNative("0x5AD3932DAEB1E5D3", ...args); }
  ["_0xE058175F8EAFE79A"](...args: any[]): any { return Citizen.invokeNative("0xE058175F8EAFE79A", ...args); }
  activateRockstarEditor(): void { ActivateRockstarEditor(); }
  isInteriorRenderingDisabled(): boolean { return IsInteriorRenderingDisabled(); } // unverified
  resetEditorValues(): void { ResetEditorValues(); } // unverified
  continueTransition(): void { ContinueTransition(); } // unverified
  isEditorAvailable(): boolean { return IsEditorAvailable(); } // unverified
}
