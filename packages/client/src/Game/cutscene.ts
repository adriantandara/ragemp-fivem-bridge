import { createUnkProxy } from "./_helpers.js";

export class GameCutsceneNs {
  unk = createUnkProxy();

  startCutscene(flags: number): void { StartCutscene(flags); }
  stopCutscene(bInstantly: boolean): void { StopCutscene(bInstantly ?? true); }

  requestCutscene(cutsceneName: string, flags: number): void { RequestCutscene(cutsceneName, flags); }
  hasThisCutsceneLoaded(cutsceneName: string): boolean { return HasThisCutsceneLoaded(cutsceneName); }
  startCutsceneAtCoords(x: number, y: number, z: number, flags: number): void { StartCutsceneAtCoords(x, y, z, flags); }
  setCutsceneOrigin(x: number, y: number, z: number, p3: number, p4: number): void { SetCutsceneOrigin(x, y, z, p3, p4); }
  getEntityIndexOfCutsceneEntity(cutsceneEntName: string, modelHash: number): number { return GetEntityIndexOfCutsceneEntity(cutsceneEntName, modelHash); }
  registerEntityForCutscene(cutscenePed: number, cutsceneEntName: string, p2: number, modelHash: number, p4: number): void { RegisterEntityForCutscene(cutscenePed, cutsceneEntName, p2, modelHash, p4); }
  setCutsceneTriggerArea(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number): void { SetCutsceneTriggerArea(p0, p1, p2, p3, p4, p5); }
  setCutsceneFadeValues(p0: boolean, p1: boolean, p2: boolean, p3: boolean): void { SetCutsceneFadeValues(p0, p1, p2, p3); }
  setCutscenePedComponentVariation(cutsceneEntName: string, p1: number, p2: number, p3: number, modelHash: number): void { SetCutscenePedComponentVariation(cutsceneEntName, p1, p2, p3, modelHash); }
  doesCutsceneEntityExist(cutsceneEntName: string, modelHash: number): boolean { return DoesCutsceneEntityExist(cutsceneEntName, modelHash); }
  setCutscenePedPropVariation(cutsceneEntName: string, p1: number, p2: number, p3: number, modelHash: number): void { SetCutscenePedPropVariation(cutsceneEntName, p1, p2, p3, modelHash); }
  request(cutsceneName: string, flags: number): void { RequestCutscene(cutsceneName, flags); }
  requestWithPlaybackList(cutsceneName: string, playbackFlags: number, flags: number): void { RequestCutsceneWithPlaybackList(cutsceneName, playbackFlags, flags); }
  remove(): void { RemoveCutscene(); }
  hasLoaded(): boolean { return HasCutsceneLoaded(); }
  isPlaybackFlagSet(flag: number): boolean { return IsCutscenePlaybackFlagSet(flag); }
  setEntityStreamingFlags(cutsceneEntName: string, p1: number, p2: number): void { SetCutsceneEntityStreamingFlags(cutsceneEntName, p1, p2); }
  requestCutFile(cutsceneName: string): void { RequestCutFile(cutsceneName); }
  hasCutFileLoaded(cutsceneName: string): boolean { return HasCutFileLoaded(cutsceneName); }
  removeCutFile(cutsceneName: string): void { RemoveCutFile(cutsceneName); }
  start(flags: number): void { StartCutscene(flags); }
  startAtCoords(x: number, y: number, z: number, flags: number): void { StartCutsceneAtCoords(x, y, z, flags); }
  stop(p0: boolean): void { StopCutscene(p0); }
  stopImmediately(): void { StopCutsceneImmediately(); }
  setOrigin(x: number, y: number, z: number, p3: number, p4: number): void { SetCutsceneOrigin(x, y, z, p3, p4); }
  getTime(): number { return GetCutsceneTime(); }
  getTotalDuration(): number { return GetCutsceneTotalDuration(); }
  wasSkipped(): boolean { return WasCutsceneSkipped(); }
  hasFinished(): boolean { return HasCutsceneFinished(); }
  isActive(): boolean { return IsCutsceneActive(); }
  isPlaying(): boolean { return IsCutscenePlaying(); }
  getSectionPlaying(): number { return GetCutsceneSectionPlaying(); }
  registerEntityFor(cutscenePed: number, cutsceneEntName: string, p2: number, modelHash: number, p4: number): void { RegisterEntityForCutscene(cutscenePed, cutsceneEntName, p2, modelHash, p4); }
  getEntityIndexOfRegisteredEntity(cutsceneEntName: string, modelHash: number): number { return GetEntityIndexOfRegisteredEntity(cutsceneEntName, modelHash); }
  setTriggerArea(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number): void { SetCutsceneTriggerArea(p0, p1, p2, p3, p4, p5); }
  canSetEnterStateForRegisteredEntity(cutsceneEntName: string, modelHash: number): boolean { return CanSetEnterStateForRegisteredEntity(cutsceneEntName, modelHash); }
  canSetExitStateForRegisteredEntity(cutsceneEntName: string, modelHash: number): boolean { return CanSetExitStateForRegisteredEntity(cutsceneEntName, modelHash); }
  canSetExitStateForCamera(p0: boolean): boolean { return CanSetExitStateForCamera(p0); }
  setFadeValues(p0: boolean, p1: boolean, p2: boolean, p3: boolean): void { SetCutsceneFadeValues(p0, p1, p2, p3); }
  setCanBeSkipped(p0: boolean): void { SetCutsceneCanBeSkipped(p0); }
  setPedComponentVariationFromPed(cutsceneEntName: string, ped: number, modelHash: number): void { SetCutscenePedComponentVariationFromPed(cutsceneEntName, ped, modelHash); }
  setPedPropVariation(cutsceneEntName: string, p1: number, p2: number, p3: number, modelHash: number): void { SetCutscenePedPropVariation(cutsceneEntName, p1, p2, p3, modelHash); }
  hasCutThisFrame(): boolean { return HasCutsceneCutThisFrame(); }

  requestCutscene2(cutsceneName: string, playbackFlags: number, flags: number): void { RequestCutsceneWithPlaybackList(cutsceneName, playbackFlags, flags); }
  hasThisLoaded(cutsceneName: string): boolean { return HasThisCutsceneLoaded(cutsceneName); }
  canRequestAssetsForEntity(): boolean { return CanRequestAssetsForCutsceneEntity(); }
  getCutFileNumSections(cutsceneName: string): number { return GetCutFileNumSections(cutsceneName); } // unverified
  getEntityIndexOfEntity(cutsceneEntName: string, modelHash: number): number { return GetEntityIndexOfCutsceneEntity(cutsceneEntName, modelHash); }
  registerSynchronisedScriptSpeech(): void { RegisterSynchronisedScriptSpeech(); } // unverified
  setPedComponentVariation(cutsceneEntName: string, p1: number, p2: number, p3: number, modelHash: number): void { SetCutscenePedComponentVariation(cutsceneEntName, p1, p2, p3, modelHash); }
  doesEntityExist(cutsceneEntName: string, modelHash: number): boolean { return DoesCutsceneEntityExist(cutsceneEntName, modelHash); }

  async requestCutsceneAsync(name: string, flags: number, timeout: number = 5000): Promise<boolean> {
    RequestCutscene(name, flags);
    const start = GetGameTimer();
    while (!HasCutsceneLoaded()) {
      if (GetGameTimer() - start > timeout) return false;
      await new Promise<void>((r) => setTimeout(() => r(), 0));
    }
    return true;
  }
  async requestCutFileAsync(name: string, timeout: number = 5000): Promise<boolean> {
    RequestCutFile(name);
    const start = GetGameTimer();
    while (!HasCutFileLoaded(name)) {
      if (GetGameTimer() - start > timeout) return false;
      await new Promise<void>((r) => setTimeout(() => r(), 0));
    }
    return true;
  }

  ["_0x8D9DF6ECA8768583"](...args: any[]): any { return Citizen.invokeNative("0x8D9DF6ECA8768583", ...args); }
  ["_0x011883F41211432A"](...args: any[]): any { return Citizen.invokeNative("0x011883F41211432A", ...args); }
  ["_0x971D7B15BCDBEF99"](...args: any[]): any { return Citizen.invokeNative("0x971D7B15BCDBEF99", ...args); }
  ["_0x583DF8E3D4AFBD98"](...args: any[]): any { return Citizen.invokeNative("0x583DF8E3D4AFBD98", ...args); }
  ["_0x4CEBC1ED31E8925E"](...args: any[]): any { return Citizen.invokeNative("0x4CEBC1ED31E8925E", ...args); }
  ["_0x4FCD976DA686580C"](...args: any[]): any { return Citizen.invokeNative("0x4FCD976DA686580C", ...args); }
  ["_0x7F96F23FA9B73327"](...args: any[]): any { return Citizen.invokeNative("0x7F96F23FA9B73327", ...args); }
  ["_0xC61B86C9F61EB404"](...args: any[]): any { return Citizen.invokeNative("0xC61B86C9F61EB404", ...args); }
  ["_0x20746F7B1032A3C7"](...args: any[]): any { return Citizen.invokeNative("0x20746F7B1032A3C7", ...args); }
  ["_0x06EE9048FD080382"](...args: any[]): any { return Citizen.invokeNative("0x06EE9048FD080382", ...args); }
  ["_0xA0FE76168A189DDB"](...args: any[]): any { return Citizen.invokeNative("0xA0FE76168A189DDB", ...args); }
  ["_0x2F137B508DE238F2"](...args: any[]): any { return Citizen.invokeNative("0x2F137B508DE238F2", ...args); }
  ["_0xE36A98D8AB3D3C66"](...args: any[]): any { return Citizen.invokeNative("0xE36A98D8AB3D3C66", ...args); }
  ["_0x5EDEF0CF8C1DAB3C"](...args: any[]): any { return Citizen.invokeNative("0x5EDEF0CF8C1DAB3C", ...args); }
}
