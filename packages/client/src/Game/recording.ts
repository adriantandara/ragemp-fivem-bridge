import { createUnkProxy } from "./_helpers.js";

export class GameRecordingNs {
  unk = createUnkProxy();


  isRecording(): boolean { return IsReplayRecording(); }
  is(): boolean { return IsReplayRecording(); }
  start(mode: number): void { StartReplayRecording(mode); }
  stopAndSaveClip(): void { StopReplayRecording(); }
  stopAndDiscardClip(): void { CancelReplayRecording(); }
  saveClip(): boolean { return SaveReplayRecording(); }
  stopThisFrame(): void { ReplayPreventRecordingThisFrame(); }
  disableRockstarEditorCameraChanges(): void { ReplayDisableCameraMovementThisFrame(); }

  ["_0x48621C9FCA3EBD28"](...args: any[]): any { return Citizen.invokeNative("0x48621C9FCA3EBD28", ...args); }
  ["_0x81CBAE94390F9F89"](...args: any[]): any { return Citizen.invokeNative("0x81CBAE94390F9F89", ...args); }
  ["_0x13B350B8AD0EEE10"](...args: any[]): any { return Citizen.invokeNative("0x13B350B8AD0EEE10", ...args); }
  ["_0x293220DA1B46CEBC"](...args: any[]): any { return Citizen.invokeNative("0x293220DA1B46CEBC", ...args); }
  ["_0x208784099002BC30"](...args: any[]): any { return Citizen.invokeNative("0x208784099002BC30", ...args); }
  ["_0xF854439EFBB3B583"](...args: any[]): any { return Citizen.invokeNative("0xF854439EFBB3B583", ...args); }
  ["_0x66972397E0757E7A"](...args: any[]): any { return Citizen.invokeNative("0x66972397E0757E7A", ...args); }
  ["_0xDF4B952F7D381B95"](...args: any[]): any { return Citizen.invokeNative("0xDF4B952F7D381B95", ...args); }
  ["_0x4282E08174868BE3"](...args: any[]): any { return Citizen.invokeNative("0x4282E08174868BE3", ...args); }
  ["_0x33D47E85B476ABCD"](...args: any[]): any { return Citizen.invokeNative("0x33D47E85B476ABCD", ...args); }
}
