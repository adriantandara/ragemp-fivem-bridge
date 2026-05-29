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

  destroy() {
    SetEntityAsMissionEntity(this._handle, false, true);
    DeleteEntity(this._handle);
    globalThis.mp.vehicles._remove(this.id);
  }
}
