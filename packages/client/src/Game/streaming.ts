import { createUnkProxy, _pollUntilLoaded } from "./_helpers.js";

export class GameStreamingNs {
  unk = createUnkProxy();

  requestModel(model: number): void { RequestModel(model); }
  hasModelLoaded(model: number): boolean { return HasModelLoaded(model); }
  setModelAsNoLongerNeeded(model: number): void { SetModelAsNoLongerNeeded(model); }
  isModelValid(model: number): boolean { return IsModelValid(model); }
  isModelAPed(model: number): boolean { return IsModelAPed(model); }
  isModelAVehicle(model: number): boolean { return IsModelAVehicle(model); }
  isModelInCdimage(model: number): boolean { return IsModelInCdimage(model); }

  requestAnimDict(animDict: string): void { RequestAnimDict(animDict); }
  hasAnimDictLoaded(animDict: string): boolean { return HasAnimDictLoaded(animDict); }
  removeAnimDict(animDict: string): void { RemoveAnimDict(animDict); }
  requestAnimSet(animSet: string): void { RequestAnimSet(animSet); }
  hasAnimSetLoaded(animSet: string): boolean { return HasAnimSetLoaded(animSet); }
  removeAnimSet(animSet: string): void { RemoveAnimSet(animSet); }
  requestClipSet(clipSet: string): void { RequestClipSet(clipSet); }
  hasClipSetLoaded(clipSet: string): boolean { return HasClipSetLoaded(clipSet); }
  removeClipSet(clipSet: string): void { RemoveClipSet(clipSet); }

  requestPtfxAsset(ptfxAsset: string): void { RequestParticleFxAsset(ptfxAsset); }
  hasPtfxAssetLoaded(ptfxAsset: string): boolean { return HasParticleFxAssetLoaded(ptfxAsset); }
  removePtfxAsset(ptfxAsset: string): void { RemoveParticleFxAsset(ptfxAsset); }
  requestNamedPtfxAsset(fxName: string): void { RequestNamedPtfxAsset(fxName); }
  hasNamedPtfxAssetLoaded(fxName: string): boolean { return HasNamedPtfxAssetLoaded(fxName); }

  requestCollisionForModel(modelHash: number): void { RequestCollisionForModel(modelHash); }
  hasCollisionForModelLoaded(modelHash: number): boolean { return HasCollisionForModelLoaded(modelHash); }

  requestIpl(iplName: string): void { RequestIpl(iplName); }
  removeIpl(iplName: string): void { RemoveIpl(iplName); }
  isIplActive(iplName: string): boolean { return IsIplActive(iplName); }


  loadScene(x: number, y: number, z: number): void { LoadScene(x, y, z); }
  startPlayerSwitch(from: number, to: number, flags: number, switchType: number): void { StartPlayerSwitch(from, to, flags ?? 0, switchType ?? 0); }
  stopPlayerSwitch(): void { StopPlayerSwitch(); }
  isPlayerSwitchInProgress(): boolean { return IsPlayerSwitchInProgress(); }

  requestModelAsync(model: number, timeout: number = 5000): Promise<boolean> {
    return _pollUntilLoaded(RequestModel, HasModelLoaded, model, timeout);
  }
  requestAnimDictAsync(name: string, timeout: number = 5000): Promise<boolean> {
    return _pollUntilLoaded(RequestAnimDict, HasAnimDictLoaded, name, timeout);
  }
  requestAnimSetAsync(name: string, timeout: number = 5000): Promise<boolean> {
    return _pollUntilLoaded(RequestAnimSet, HasAnimSetLoaded, name, timeout);
  }
  requestClipSetAsync(name: string, timeout: number = 5000): Promise<boolean> {
    return _pollUntilLoaded(RequestClipSet, HasClipSetLoaded, name, timeout);
  }
  requestNamedPtfxAssetAsync(name: string, timeout: number = 5000): Promise<boolean> {
    return _pollUntilLoaded(RequestNamedPtfxAsset, HasNamedPtfxAssetLoaded, name, timeout);
  }
  requestCollisionForModelAsync(modelHash: number, timeout: number = 5000): Promise<boolean> {
    return _pollUntilLoaded(RequestCollisionForModel, HasCollisionForModelLoaded, modelHash, timeout);
  }

  setStreaming(toggle: boolean): void { SetStreaming(toggle); }
  setGamePausesForStreaming(toggle: boolean): void { SetGamePausesForStreaming(toggle); }
  removeNamedPtfxAsset(fxName: string): void { RemoveNamedPtfxAsset(fxName); }
  loadAllObjectsNow(): void { LoadAllObjectsNow(); }
  networkUpdateLoadScene(): boolean { return NetworkUpdateLoadScene(); }
  isNetworkLoadingScene(): boolean { return IsNetworkLoadingScene(); }
  setInteriorActive(interiorID: number, toggle: boolean): void { SetInteriorActive(interiorID, toggle); }
  requestMenuPedModel(model: number): void { RequestMenuPedModel(model); }
  requestModelsInRoom(interior: number, roomName: string): void { RequestModelsInRoom(interior, roomName); }
  requestCollisionAtCoord(x: number, y: number, z: number): void { RequestCollisionAtCoord(x, y, z); }
  requestAdditionalCollisionAtCoord(x: number, y: number, z: number): void { RequestAdditionalCollisionAtCoord(x, y, z); }
  doesAnimDictExist(animDict: string): boolean { return DoesAnimDictExist(animDict); }
  setReducePedModelBudget(toggle: boolean): void { SetReducePedModelBudget(toggle); }
  setReduceVehicleModelBudget(toggle: boolean): void { SetReduceVehicleModelBudget(toggle); }
  setDitchPoliceModels(toggle: boolean): void { SetDitchPoliceModels(toggle); }
  setVehiclePopulationBudget(p0: number): void { SetVehiclePopulationBudget(p0); }
  setPedPopulationBudget(p0: number): void { SetPedPopulationBudget(p0); }
  clearFocus(): void { ClearFocus(); }
  setFocusPosAndVel(x: number, y: number, z: number, offsetX: number, offsetY: number, offsetZ: number): void { SetFocusPosAndVel(x, y, z, offsetX, offsetY, offsetZ); }
  setFocusEntity(entity: number): void { SetFocusEntity(entity); }
  isEntityFocus(entity: number): boolean { return IsEntityFocus(entity); }
  setMapdatacullboxEnabled(name: string, toggle: boolean): void { SetMapdatacullboxEnabled(name, toggle); }
  newLoadSceneStartSphere(x: number, y: number, z: number, radius: number, p4: number): boolean { return NewLoadSceneStartSphere(x, y, z, radius, p4); }
  newLoadSceneStop(): void { NewLoadSceneStop(); }
  isNewLoadSceneActive(): boolean { return IsNewLoadSceneActive(); }
  isNewLoadSceneLoaded(): boolean { return IsNewLoadSceneLoaded(); }
  getPlayerSwitchType(): number { return GetPlayerSwitchType(); }
  getIdealPlayerSwitchType(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number { return GetIdealPlayerSwitchType(x1, y1, z1, x2, y2, z2); }
  getPlayerSwitchState(): number { return GetPlayerSwitchState(); }
  getPlayerShortSwitchState(): number { return GetPlayerShortSwitchState(); }
  getPlayerSwitchJumpCutIndex(): number { return GetPlayerSwitchJumpCutIndex(); }
  setPlayerSwitchEstablishingShot(name: string): void { SetPlayerSwitchEstablishingShot(name); }
  allowPlayerSwitchPan(): void { AllowPlayerSwitchPan(); }
  allowPlayerSwitchOutro(): void { AllowPlayerSwitchOutro(); }
  allowPlayerSwitchAscent(): void { AllowPlayerSwitchAscent(); }
  allowPlayerSwitchDescent(): void { AllowPlayerSwitchDescent(); }
  isSwitchReadyForDescent(): boolean { return IsSwitchReadyForDescent(); }
  enableSwitchPauseBeforeDescent(): void { EnableSwitchPauseBeforeDescent(); }
  disableSwitchOutroFx(): void { DisableSwitchOutroFx(); }
  getPlayerSwitchInterpOutDuration(): number { return GetPlayerSwitchInterpOutDuration(); }
  isSwitchSkippingDescent(): boolean { return IsSwitchSkippingDescent(); }
  getLodscale(): number { return GetLodscale(); }
  overrideLodscaleThisFrame(scaling: number): void { OverrideLodscaleThisFrame(scaling); }
  prefetchSrl(srl: string): void { PrefetchSrl(srl); }
  isSrlLoaded(): boolean { return IsSrlLoaded(); }
  beginSrl(): void { BeginSrl(); }
  endSrl(): void { EndSrl(); }
  setSrlTime(p0: number): void { SetSrlTime(p0); }
  setHdArea(x: number, y: number, z: number, radius: number): void { SetHdArea(x, y, z, radius); }
  clearHdArea(): void { ClearHdArea(); }
  initCreatorBudget(): void { InitCreatorBudget(); }
  shutdownCreatorBudget(): void { ShutdownCreatorBudget(); }
  addModelToCreatorBudget(modelHash: number): boolean { return AddModelToCreatorBudget(modelHash); }
  removeModelFromCreatorBudget(modelHash: number): void { RemoveModelFromCreatorBudget(modelHash); }
  streamvolCreateSphere(x: number, y: number, z: number, rad: number, p4: number, p5: number): number { return StreamvolCreateSphere(x, y, z, rad, p4, p5); }
  streamvolCreateFrustum(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number): number { return StreamvolCreateFrustum(p0, p1, p2, p3, p4, p5, p6, p7, p8); }
  streamvolCreateLine(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, flag: number): void { StreamvolCreateLine(x1, y1, z1, x2, y2, z2, flag); }
  streamvolDelete(handle: number): void { StreamvolDelete(handle); }
  streamvolHasLoaded(handle: number): boolean { return StreamvolHasLoaded(handle); }
  streamvolIsValid(handle: number): boolean { return StreamvolIsValid(handle); }
  isStreamvolActive(): boolean { return IsStreamvolActive(); }
  getPlayerSwitchInterpOutCurrentTime(): number { return GetPlayerSwitchInterpOutCurrentTime(); }
  setRenderHdOnly(enable: boolean): void { SetRenderHdOnly(enable); }

  requestModel2(model: number): void { RequestModel(model); }
  setFocusArea(x: number, y: number, z: number, offsetX: number, offsetY: number, offsetZ: number): void { SetFocusArea(x, y, z, offsetX ?? 0, offsetY ?? 0, offsetZ ?? 0); } // unverified
  setUnkCameraSettings(x: number, y: number, z: number, rad: number, p4: number, p5: number): number { return SetUnkCameraSettings(x, y, z, rad, p4, p5); } // unverified
  newLoadSceneStartSafe(x: number, y: number, z: number, radius: number, p4: number): boolean { return NewLoadSceneStartSphere(x, y, z, radius, p4); }
  setPlayerSwitchLocation(cameraCoordX: number, cameraCoordY: number, cameraCoordZ: number, camRotationX: number, camRotationY: number, camRotationZ: number, camFov: number, camFarClip: number, rotationOrder: number): void { SetPlayerSwitchLocation(cameraCoordX, cameraCoordY, cameraCoordZ, camRotationX, camRotationY, camRotationZ, camFov, camFarClip, rotationOrder); } // unverified
  forceStreamingUpdate(): void { ForceStreamingUpdate(); } // unverified
  set(toggle: boolean): void { SetStreaming(toggle); }
  loadGlobalWaterType(waterType: number): void { LoadGlobalWaterType(waterType); } // unverified
  getGlobalWaterType(): number { return GetGlobalWaterType(); } // unverified
  setGamePausesFor(toggle: boolean): void { SetGamePausesForStreaming(toggle); }
  getNumberOfRequests(): number { return GetNumberOfStreamingRequests(); }
  formatFocusHeading(x: number, y: number, z: number, rad: number, p4: number, p5: number): number { return FormatFocusHeading(x, y, z, rad, p4, p5); } // unverified
  newLoadSceneStart(posX: number, posY: number, posZ: number, offsetX: number, offsetY: number, offsetZ: number, radius: number, p7: number): boolean { return NewLoadSceneStart(posX, posY, posZ, offsetX, offsetY, offsetZ, radius, p7); }
  setPlayerSwitchOutro(cameraCoordX: number, cameraCoordY: number, cameraCoordZ: number, camRotationX: number, camRotationY: number, camRotationZ: number, camFov: number, camFarClip: number, rotationOrder: number): void { SetPlayerSwitchOutro(cameraCoordX, cameraCoordY, cameraCoordZ, camRotationX, camRotationY, camRotationZ, camFov, camFarClip, rotationOrder); }
  switchOutPlayer(ped: number, flags: number, switchType: number): void { SwitchOutPlayer(ped, flags, switchType); } // unverified
  switchInPlayer(ped: number): void { SwitchInPlayer(ped); } // unverified
  getUsedCreatorModelMemoryPercentage(): number { return GetUsedCreatorModelMemoryPercentage(); } // unverified
  setIslandHopperEnabled(name: string, toggle: boolean): void { SetIslandHopperEnabled(name, toggle); } // unverified
  getAllModelHashes(p1: number): number[] { return GetAllModelHashes(p1); } // unverified
  requestRuntimeAssetFromUrl(resourceName: string, url: string): Promise<boolean> { return RequestRuntimeAssetFromUrl(resourceName, url); } // unverified
  releaseRuntimeAsset(resourceName: string | number): void { ReleaseRuntimeAsset(resourceName); } // unverified

  ["_0x0811381EF5062FEC"](...args: any[]): any { return Citizen.invokeNative("0x0811381EF5062FEC", ...args); }
  ["_0x4E52E752C76E7E7A"](...args: any[]): any { return Citizen.invokeNative("0x4E52E752C76E7E7A", ...args); }
  ["_0x1F3F018BC3AFA77C"](...args: any[]): any { return Citizen.invokeNative("0x1F3F018BC3AFA77C", ...args); }
  ["_0x0AD9710CEE2F590F"](...args: any[]): any { return Citizen.invokeNative("0x0AD9710CEE2F590F", ...args); }
  ["_0x1EE7D8DF4425F053"](...args: any[]): any { return Citizen.invokeNative("0x1EE7D8DF4425F053", ...args); }
  ["_0x7D41E9D2D17C5B2D"](...args: any[]): any { return Citizen.invokeNative("0x7D41E9D2D17C5B2D", ...args); }
  ["_0x07C313F94746702C"](...args: any[]): any { return Citizen.invokeNative("0x07C313F94746702C", ...args); }
  ["_0xBC9823AB80A3DCAC"](...args: any[]): any { return Citizen.invokeNative("0xBC9823AB80A3DCAC", ...args); }
  ["_0x71E7B2E657449AAD"](...args: any[]): any { return Citizen.invokeNative("0x71E7B2E657449AAD", ...args); }
  ["_0x5F2013F8BC24EE69"](...args: any[]): any { return Citizen.invokeNative("0x5F2013F8BC24EE69", ...args); }
  ["_0x933BBEEB8C61B5F4"](...args: any[]): any { return Citizen.invokeNative("0x933BBEEB8C61B5F4", ...args); }
  ["_0x5B48A06DD0E792A5"](...args: any[]): any { return Citizen.invokeNative("0x5B48A06DD0E792A5", ...args); }
  ["_0x1E9057A74FD73E23"](...args: any[]): any { return Citizen.invokeNative("0x1E9057A74FD73E23", ...args); }
  ["_0xBED8CA5FF5E04113"](...args: any[]): any { return Citizen.invokeNative("0xBED8CA5FF5E04113", ...args); }
  ["_0x472397322E92A856"](...args: any[]): any { return Citizen.invokeNative("0x472397322E92A856", ...args); }
  ["_0x40AEFD1A244741F2"](...args: any[]): any { return Citizen.invokeNative("0x40AEFD1A244741F2", ...args); }
  ["_0x03F1A106BDA7DD3E"](...args: any[]): any { return Citizen.invokeNative("0x03F1A106BDA7DD3E", ...args); }
  ["_0x95A7DABDDBB78AE7"](...args: any[]): any { return Citizen.invokeNative("0x95A7DABDDBB78AE7", ...args); }
  ["_0x63EB2B972A218CAC"](...args: any[]): any { return Citizen.invokeNative("0x63EB2B972A218CAC", ...args); }
  ["_0xFB199266061F820A"](...args: any[]): any { return Citizen.invokeNative("0xFB199266061F820A", ...args); }
  ["_0xF4A0DADB70F57FA6"](...args: any[]): any { return Citizen.invokeNative("0xF4A0DADB70F57FA6", ...args); }
  ["_0x5068F488DDB54DD8"](...args: any[]): any { return Citizen.invokeNative("0x5068F488DDB54DD8", ...args); }
  ["_0xEF39EE20C537E98C"](...args: any[]): any { return Citizen.invokeNative("0xEF39EE20C537E98C", ...args); }
  ["_0xBEB2D9A1D9A8F55A"](...args: any[]): any { return Citizen.invokeNative("0xBEB2D9A1D9A8F55A", ...args); }
  ["_0x20C6C7E4EB082A7F"](...args: any[]): any { return Citizen.invokeNative("0x20C6C7E4EB082A7F", ...args); }
  ["_0xF8155A7F03DDFC8E"](...args: any[]): any { return Citizen.invokeNative("0xF8155A7F03DDFC8E", ...args); }
}
