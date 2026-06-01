import { createUnkProxy, toVec3 } from "./_helpers.js";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class GameVehicleNs {
  unk: any = createUnkProxy();

  create(modelHash: number, x: number, y: number, z: number, heading: number, isNetwork: boolean, bScriptHostVeh: boolean): number {
    return (CreateVehicle as any)(modelHash, x, y, z, heading, isNetwork ?? true, bScriptHostVeh ?? false);
  }
  delete(vehicle: number): void { DeleteVehicle(vehicle); }

  setDoorsLocked(vehicle: number, doorLockStatus: number): void { SetVehicleDoorsLocked(vehicle, doorLockStatus); }
  setDoorOpen(vehicle: number, doorIndex: number, loose: boolean, openInstantly: boolean): void { SetVehicleDoorOpen(vehicle, doorIndex, loose, openInstantly); }
  setDoorShut(vehicle: number, doorIndex: number, closeInstantly: boolean): void { SetVehicleDoorShut(vehicle, doorIndex, closeInstantly); }
  removeWindow(vehicle: number, windowIndex: number): void { RemoveVehicleWindow(vehicle, windowIndex); }
  rollDownWindow(vehicle: number, windowIndex: number): void { RollDownWindow(vehicle, windowIndex); }
  rollUpWindow(vehicle: number, windowIndex: number): void { RollUpWindow(vehicle, windowIndex); }
  smashWindow(vehicle: number, index: number): void { SmashVehicleWindow(vehicle, index); }
  fixWindow(vehicle: number, index: number): void { FixVehicleWindow(vehicle, index); }

  setColours(vehicle: number, colorPrimary: number, colorSecondary: number): void { SetVehicleColours(vehicle, colorPrimary, colorSecondary); }
  getColours(vehicle: number): { primary: number; secondary: number } {
    const [p, s] = GetVehicleColours(vehicle);
    return { primary: p, secondary: s };
  }
  setCustomPrimaryColour(vehicle: number, r: number, g: number, b: number): void { SetVehicleCustomPrimaryColour(vehicle, r, g, b); }
  getCustomPrimaryColour(vehicle: number): { r: number; g: number; b: number } {
    const [r, g, b] = GetVehicleCustomPrimaryColour(vehicle);
    return { r, g, b };
  }
  setCustomSecondaryColour(vehicle: number, r: number, g: number, b: number): void { SetVehicleCustomSecondaryColour(vehicle, r, g, b); }
  getCustomSecondaryColour(vehicle: number): { r: number; g: number; b: number } {
    const [r, g, b] = GetVehicleCustomSecondaryColour(vehicle);
    return { r, g, b };
  }
  setNeonLightsColour(vehicle: number, r: number, g: number, b: number): void { SetVehicleNeonLightsColour(vehicle, r, g, b); }
  getNeonLightsColour(vehicle: number): { r: number; g: number; b: number } {
    const [r, g, b] = GetVehicleNeonLightsColour(vehicle);
    return { r, g, b };
  }
  setExtraColours(vehicle: number, pearlescentColor: number, wheelColor: number): void { SetVehicleExtraColours(vehicle, pearlescentColor, wheelColor); }
  getExtraColours(vehicle: number): { pearlescent: number; wheel: number } {
    const [p, w] = GetVehicleExtraColours(vehicle);
    return { pearlescent: p, wheel: w };
  }
  setTyreSmokeColor(vehicle: number, r: number, g: number, b: number): void { SetVehicleTyreSmokeColor(vehicle, r, g, b); }
  getTyreSmokeColor(vehicle: number): { r: number; g: number; b: number } {
    const [r, g, b] = GetVehicleTyreSmokeColor(vehicle);
    return { r, g, b };
  }
  getColor(vehicle: number): { r: number; g: number; b: number } {
    const [r, g, b] = GetVehicleColor(vehicle);
    return { r, g, b };
  }
  setColourCombination(vehicle: number, colorCombination: number): void { SetVehicleColourCombination(vehicle, colorCombination); }
  getColourCombination(vehicle: number): number { return GetVehicleColourCombination(vehicle); }
  clearCustomPrimaryColour(vehicle: number): void { ClearVehicleCustomPrimaryColour(vehicle); }
  clearCustomSecondaryColour(vehicle: number): void { ClearVehicleCustomSecondaryColour(vehicle); }

  setEngineOn(vehicle: number, value: boolean, instantly: boolean, disableAutoStart: boolean): void {
    SetVehicleEngineOn(vehicle, value, instantly ?? false, disableAutoStart ?? false);
  }
  setEngineHealth(vehicle: number, health: number): void { SetVehicleEngineHealth(vehicle, health); }
  getEngineHealth(vehicle: number): number { return GetVehicleEngineHealth(vehicle); }
  setPlaneEngineHealth(vehicle: number, health: number): void { SetPlaneEngineHealth(vehicle, health); }
  setMaxSpeed(vehicle: number, speed: number): void { SetEntityMaxSpeed(vehicle, speed); }
  modifyTopSpeed(vehicle: number, value: number): void { ModifyVehicleTopSpeed(vehicle, value); }
  setForwardSpeed(vehicle: number, speed: number): void { SetVehicleForwardSpeed(vehicle, speed); }
  getEstimatedMaxSpeed(vehicle: number): number { return GetVehicleEstimatedMaxSpeed(vehicle); }
  getMaxBraking(vehicle: number): number { return GetVehicleMaxBraking(vehicle); }
  getMaxTraction(vehicle: number): number { return GetVehicleMaxTraction(vehicle); }
  getAcceleration(vehicle: number): number { return GetVehicleAcceleration(vehicle); }
  getModelEstimatedMaxSpeed(modelHash: number): number { return GetVehicleModelEstimatedMaxSpeed(modelHash); }
  getModelMaxBraking(modelHash: number): number { return GetVehicleModelMaxBraking(modelHash); }
  getModelMaxBrakingMaxMods(modelHash: number): number { return GetVehicleModelMaxBrakingMaxMods(modelHash); }
  getModelMaxTraction(modelHash: number): number { return GetVehicleModelMaxTraction(modelHash); }
  getModelAcceleration(modelHash: number): number { return GetVehicleModelAcceleration(modelHash); }
  getClassEstimatedMaxSpeed(vehicleClass: number): number { return GetVehicleClassEstimatedMaxSpeed(vehicleClass); }
  getClassMaxTraction(vehicleClass: number): number { return GetVehicleClassMaxTraction(vehicleClass); }
  getClassMaxAgility(vehicleClass: number): number { return GetVehicleClassMaxAgility(vehicleClass); }
  getClassMaxAcceleration(vehicleClass: number): number { return GetVehicleClassMaxAcceleration(vehicleClass); }
  getClassMaxBraking(vehicleClass: number): number { return GetVehicleClassMaxBraking(vehicleClass); }
  getVehicleModelMaxBraking(modelHash: number): number { return GetVehicleModelMaxBraking(modelHash); }
  getVehicleModelMaxTraction(modelHash: number): number { return GetVehicleModelMaxTraction(modelHash); }
  getVehicleModelAcceleration(modelHash: number): number { return GetVehicleModelAcceleration(modelHash); }
  getVehicleClassMaxTraction(vehicleClass: number): number { return GetVehicleClassMaxTraction(vehicleClass); }
  getVehicleClassMaxAgility(vehicleClass: number): number { return GetVehicleClassMaxAgility(vehicleClass); }
  getVehicleClassMaxAcceleration(vehicleClass: number): number { return GetVehicleClassMaxAcceleration(vehicleClass); }
  getVehicleClassMaxBraking(vehicleClass: number): number { return GetVehicleClassMaxBraking(vehicleClass); }

  setFixed(vehicle: number): void { SetVehicleFixed(vehicle); }
  setDeformationFixed(vehicle: number): void { SetVehicleDeformationFixed(vehicle); }
  setDamage(vehicle: number, xOffset: number, yOffset: number, zOffset: number, damage: number, radius: number, focusOnModel: boolean): void {
    SetVehicleDamage(vehicle, xOffset, yOffset, zOffset, damage, radius, focusOnModel ?? true);
  }
  getPetrolTankHealth(vehicle: number): number { return GetVehiclePetrolTankHealth(vehicle); }
  setPetrolTankHealth(vehicle: number, health: number): void { SetVehiclePetrolTankHealth(vehicle, health); }
  getBodyHealth(vehicle: number): number { return GetVehicleBodyHealth(vehicle); }
  setBodyHealth(vehicle: number, value: number): void { SetVehicleBodyHealth(vehicle, value); }
  getDeformationAtPos(vehicle: number, offsetX: number, offsetY: number, offsetZ: number): Vector3 { return toVec3(GetVehicleDeformationAtPos(vehicle, offsetX, offsetY, offsetZ)); }
  copyDamages(sourceVehicle: number, targetVehicle: number): void { CopyVehicleDamages(sourceVehicle, targetVehicle); }
  getDirtLevel(vehicle: number): number { return GetVehicleDirtLevel(vehicle); }
  setDirtLevel(vehicle: number, dirtLevel: number): void { SetVehicleDirtLevel(vehicle, dirtLevel); }

  setLights(vehicle: number, state: number): void { SetEntityLights(vehicle, state as any); }
  setUsePlayerLightSettings(vehicle: number, toggle: boolean): void { SetVehicleUsePlayerLightSettings(vehicle, toggle); }
  setFullbeam(vehicle: number, toggle: boolean): void { SetVehicleFullbeam(vehicle, toggle); }
  setIndicatorLights(vehicle: number, turnSignal: number, toggle: boolean): void { SetVehicleIndicatorLights(vehicle, turnSignal, toggle); }
  setBrakeLights(vehicle: number, toggle: boolean): void { SetVehicleBrakeLights(vehicle, toggle); }
  setInteriorlight(vehicle: number, toggle: boolean): void { SetVehicleInteriorlight(vehicle, toggle); }
  setLightMultiplier(vehicle: number, multiplier: number): void { SetVehicleLightMultiplier(vehicle, multiplier); }
  setSiren(vehicle: number, toggle: boolean): void { SetVehicleSiren(vehicle, toggle); }
  isSirenOn(vehicle: number): boolean { return IsVehicleSirenOn(vehicle); }
  isSirenAudioOn(vehicle: number): boolean { return IsVehicleSirenAudioOn(vehicle); }
  setHasMutedSirens(vehicle: number, toggle: boolean): void { SetVehicleHasMutedSirens(vehicle, toggle); }
  setNeonLightEnabled(vehicle: number, index: number, toggle: boolean): void { SetVehicleNeonLightEnabled(vehicle, index, toggle); }
  isNeonLightEnabled(vehicle: number, index: number): boolean { return IsVehicleNeonLightEnabled(vehicle, index); }
  getLightsState(vehicle: number): { lightsOn: boolean; highbeamsOn: boolean; result: boolean } {
    const [result, lightsOn, highbeamsOn] = GetVehicleLightsState(vehicle);
    return { lightsOn: !!lightsOn, highbeamsOn: !!highbeamsOn, result: !!result };
  }
  setHasUnbreakableLights(vehicle: number, p1: boolean): void { SetVehicleHasUnbreakableLights(vehicle, p1); }
  setTaxiLights(vehicle: number, state: boolean): void { SetTaxiLights(vehicle, state); }
  isTaxiLightOn(vehicle: number): boolean { return IsTaxiLightOn(vehicle); }

  setMod(vehicle: number, modType: number, modIndex: number, customTires: boolean): void { SetVehicleMod(vehicle, modType, modIndex, customTires ?? false); }
  getMod(vehicle: number, modType: number): number { return GetVehicleMod(vehicle, modType); }
  getModVariation(vehicle: number, modType: number): boolean { return GetVehicleModVariation(vehicle, modType); }
  removeMod(vehicle: number, modType: number): void { RemoveVehicleMod(vehicle, modType); }
  preloadMod(vehicle: number, modType: number, modIndex: number): void { PreloadVehicleMod(vehicle, modType, modIndex); }
  hasPreloadModsFinished(vehicle: number): boolean { return HasPreloadModsFinished(vehicle); }
  releasePreloadMods(vehicle: number): void { ReleasePreloadMods(vehicle); }
  getModTextLabel(vehicle: number, modType: number, modValue: number): string { return GetModTextLabel(vehicle, modType, modValue); }
  getModSlotName(vehicle: number, modType: number): string { return GetModSlotName(vehicle, modType); }
  getModModifierValue(vehicle: number, modType: number, modIndex: number): number { return GetVehicleModModifierValue(vehicle, modType, modIndex); }
  getModIdentifierHash(vehicle: number, modType: number, modIndex: number): number { return GetVehicleModIdentifierHash(vehicle, modType, modIndex); }
  haveModsStreamedIn(vehicle: number): boolean { return HaveVehicleModsStreamedIn(vehicle); }
  getNumModKits(vehicle: number): number { return GetNumModKits(vehicle); }
  setModKit(vehicle: number, modKit: number): void { SetVehicleModKit(vehicle, modKit); }
  getModKit(vehicle: number): number { return GetVehicleModKit(vehicle); }
  getModKitType(vehicle: number): number { return GetVehicleModKitType(vehicle); }
  getNumModColors(colorType: number, base: boolean): number { return GetNumModColors(colorType, base); }
  isToggleModOn(vehicle: number, modType: number): boolean { return IsToggleModOn(vehicle, modType); }
  setModColor1(vehicle: number, paintType: number, color: number, pearlescentColor: number): void { SetVehicleModColor_1(vehicle, paintType, color, pearlescentColor); }
  setModColor2(vehicle: number, paintType: number, color: number): void { SetVehicleModColor_2(vehicle, paintType, color); }
  setLivery(vehicle: number, livery: number): void { SetVehicleLivery(vehicle, livery); }
  getLivery(vehicle: number): number { return GetVehicleLivery(vehicle); }
  getLiveryCount(vehicle: number): number { return GetVehicleLiveryCount(vehicle); }
  getLiveryName(vehicle: number, liveryIndex: number): string { return GetLiveryName(vehicle, liveryIndex); }
  toggleMod(vehicle: number, modType: number, toggle: boolean): void { ToggleVehicleMod(vehicle, modType, toggle); }

  setTyreBurst(vehicle: number, index: number, onRim: boolean, p3: number): void { SetVehicleTyreBurst(vehicle, index, onRim ?? false, p3 ?? 1000); }
  setTyreFixed(vehicle: number, tyreIndex: number): void { SetVehicleTyreFixed(vehicle, tyreIndex); }
  isTyreBurst(vehicle: number, wheelID: number, completely: boolean): boolean { return IsVehicleTyreBurst(vehicle, wheelID, completely); }
  setTyresCanBurst(vehicle: number, toggle: boolean): void { SetVehicleTyresCanBurst(vehicle, toggle); }
  getTyresCanBurst(vehicle: number): boolean { return GetVehicleTyresCanBurst(vehicle); }
  setWheelsCanBreak(vehicle: number, enabled: boolean): void { SetVehicleWheelsCanBreak(vehicle, enabled); }
  setWheelsCanBreakOffWhenBlowUp(vehicle: number, toggle: boolean): void { SetVehicleWheelsCanBreakOffWhenBlowUp(vehicle, toggle); }
  setCanDeformWheels(vehicle: number, toggle: boolean): void { SetVehicleCanDeformWheels(vehicle, toggle); }
  resetWheels(vehicle: number, toggle: boolean): void { ResetVehicleWheels(vehicle, toggle); }

  attachToTrailer(vehicle: number, trailer: number, radius: number): void { AttachVehicleToTrailer(vehicle, trailer, radius); }
  detachFromTrailer(vehicle: number): void { DetachVehicleFromTrailer(vehicle); }
  isAttachedToTrailer(vehicle: number): boolean { return IsVehicleAttachedToTrailer(vehicle); }
  getTrailerVehicle(vehicle: number): number {
    const [result, trailer] = GetVehicleTrailerVehicle(vehicle);
    return result ? trailer : 0;
  }
  setTrailerInverseMassScale(vehicle: number, p1: number): void { SetTrailerInverseMassScale(vehicle, p1); }
  setTrailerLegsRaised(vehicle: number): void { SetTrailerLegsRaised(vehicle); }
  setTrailerLegsLowered(trailer: number): void { (SetTrailerLegsLowered as any)(trailer); }
  attachToTowTruck(towTruck: number, vehicle: number, rear: boolean, hookOffsetX: number, hookOffsetY: number, hookOffsetZ: number): void {
    AttachVehicleToTowTruck(towTruck, vehicle, rear, hookOffsetX, hookOffsetY, hookOffsetZ);
  }
  detachFromTowTruck(towTruck: number, vehicle: number): void { DetachVehicleFromTowTruck(towTruck, vehicle); }
  detachFromAnyTowTruck(vehicle: number): boolean { return DetachVehicleFromAnyTowTruck(vehicle); }
  isAttachedToTowTruck(towTruck: number, vehicle: number): boolean { return IsVehicleAttachedToTowTruck(towTruck, vehicle); }
  getEntityAttachedToTowTruck(towTruck: number): number { return GetEntityAttachedToTowTruck(towTruck); }
  setTowTruckArmPosition(vehicle: number, position: number): void { SetVehicleTowTruckArmPosition(vehicle, position); }
  setDisableTowing(vehicle: number, toggle: boolean): void { SetVehicleDisableTowing(vehicle, toggle); }

  getNumberOfPassengers(vehicle: number): number { return GetVehicleNumberOfPassengers(vehicle); }
  getMaxNumberOfPassengers(vehicle: number): number { return GetVehicleMaxNumberOfPassengers(vehicle); }
  getModelNumberOfSeats(modelHash: number): number { return GetVehicleModelNumberOfSeats(modelHash); }
  getPedInSeat(vehicle: number, seatIndex: number, p2?: boolean): number { return GetPedInVehicleSeat(vehicle, seatIndex); }
  isSeatFree(vehicle: number, seatIndex: number, isTaskRunning: boolean): boolean { return (IsVehicleSeatFree as any)(vehicle, seatIndex, isTaskRunning ?? false); }
  isSeatWarpOnly(vehicle: number, seatIndex: number): boolean { return IsSeatWarpOnly(vehicle, seatIndex); }
  isTurretSeat(vehicle: number, seatIndex: number): boolean { return IsTurretSeat(vehicle, seatIndex); }
  canShuffleSeat(vehicle: number, seatIndex: number): boolean { return CanShuffleSeat(vehicle, seatIndex); }
  doesAllowRappel(vehicle: number): boolean { return DoesVehicleAllowRappel(vehicle); }

  setNumberPlateText(vehicle: number, plateText: string): void { SetVehicleNumberPlateText(vehicle, plateText); }
  getNumberPlateText(vehicle: number): string { return GetVehicleNumberPlateText(vehicle); }
  setAlarm(vehicle: number, state: boolean): void { SetVehicleAlarm(vehicle, !!state); }
  isAlarmActivated(vehicle: number): boolean { return IsVehicleAlarmActivated(vehicle); }
  setHandbrake(vehicle: number, toggle: boolean): void { SetVehicleHandbrake(vehicle, toggle); }
  setBrake(vehicle: number, toggle: boolean): void { SetVehicleBrake(vehicle, toggle); }
  setBurnout(vehicle: number, toggle: boolean): void { SetVehicleBurnout(vehicle, toggle); }
  isInBurnout(vehicle: number): boolean { return IsVehicleInBurnout(vehicle); }
  setHydraulicRaised(vehicle: number, raised: boolean): void { SetVehicleHydraulicRaised(vehicle, raised); }

  isOnAllWheels(vehicle: number): boolean { return IsVehicleOnAllWheels(vehicle); }
  isStolen(vehicle: number): boolean { return IsVehicleStolen(vehicle); }
  setIsStolen(vehicle: number, isStolen: boolean): void { SetVehicleIsStolen(vehicle, isStolen); }
  getIsEngineRunning(vehicle: number): boolean { return GetIsVehicleEngineRunning(vehicle); }
  isModel(vehicle: number, model: number): boolean { return IsVehicleModel(vehicle, model); }
  isStopped(vehicle: number): boolean { return IsVehicleStopped(vehicle); }
  isStuckOnRoof(vehicle: number): boolean { return IsVehicleStuckOnRoof(vehicle); }
  isDriveable(vehicle: number, isOnFireCheck: boolean): boolean { return IsVehicleDriveable(vehicle, isOnFireCheck); }
  isBig(vehicle: number): boolean { return IsBigVehicle(vehicle); }
  isStoppedAtTrafficLights(vehicle: number): boolean { return IsVehicleStoppedAtTrafficLights(vehicle); }
  isSearchlightOn(vehicle: number): boolean { return IsVehicleSearchlightOn(vehicle); }
  setSearchlight(heli: number, toggle: boolean, canBeUsedByAI: boolean): void { SetVehicleSearchlight(heli, toggle, canBeUsedByAI); }
  doesHaveSearchlight(vehicle: number): boolean { return DoesVehicleHaveSearchlight(vehicle); }
  doesHaveRoof(vehicle: number): boolean { return DoesVehicleHaveRoof(vehicle); }
  isVisible(vehicle: number): boolean { return IsEntityVisible(vehicle); }
  trackVisibility(vehicle: number): void { TrackVehicleVisibility(vehicle); }

  setUndriveable(vehicle: number, toggle: boolean): void { SetVehicleUndriveable(vehicle, toggle); }
  setProvidesCover(vehicle: number, toggle: boolean): void { SetVehicleProvidesCover(vehicle, toggle); }
  setStrong(vehicle: number, toggle: boolean): void { SetVehicleStrong(vehicle, toggle); }
  setHasStrongAxles(vehicle: number, toggle: boolean): void { SetVehicleHasStrongAxles(vehicle, toggle); }
  setCanBreak(vehicle: number, toggle: boolean): void { SetVehicleCanBreak(vehicle, toggle); }
  setCanBeTargetted(vehicle: number, state: boolean): void { SetVehicleCanBeTargetted(vehicle, state); }
  setCanBeVisiblyDamaged(vehicle: number, state: boolean): void { SetVehicleCanBeVisiblyDamaged(vehicle, state); }
  setCanRespray(vehicle: number, state: boolean): void { SetCanResprayVehicle(vehicle, state); }
  setCanLeakOil(vehicle: number, toggle: boolean): void { SetVehicleCanLeakOil(vehicle, toggle); }
  setCanLeakPetrol(vehicle: number, toggle: boolean): void { SetVehicleCanLeakPetrol(vehicle, toggle); }
  setNeedsToBeHotwired(vehicle: number, toggle: boolean): void { SetVehicleNeedsToBeHotwired(vehicle, toggle); }
  setHasBeenOwnedByPlayer(vehicle: number, owned: boolean): void { SetVehicleHasBeenOwnedByPlayer(vehicle, owned); }
  setIsWanted(vehicle: number, state: boolean): void { SetVehicleIsWanted(vehicle, state); }
  setIsConsideredByPlayer(vehicle: number, toggle: boolean): void { SetVehicleIsConsideredByPlayer(vehicle, toggle); }
  setExplodesOnHighExplosionDamage(vehicle: number, toggle: boolean): void { SetVehicleExplodesOnHighExplosionDamage(vehicle, toggle); }
  setDropsMoneyWhenBlownUp(vehicle: number, toggle: boolean): void { SetVehicleDropsMoneyWhenBlownUp(vehicle, toggle); }
  setEnveffScale(vehicle: number, fade: number): void { SetVehicleEnveffScale(vehicle, fade); }
  getEnveffScale(vehicle: number): number { return GetVehicleEnveffScale(vehicle); }
  setGravity(vehicle: number, toggle: boolean): void { SetVehicleGravity(vehicle, toggle); }
  setLodMultiplier(vehicle: number, multiplier: number): void { SetVehicleLodMultiplier(vehicle, multiplier); }
  setSteerBias(vehicle: number, value: number): void { SetVehicleSteerBias(vehicle, value); }
  setReduceGrip(vehicle: number, toggle: boolean): void { SetVehicleReduceGrip(vehicle, toggle); }
  setCheatPowerIncrease(vehicle: number, value: number): void { SetVehicleCheatPowerIncrease(vehicle, value); }
  setFrictionOverride(vehicle: number, friction: number): void { SetVehicleFrictionOverride(vehicle, friction); }
  setEngineCanDegrade(vehicle: number, toggle: boolean): void { SetVehicleEngineCanDegrade(vehicle, toggle); }
  setForceHd(vehicle: number, toggle: boolean): void { SetForceHdVehicle(vehicle, toggle); }
  setCanSaveInGarage(vehicle: number, toggle: boolean): void { SetVehicleCanSaveInGarage(vehicle, toggle); }
  setExclusiveDriver(vehicle: number, ped: number, index: number): void { (SetVehicleExclusiveDriver as any)(vehicle, ped, index); }
  setCeilingHeight(vehicle: number, height: number): void { SetVehicleCeilingHeight(vehicle, height); }
  clearRouteHistory(vehicle: number): void { ClearVehicleRouteHistory(vehicle); }
  setUseAlternateHandling(vehicle: number, toggle: boolean): void { SetVehicleUseAlternateHandling(vehicle, toggle); }
  setPlayersLast(vehicle: number): void { SetPlayersLastVehicle(vehicle); }
  setCanBeUsedByFleeingPeds(vehicle: number, toggle: boolean): void { SetVehicleCanBeUsedByFleeingPeds(vehicle, toggle); }
  setActiveForPedNavigation(vehicle: number, toggle: boolean): void { SetVehicleActiveForPedNavigation(vehicle, toggle); }
  setGeneratesEngineShockingEvents(vehicle: number, allowedEvents: boolean): void { SetVehicleGeneratesEngineShockingEvents(vehicle, allowedEvents); }
  setExtendedRemovalRange(vehicle: number, range: number): void { SetVehicleExtendedRemovalRange(vehicle, range); }
  setKersAllowed(vehicle: number, toggle: boolean): void { SetVehicleKersAllowed(vehicle, toggle); }
  getHasKers(vehicle: number): boolean { return GetVehicleHasKers(vehicle); }

  explode(vehicle: number, isAudible: boolean, isInvisible: boolean): void { ExplodeVehicle(vehicle, isAudible, isInvisible); }
  explodeInCutscene(vehicle: number, p1: boolean): void { ExplodeVehicleInCutscene(vehicle, p1); }
  setOutOfControl(vehicle: number, killDriver: boolean, explodeOnImpact: boolean): void { SetVehicleOutOfControl(vehicle, killDriver, explodeOnImpact); }
  setTimedExplosion(vehicle: number, ped: number, toggle: boolean): void { SetVehicleTimedExplosion(vehicle, ped, toggle); }
  addPhoneExplosiveDevice(vehicle: number): void { AddVehiclePhoneExplosiveDevice(vehicle); }
  clearPhoneExplosiveDevice(): void { ClearVehiclePhoneExplosiveDevice(); }
  hasPhoneExplosiveDevice(): boolean { return HasVehiclePhoneExplosiveDevice(); }
  detonatePhoneExplosiveDevice(): void { DetonateVehiclePhoneExplosiveDevice(); }

  setIndividualDoorsLocked(vehicle: number, doorIndex: number, destroyType: number): void { SetVehicleIndividualDoorsLocked(vehicle, doorIndex, destroyType); }
  setDoorsLockedForPlayer(vehicle: number, player: number, toggle: boolean): void { SetVehicleDoorsLockedForPlayer(vehicle, player, toggle); }
  getDoorsLockedForPlayer(vehicle: number, player: number): boolean { return GetVehicleDoorsLockedForPlayer(vehicle, player); }
  setDoorsLockedForAllPlayers(vehicle: number, toggle: boolean): void { SetVehicleDoorsLockedForAllPlayers(vehicle, toggle); }
  setDoorsLockedForNonScriptPlayers(vehicle: number, toggle: boolean): void { SetVehicleDoorsLockedForNonScriptPlayers(vehicle, toggle); }
  setDoorsLockedForTeam(vehicle: number, team: number, toggle: boolean): void { SetVehicleDoorsLockedForTeam(vehicle, team, toggle); }
  getDoorLockStatus(vehicle: number): number { return GetVehicleDoorLockStatus(vehicle); }
  setDoorsShut(vehicle: number, closeInstantly: boolean): void { SetVehicleDoorsShut(vehicle, closeInstantly); }
  setDoorControl(vehicle: number, doorIndex: number, speed: number, angle: number): void { SetVehicleDoorControl(vehicle, doorIndex, speed, angle); }
  setDoorLatched(vehicle: number, doorIndex: number, p2: boolean, p3: boolean, p4: boolean): void { SetVehicleDoorLatched(vehicle, doorIndex, p2, p3, p4); }
  getDoorAngleRatio(vehicle: number, door: number): number { return GetVehicleDoorAngleRatio(vehicle, door); }
  setDoorBroken(vehicle: number, doorIndex: number, deleteDoor: boolean): void { SetVehicleDoorBroken(vehicle, doorIndex, deleteDoor); }
  isDoorFullyOpen(vehicle: number, doorIndex: number): boolean { return IsVehicleDoorFullyOpen(vehicle, doorIndex); }
  isDoorDamaged(veh: number, doorID: number): boolean { return IsVehicleDoorDamaged(veh, doorID); }
  getIsDoorValid(vehicle: number, doorIndex: number): boolean { return GetIsDoorValid(vehicle, doorIndex); }
  setCarBootOpen(vehicle: number): void { SetCarBootOpen(vehicle); }

  isWindowIntact(vehicle: number, windowIndex: number): boolean { return IsVehicleWindowIntact(vehicle, windowIndex); }
  isBumperBouncing(vehicle: number, frontBumper: boolean): boolean { return IsVehicleBumperBouncing(vehicle, frontBumper); }
  isBumperBrokenOff(vehicle: number, front: boolean): boolean { return IsVehicleBumperBrokenOff(vehicle, front); }
  getLayoutHash(vehicle: number): number { return GetVehicleLayoutHash(vehicle); }
  getCauseOfDestruction(vehicle: number): number { return GetVehicleCauseOfDestruction(vehicle); }
  getPlateType(vehicle: number): number { return GetVehiclePlateType(vehicle); }

  setWheelType(vehicle: number, wheelType: number): void { SetVehicleWheelType(vehicle, wheelType); }
  getWheelType(vehicle: number): number { return GetVehicleWheelType(vehicle); }
  setWindowTint(vehicle: number, tint: number): void { SetVehicleWindowTint(vehicle, tint); }
  getWindowTint(vehicle: number): number { return GetVehicleWindowTint(vehicle); }
  setNumberPlateTextIndex(vehicle: number, plateIndex: number): void { SetVehicleNumberPlateTextIndex(vehicle, plateIndex); }
  getNumberPlateTextIndex(vehicle: number): number { return GetVehicleNumberPlateTextIndex(vehicle); }

  getClass(vehicle: number): number { return GetVehicleClass(vehicle); }
  getClassFromName(modelHash: number): number { return GetVehicleClassFromName(modelHash); }
  getDisplayNameFromModel(modelHash: number): string { return GetDisplayNameFromVehicleModel(modelHash); }
  getDisplayNameFromVehicleModel(modelHash: number): string { return GetDisplayNameFromVehicleModel(modelHash); }

  setExtra(vehicle: number, extraId: number, disable: boolean): void { SetVehicleExtra(vehicle, extraId, disable); }
  isExtraTurnedOn(vehicle: number, extraId: number): boolean { return IsVehicleExtraTurnedOn(vehicle, extraId); }
  doesExtraExist(vehicle: number, extraId: number): boolean { return DoesExtraExist(vehicle, extraId); }

  setConvertibleRoof(vehicle: number, turnon: boolean): void { SetConvertibleRoof(vehicle, turnon); }
  lowerConvertibleRoof(vehicle: number, instantlyLower: boolean): void { LowerConvertibleRoof(vehicle, instantlyLower); }
  raiseConvertibleRoof(vehicle: number, instantlyRaise: boolean): void { RaiseConvertibleRoof(vehicle, instantlyRaise); }
  getConvertibleRoofState(vehicle: number): number { return GetConvertibleRoofState(vehicle); }
  isAConvertible(vehicle: number, checkRoofExtras: boolean): boolean { return IsVehicleAConvertible(vehicle, checkRoofExtras); }
  setConvertibleRoofLatchState(vehicle: number, state: boolean): void { SetConvertibleRoofLatchState(vehicle, state); }

  setHeliBladesFullSpeed(vehicle: number): void { SetHeliBladesFullSpeed(vehicle); }
  setHeliBladesSpeed(vehicle: number, speed: number): void { SetHeliBladesSpeed(vehicle, speed); }
  setHeliTurbulenceScalar(vehicle: number, p1: number): void { SetHeliTurbulenceScalar(vehicle, p1); }
  isHeliLandingAreaBlocked(vehicle: number): boolean { return IsHeliLandingAreaBlocked(vehicle); }
  isHeliPartBroken(vehicle: number, checkMainRotor: boolean, checkRearRotor: boolean, checkTailBoom: boolean): boolean { return IsHeliPartBroken(vehicle, checkMainRotor, checkRearRotor, checkTailBoom); }
  getHeliMainRotorHealth(vehicle: number): number { return GetHeliMainRotorHealth(vehicle); }
  getHeliTailRotorHealth(vehicle: number): number { return GetHeliTailRotorHealth(vehicle); }
  getHeliTailBoomHealth(vehicle: number): number { return GetHeliTailBoomHealth(vehicle); }
  setHeliTailRotorHealth(vehicle: number, health: number): void { SetHeliTailRotorHealth(vehicle, health); }
  setHeliMainRotorHealth(heliHandle: number, health: number): void { SetHeliMainRotorHealth(heliHandle, health); }
  isAnyPedRappellingFromHeli(vehicle: number): boolean { return IsAnyPedRappellingFromHeli(vehicle); }
  setHelicopterRollPitchYawMult(helicopter: number, multiplier: number): void { SetHelicopterRollPitchYawMult(helicopter, multiplier); }

  forceSubmarineSurfaceMode(vehicle: number, toggle: boolean): void { ForceSubmarineSurfaceMode(vehicle, toggle); }
  setSubmarineCrushDepths(vehicle: number, p1: boolean, depth1: number, depth2: number, depth3: number): void { SetSubmarineCrushDepths(vehicle, p1, depth1, depth2, depth3); }
  transformToSubmarine(vehicle: number, noAnimation: boolean): void { return TransformToSubmarine(vehicle, noAnimation); }

  setBoatAnchor(vehicle: number, toggle: boolean): void { SetBoatAnchor(vehicle, toggle); }
  canAnchorBoatHere(vehicle: number): boolean { return CanAnchorBoatHere(vehicle); }
  setBoatSinksWhenWrecked(vehicle: number, toggle: boolean): void { SetBoatSinksWhenWrecked(vehicle, toggle); }
  setBoatDisableAvoidance(vehicle: number, p1: boolean): void { SetBoatDisableAvoidance(vehicle, p1); }
  getBoatBoomPositionRatio(vehicle: number): number { return GetBoatBoomPositionRatio(vehicle); }
  setBikeOnStand(vehicle: number, x: number, y: number): void { SetBikeOnStand(vehicle, x, y); }

  isPlaneLandingGearIntact(plane: number): boolean { return IsPlaneLandingGearIntact(plane); }
  arePlanePropellersIntact(plane: number): boolean { return ArePlanePropellersIntact(plane); }
  setPlaneTurbulenceMultiplier(vehicle: number, multiplier: number): void { SetPlaneTurbulenceMultiplier(vehicle, multiplier); }
  disablePlaneAileron(vehicle: number, leftSide: boolean, disable: boolean): void { DisablePlaneAileron(vehicle, leftSide, disable); }
  disableIndividualPlanePropeller(handle: number, index: number): void { DisableIndividualPlanePropeller(handle, index); }
  controlLandingGear(vehicle: number, state: number): void { ControlLandingGear(vehicle, state); }
  getLandingGearState(vehicle: number): number { return GetLandingGearState(vehicle); }
  setFlightNozzlePosition(vehicle: number, angleRatio: number): void { SetVehicleFlightNozzlePosition(vehicle, angleRatio); }
  setFlightNozzlePositionImmediate(vehicle: number, angle: number): void { SetVehicleFlightNozzlePositionImmediate(vehicle, angle); }
  getFlightNozzlePosition(plane: number): number { return GetVehicleFlightNozzlePosition(plane); }
  setForceAfterburner(vehicle: number, toggle: boolean): void { SetVehicleForceAfterburner(vehicle, toggle); }
  openBombBayDoors(vehicle: number): void { OpenBombBayDoors(vehicle); }
  closeBombBayDoors(vehicle: number): void { CloseBombBayDoors(vehicle); }

  setBulldozerArmPosition(vehicle: number, position: number, p2: boolean): void { SetVehicleBulldozerArmPosition(vehicle, position, p2); }
  setTankTurretPosition(vehicle: number, position: number, p2: boolean): void { SetVehicleTankTurretPosition(vehicle, position, p2); }
  setTurretSpeedThisFrame(vehicle: number, speed: number): void { SetVehicleTurretSpeedThisFrame(vehicle, speed); }
  disableTurretMovementThisFrame(vehicle: number): void { DisableVehicleTurretMovementThisFrame(vehicle); }
  setForkliftForkHeight(vehicle: number, height: number): void { SetForkliftForkHeight(vehicle, height); }

  isEntityAttachedToHandlerFrame(vehicle: number, entity: number): boolean { return IsEntityAttachedToHandlerFrame(vehicle, entity); }
  isAnyEntityAttachedToHandlerFrame(vehicle: number): boolean { return IsAnyEntityAttachedToHandlerFrame(vehicle); }
  detachContainerFromHandlerFrame(vehicle: number): void { DetachContainerFromHandlerFrame(vehicle); }
  stabiliseEntityAttachedToHeli(vehicle: number, entity: number, p2: number): void { StabiliseEntityAttachedToHeli(vehicle, entity, p2); }

  detachFromCargobob(vehicle: number, cargobob: number): void { DetachEntityFromCargobob(cargobob, vehicle); }
  detachFromAnyCargobob(vehicle: number): boolean { return DetachVehicleFromAnyCargobob(vehicle); }
  detachEntityFromCargobob(cargobob: number, entity: number): number { return DetachEntityFromCargobob(cargobob, entity); }
  isAttachedToCargobob(cargobob: number, vehicleAttached: number): boolean { return IsVehicleAttachedToCargobob(cargobob, vehicleAttached); }
  getAttachedToCargobob(cargobob: number): number { return GetEntityAttachedToCargobob(cargobob); }
  getEntityAttachedToCargobob(cargobob: number): number { return GetEntityAttachedToCargobob(cargobob); }
  attachToCargobob(vehicle: number, cargobob: number, p2: number, x: number, y: number, z: number): void { AttachEntityToCargobob(cargobob, vehicle, p2, x, y, z); }
  attachEntityToCargobob(cargoHandle: number, vehicleHandle: number, boneIndex: number, x: number, y: number, z: number): void { AttachEntityToCargobob(cargoHandle, vehicleHandle, boneIndex, x, y, z); }
  doesCargobobHavePickUpRope(cargobob: number): boolean { return DoesCargobobHavePickUpRope(cargobob); }
  createPickUpRopeForCargobob(cargobob: number, state: number): void { CreatePickUpRopeForCargobob(cargobob, state); }
  removePickUpRopeForCargobob(cargobob: number): void { RemovePickUpRopeForCargobob(cargobob); }
  setPickupRopeLengthForCargobob(cargobob: number, length1: number, length2: number, p3: boolean): void { SetPickupRopeLengthForCargobob(cargobob, length1, length2, p3); }
  setCargobobPickupRopeDampingMultiplier(cargoBob: number, dampingMultp: number): void { SetCargobobPickupRopeDampingMultiplier(cargoBob, dampingMultp); }
  setCargobobPickupRopeType(cargoBob: number, type: number): void { SetCargobobPickupRopeType(cargoBob, type); }
  doesCargobobHavePickupMagnet(cargobob: number): boolean { return DoesCargobobHavePickupMagnet(cargobob); }
  setCargobobPickupMagnetActive(cargobob: number, isActive: boolean): void { SetCargobobPickupMagnetActive(cargobob, isActive); }
  setCargobobPickupMagnetStrength(cargobob: number, strength: number): void { SetCargobobPickupMagnetStrength(cargobob, strength); }
  setCargobobPickupMagnetReducedFalloff(cargobob: number, magnetFalloff: number): void { SetCargobobPickupMagnetReducedFalloff(cargobob, magnetFalloff); }
  setCargobobPickupMagnetPullRopeLength(cargobob: number, p1: number): void { SetCargobobPickupMagnetPullRopeLength(cargobob, p1); }
  setCargobobPickupMagnetPullStrength(cargobob: number, p1: number): void { SetCargobobPickupMagnetPullStrength(cargobob, p1); }
  setCargobobPickupMagnetFalloff(vehicle: number, p1: number): void { SetCargobobPickupMagnetFalloff(vehicle, p1); }
  setCargobobPickupMagnetReducedStrength(cargoBob: number, magnetStrength: number): void { SetCargobobPickupMagnetReducedStrength(cargoBob, magnetStrength); }

  doesHaveWeapons(vehicle: number): boolean { return DoesVehicleHaveWeapons(vehicle); }
  disableWeapon(disabled: boolean, weaponHash: number, vehicle: number, owner: number): void { DisableVehicleWeapon(disabled, weaponHash, vehicle, owner); }
  disableVehicleWeapon(disabled: boolean, weaponHash: number, vehicle: number, owner: number): void { DisableVehicleWeapon(disabled, weaponHash, vehicle, owner); }
  isWeaponDisabled(weaponHash: number, vehicle: number, owner: number): boolean { return IsVehicleWeaponDisabled(weaponHash, vehicle, owner); }
  setShootAtTarget(driver: number, entity: number, xTarget: number, yTarget: number, zTarget: number): void { SetVehicleShootAtTarget(driver, entity, xTarget, yTarget, zTarget); }
  setVehicleShootAtTarget(driver: number, entity: number, xTarget: number, yTarget: number, zTarget: number): void { SetVehicleShootAtTarget(driver, entity, xTarget, yTarget, zTarget); }
  getLockOnTarget(vehicle: number): number {
    const [result, entity] = GetVehicleLockOnTarget(vehicle);
    return result ? entity : 0;
  }
  setHasBeenDrivenFlag(vehicle: number, toggle: boolean): void { SetVehicleHasBeenDrivenFlag(vehicle, toggle); }
  setLastDriven(vehicle: number): void { SetLastDrivenVehicle(vehicle); }
  getLastDriven(): number { return GetLastDrivenVehicle(); }
  clearLastDriven(): void { ClearLastDrivenVehicle(); }

  setUsesLargeRearRamp(vehicle: number, toggle: boolean): void { SetVehicleUsesLargeRearRamp(vehicle, toggle); }
  setRudderBroken(vehicle: number, toggle: boolean): void { SetVehicleRudderBroken(vehicle, toggle); }

  getHasRocketBoost(vehicle: number): boolean { return GetHasRocketBoost(vehicle); }
  isRocketBoostActive(vehicle: number): boolean { return IsRocketBoostActive(vehicle); }
  setRocketBoostActive(vehicle: number, active: boolean): void { SetRocketBoostActive(vehicle, active); }
  getHasRetractableWheels(vehicle: number): boolean { return GetHasRetractableWheels(vehicle); }
  getHasParachute(vehicle: number): boolean { return GetVehicleHasParachute(vehicle); }
  hideTombstone(vehicle: number, toggle: boolean): void { HideTombstone(vehicle, toggle); }

  addUpsidedownCheck(vehicle: number): void { AddVehicleUpsidedownCheck(vehicle); }
  removeUpsidedownCheck(vehicle: number): void { RemoveVehicleUpsidedownCheck(vehicle); }
  removeStuckCheck(vehicle: number): void { RemoveVehicleStuckCheck(vehicle); }
  doesHaveStuckVehicleCheck(vehicle: number): boolean { return DoesVehicleHaveStuckVehicleCheck(vehicle); }
  resetStuckTimer(vehicle: number, nullAttributes: number): void { ResetVehicleStuckTimer(vehicle, nullAttributes); }
  setOnGroundProperly(vehicle: number, p1: number): boolean { return (SetVehicleOnGroundProperly as any)(vehicle, p1 ?? 5.0); }

  startHorn(vehicle: number, duration: number, mode: number, forever: boolean): void { StartVehicleHorn(vehicle, duration, mode, forever); }
  setNameDebug(vehicle: number, name: string): void { SetVehicleNameDebug(vehicle, name); }
  setRenderTrainAsDerailed(train: number, toggle: boolean): void { SetRenderTrainAsDerailed(train, toggle); }
  setTrainSpeed(train: number, speed: number): void { SetTrainSpeed(train, speed); }
  setTrainCruiseSpeed(train: number, speed: number): void { SetTrainCruiseSpeed(train, speed); }
  setMissionTrainCoords(train: number, x: number, y: number, z: number): void { SetMissionTrainCoords(train, x, y, z); }
  getTrainCarriage(train: number, trailerNumber: number): number { return GetTrainCarriage(train, trailerNumber); }
  isMissionTrain(vehicleHandle: number): boolean { return IsMissionTrain(vehicleHandle); }

  requestHighDetailModel(vehicle: number): void { RequestVehicleHighDetailModel(vehicle); }
  removeHighDetailModel(vehicle: number): void { RemoveVehicleHighDetailModel(vehicle); }
  isHighDetail(vehicle: number): boolean { return IsVehicleHighDetail(vehicle); }
  requestAsset(vehicleHash: number, vehicleAsset: number): void { RequestVehicleAsset(vehicleHash, vehicleAsset); }
  hasAssetLoaded(vehicleAsset: number): boolean { return HasVehicleAssetLoaded(vehicleAsset); }
  removeAsset(vehicleAsset: number): void { RemoveVehicleAsset(vehicleAsset); }
  requestVehicleAsset(vehicleHash: number, vehicleAsset: number): void { RequestVehicleAsset(vehicleHash, vehicleAsset); }
  hasVehicleAssetLoaded(vehicleAsset: number): boolean { return HasVehicleAssetLoaded(vehicleAsset); }
  removeVehicleAsset(vehicleAsset: number): void { RemoveVehicleAsset(vehicleAsset); }
  getNumWindowTints(): number { return GetNumVehicleWindowTints(); }
  getNumberOfNumberPlates(): number { return GetNumberOfVehicleNumberPlates(); }
  setUseCutsceneWheelCompression(vehicle: number, wheelCompression: boolean, animateWheels: boolean, animateJoints: boolean): number { return SetVehicleUseCutsceneWheelCompression(vehicle, wheelCompression, animateWheels, animateJoints); } // unverified

  isThisModelABoat(model: number): boolean { return IsThisModelABoat(model); }
  isThisModelAJetski(model: number): boolean { return IsThisModelAJetski(model); }
  isThisModelAPlane(model: number): boolean { return IsThisModelAPlane(model); }
  isThisModelAHeli(model: number): boolean { return IsThisModelAHeli(model); }
  isThisModelACar(model: number): boolean { return IsThisModelACar(model); }
  isThisModelATrain(model: number): boolean { return IsThisModelATrain(model); }
  isThisModelABike(model: number): boolean { return IsThisModelABike(model); }
  isThisModelABicycle(model: number): boolean { return IsThisModelABicycle(model); }
  isThisModelAQuadbike(model: number): boolean { return IsThisModelAQuadbike(model); }
  isThisModelAnAmphibiousCar(model: number): boolean { return IsThisModelAnAmphibiousCar(model); }
  isThisModelAnAmphibiousQuadbike(model: number): boolean { return IsThisModelAnAmphibiousQuadbike(model); }

  getRandomInSphere(x: number, y: number, z: number, radius: number, modelHash: number, flags: number): number { return GetRandomVehicleInSphere(x, y, z, radius, modelHash, flags); }
  getClosest(x: number, y: number, z: number, radius: number, modelHash: number, flags: number): number { return GetClosestVehicle(x, y, z, radius, modelHash, flags); }
  isAnyNearPoint(x: number, y: number, z: number, radius: number): boolean { return IsAnyVehicleNearPoint(x, y, z, radius); }
  doesExistWithDecorator(decorator: string): boolean { return DoesVehicleExistWithDecorator(decorator); }

  getTyreHealth(vehicle: number, wheelIndex: number): number { return GetTyreHealth(vehicle, wheelIndex); }
  setTyreHealth(vehicle: number, wheelIndex: number, health: number): void { SetTyreHealth(vehicle, wheelIndex, health); }

  getTyreWearMultiplier(vehicle: number, wheelIndex: number): number { return GetTyreWearMultiplier(vehicle, wheelIndex); }
  setTyreWearMultiplier(vehicle: number, wheelIndex: number, multiplier: number): void { SetTyreWearMultiplier(vehicle, wheelIndex, multiplier); }

  setTyreSoftnessMultiplier(vehicle: number, wheelIndex: number, multiplier: number): void { SetTyreSoftnessMultiplier(vehicle, wheelIndex, multiplier); }

  setTyreTractionLossMultiplier(vehicle: number, wheelIndex: number, multiplier: number): void { SetTyreTractionLossMultiplier(vehicle, wheelIndex, multiplier); }

  createVehicle(modelHash: number, x: number, y: number, z: number, heading: number, isNetwork: boolean, bScriptHostVeh: boolean, p7: boolean): number { return (CreateVehicle as any)(modelHash, x, y, z, heading, isNetwork, bScriptHostVeh, p7); }
  getVehicleClass(vehicle: number): number { return GetVehicleClass(vehicle); }
  getVehicleClassFromName(modelHash: number): number { return GetVehicleClassFromName(modelHash); }
  getVehicleMod(vehicle: number, modType: number): number { return GetVehicleMod(vehicle, modType); }
  setVehicleMod(vehicle: number, modType: number, modIndex: number, customTires: boolean): void { SetVehicleMod(vehicle, modType, modIndex, customTires); }
  setVehicleDamage(vehicle: number, xOffset: number, yOffset: number, zOffset: number, damage: number, radius: number, focusOnModel: boolean): void { SetVehicleDamage(vehicle, xOffset, yOffset, zOffset, damage, radius, focusOnModel); }
  preloadVehicleMod(vehicle: number, modType: number, modIndex: number): void { PreloadVehicleMod(vehicle, modType, modIndex); }
  doesVehicleExistWithDecorator(decorator: string): boolean { return DoesVehicleExistWithDecorator(decorator); }
  getVehicleModelMaxNumberOfPassengers(modelHash: number): number { return GetVehicleModelMaxNumberOfPassengers(modelHash); } // unverified
  getVehicleModelMaxSpeed(modelHash: number): number { return GetVehicleModelMaxSpeed(modelHash); } // unverified

  setCanBeLockedOn(vehicle: number, canBeLockedOn: boolean, unk: boolean): void { SetVehicleAllowHomingMissleLockon(vehicle, canBeLockedOn, unk); }
  setAllowNoPassengersLockon(veh: number, toggle: boolean): void { SetVehicleAllowNoPassengersLockon(veh, toggle); }
  getHomingLockonState(vehicle: number): number { return GetVehicleHomingLockonState(vehicle); }

  doesScriptGeneratorExist(vehicleGenerator: number): boolean { return DoesScriptVehicleGeneratorExist(vehicleGenerator); }
  doesScriptVehicleGeneratorExist(vehicleGenerator: number): boolean { return DoesScriptVehicleGeneratorExist(vehicleGenerator); }
  createScriptGenerator(x: number, y: number, z: number, heading: number, p4: number, p5: number, modelHash: number, p7: number, p8: number, p9: number, p10: number, p11: boolean, p12: boolean, p13: boolean, p14: boolean, p15: boolean, p16: number): number { return CreateScriptVehicleGenerator(x, y, z, heading, p4, p5, modelHash, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16); }
  createScriptVehicleGenerator(x: number, y: number, z: number, heading: number, p4: number, p5: number, modelHash: number, p7: number, p8: number, p9: number, p10: number, p11: boolean, p12: boolean, p13: boolean, p14: boolean, p15: boolean, p16: number): number { return CreateScriptVehicleGenerator(x, y, z, heading, p4, p5, modelHash, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16); }
  deleteScriptGenerator(vehicleGenerator: number): void { DeleteScriptVehicleGenerator(vehicleGenerator); }
  deleteScriptVehicleGenerator(vehicleGenerator: number): void { DeleteScriptVehicleGenerator(vehicleGenerator); }
  setScriptGenerator(vehicleGenerator: number, enabled: boolean): void { SetScriptVehicleGenerator(vehicleGenerator, enabled); }
  setScriptVehicleGenerator(vehicleGenerator: number, enabled: boolean): void { SetScriptVehicleGenerator(vehicleGenerator, enabled); }
  setAllGeneratorsActiveInArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, p6: boolean, p7: boolean): void { SetAllVehicleGeneratorsActiveInArea(x1, y1, z1, x2, y2, z2, p6, p7); }
  setAllVehicleGeneratorsActiveInArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, p6: boolean, p7: boolean): void { SetAllVehicleGeneratorsActiveInArea(x1, y1, z1, x2, y2, z2, p6, p7); }
  setAllGeneratorsActive(): void { SetAllVehicleGeneratorsActive(); }
  setAllVehicleGeneratorsActive(): void { SetAllVehicleGeneratorsActive(); }
  setAllLowPriorityGeneratorsActive(active: boolean): void { SetAllLowPriorityVehicleGeneratorsActive(active); }
  setAllLowPriorityVehicleGeneratorsActive(active: boolean): void { SetAllLowPriorityVehicleGeneratorsActive(active); }
  removeVehiclesFromGeneratorsInArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, unk: number): void { RemoveVehiclesFromGeneratorsInArea(x1, y1, z1, x2, y2, z2, unk); }

  setDensityMultiplierThisFrame(multiplier: number): void { SetVehicleDensityMultiplierThisFrame(multiplier); }
  setVehicleDensityMultiplierThisFrame(multiplier: number): void { SetVehicleDensityMultiplierThisFrame(multiplier); }
  setRandomDensityMultiplierThisFrame(multiplier: number): void { SetRandomVehicleDensityMultiplierThisFrame(multiplier); }
  setRandomVehicleDensityMultiplierThisFrame(multiplier: number): void { SetRandomVehicleDensityMultiplierThisFrame(multiplier); }
  setParkedDensityMultiplierThisFrame(multiplier: number): void { SetParkedVehicleDensityMultiplierThisFrame(multiplier); }
  setParkedVehicleDensityMultiplierThisFrame(multiplier: number): void { SetParkedVehicleDensityMultiplierThisFrame(multiplier); }
  setAmbientRangeMultiplierThisFrame(value: number): void { SetAmbientVehicleRangeMultiplierThisFrame(value); } // unverified
  setDisableRandomTrainsThisFrame(toggle: boolean): void { SetDisableRandomTrainsThisFrame(toggle); }
  setFarDrawS(toggle: boolean): void { SetFarDrawVehicles(toggle); }
  setFarDrawVehicles(toggle: boolean): void { SetFarDrawVehicles(toggle); }
  setNumberOfParkedS(value: number): void { SetNumberOfParkedVehicles(value); }
  setNumberOfParkedVehicles(value: number): void { SetNumberOfParkedVehicles(value); }
  instantlyFillPopulation(): void { InstantlyFillVehiclePopulation(); } // unverified
  hasFilledPopulation(): boolean { return HasVehiclePopulationBeenFilled(); } // unverified
  setModelIsSuppressed(model: number, suppressed: boolean): void { SetVehicleModelIsSuppressed(model, suppressed); }
  setVehicleModelIsSuppressed(model: number, suppressed: boolean): void { SetVehicleModelIsSuppressed(model, suppressed); }
  setDistantCarsEnabled(toggle: boolean): void { SetDistantCarsEnabled(toggle); }
  setCarHighSpeedBumpSeverityMultiplier(multiplier: number): void { SetCarHighSpeedBumpSeverityMultiplier(multiplier); }
  displayDistantVehicles(toggle: boolean): void { DisplayDistantVehicles(toggle); }
  setLightsCutoffDistanceTweak(distance: number): void { SetVehicleLightsCutoffDistanceTweak(distance); } // unverified

  setDoorsLockedForUnk(vehicle: number, toggle: boolean): void { SetVehicleDoorsLockedForUnk(vehicle, toggle); } // unverified
  getDoorDestroyType(vehicle: number, doorIndex: number): number { return GetVehicleDoorDestroyType(vehicle, doorIndex); } // unverified
  setDoorCanBreak(vehicle: number, doorIndex: number, isBreakable: boolean): void { SetVehicleDoorCanBreak(vehicle, doorIndex, isBreakable); } // unverified
  getPedUsingDoor(vehicle: number, doorIndex: number): number { return GetPedUsingVehicleDoor(vehicle, doorIndex); }
  getNumberOfDoors(vehicle: number): number { return GetNumberOfVehicleDoors(vehicle); }

  setIsRacing(vehicle: number, toggle: boolean): void { SetVehicleIsRacing(vehicle, toggle); }
  getIsPrimaryColourCustom(vehicle: number): boolean { return GetIsVehiclePrimaryColourCustom(vehicle); }
  getIsSecondaryColourCustom(vehicle: number): boolean { return GetIsVehicleSecondaryColourCustom(vehicle); }
  getNumberOfColours(vehicle: number): number { return GetNumberOfVehicleColours(vehicle); }
  setInteriorColor(vehicle: number, color: number): void { SetVehicleInteriorColour(vehicle, color); } // unverified
  getInteriorColor(vehicle: number): number { return GetVehicleInteriorColour(vehicle); } // unverified
  setDashboardColor(vehicle: number, color: number): void { SetVehicleDashboardColour(vehicle, color); } // unverified
  getDashboardColor(vehicle: number): number {
    const r = GetVehicleDashboardColour(vehicle); // unverified
    return Array.isArray(r) ? r[r.length - 1] : r;
  }
  setXenonLightsColor(vehicle: number, colorIndex: number): void { SetVehicleXenonLightColorIndex(vehicle, colorIndex); }
  getXenonLightsColor(vehicle: number): number { return GetVehicleXenonLightColorIndex(vehicle); }

  getSubmarineIsBelowFirstCrushDepth(submarine: number): boolean { return GetSubmarineIsBelowFirstCrushDepth(submarine); } // unverified
  getSubmarineCrushDepthWarningState(submarine: number): number { return GetSubmarineCrushDepthWarningState(submarine); } // unverified
  transformSubmarineTo(vehicle: number, noAnimation: boolean): void { return TransformToSubmarine(vehicle, noAnimation); }
  getIsSubmarineTransformed(vehicle: number): boolean { return GetIsSubmarineVehicleTransformed(vehicle); } // unverified
  canAnchorBoatHere2(vehicle: number): boolean { return CanAnchorBoatHereIgnorePlayers(vehicle); }
  setBoatFrozenWhenAnchored(vehicle: number, toggle: boolean): void { SetBoatFrozenWhenAnchored(vehicle, toggle); } // unverified
  setBoatMovementResistance(vehicle: number, value: number): void { SetBoatMovementResistance(vehicle, value); } // unverified
  isBoatAnchoredAndFrozen(vehicle: number): boolean { return IsBoatAnchoredAndFrozen(vehicle); } // unverified
  setBoatIsSinking(boat: number): void { SetBoatSinks(boat); } // unverified
  setBoatBoomPositionRatio(vehicle: number, ratio: number): void { SetBoatBoomPositionRatio(vehicle, ratio); } // unverified
  getBoatBoomPositionRatio2(vehicle: number, p1: boolean): void { return GetBoatBoomPositionRatio2(vehicle, p1); } // unverified
  getBoatBoomPositionRatio3(vehicle: number, p1: boolean): void { return GetBoatBoomPositionRatio3(vehicle, p1); } // unverified

  getVehicleRecordingId(recording: number, script: string): number { return GetVehicleRecordingId(recording, script); }
  getRecordingId(recording: number, script: string): number { return GetVehicleRecordingId(recording, script); }
  requestVehicleRecording(recording: number, script: string): void { RequestVehicleRecording(recording, script); }
  requestRecording(recording: number, script: string): void { RequestVehicleRecording(recording, script); }
  hasVehicleRecordingBeenLoaded(recording: number, script: string): boolean { return HasVehicleRecordingBeenLoaded(recording, script); }
  hasRecordingBeenLoaded(recording: number, script: string): boolean { return HasVehicleRecordingBeenLoaded(recording, script); }
  removeVehicleRecording(recording: number, script: string): void { RemoveVehicleRecording(recording, script); }
  removeRecording(recording: number, script: string): void { RemoveVehicleRecording(recording, script); }
  getPositionOfVehicleRecordingAtTime(recording: number, time: number, script: string): Vector3 { return toVec3(GetPositionOfVehicleRecordingAtTime(recording, time, script)); }
  getPositionOfRecordingAtTime(recording: number, time: number, script: string): Vector3 { return toVec3(GetPositionOfVehicleRecordingAtTime(recording, time, script)); }
  getPositionOfRecordingIdAtTime(id: number, time: number): Vector3 { return toVec3(GetPositionOfVehicleRecordingIdAtTime(id, time)); }
  getRotationOfVehicleRecordingAtTime(recording: number, time: number, script: string): Vector3 { return toVec3(GetRotationOfVehicleRecordingAtTime(recording, time, script)); }
  getRotationOfRecordingAtTime(recording: number, time: number, script: string): Vector3 { return toVec3(GetRotationOfVehicleRecordingAtTime(recording, time, script)); }
  getRotationOfRecordingIdAtTime(id: number, time: number): Vector3 { return toVec3(GetRotationOfVehicleRecordingIdAtTime(id, time)); }
  getTotalDurationOfVehicleRecordingId(id: number): number { return GetTotalDurationOfVehicleRecordingId(id); }
  getTotalDurationOfRecordingId(id: number): number { return GetTotalDurationOfVehicleRecordingId(id); }
  getTotalDurationOfVehicleRecording(recording: number, script: string): number { return GetTotalDurationOfVehicleRecording(recording, script); }
  getTotalDurationOfRecording(recording: number, script: string): number { return GetTotalDurationOfVehicleRecording(recording, script); }
  getPositionInRecording(vehicle: number): number { return GetPositionInRecording(vehicle); }
  getTimePositionInRecording(vehicle: number): number { return GetTimePositionInRecording(vehicle); }
  startPlaybackRecordedVehicle(vehicle: number, recording: number, script: string, p3: boolean): void { StartPlaybackRecordedVehicle(vehicle, recording, script, p3); }
  startPlaybackRecorded(vehicle: number, recording: number, script: string, p3: boolean): void { StartPlaybackRecordedVehicle(vehicle, recording, script, p3); }
  startPlaybackRecordedVehicleWithFlags(vehicle: number, recording: number, script: string, flags: number, time: number, drivingStyle: number): void { StartPlaybackRecordedVehicleWithFlags(vehicle, recording, script, flags, time, drivingStyle); }
  startPlaybackRecordedWithFlags(vehicle: number, recording: number, script: string, flags: number, time: number, drivingStyle: number): void { StartPlaybackRecordedVehicleWithFlags(vehicle, recording, script, flags, time, drivingStyle); }
  forcePlaybackRecordedUpdate(vehicle: number, p1: boolean): void { ForcePlaybackRecordedVehicleUpdate(vehicle, p1); } // unverified
  stopPlaybackRecordedVehicle(vehicle: number): void { StopPlaybackRecordedVehicle(vehicle); }
  stopPlaybackRecorded(vehicle: number): void { StopPlaybackRecordedVehicle(vehicle); }
  pausePlaybackRecordedVehicle(vehicle: number): void { PausePlaybackRecordedVehicle(vehicle); }
  pausePlaybackRecorded(vehicle: number): void { PausePlaybackRecordedVehicle(vehicle); }
  unpausePlaybackRecordedVehicle(vehicle: number): void { UnpausePlaybackRecordedVehicle(vehicle); }
  unpausePlaybackRecorded(vehicle: number): void { UnpausePlaybackRecordedVehicle(vehicle); }
  isPlaybackGoingOnForVehicle(vehicle: number): boolean { return IsPlaybackGoingOnForVehicle(vehicle); }
  isPlaybackGoingOnFor(vehicle: number): boolean { return IsPlaybackGoingOnForVehicle(vehicle); }
  isPlaybackUsingAiGoingOnForVehicle(vehicle: number): boolean { return IsPlaybackUsingAiGoingOnForVehicle(vehicle); }
  isPlaybackUsingAiGoingOnFor(vehicle: number): boolean { return IsPlaybackUsingAiGoingOnForVehicle(vehicle); }
  getCurrentPlaybackForVehicle(vehicle: number): number { return GetCurrentPlaybackForVehicle(vehicle); }
  getCurrentPlaybackFor(vehicle: number): number { return GetCurrentPlaybackForVehicle(vehicle); }
  skipToEndAndStopPlaybackRecordedVehicle(vehicle: number): void { SkipToEndAndStopPlaybackRecordedVehicle(vehicle); }
  skipToEndAndStopPlaybackRecorded(vehicle: number): void { SkipToEndAndStopPlaybackRecordedVehicle(vehicle); }
  setPlaybackSpeed(vehicle: number, speed: number): void { SetPlaybackSpeed(vehicle, speed); }
  startPlaybackRecordedVehicleUsingAi(vehicle: number, recording: number, script: string, speed: number, drivingStyle: number): void { StartPlaybackRecordedVehicleUsingAi(vehicle, recording, script, speed, drivingStyle); }
  startPlaybackRecordedUsingAi(vehicle: number, recording: number, script: string, speed: number, drivingStyle: number): void { StartPlaybackRecordedVehicleUsingAi(vehicle, recording, script, speed, drivingStyle); }
  skipTimeInPlaybackRecordedVehicle(vehicle: number, time: number): void { SkipTimeInPlaybackRecordedVehicle(vehicle, time); }
  skipTimeInPlaybackRecorded(vehicle: number, time: number): void { SkipTimeInPlaybackRecordedVehicle(vehicle, time); }
  setPlaybackToUseAi(vehicle: number, drivingStyle: number): void { SetPlaybackToUseAi(vehicle, drivingStyle); }
  setPlaybackToUseAiTryToRevertBackLater(vehicle: number, time: number, drivingStyle: number, p3: boolean): void { SetPlaybackToUseAiTryToRevertBackLater(vehicle, time, drivingStyle, p3); }
  setInactiveDuringPlayback(vehicle: number, toggle: boolean): void { SetVehicleInactiveDuringPlayback(vehicle, toggle); }
  setActiveDuringPlayback(vehicle: number, forceActive: boolean): void { SetVehicleActiveDuringPlayback(vehicle, forceActive); }
  addVehicleStuckCheckWithWarp(vehicle: number, minMoveDist: number, checkFreq: number, wrapIfStucked: boolean, wrapIfUpsideDown: boolean, wrapIfInWater: boolean, wrapMethod: number): void { AddVehicleStuckCheckWithWarp(vehicle, minMoveDist, checkFreq, wrapIfStucked, wrapIfUpsideDown, wrapIfInWater, wrapMethod); }
  addStuckCheckWithWarp(vehicle: number, minMoveDist: number, checkFreq: number, wrapIfstuckFlag: boolean, wrapIfUpsideDown: boolean, wrapIfInWater: boolean, wrapMethod: number): void { AddVehicleStuckCheckWithWarp(vehicle, minMoveDist, checkFreq, wrapIfstuckFlag, wrapIfUpsideDown, wrapIfInWater, wrapMethod); }
  removeVehicleStuckCheck(vehicle: number): void { RemoveVehicleStuckCheck(vehicle); }
  isStuckTimerUp(vehicle: number, stuckType: any, requiredTime: number): boolean { return IsVehicleStuckTimerUp(vehicle, stuckType, requiredTime); }

  getRandomVehicleInSphere(x: number, y: number, z: number, radius: number, modelHash: number, flags: number): number { return GetRandomVehicleInSphere(x, y, z, radius, modelHash, flags); }
  getRandomFrontBumperInSphere(x: number, y: number, z: number, radius: number, model: number, searchFlag: number, ignoreVehicle: number): number { return GetRandomVehicleFrontBumperInSphere(x, y, z, radius, model, searchFlag, ignoreVehicle); }
  getRandomVehicleFrontBumperInSphere(x: number, y: number, z: number, radius: number, model: number, searchFlag: number, ignoreVehicle: number): number { return GetRandomVehicleFrontBumperInSphere(x, y, z, radius, model, searchFlag, ignoreVehicle); }
  getRandomBackBumperInSphere(x: number, y: number, z: number, radius: number, model: number, searchFlag: number, ignoreVehicle: number): number { return GetRandomVehicleBackBumperInSphere(x, y, z, radius, model, searchFlag, ignoreVehicle); }
  getRandomVehicleBackBumperInSphere(x: number, y: number, z: number, radius: number, model: number, searchFlag: number, ignoreVehicle: number): number { return GetRandomVehicleBackBumperInSphere(x, y, z, radius, model, searchFlag, ignoreVehicle); }
  getClosestVehicle(x: number, y: number, z: number, radius: number, modelHash: number, flags: number): number { return GetClosestVehicle(x, y, z, radius, modelHash, flags); }
  isAnyVehicleNearPoint(x: number, y: number, z: number, radius: number): boolean { return IsAnyVehicleNearPoint(x, y, z, radius); }
  getRandomVehicleModelInMemory(normalCars: boolean): { modelHash: number; successIndicator: number } {
    const r = GetRandomVehicleModelInMemory(normalCars);
    return { modelHash: (r as any)[1], successIndicator: (r as any)[2] };
  }
  getRandomModelInMemory(normalCars: boolean): { modelHash: number; successIndicator: number } {
    const r = GetRandomVehicleModelInMemory(normalCars);
    return { modelHash: (r as any)[1], successIndicator: (r as any)[2] };
  }
  getAllS(): { vehsStruct: number; result: number } {
    const r: any = (GetAllVehicles as any)();
    return Array.isArray(r) ? { vehsStruct: r[1], result: r[0] } : { vehsStruct: r, result: r };
  }

  createMissionTrain(variation: number, x: number, y: number, z: number, direction: boolean): number { return (CreateMissionTrain as any)(variation, x, y, z, direction, 0, 0); }
  switchTrainTrack(trackId: number, state: boolean): void { SwitchTrainTrack(trackId, state); }
  setTrainTrackSpawnFrequency(trackIndex: number, frequency: number): void { SetTrainTrackSpawnFrequency(trackIndex, frequency); }
  deleteAllTrains(): void { DeleteAllTrains(); }
  deleteMissionTrain(train: number): number { return (DeleteMissionTrain as any)(train); }
  setMissionTrainAsNoLongerNeeded(train: number, p1: boolean): number { return (SetMissionTrainAsNoLongerNeeded as any)(train, p1); }
  setRandomTrains(toggle: boolean): void { SetRandomTrains(toggle); }

  setRandomBoats(toggle: boolean): void { SetRandomBoats(toggle); }
  setRandomBoatsInMp(random: boolean): void { SetRandomBoatsMp(random); } // unverified
  setGarbageTrucks(toggle: boolean): void { SetGarbageTrucks(toggle); }
  stopAllGarageActivity(): void { StopAllGarageActivity(); }

  rollDownWindows(vehicle: number): void { RollDownWindows(vehicle); }
  popOutWindscreen(vehicle: number): void { PopOutVehicleWindscreen(vehicle); }
  ejectJb700Roof(vehicle: number, x: number, y: number, z: number): void { EjectJb700Roof(vehicle, x, y, z); } // unverified
  areAllWindowsIntact(vehicle: number): boolean { return AreAllVehicleWindowsIntact(vehicle); }
  setDisableWindowCollisions(vehicle: number, toggle: boolean): void { SetDisableVehicleWindowCollisions(vehicle, toggle); } // unverified

  setLightsMode(vehicle: number, p1: number): void { SetVehicleLightsMode(vehicle, p1); } // unverified
  startAlarm(vehicle: number): void { StartVehicleAlarm(vehicle); }
  disableNeonLights(vehicle: number, toggle: boolean): void { SetVehicleNeonLightsDisabled(vehicle, toggle); } // unverified

  bringToHalt(vehicle: number, distance: number, duration: number, unknown: boolean): void { BringVehicleToHalt(vehicle, distance, duration, unknown); }
  stopBringToHalt(vehicle: number): void { StopBringingVehicleToHalt(vehicle); } // unverified
  isBeingHalted(vehicle: number): boolean { return IsVehicleBeingBroughtToHalt(vehicle); }

  areAnySeatsFree(vehicle: number): boolean { return AreAnyVehicleSeatsFree(vehicle); }
  getLastPedInSeat(vehicle: number, seatIndex: number): number { return GetLastPedInVehicleSeat(vehicle, seatIndex); }
  isSeatAccessible(ped: number, vehicle: number, seatIndex: number, side: boolean, onEnter: boolean): boolean { return IsVehicleSeatAccessible(ped, vehicle, seatIndex, side, onEnter); } // unverified
  getEntryPositionOfDoor(vehicle: number, doorIndex: number): Vector3 { return toVec3(GetEntryPositionOfDoor(vehicle, doorIndex)); } // unverified

  findCarryingThisEntity(entity: number): number { return FindVehicleCarryingThisEntity(entity); } // unverified
  isHandlerFrameAboveContainer(vehicle: number, entity: number): boolean { return IsHandlerFrameAboveContainer(vehicle, entity); } // unverified

  getModelMonetaryValue(vehicleModel: number): number { return GetVehicleModelMonetaryValue(vehicleModel); } // unverified
  getMakeNameFromModel(modelHash: number): string { return GetMakeNameFromVehicleModel(modelHash); }
  getModelEstimatedAgility(modelHash: number): number { return GetVehicleModelEstimatedAgility(modelHash); } // unverified
  getModelMaxKnots(modelHash: number): number { return GetVehicleModelMaxKnots(modelHash); } // unverified
  getModelMoveResistance(modelHash: number): number { return GetVehicleModelMoveResistance(modelHash); } // unverified

  getNumMods(vehicle: number, modType: number): number { return GetNumVehicleMods(vehicle, modType); }
  getModColor1(vehicle: number): { paintType: number; color: number; pearlescentColor: number } {
    const r = GetVehicleModColor_1(vehicle);
    return { paintType: r[0], color: r[1], pearlescentColor: r[2] };
  }
  getModColor2(vehicle: number): { paintType: number; color: number } {
    const r = GetVehicleModColor_2(vehicle);
    return { paintType: r[0], color: r[1] };
  }
  getModColor1Name(vehicle: number, spec: boolean): string { return GetVehicleModColor_1Name(vehicle, spec); }
  getModColor2Name(vehicle: number): string { return GetVehicleModColor_2Name(vehicle); }

  setRoofLivery(vehicle: number, livery: number): void { SetVehicleRoofLivery(vehicle, livery); } // unverified
  getRoofLivery(vehicle: number): number { return GetVehicleRoofLivery(vehicle); } // unverified
  getRoofLiveryCount(vehicle: number): number { return GetVehicleRoofLiveryCount(vehicle); } // unverified

  isDamaged(vehicle: number): boolean { return IsVehicleDamaged(vehicle); }
  getNumberOfBrokenOffBones(vehicle: number): number { return GetNumberOfVehicleBrokenOffBones(vehicle); } // unverified
  getNumberOfBrokenBones(vehicle: number): number { return GetNumberOfVehicleBrokenBones(vehicle); } // unverified
  getBodyHealth2(vehicle: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number): number { return GetVehicleBodyHealth2(vehicle, p1, p2, p3, p4, p5, p6); } // unverified
  getIsLeftHeadlightDamaged(vehicle: number): boolean { return GetIsLeftVehicleHeadlightDamaged(vehicle); }
  getIsRightHeadlightDamaged(vehicle: number): boolean { return GetIsRightVehicleHeadlightDamaged(vehicle); }
  isEngineOnFire(vehicle: number): boolean { return IsVehicleEngineOnFire(vehicle); } // unverified
  setCanEngineOperateOnFire(vehicle: number, toggle: boolean): void { SetVehicleCanEngineOperateOnFire(vehicle, toggle); } // unverified
  setDisablePetrolTankFires(vehicle: number, toggle: boolean): void { SetVehicleDisablePetrolTankFires(vehicle, toggle); } // unverified
  setDisablePetrolTankDamage(vehicle: number, toggle: boolean): void { SetVehicleDisablePetrolTankDamage(vehicle, toggle); } // unverified
  setDisableEngineFires(vehicle: number, toggle: boolean): void { SetVehicleDisableEngineFires(vehicle, toggle); } // unverified
  setDisablePretendOccupants(vehicle: number, toggle: boolean): void { SetDisablePretendOccupants(vehicle, toggle); }
  setDamageModifier(vehicle: number, p1: number): number { return SetVehicleDamageModifier(vehicle, p1); } // unverified
  setUnkDamageMultiplier(vehicle: number, multiplier: number): void { SetVehicleUnkDamageMultiplier(vehicle, multiplier); } // unverified

  doesTyreExist(vehicle: number, tyreIndex: number): boolean { return DoesVehicleTyreExist(vehicle, tyreIndex); } // unverified
  setCamberedWheelsDisabled(vehicle: number, canUse: boolean): void { SetCamberedWheelsDisabled(vehicle, canUse); } // unverified
  setWheelsDealDamage(vehicle: number, toggle: boolean): void { SetVehicleWheelsDealDamage(vehicle, toggle); } // unverified
  getWheelGroundSurfaceMaterial(wheelIndex: number): number { return GetVehicleWheelGroundSurfaceMaterial(wheelIndex); } // unverified
  setReduceTraction(vehicle: number, val: number): void { SetVehicleReduceTraction(vehicle, val); } // unverified

  setHydraulicWheelValue(vehicle: number, wheelId: number, value: number): void { SetHydraulicSuspensionRaiseFactor(vehicle, wheelId, value); }
  getHydraulicWheelValue(handle: number, wheelIndex: number): number { return GetHydraulicSuspensionRaiseFactor(handle, wheelIndex); }
  setHydraulicWheelState(vehicle: number, wheelIndex: number): void { SetHydraulicVehicleState(vehicle, wheelIndex); }
  setHydraulicWheelStateTransition(vehicle: number, wheelId: number, state: number, value: number, p4: number): void { SetHydraulicWheelStateTransition(vehicle, wheelId, state, value, p4); } // unverified

  doesHaveLandingGear(vehicle: number): boolean { return GetDoesVehicleHaveLandingGear(vehicle); } // unverified
  disablePlanePropeller(vehicle: number, p1: number): void { DisableIndividualPlanePropeller(vehicle, p1); }
  setPlanePropellersHealth(handle: number, health: number): boolean { return SetPlanePropellerHealth(handle, health); }
  arePlaneWingsIntact(plane: number): boolean { return ArePlaneWingsIntact(plane); } // unverified
  setDisableFlightNozzlePosition(vehicle: number, toggle: boolean): void { SetDisableVehicleFlightNozzlePosition(vehicle, toggle); } // unverified
  setTaskGotoPlaneMinHeightAboveTerrain(plane: number, height: number): void { SetTaskGotoVehiclePlaneMinHeightAboveTerrain(plane, height); } // unverified
  areBombBayDoorsOpen(aircraft: number): boolean { return GetAreBombBayDoorsOpen(aircraft); }
  setBombCount(vehicle: number, bombCount: number): void { SetVehicleBombAmmo(vehicle, bombCount); }
  getBombCount(vehicle: number): number { return GetVehicleBombAmmo(vehicle); }
  setCountermeasureCount(vehicle: number, counterMeasureCount: number): void { SetVehicleCountermeasureAmmo(vehicle, counterMeasureCount); }
  getCountermeasureCount(vehicle: number): number { return GetVehicleCountermeasureAmmo(vehicle); }

  setHeliTailExplodeThrowDashboard(vehicle: number, p1: boolean): void { SetHeliTailExplodeThrowDashboard(vehicle, p1); } // unverified
  setDeployHeliStubWings(vehicle: number, deploy: boolean, p2: boolean): void { SetDeployHeliStubWings(vehicle, deploy, p2); } // unverified
  areHeliStubWingsDeployed(vehicle: number): boolean { return AreHeliStubWingsDeployed(vehicle); } // unverified
  setSpecialflightWingRatio(vehicle: number, ratio: number): void { SetSpecialFlightModeWingRatio(vehicle, ratio); } // unverified

  setOppressorTransformState(vehicle: number, state: boolean): void { SetOppressorTransformState(vehicle, state); } // unverified
  setHoverTransformRatio(vehicle: number, ratio: number): void { SetSpecialFlightModeRatio(vehicle, ratio); }
  setHoverTransformPercentage(vehicle: number, percentage: number): void { SetSpecialFlightModeTargetRatio(vehicle, percentage); }
  setHoverTransformEnabled(vehicle: number, toggle: boolean): void { SetDisableHoverModeFlight(vehicle, !toggle); }
  setHoverTransformActive(vehicle: number, toggle: boolean): void { SetSpecialFlightModeAllowed(vehicle, toggle); }

  setRocketBoostRefillTime(vehicle: number, seconds: number): void { SetScriptRocketBoostRechargeTime(vehicle, seconds); }
  setRocketBoostPercentage(vehicle: number, percentage: number): void { SetRocketBoostFill(vehicle, percentage); }
  setNitroEnabled(vehicle: number, toggle: boolean, level: number, power: number, rechargeTime: number, disableSound: boolean): void { (SetOverrideNitrousLevel as any)(vehicle, toggle, level, power, rechargeTime, disableSound); }
  getIsShuntBoostActive(vehicle: number): boolean { return GetIsVehicleShunting(vehicle); }
  getLastRammed(vehicle: number): number { return GetLastRammedVehicle(vehicle); } // unverified
  getIsEmpDisabled(vehicle: number): boolean { return GetIsVehicleDisabledByEmp(vehicle); }

  getIsWheelsLoweredStateActive(vehicle: number): boolean { return GetIsWheelsLoweredStateActive(vehicle); } // unverified
  raiseRetractableWheels(vehicle: number): void { RaiseRetractableWheels(vehicle); } // unverified
  lowerRetractableWheels(vehicle: number): void { LowerRetractableWheels(vehicle); } // unverified
  getCanJump(vehicle: number): boolean { return GetCanVehicleJump(vehicle); } // unverified
  setUseHigherJumpForce(vehicle: number, toggle: boolean): void { SetUseHigherVehicleJumpForce(vehicle, toggle); } // unverified

  setWeaponCapacity(vehicle: number, weaponIndex: number, capacity: number): void { SetVehicleWeaponCapacity(vehicle, weaponIndex, capacity); } // unverified
  getWeaponCapacity(vehicle: number, weaponIndex: number): number { return GetVehicleWeaponCapacity(vehicle, weaponIndex); } // unverified
  setWeaponsDisabled(vehicle: number, canTargetObjects: number): void { SetVehicleWeaponsDisabled(vehicle, canTargetObjects); } // unverified

  getCanActivateParachute(vehicle: number): boolean { return GetVehicleCanActivateParachute(vehicle); } // unverified
  setParachuteActive(vehicle: number, active: boolean): void { SetVehicleParachuteActive(vehicle, active); } // unverified
  setParachuteModel(vehicle: number, modelHash: number): void { VehicleSetParachuteModelOverride(vehicle, modelHash); }
  setParachuteTextureVariatiion(vehicle: number, textureVariation: number): void { VehicleSetParachuteModelTintIndex(vehicle, textureVariation); }
  setParachuteTextureVariation(handle: number, index: number): void { VehicleSetParachuteModelTintIndex(handle, index); }

  setReceivesRampDamage(vehicle: number, toggle: boolean): void { SetVehicleReceivesRampDamage(vehicle, toggle); } // unverified
  setRampLaunchModifier(vehicle: number, impulseScale: number): void { SetVehicleRampLaunchModifier(vehicle, impulseScale); } // unverified
  setRampSidewaysLaunchMotion(vehicle: number, takeDamage: number): void { SetVehicleRampSidewaysLaunchMotion(vehicle, takeDamage as any); } // unverified
  setRampUpwardsLaunchMotion(vehicle: number, normalise: number): void { SetVehicleRampUpwardsLaunchMotion(vehicle, normalise as any); } // unverified

  setCargobobHookPosition(cargobob: number, length1: number, length2: number, p3: boolean): void { SetCargobobHookPosition(cargobob, length1, length2, p3); } // unverified
  getCargobobHookPosition(cargobob: number): Vector3 { return toVec3(GetCargobobHookPosition(cargobob)); } // unverified
  setCargobobHookCanDetach(cargobob: number, toggle: boolean): void { SetCargobobHookCanDetach(cargobob, toggle); } // unverified
  setCargobobHookCanAttach(vehicle: number, toggle: boolean): void { SetCargobobHookCanAttach(vehicle, toggle); } // unverified
  setCargobobPickupMagnetEffectRadius(cargobob: number, radius: number): void { SetCargobobPickupMagnetEffectRadius(cargobob, radius); } // unverified

  setShadowEffect(vehicle: number, p1: number, p2: number): void { SetVehicleShadowEffect(vehicle, p1, p2); } // unverified
  removeShadowEffect(vehicle: number): void { RemoveVehicleShadowEffect(vehicle); } // unverified
  requestDashboardScaleformMovie(vehicle: number): void { RequestVehicleDashboardScaleformMovie(vehicle); } // unverified

  getSuspensionBounds(vehicle: number): { out1: Vector3; out2: Vector3 } {
    const r = GetVehicleSuspensionBounds(vehicle); // unverified
    return { out1: toVec3(r[0]), out2: toVec3(r[1]) };
  }
  getSuspensionHeight(vehicle: number): number { return GetVehicleSuspensionHeight(vehicle); } // unverified

  setEnableSlipstreaming(toggle: boolean): void { SetEnableVehicleSlipstreaming(toggle); }
  getCurrentSlipstreamDraft(vehicle: number): number { return GetVehicleCurrentSlipstreamDraft(vehicle); } // unverified
  isSlipstreamLeader(vehicle: number): boolean { return IsVehicleSlipstreamLeader(vehicle); } // unverified
  isSprayable(vehicle: number): boolean { return IsVehicleSprayable(vehicle); }

  setSilent(vehicle: number, toggle: boolean): void { SetVehicleSilent(vehicle, toggle); } // unverified
  setJetEngineOn(vehicle: number, toggle: boolean): void { SetVehicleJetEngineOn(vehicle, toggle); } // unverified
  setHandlingHashForAi(vehicle: number, hash: number): void { SetVehicleHandlingHashForAi(vehicle, hash); } // unverified
  setSteeringBiasScalar(vehicle: number, scalar: number): void { SetVehicleSteeringBiasScalar(vehicle, scalar); }
  setControlsInverted(vehicle: number, state: boolean): void { SetVehicleControlsInverted(vehicle, state); } // unverified
  disableWorldCollision(vehicle: number): void { DisableVehicleWorldCollision(vehicle); } // unverified
  setExperimentalAttachmentSyncEnabled(enable: boolean): void { SetVehicleExperimentalAttachmentSyncEnabled(enable); } // unverified
  setExperimentalHornSyncEnabled(enable: boolean): void { SetVehicleExperimentalHornSyncEnabled(enable); } // unverified
  setDisableSuperdummyMode(vehicle: number, p1: boolean): void { SetVehicleDisableSuperdummyMode(vehicle, p1); } // unverified
  getDoesHaveTombstone(vehicle: number): boolean { return GetDoesVehicleHaveTombstone(vehicle); } // unverified
  isPedExclusiveDriverOf(ped: number, vehicle: number): number { return IsPedExclusiveDriverOfVehicle(ped, vehicle) as any; } // unverified
  setResetUnoccupiedSteerAngle(value: boolean): void { SetVehicleResetUnoccupiedSteerAngle(value); } // unverified
  setTurretUnk(vehicle: number, index: number, toggle: boolean): void { SetVehicleTurretUnk(vehicle, index, toggle); } // unverified
  setDisableTurretMovementThisFrame(vehicle: number, turretId: number): void { DisableVehicleTurretMovementThisFrame(vehicle); }
  setUnkFloat0X104ForSubmarineTask(vehicle: number, value: number): void { SetUnkFloat0x104ForVehicleSubmarineTask(vehicle, value); } // unverified
  setUnkBool0X102ForSubmarineTask(vehicle: number, value: boolean): void { SetUnkBool0x102ForVehicleSubmarineTask(vehicle, value); } // unverified
  setDisableUnk(toggle: boolean): void { SetVehicleDisableUnk(toggle); } // unverified
  setDisableUnk2(toggle: boolean): void { SetVehicleDisableUnk2(toggle); } // unverified
  overrideOverheatHealth(handle: number, value: number): void { OverrideVehicleOverheatHealth(handle, value); } // unverified
  findRandomPointInSpace(ped: number): Vector3 { return toVec3(FindRandomPointInSpace(ped)); } // unverified

  isCopInArea3D(x1: number, x2: number, y1: number, y2: number, z1: number, z2: number): boolean { return IsCopVehicleInArea3d(x1, x2, y1, y2, z1, z2); }
  isCopVehicleInArea3d(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): boolean { return IsCopVehicleInArea3d(x1, y1, z1, x2, y2, z2); }
  addCombatAngledAvoidanceArea(startX: number, startY: number, startZ: number, endX: number, endY: number, endZ: number, width: number): number { return AddVehicleCombatAngledAvoidanceArea(startX, startY, startZ, endX, endY, endZ, width); }
  removeCombatAvoidanceArea(index: number): void { RemoveVehicleCombatAvoidanceArea(index); }
  addRoadNodeSpeedZone(x: number, y: number, z: number, radius: number, speed: number, p5: boolean): number { return AddRoadNodeSpeedZone(x, y, z, radius, speed, p5); }
  removeRoadNodeSpeedZone(speedzone: number): boolean { return RemoveRoadNodeSpeedZone(speedzone); }

  attachOnToTrailer(vehicle: number, trailer: number, offsetX: number, offsetY: number, offsetZ: number, coordsX: number, coordsY: number, coordsZ: number, rotationX: number, rotationY: number, rotationZ: number, disableCollisions: number): void {
    AttachVehicleOnToTrailer(vehicle, trailer, offsetX, offsetY, offsetZ, coordsX, coordsY, coordsZ, rotationX, rotationY, rotationZ, disableCollisions);
  }
  setAutomaticallyAttaches(vehicle: number, autoAttach: boolean, scanWithNonPlayerDriver: boolean): number { return (SetVehicleAutomaticallyAttaches as any)(vehicle, autoAttach, scanWithNonPlayerDriver); }

  createDriveForceCurve(curveNameHash: number, curveData: Array<number>): void { CreateVehicleDriveForceCurve(curveNameHash, curveData); } // unverified
  getDriveForceCurveValue(curveNameHash: number, input: number): number { return GetVehicleDriveForceCurveValue(curveNameHash, input); } // unverified
  deleteDriveForceCurve(curveNameHash: number): void { DeleteVehicleDriveForceCurve(curveNameHash); } // unverified
  setModelDriveForceCurve(vehicleModelHash: number, curveNameHash: number): void { SetVehicleModelDriveForceCurve(vehicleModelHash, curveNameHash); } // unverified
  setModelGearRatios(vehicleModelHash: number, ratios: Array<number>): void { SetVehicleModelGearRatios(vehicleModelHash, ratios); } // unverified
  setGearRatios(ratios: Array<number>): void { SetVehicleGearRatios(ratios); } // unverified

  setDriftTyresEnabled(handle: number, enable: boolean): void { SetDriftTyres(handle, enable); }
  getDriftTyresEnabled(handle: number): boolean { return GetDriftTyresSet(handle); }

  requestVehicleAssetAsync(vehicleHash: number, flags: number, timeout?: number): Promise<boolean> { return RequestVehicleAssetAsync(vehicleHash, flags, timeout); } // unverified
  isVehicleInGarageArea(garageName: string, vehicle: number): boolean { return IsVehicleInGarageArea(garageName, vehicle); }
  isInGarageArea(garageName: string, vehicle: number): boolean { return IsVehicleInGarageArea(garageName, vehicle); }
  isThisModelAnEmergencyBoat(model: number): boolean { return IsThisModelAnEmergencyBoat(model); } // unverified

  get passengerMassMultiplier() { return GetGlobalPassengerMassMultiplier(); }
  set passengerMassMultiplier(massMul: number) { SetGlobalPassengerMassMultiplier(massMul); }

  ["_0x7D6F9A3EF26136A0"](...args: any[]): any { return Citizen.invokeNative("0x7D6F9A3EF26136A0", ...args); }
  ["_0x6EAAEFC76ACC311F"](...args: any[]): any { return Citizen.invokeNative("0x6EAAEFC76ACC311F", ...args); }
  ["_0x407DC5E97DB1A4D3"](...args: any[]): any { return Citizen.invokeNative("0x407DC5E97DB1A4D3", ...args); }
  ["_0x9A75585FB2E54FAD"](...args: any[]): any { return Citizen.invokeNative("0x9A75585FB2E54FAD", ...args); }
  ["_0x0A436B8643716D14"](...args: any[]): any { return Citizen.invokeNative("0x0A436B8643716D14", ...args); }
  ["_0x76D26A22750E849E"](...args: any[]): any { return Citizen.invokeNative("0x76D26A22750E849E", ...args); }
  ["_0xAB31EF4DE6800CE9"](...args: any[]): any { return Citizen.invokeNative("0xAB31EF4DE6800CE9", ...args); }
  ["_0x1B212B26DD3C04DF"](...args: any[]): any { return Citizen.invokeNative("0x1B212B26DD3C04DF", ...args); }
  ["_0xC67DB108A9ADE3BE"](...args: any[]): any { return Citizen.invokeNative("0xC67DB108A9ADE3BE", ...args); }
  ["_0xED5EDE9E676643C9"](...args: any[]): any { return Citizen.invokeNative("0xED5EDE9E676643C9", ...args); }
  ["_0xB28B1FE5BFADD7F5"](...args: any[]): any { return Citizen.invokeNative("0xB28B1FE5BFADD7F5", ...args); }
  ["_0x6501129C9E0FFA05"](...args: any[]): any { return Citizen.invokeNative("0x6501129C9E0FFA05", ...args); }
  ["_0xDCE97BDF8A0EABC8"](...args: any[]): any { return Citizen.invokeNative("0xDCE97BDF8A0EABC8", ...args); }
  ["_0x9849DE24FCF23CCC"](...args: any[]): any { return Citizen.invokeNative("0x9849DE24FCF23CCC", ...args); }
  ["_0x8664170EF165C4A6"](...args: any[]): any { return Citizen.invokeNative("0x8664170EF165C4A6", ...args); }
  ["_0x6A98C2ECF57FA5D4"](...args: any[]): any { return Citizen.invokeNative("0x6A98C2ECF57FA5D4", ...args); }
  ["_0x8AA9180DE2FEDD45"](...args: any[]): any { return Citizen.invokeNative("0x8AA9180DE2FEDD45", ...args); }
  ["_0x107A473D7A6647A9"](...args: any[]): any { return Citizen.invokeNative("0x107A473D7A6647A9", ...args); }
  ["_0x3B458DDB57038F08"](...args: any[]): any { return Citizen.invokeNative("0x3B458DDB57038F08", ...args); }
  ["_0xA247F9EF01D8082E"](...args: any[]): any { return Citizen.invokeNative("0xA247F9EF01D8082E", ...args); }
  ["_0x8821196D91FA2DE5"](...args: any[]): any { return Citizen.invokeNative("0x8821196D91FA2DE5", ...args); }
  ["_0x5845066D8A1EA7F7"](...args: any[]): any { return Citizen.invokeNative("0x5845066D8A1EA7F7", ...args); }
  ["_0x796A877E459B99EA"](...args: any[]): any { return Citizen.invokeNative("0x796A877E459B99EA", ...args); }
  ["_0xFAF2A78061FD9EF4"](...args: any[]): any { return Citizen.invokeNative("0xFAF2A78061FD9EF4", ...args); }
  ["_0x063AE2B2CC273588"](...args: any[]): any { return Citizen.invokeNative("0x063AE2B2CC273588", ...args); }
  ["_0x99CAD8E7AFDB60FA"](...args: any[]): any { return Citizen.invokeNative("0x99CAD8E7AFDB60FA", ...args); }
  ["_0xDBC631F109350B8C"](...args: any[]): any { return Citizen.invokeNative("0xDBC631F109350B8C", ...args); }
  ["_0x2311DD7159F00582"](...args: any[]): any { return Citizen.invokeNative("0x2311DD7159F00582", ...args); }
  ["_0x065D03A9D6B2C6B5"](...args: any[]): any { return Citizen.invokeNative("0x065D03A9D6B2C6B5", ...args); }
  ["_0xC4B3347BD68BD609"](...args: any[]): any { return Citizen.invokeNative("0xC4B3347BD68BD609", ...args); }
  ["_0xD3301660A57C9272"](...args: any[]): any { return Citizen.invokeNative("0xD3301660A57C9272", ...args); }
  ["_0xB9562064627FF9DB"](...args: any[]): any { return Citizen.invokeNative("0xB9562064627FF9DB", ...args); }
  ["_0xBE5C1255A1830FF5"](...args: any[]): any { return Citizen.invokeNative("0xBE5C1255A1830FF5", ...args); }
  ["_0x9BECD4B9FEF3F8A6"](...args: any[]): any { return Citizen.invokeNative("0x9BECD4B9FEF3F8A6", ...args); }
  ["_0x88BC673CA9E0AE99"](...args: any[]): any { return Citizen.invokeNative("0x88BC673CA9E0AE99", ...args); }
  ["_0xE851E480B814D4BA"](...args: any[]): any { return Citizen.invokeNative("0xE851E480B814D4BA", ...args); }
  ["_0xA01BC64DD4BFBBAC"](...args: any[]): any { return Citizen.invokeNative("0xA01BC64DD4BFBBAC", ...args); }
  ["_0xC50CE861B55EAB8B"](...args: any[]): any { return Citizen.invokeNative("0xC50CE861B55EAB8B", ...args); }
  ["_0x6EBFB22D646FFC18"](...args: any[]): any { return Citizen.invokeNative("0x6EBFB22D646FFC18", ...args); }
  ["_0x35BB21DE06784373"](...args: any[]): any { return Citizen.invokeNative("0x35BB21DE06784373", ...args); }
  ["_0x9F3F689B814F2599"](...args: any[]): any { return Citizen.invokeNative("0x9F3F689B814F2599", ...args); }
  ["_0x4E74E62E0A97E901"](...args: any[]): any { return Citizen.invokeNative("0x4E74E62E0A97E901", ...args); }
  ["_0x4056EA1105F5ABD7"](...args: any[]): any { return Citizen.invokeNative("0x4056EA1105F5ABD7", ...args); }
  ["_0xD565F438137F0E10"](...args: any[]): any { return Citizen.invokeNative("0xD565F438137F0E10", ...args); }
  ["_0x3441CAD2F2231923"](...args: any[]): any { return Citizen.invokeNative("0x3441CAD2F2231923", ...args); }
  ["_0x0581730AB9380412"](...args: any[]): any { return Citizen.invokeNative("0x0581730AB9380412", ...args); }
  ["_0x737E398138550FFF"](...args: any[]): any { return Citizen.invokeNative("0x737E398138550FFF", ...args); }
  ["_0xA4822F1CF23F4810"](...args: any[]): any { return Citizen.invokeNative("0xA4822F1CF23F4810", ...args); }
  ["_0x51DB102F4A3BA5E0"](...args: any[]): any { return Citizen.invokeNative("0x51DB102F4A3BA5E0", ...args); }
  ["_0xA4A9A4C40E615885"](...args: any[]): any { return Citizen.invokeNative("0xA4A9A4C40E615885", ...args); }
  ["_0xEEBFC7A7EFDC35B4"](...args: any[]): any { return Citizen.invokeNative("0xEEBFC7A7EFDC35B4", ...args); }
  ["_0x5EE5632F47AE9695"](...args: any[]): any { return Citizen.invokeNative("0x5EE5632F47AE9695", ...args); }
  ["_0x1CF38D529D7441D9"](...args: any[]): any { return Citizen.invokeNative("0x1CF38D529D7441D9", ...args); }
  ["_0x1F9FB66F3A3842D2"](...args: any[]): any { return Citizen.invokeNative("0x1F9FB66F3A3842D2", ...args); }
  ["_0x59C3757B3B7408E8"](...args: any[]): any { return Citizen.invokeNative("0x59C3757B3B7408E8", ...args); }
  ["_0x0AD9E8F87FF7C16F"](...args: any[]): any { return Citizen.invokeNative("0x0AD9E8F87FF7C16F", ...args); }
  ["_0xAB04325045427AAE"](...args: any[]): any { return Citizen.invokeNative("0xAB04325045427AAE", ...args); }
  ["_0xCFD778E7904C255E"](...args: any[]): any { return Citizen.invokeNative("0xCFD778E7904C255E", ...args); }
  ["_0x4D9D109F63FEE1D4"](...args: any[]): any { return Citizen.invokeNative("0x4D9D109F63FEE1D4", ...args); }
  ["_0x279D50DE5652D935"](...args: any[]): any { return Citizen.invokeNative("0x279D50DE5652D935", ...args); }
  ["_0xF25E02CB9C5818F8"](...args: any[]): any { return Citizen.invokeNative("0xF25E02CB9C5818F8", ...args); }
  ["_0x182F266C2D9E2BEB"](...args: any[]): any { return Citizen.invokeNative("0x182F266C2D9E2BEB", ...args); }
  ["_0xF051D9BFB6BA39C0"](...args: any[]): any { return Citizen.invokeNative("0xF051D9BFB6BA39C0", ...args); }
  ["_0x4C815EB175086F84"](...args: any[]): any { return Citizen.invokeNative("0x4C815EB175086F84", ...args); }
  ["_0xB264C4D2F2B0A78B"](...args: any[]): any { return Citizen.invokeNative("0xB264C4D2F2B0A78B", ...args); }
  ["_0x1F34B0626C594380"](...args: any[]): any { return Citizen.invokeNative("0x1F34B0626C594380", ...args); }
  ["_0x2C1D8B3B19E517CC"](...args: any[]): any { return Citizen.invokeNative("0x2C1D8B3B19E517CC", ...args); }
  ["_0xC0ED6438E6D39BA8"](...args: any[]): any { return Citizen.invokeNative("0xC0ED6438E6D39BA8", ...args); }
  ["_0x9BDDC73CC6A115D4"](...args: any[]): any { return Citizen.invokeNative("0x9BDDC73CC6A115D4", ...args); }
  ["_0x56EB5E94318D3FB6"](...args: any[]): any { return Citizen.invokeNative("0x56EB5E94318D3FB6", ...args); }
  ["_0x2C4A1590ABF43E8B"](...args: any[]): any { return Citizen.invokeNative("0x2C4A1590ABF43E8B", ...args); }
  ["_0xE05DD0E9707003A3"](...args: any[]): any { return Citizen.invokeNative("0xE05DD0E9707003A3", ...args); }
  ["_0xE5810AC70602F2F5"](...args: any[]): any { return Citizen.invokeNative("0xE5810AC70602F2F5", ...args); }
  ["_0x6A973569BA094650"](...args: any[]): any { return Citizen.invokeNative("0x6A973569BA094650", ...args); }
  ["_0xF78F94D60248C737"](...args: any[]): any { return Citizen.invokeNative("0xF78F94D60248C737", ...args); }
  ["_0x5E569EC46EC21CAE"](...args: any[]): any { return Citizen.invokeNative("0x5E569EC46EC21CAE", ...args); }
  ["_0x41062318F23ED854"](...args: any[]): any { return Citizen.invokeNative("0x41062318F23ED854", ...args); }
  ["_0x4AD280EB48B2D8E6"](...args: any[]): any { return Citizen.invokeNative("0x4AD280EB48B2D8E6", ...args); }
  ["_0xB68CFAF83A02768D"](...args: any[]): any { return Citizen.invokeNative("0xB68CFAF83A02768D", ...args); }
  ["_0x0205F5365292D2EB"](...args: any[]): any { return Citizen.invokeNative("0x0205F5365292D2EB", ...args); }
  ["_0xCF9159024555488C"](...args: any[]): any { return Citizen.invokeNative("0xCF9159024555488C", ...args); }
  ["_0xB93B2867F7B479D1"](...args: any[]): any { return Citizen.invokeNative("0xB93B2867F7B479D1", ...args); }
  ["_0x35E0654F4BAD7971"](...args: any[]): any { return Citizen.invokeNative("0x35E0654F4BAD7971", ...args); }
  ["_0xA7DCDF4DED40A8F4"](...args: any[]): any { return Citizen.invokeNative("0xA7DCDF4DED40A8F4", ...args); }
  ["_0xD4C4642CB7F50B5D"](...args: any[]): any { return Citizen.invokeNative("0xD4C4642CB7F50B5D", ...args); }
  ["_0xC361AA040D6637A8"](...args: any[]): any { return Citizen.invokeNative("0xC361AA040D6637A8", ...args); }
  ["_0xE16142B94664DEFD"](...args: any[]): any { return Citizen.invokeNative("0xE16142B94664DEFD", ...args); }
  ["_0x26D99D5A82FD18E8"](...args: any[]): any { return Citizen.invokeNative("0x26D99D5A82FD18E8", ...args); }
  ["_0x5BA68A0840D546AC"](...args: any[]): any { return Citizen.invokeNative("0x5BA68A0840D546AC", ...args); }
  ["_0x4419966C9936071A"](...args: any[]): any { return Citizen.invokeNative("0x4419966C9936071A", ...args); }
  ["_0x870B8B7A766615C8"](...args: any[]): any { return Citizen.invokeNative("0x870B8B7A766615C8", ...args); }
  ["_0x8533CAFDE1F0F336"](...args: any[]): any { return Citizen.invokeNative("0x8533CAFDE1F0F336", ...args); }
  ["_0xD4196117AF7BB974"](...args: any[]): any { return Citizen.invokeNative("0xD4196117AF7BB974", ...args); }
  ["_0xBB2333BB87DDD87F"](...args: any[]): any { return Citizen.invokeNative("0xBB2333BB87DDD87F", ...args); }
  ["_0x73561D4425A021A2"](...args: any[]): any { return Citizen.invokeNative("0x73561D4425A021A2", ...args); }
  ["_0x7BBE7FF626A591FE"](...args: any[]): any { return Citizen.invokeNative("0x7BBE7FF626A591FE", ...args); }
  ["_0x65B080555EA48149"](...args: any[]): any { return Citizen.invokeNative("0x65B080555EA48149", ...args); }
  ["_0x428AD3E26C8D9EB0"](...args: any[]): any { return Citizen.invokeNative("0x428AD3E26C8D9EB0", ...args); }
  ["_0xE2F53F172B45EDE1"](...args: any[]): any { return Citizen.invokeNative("0xE2F53F172B45EDE1", ...args); }
  ["_0xBA91D045575699AD"](...args: any[]): any { return Citizen.invokeNative("0xBA91D045575699AD", ...args); }
  ["_0x80E3357FDEF45C21"](...args: any[]): any { return Citizen.invokeNative("0x80E3357FDEF45C21", ...args); }
  ["_0xB2E0C0D6922D31F2"](...args: any[]): any { return Citizen.invokeNative("0xB2E0C0D6922D31F2", ...args); }
  ["_0x3DE51E9C80B116CF"](...args: any[]): any { return Citizen.invokeNative("0x3DE51E9C80B116CF", ...args); }
  ["_0x9D30687C57BAA0BB"](...args: any[]): any { return Citizen.invokeNative("0x9D30687C57BAA0BB", ...args); }
  ["_0x41290B40FA63E6DA"](...args: any[]): any { return Citizen.invokeNative("0x41290B40FA63E6DA", ...args); }
  ["_0x0419B167EE128F33"](...args: any[]): any { return Citizen.invokeNative("0x0419B167EE128F33", ...args); }
  ["_0xF3B0E0AED097A3F5"](...args: any[]): any { return Citizen.invokeNative("0xF3B0E0AED097A3F5", ...args); }
  ["_0xD3E51C0AB8C26EEE"](...args: any[]): any { return Citizen.invokeNative("0xD3E51C0AB8C26EEE", ...args); }
  ["_0x72BECCF4B829522E"](...args: any[]): any { return Citizen.invokeNative("0x72BECCF4B829522E", ...args); }
  ["_0x66E3AAFACE2D1EB8"](...args: any[]): any { return Citizen.invokeNative("0x66E3AAFACE2D1EB8", ...args); }
  ["_0x1312DDD8385AEE4E"](...args: any[]): any { return Citizen.invokeNative("0x1312DDD8385AEE4E", ...args); }
  ["_0xEDBC8405B3895CC9"](...args: any[]): any { return Citizen.invokeNative("0xEDBC8405B3895CC9", ...args); }
  ["_0x26E13D440E7F6064"](...args: any[]): any { return Citizen.invokeNative("0x26E13D440E7F6064", ...args); }
  ["_0x2FA2494B47FDD009"](...args: any[]): any { return Citizen.invokeNative("0x2FA2494B47FDD009", ...args); }
  ["_0x78CEEE41F49F421F"](...args: any[]): any { return Citizen.invokeNative("0x78CEEE41F49F421F", ...args); }
  ["_0xAF60E6A2936F982A"](...args: any[]): any { return Citizen.invokeNative("0xAF60E6A2936F982A", ...args); }
  ["_0x430A7631A84C9BE7"](...args: any[]): any { return Citizen.invokeNative("0x430A7631A84C9BE7", ...args); }
  ["_0x8235F1BEAD557629"](...args: any[]): any { return Citizen.invokeNative("0x8235F1BEAD557629", ...args); }
  ["_0x9640E30A7F395E4B"](...args: any[]): any { return Citizen.invokeNative("0x9640E30A7F395E4B", ...args); }
  ["_0x0BBB9A7A8FFE931B"](...args: any[]): any { return Citizen.invokeNative("0x0BBB9A7A8FFE931B", ...args); }
  ["_0x0A3F820A9A9A9AC5"](...args: any[]): any { return Citizen.invokeNative("0x0A3F820A9A9A9AC5", ...args); }
  ["_0x51F30DB60626A20E"](...args: any[]): any { return Citizen.invokeNative("0x51F30DB60626A20E", ...args); }
  ["_0x97841634EF7DF1D6"](...args: any[]): any { return Citizen.invokeNative("0x97841634EF7DF1D6", ...args); }
  ["_0x3A9128352EAC9E85"](...args: any[]): any { return Citizen.invokeNative("0x3A9128352EAC9E85", ...args); }
  ["_0xAA653AE61924B0A0"](...args: any[]): any { return Citizen.invokeNative("0xAA653AE61924B0A0", ...args); }
  ["_0x887FA38787DE8C72"](...args: any[]): any { return Citizen.invokeNative("0x887FA38787DE8C72", ...args); }
  ["_0x36DE109527A2C0C4"](...args: any[]): any { return Citizen.invokeNative("0x36DE109527A2C0C4", ...args); }
  ["_0x82E0AC411E41A5B4"](...args: any[]): any { return Citizen.invokeNative("0x82E0AC411E41A5B4", ...args); }
  ["_0x99A05839C46CE316"](...args: any[]): any { return Citizen.invokeNative("0x99A05839C46CE316", ...args); }
  ["_0xE8718FAF591FD224"](...args: any[]): any { return Citizen.invokeNative("0xE8718FAF591FD224", ...args); }
  ["_0x5BBCF35BF6E456F7"](...args: any[]): any { return Citizen.invokeNative("0x5BBCF35BF6E456F7", ...args); }
  ["_0x8F0D5BA1C2CC91D7"](...args: any[]): any { return Citizen.invokeNative("0x8F0D5BA1C2CC91D7", ...args); }
  ["_0xF8B49F5BA7F850E7"](...args: any[]): any { return Citizen.invokeNative("0xF8B49F5BA7F850E7", ...args); }
}
