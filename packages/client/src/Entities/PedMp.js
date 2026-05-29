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

  destroy() {
    SetEntityAsMissionEntity(this._handle, false, true);
    DeleteEntity(this._handle);
    globalThis.mp.peds._remove(this.id);
  }
}
