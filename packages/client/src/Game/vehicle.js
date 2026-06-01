import { createUnkProxy } from "./_helpers.js";

export class GameVehicleNs {
  unk = createUnkProxy();

  create(modelHash, x, y, z, heading, isNetwork, bScriptHostVeh, p7) {
    return CreateVehicle(modelHash, x, y, z, heading, isNetwork ?? true, bScriptHostVeh ?? false);
  }
  delete(vehicle) { DeleteVehicle(vehicle); }

  setDoorsLocked(vehicle, doorLockStatus) { SetVehicleDoorsLocked(vehicle, doorLockStatus); }
  setDoorOpen(vehicle, doorIndex, loose, openInstantly) { SetVehicleDoorOpen(vehicle, doorIndex, loose, openInstantly); }
  setDoorShut(vehicle, doorIndex, closeInstantly) { SetVehicleDoorShut(vehicle, doorIndex, closeInstantly); }
  breakDoor(vehicle, doorIndex, deleteRealDoor) { BreakOffVehicleDoor(vehicle, doorIndex, deleteRealDoor ?? false); }
  removeWindow(vehicle, windowIndex) { RemoveVehicleWindow(vehicle, windowIndex); }
  rollDownWindow(vehicle, windowIndex) { RollDownWindow(vehicle, windowIndex); }
  rollUpWindow(vehicle, windowIndex) { RollUpWindow(vehicle, windowIndex); }
  smashWindow(vehicle, index) { SmashVehicleWindow(vehicle, index); }
  fixWindow(vehicle, index) { FixVehicleWindow(vehicle, index); }

  setColours(vehicle, colorPrimary, colorSecondary) { SetVehicleColours(vehicle, colorPrimary, colorSecondary); }
  getColours(vehicle) {
    const [p, s] = GetVehicleColours(vehicle);
    return { primary: p, secondary: s };
  }
  setCustomPrimaryColour(vehicle, r, g, b) { SetVehicleCustomPrimaryColour(vehicle, r, g, b); }
  getCustomPrimaryColour(vehicle) {
    const [r, g, b] = GetVehicleCustomPrimaryColour(vehicle);
    return { r, g, b };
  }
  setCustomSecondaryColour(vehicle, r, g, b) { SetVehicleCustomSecondaryColour(vehicle, r, g, b); }
  getCustomSecondaryColour(vehicle) {
    const [r, g, b] = GetVehicleCustomSecondaryColour(vehicle);
    return { r, g, b };
  }
  setNeonLightsColour(vehicle, r, g, b) { SetVehicleNeonLightsColour(vehicle, r, g, b); }
  getNeonLightsColour(vehicle) {
    const [r, g, b] = GetVehicleNeonLightsColour(vehicle);
    return { r, g, b };
  }
  setExtraColours(vehicle, pearlescentColor, wheelColor) { SetVehicleExtraColours(vehicle, pearlescentColor, wheelColor); }
  getExtraColours(vehicle) {
    const [p, w] = GetVehicleExtraColours(vehicle);
    return { pearlescent: p, wheel: w };
  }
  setTyreSmokeColor(vehicle, r, g, b) { SetVehicleTyreSmokeColor(vehicle, r, g, b); }

  setEngineOn(vehicle, value, instantly, disableAutoStart) {
    SetVehicleEngineOn(vehicle, value, instantly ?? false, disableAutoStart ?? false);
  }
  setEngineHealth(vehicle, health) { SetVehicleEngineHealth(vehicle, health); }
  getEngineHealth(vehicle) { return GetVehicleEngineHealth(vehicle); }
  setMaxSpeed(vehicle, speed) { SetVehicleMaxSpeed(vehicle, speed); }
  modifyTopSpeed(vehicle, value) { ModifyVehicleTopSpeed(vehicle, value); }
  setForwardSpeed(vehicle, speed) { SetVehicleForwardSpeed(vehicle, speed); }

  setFixed(vehicle) { SetVehicleFixed(vehicle); }
  setDamage(vehicle, xOffset, yOffset, zOffset, damage, radius, focusOnModel) {
    SetVehicleDamage(vehicle, xOffset, yOffset, zOffset, damage, radius, focusOnModel ?? true);
  }
  getPetrolTankHealth(vehicle) { return GetVehiclePetrolTankHealth(vehicle); }
  getBodyHealth(vehicle) { return GetVehicleBodyHealth(vehicle); }
  setBodyHealth(vehicle, value) { SetVehicleBodyHealth(vehicle, value); }

  setLights(vehicle, state) { SetVehicleLights(vehicle, state); }
  setFullbeam(vehicle, toggle) { SetVehicleFullbeam(vehicle, toggle); }
  setIndicatorLights(vehicle, turnSignal, toggle) { SetVehicleIndicatorLights(vehicle, turnSignal, toggle); }
  setBrakeLights(vehicle, toggle) { SetVehicleBrakeLights(vehicle, toggle); }
  setInteriorlight(vehicle, toggle) { SetVehicleInteriorlight(vehicle, toggle); }
  setSiren(vehicle, toggle) { SetVehicleSiren(vehicle, toggle); }
  setNeonLightEnabled(vehicle, index, toggle) { SetVehicleNeonLightEnabled(vehicle, index, toggle); }
  isNeonLightEnabled(vehicle, index) { return IsVehicleNeonLightEnabled(vehicle, index); }

  setMod(vehicle, modType, modIndex, customTires) { SetVehicleMod(vehicle, modType, modIndex, customTires ?? false); }
  getMod(vehicle, modType) { return GetVehicleMod(vehicle, modType); }
  setModColor1(vehicle, paintType, color, pearlescentColor) { SetVehicleModColor_1(vehicle, paintType, color, pearlescentColor); }
  setModColor2(vehicle, paintType, color) { SetVehicleModColor_2(vehicle, paintType, color); }
  setLivery(vehicle, livery) { SetVehicleLivery(vehicle, livery); }
  getLivery(vehicle) { return GetVehicleLivery(vehicle); }
  toggleMod(vehicle, modType, toggle) { ToggleVehicleMod(vehicle, modType, toggle); }

  setTyreBurst(vehicle, index, onRim, p3) { SetVehicleTyreBurst(vehicle, index, onRim ?? false, p3 ?? 1000); }
  setTyreFixed(vehicle, tyreIndex) { SetVehicleTyreFixed(vehicle, tyreIndex); }
  getTyreHealth(vehicle, wheelIndex) { return GetTyreHealth(vehicle, wheelIndex); }

  attachToTrailer(vehicle, trailer, radius) { AttachVehicleToTrailer(vehicle, trailer, radius); }
  detachFromTrailer(vehicle) { DetachVehicleFromTrailer(vehicle); }
  attachToTowTruck(towTruck, vehicle, rear, hookOffsetX, hookOffsetY, hookOffsetZ) {
    AttachVehicleToTowTruck(towTruck, vehicle, rear, hookOffsetX, hookOffsetY, hookOffsetZ);
  }
  detachFromTowTruck(towTruck, vehicle) { DetachVehicleFromTowTruck(towTruck, vehicle); }

  getNumberOfPassengers(vehicle) { return GetVehicleNumberOfPassengers(vehicle); }
  getMaxNumberOfPassengers(vehicle) { return GetVehicleMaxNumberOfPassengers(vehicle); }
  getPedInSeat(vehicle, seatIndex) { return GetPedInVehicleSeat(vehicle, seatIndex); }
  isSeatFree(vehicle, seatIndex, isTaskRunning) { return IsVehicleSeatFree(vehicle, seatIndex, isTaskRunning ?? false); }

  setNumberPlateText(vehicle, plateText) { SetVehicleNumberPlateText(vehicle, plateText); }
  getNumberPlateText(vehicle) { return GetVehicleNumberPlateText(vehicle); }
  setAlarm(vehicle, state) { SetVehicleAlarm(vehicle, !!state); }
  setHandbrake(vehicle, toggle) { SetVehicleHandbrake(vehicle, toggle); }
  setBurnout(vehicle, toggle) { SetVehicleBurnout(vehicle, toggle); }
  setHydraulicRaised(vehicle, raised) { SetVehicleHydraulicRaised(vehicle, raised); }

  doesExist(vehicle) { return DoesEntityExist(vehicle); }
  isDead(vehicle) { return IsEntityDead(vehicle); }
  isOnAllWheels(vehicle) { return IsVehicleOnAllWheels(vehicle); }
  isStolen(vehicle) { return IsVehicleStolen(vehicle); }
  isEngineRunning(vehicle) { return GetIsVehicleEngineRunning(vehicle); }

  setWheelType(vehicle, wheelType) { SetVehicleWheelType(vehicle, wheelType); }
  getWheelType(vehicle) { return GetVehicleWheelType(vehicle); }
  setWindowTint(vehicle, tint) { SetVehicleWindowTint(vehicle, tint); }
  getWindowTint(vehicle) { return GetVehicleWindowTint(vehicle); }
  setNumberPlateTextIndex(vehicle, plateIndex) { SetVehicleNumberPlateTextIndex(vehicle, plateIndex); }
  getNumberPlateTextIndex(vehicle) { return GetVehicleNumberPlateTextIndex(vehicle); }

  getTyreHealth(vehicle, wheelIndex) { return GetTyreHealth(vehicle, wheelIndex); }
  setTyreHealth(vehicle, wheelIndex, health) { SetTyreHealth(vehicle, wheelIndex, health); }

  getTyreWearMultiplier(vehicle, wheelIndex) { return GetTyreWearMultiplier(vehicle, wheelIndex); }
  setTyreWearMultiplier(vehicle, wheelIndex, multiplier) { SetTyreWearMultiplier(vehicle, wheelIndex, multiplier); }

  getTyreSoftnessMultiplier(vehicle, wheelIndex) { return 1.0; /*GetTyreSoftnessMultiplier(vehicle, wheelIndex) is not implemented in FiveM*/ }
  setTyreSoftnessMultiplier(vehicle, wheelIndex, multiplier) { SetTyreSoftnessMultiplier(vehicle, wheelIndex, multiplier); }

  getTyreTractionLossMultiplier(vehicle, wheelIndex) { return 1.0; /*GetTyreTractionLossMultiplier(vehicle, wheelIndex) is not implemented in FiveM*/ }
  setTyreTractionLossMultiplier(vehicle, wheelIndex, multiplier) { SetTyreTractionLossMultiplier(vehicle, wheelIndex, multiplier); }

  get passengerMassMultiplier() { return GetGlobalPassengerMassMultiplier(); }
  set passengerMassMultiplier(massMul) { SetGlobalPassengerMassMultiplier(massMul); }
}
