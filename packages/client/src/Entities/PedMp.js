import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";

export class PedMp extends Entity {
  _handle;

  constructor(id, handle) {
    super(id, "ped");
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

  get health() {
    return GetEntityHealth(this._handle);
  }
  set health(value) {
    SetEntityHealth(this._handle, value);
  }

  get armour() {
    return GetPedArmour(this._handle);
  }
  set armour(value) {
    SetPedArmour(this._handle, value);
  }

  get frozen() {
    return IsEntityPositionFrozen(this._handle);
  }
  set frozen(value) {
    FreezeEntityPosition(this._handle, value);
  }

  _invincible = false;
  get invincible() {
    return this._invincible;
  }
  set invincible(value) {
    this._invincible = value;
    SetEntityInvincible(this._handle, value);
  }

  taskPlayAnim(dict, name, speed, speedMultiplier, duration, flag, playbackRate, lockX, lockY, lockZ) {
    TaskPlayAnim(this._handle, dict, name, speed, speedMultiplier ?? -1, duration ?? -1, flag ?? 0, playbackRate ?? 0, !!lockX, !!lockY, !!lockZ);
  }

  setComponentVariation(component, drawable, texture, palette) {
    SetPedComponentVariation(this._handle, component, drawable, texture, palette ?? 0);
  }

  setAlpha(alpha) {
    SetEntityAlpha(this._handle, alpha, false);
  }

  setHairColor(firstColor, secondColor) {
    SetPedHairColor(this._handle, firstColor, secondColor ?? 0);
  }

  setEyeColor(index) {
    SetPedEyeColor(this._handle, index);
  }

  setHeadOverlay(overlayId, index, opacity) {
    SetPedHeadOverlay(this._handle, overlayId, index, opacity ?? 1.0);
  }

  setHeadOverlayColor(overlayId, colorType, colorId, secondColorId) {
    SetPedHeadOverlayColor(this._handle, overlayId, colorType, colorId, secondColorId ?? 0);
  }

  setHeadBlendData(shapeFirst, shapeSecond, shapeThird, skinFirst, skinSecond, skinThird, shapeMix, skinMix, thirdMix, isParent) {
    SetPedHeadBlendData(this._handle, shapeFirst, shapeSecond, shapeThird ?? 0, skinFirst, skinSecond, skinThird ?? 0, shapeMix, skinMix, thirdMix ?? 0, !!isParent);
  }

  setFaceFeature(index, scale) {
    SetPedFaceFeature(this._handle, index, scale);
  }

  isPositionFrozen() {
    return IsEntityPositionFrozen(this._handle);
  }

  destroy() {
    SetEntityAsMissionEntity(this._handle, false, true);
    DeleteEntity(this._handle);
    globalThis.mp.peds._remove(this.id);
  }
}
