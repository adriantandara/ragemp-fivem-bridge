import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { scheduleStateBagFlush } from "../utils/stateBagDefer";

export class ObjectMp extends Entity {
  _alpha = 255;

  constructor(id, handle) {
    super(id, "object");
    this._handle = handle;
  }

  _stateBag() {
    return globalThis.Entity(this._handle).state;
  }

  _stateBagReady() {
    return this._netIdReady === true;
  }

  _onVariableDeferred() {
    scheduleStateBagFlush(this);
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
    return this._model || GetEntityModel(this._handle);
  }

  set model(value) {
    const modelHash = typeof value === "string" ? GetHashKey(value) : value;

    if (!DoesEntityExist(this._handle)) {
      this._model = modelHash;
      return;
    }

    const coords = GetEntityCoords(this._handle);
    const rot = GetEntityRotation(this._handle, 2);
    const dimension = GetEntityRoutingBucket(this._handle);
    const alpha = this._alpha;

    const pool = globalThis.mp.objects;
    pool._handleToEntity.delete(this._handle);
    DeleteEntity(this._handle);

    const handle = CreateObjectNoOffset(modelHash, coords[0], coords[1], coords[2], true, true, false);
    this._handle = handle;
    this._model = modelHash;
    pool._handleToEntity.set(handle, this);

    SetEntityRotation(handle, rot[0], rot[1], rot[2], 2, false);

    if (dimension !== 0) {
      SetEntityRoutingBucket(handle, dimension);
    }

    if (alpha !== 255) {
      emitNet("ragemp:objectAlpha", -1, NetworkGetNetworkIdFromEntity(handle), alpha);
    }

    if (this._variables.size) scheduleStateBagFlush(this);
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
