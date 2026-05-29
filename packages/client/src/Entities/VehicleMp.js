import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";

export class VehicleMp extends Entity {
  _handle;

  constructor(id, handle) {
    super(id, "vehicle");
    this._handle = handle;
  }

  _stateBag() {
    return globalThis.Entity(this._handle).state;
  }

  get handle() {
    return this._handle;
  }

  get position() {
    const coords = GetEntityCoords(this._handle, true);
    return new Vector3(coords[0], coords[1], coords[2]);
  }
  set position(value) {
    SetEntityCoords(this._handle, value.x, value.y, value.z, false, false, false, false);
  }

  get rotation() {
    const rot = GetEntityRotation(this._handle, 2);
    return new Vector3(rot[0], rot[1], rot[2]);
  }
  set rotation(value) {
    SetEntityRotation(this._handle, value.x, value.y, value.z, 2, false);
  }

  get heading() {
    return GetEntityHeading(this._handle);
  }
  set heading(value) {
    SetEntityHeading(this._handle, value);
  }

  get model() {
    return GetEntityModel(this._handle);
  }

  get velocity() {
    const v = GetEntityVelocity(this._handle);
    return new Vector3(v[0], v[1], v[2]);
  }

  get speed() {
    return GetEntitySpeed(this._handle);
  }

  get engineHealth() {
    return GetVehicleEngineHealth(this._handle);
  }
  set engineHealth(value) {
    SetVehicleEngineHealth(this._handle, value);
  }

  get bodyHealth() {
    return GetVehicleBodyHealth(this._handle);
  }
  set bodyHealth(value) {
    SetVehicleBodyHealth(this._handle, value);
  }

  get engine() {
    return GetIsVehicleEngineRunning(this._handle);
  }
  set engine(value) {
    SetVehicleEngineOn(this._handle, value, false, false);
  }

  get locked() {
    return GetVehicleDoorLockStatus(this._handle) === 2;
  }
  set locked(value) {
    SetVehicleDoorsLocked(this._handle, value ? 2 : 1);
  }

  get numberPlate() {
    return GetVehicleNumberPlateText(this._handle);
  }
  set numberPlate(value) {
    SetVehicleNumberPlateText(this._handle, value);
  }

  get gear() {
    return GetVehicleCurrentGear(this._handle);
  }

  get rpm() {
    return GetVehicleCurrentRpm(this._handle);
  }

  get steeringAngle() {
    return GetVehicleSteeringAngle(this._handle);
  }

  get alpha() {
    return GetEntityAlpha(this._handle);
  }
  set alpha(value) {
    SetEntityAlpha(this._handle, value, false);
  }

  get dead() {
    return IsEntityDead(this._handle);
  }

  get livery() {
    return GetVehicleLivery(this._handle);
  }
  set livery(value) {
    SetVehicleLivery(this._handle, value);
  }

  get windowTint() {
    return GetVehicleWindowTint(this._handle);
  }
  set windowTint(value) {
    SetVehicleWindowTint(this._handle, value);
  }

  get wheelType() {
    return GetVehicleWheelType(this._handle);
  }
  set wheelType(value) {
    SetVehicleWheelType(this._handle, value);
  }

  get neonEnabled() {
    return IsVehicleNeonLightEnabled(this._handle, 0);
  }
  set neonEnabled(value) {
    for (let i = 0; i < 4; i++) SetVehicleNeonLightEnabled(this._handle, i, value);
  }

  getColor() {
    const c = GetVehicleColours(this._handle);
    return { primary: c[0], secondary: c[1] };
  }

  setColor(primary, secondary) {
    SetVehicleColours(this._handle, primary, secondary);
  }

  getColorRGB() {
    const c1 = GetVehicleCustomPrimaryColour(this._handle);
    const c2 = GetVehicleCustomSecondaryColour(this._handle);
    return [[c1[0], c1[1], c1[2]], [c2[0], c2[1], c2[2]]];
  }

  setColorRGB(r1, g1, b1, r2, g2, b2) {
    SetVehicleCustomPrimaryColour(this._handle, r1, g1, b1);
    SetVehicleCustomSecondaryColour(this._handle, r2, g2, b2);
  }

  getNeonColor() {
    const c = GetVehicleNeonLightsColour(this._handle);
    return [c[0], c[1], c[2]];
  }

  setNeonColor(r, g, b) {
    SetVehicleNeonLightsColour(this._handle, r, g, b);
  }

  getMod(modType) {
    return GetVehicleMod(this._handle, modType);
  }

  setMod(modType, modIndex) {
    SetVehicleModKit(this._handle, 0);
    SetVehicleMod(this._handle, modType, modIndex, false);
  }

  getExtra(extraId) {
    return IsVehicleExtraTurnedOn(this._handle, extraId);
  }

  setExtra(extraId, state) {
    SetVehicleExtra(this._handle, extraId, !state);
  }

  repair() {
    SetVehicleFixed(this._handle);
    SetVehicleEngineHealth(this._handle, 1000);
    SetVehicleBodyHealth(this._handle, 1000);
  }

  get controller() {
    const serverId = NetworkGetEntityOwner(this._handle);
    if (!serverId) return null;
    return globalThis.mp.players.at(serverId) ?? null;
  }

  getHandling(fieldName) {
    const type = typeof GetVehicleHandlingFloat(this._handle, "CHandlingData", fieldName);
    if (type === "number") return GetVehicleHandlingFloat(this._handle, "CHandlingData", fieldName);
    return GetVehicleHandlingInt(this._handle, "CHandlingData", fieldName);
  }

  setHandling(fieldName, value) {
    if (typeof value === "number" && !Number.isInteger(value)) {
      SetVehicleHandlingFloat(this._handle, "CHandlingData", fieldName, value);
    } else {
      SetVehicleHandlingInt(this._handle, "CHandlingData", fieldName, value);
    }
  }

  resetHandling() {
    SetVehicleUseAlternateHandling(this._handle, false);
  }

  setWheelSize(size) {
    return SetVehicleWheelSize(this._handle, size);
  }

  setWheelWidth(width) {
    return SetVehicleWheelWidth(this._handle, width);
  }

  setWheelCamber(disabled) {
    SetCamberedWheelsDisabled(this._handle, !!disabled);
  }

  setWheelTrackWidth(wheelIndex, value) {
    SetVehicleWheelTireColliderWidth(this._handle, wheelIndex, value);
  }

  setWheelRadius(wheelIndex, value) {
    SetVehicleWheelTireColliderSize(this._handle, wheelIndex, value);
  }

  setEngineOn(toggle, instantly, disableAutoStart) {
    SetVehicleEngineOn(this._handle, !!toggle, instantly ?? true, disableAutoStart ?? false);
  }

  setHandbrake(toggle) {
    SetVehicleHandbrake(this._handle, !!toggle);
  }

  setForwardSpeed(speed) {
    SetVehicleForwardSpeed(this._handle, speed);
  }

  setUndriveable(toggle) {
    SetVehicleUndriveable(this._handle, !!toggle);
  }

  setDoorsLocked(state) {
    SetVehicleDoorsLocked(this._handle, state);
  }

  setDirtLevel(level) {
    SetVehicleDirtLevel(this._handle, level);
  }

  getDirtLevel() {
    return GetVehicleDirtLevel(this._handle);
  }

  rollUpWindow(index) {
    RollUpWindow(this._handle, index);
  }

  rollDownWindow(index) {
    RollDownWindow(this._handle, index);
  }

  isDriveable(checkDoors) {
    return IsVehicleDriveable(this._handle, checkDoors ?? false);
  }

  isDamaged() {
    return IsVehicleDamaged(this._handle);
  }

  isStopped() {
    return IsVehicleStopped(this._handle);
  }

  isStoppedAtTrafficLights() {
    return IsVehicleStoppedAtTrafficLights(this._handle);
  }

  isAlarmActivated() {
    return IsVehicleAlarmActivated(this._handle);
  }

  isAnySeatEmpty() {
    return IsAnyVehicleSeatEmpty(this._handle);
  }

  isSeatFree(seatIndex) {
    return IsVehicleSeatFree(this._handle, seatIndex - 1);
  }

  isOnAllWheels() {
    return IsVehicleOnAllWheels(this._handle);
  }

  isSirenOn() {
    return IsVehicleSirenOn(this._handle);
  }

  isSirenSoundOn() {
    return IsVehicleSirenAudioOn(this._handle);
  }

  isTyreBurst(wheel, onRim) {
    return IsVehicleTyreBurst(this._handle, wheel, !!onRim);
  }

  isVisible() {
    return IsEntityVisible(this._handle);
  }

  isWindowIntact(windowIndex) {
    return IsVehicleWindowIntact(this._handle, windowIndex);
  }

  areAllWindowsIntact() {
    return AreAllVehicleWindowsIntact(this._handle);
  }

  isDoorDamaged(doorIndex) {
    return IsVehicleDoorDamaged(this._handle, doorIndex);
  }

  getClass() {
    return GetVehicleClass(this._handle);
  }

  getMaxNumberOfPassengers() {
    return GetVehicleMaxNumberOfPassengers(this._handle);
  }

  getNumberOfPassengers() {
    return GetVehicleNumberOfPassengers(this._handle);
  }

  getPedInSeat(seatIndex) {
    return GetPedInVehicleSeat(this._handle, seatIndex - 1);
  }

  getLastPedInSeat(seatIndex) {
    return GetLastPedInVehicleSeat(this._handle, seatIndex - 1);
  }

  getLiveryCount() {
    return GetVehicleLiveryCount(this._handle);
  }

  getModKit() {
    return GetVehicleModKit(this._handle);
  }

  getNumMods(modType) {
    return GetNumVehicleMods(this._handle, modType);
  }

  getLandingGearState() {
    return GetLandingGearState(this._handle);
  }

  setLandingGear(state) {
    ControlLandingGear(this._handle, state);
  }

  setLights(toggle) {
    SetVehicleLights(this._handle, toggle ? 3 : 4);
  }

  setFullbeam(toggle) {
    SetVehicleFullbeam(this._handle, !!toggle);
  }

  setAlarm(toggle) {
    SetVehicleAlarm(this._handle, !!toggle);
  }

  setDoorOpen(doorIndex, loose, instantly) {
    SetVehicleDoorOpen(this._handle, doorIndex, !!loose, instantly ?? false);
  }

  setDoorShut(doorIndex, instantly) {
    SetVehicleDoorShut(this._handle, doorIndex, instantly ?? false);
  }

  setDoorsLockedForAllPlayers(toggle) {
    SetVehicleDoorsLockedForAllPlayers(this._handle, !!toggle);
  }

  setEnginePowerMultiplier(value) {
    SetVehicleEnginePowerMultiplier(this._handle, value);
  }

  setEngineTorqueMultiplier(value) {
    SetVehicleEngineTorqueMultiplier(this._handle, value);
  }

  setGravity(toggle) {
    SetVehicleGravity(this._handle, !!toggle);
  }

  setIndicatorLights(leftToggle, rightToggle) {
    SetVehicleIndicatorLights(this._handle, 0, !!rightToggle);
    SetVehicleIndicatorLights(this._handle, 1, !!leftToggle);
  }

  setIsStolen(toggle) {
    SetVehicleIsStolen(this._handle, !!toggle);
  }

  setLodMultiplier(value) {
    SetVehicleLodMultiplier(this._handle, value);
  }

  setModKit(modKitIndex) {
    SetVehicleModKit(this._handle, modKitIndex);
  }

  setNeedsToBeHotwired(toggle) {
    SetVehicleNeedsToBeHotwired(this._handle, !!toggle);
  }

  setNumberPlateTextIndex(index) {
    SetVehicleNumberPlateTextIndex(this._handle, index);
  }

  clearCustomPrimaryColour() {
    ClearVehicleCustomPrimaryColour(this._handle);
  }

  clearCustomSecondaryColour() {
    ClearVehicleCustomSecondaryColour(this._handle);
  }

  getPetrolTankHealth() {
    return GetVehiclePetrolTankHealth(this._handle);
  }

  getBodyHealth() {
    return GetVehicleBodyHealth(this._handle);
  }

  getEngineHealth() {
    return GetVehicleEngineHealth(this._handle);
  }

  getColours() {
    return GetVehicleColours(this._handle);
  }

  getCustomPrimaryColour() {
    return GetVehicleCustomPrimaryColour(this._handle);
  }

  getCustomSecondaryColour() {
    return GetVehicleCustomSecondaryColour(this._handle);
  }

  getNumberPlateTextIndex() {
    return GetVehicleNumberPlateTextIndex(this._handle);
  }

  getNumberPlateText() {
    return GetVehicleNumberPlateText(this._handle);
  }

  destroy() {
    SetEntityAsMissionEntity(this._handle, false, true);
    DeleteEntity(this._handle);
    globalThis.mp.vehicles._remove(this.id);
  }
}
