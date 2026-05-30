import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { gtaPedHealthToRage, rageHealthToGtaPed } from "@ragemp-fivem-bridge/shared";

export class PedMp extends Entity {
  constructor(id, handle) {
    super(id, "ped");
    this._handle = handle;
    this._frozen = false;
    this._invincible = false;
  }

  _stateBag() {
    return globalThis.Entity(this._handle).state;
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

  get dimension() {
    return GetEntityRoutingBucket(this._handle);
  }

  set dimension(value) {
    SetEntityRoutingBucket(this._handle, value);
  }

  get model() {
    return GetEntityModel(this._handle);
  }

  get controller() {
    const source = NetworkGetEntityOwner(this._handle);
    if (!source) return null;
    return globalThis.mp.players.at(source) ?? null;
  }

  get health() {
    return gtaPedHealthToRage(GetEntityHealth(this._handle));
  }

  set health(value) {
    SetEntityHealth(this._handle, rageHealthToGtaPed(value));
  }

  getHealth() {
    return gtaPedHealthToRage(GetEntityHealth(this._handle));
  }

  setHealth(value) {
    SetEntityHealth(this._handle, rageHealthToGtaPed(value));
  }

  get armour() {
    return GetPedArmour(this._handle);
  }

  set armour(value) {
    SetPedArmour(this._handle, value);
  }

  get frozen() {
    return this._frozen;
  }

  set frozen(value) {
    this._frozen = value;
    FreezeEntityPosition(this._handle, value);
  }

  get invincible() {
    return this._invincible;
  }

  set invincible(value) {
    this._invincible = value;
    emitNet("ragemp:pedInvincible", -1, NetworkGetNetworkIdFromEntity(this._handle), value);
  }

  destroy() {
    DeleteEntity(this._handle);
    globalThis.mp.peds._remove(this.id);
  }
}
