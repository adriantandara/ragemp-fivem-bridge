import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class ObjectMp extends Entity {
  _alpha = 255;

  constructor(id, handle) {
    super(id, "object");
    this._handle = handle;
  }

  _stateBag() {
    return globalThis.Entity(this._handle).state;
  }

  get position() {
    const coords = GetEntityCoords(this._handle);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  set position(value) {
    SetEntityCoords(this._handle, value.x, value.y, value.z, false, false, false, false);
  }

  get rotation() {
    const rot = GetEntityRotation(this._handle);
    return new Vector3(rot[0], rot[1], rot[2]);
  }

  set rotation(value) {
    SetEntityRotation(this._handle, value.x, value.y, value.z, 2, false);
  }

  get model() {
    return GetEntityModel(this._handle);
  }

  get alpha() {
    return this._alpha;
  }

  set alpha(value) {
    this._alpha = value;
    emitNet("ragemp:objectAlpha", -1, NetworkGetNetworkIdFromEntity(this._handle), value);
  }

  get dimension() {
    return GetEntityRoutingBucket(this._handle);
  }

  set dimension(value) {
    SetEntityRoutingBucket(this._handle, value);
  }

  destroy() {
    DeleteEntity(this._handle);
    globalThis.mp.objects._remove(this.id);
  }
}
