import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { scheduleStateBagFlush } from "../utils/stateBagDefer";
import { whenNetworked } from "../utils/whenNetworked";
import { STATIC_OBJECT_FLAG } from "./objectFlags";

export class ObjectMp extends Entity {
  _alpha: number = 255;
  _handle: number;
  _netIdReady?: boolean;
  _cachedNetId?: number;
  _varFlushScheduled: boolean = false;

  constructor(id: number, handle: number) {
    super(id, "object");
    this._handle = handle;
  }

  _stateBag(): any {
    return globalThis.Entity(this._handle).state;
  }

  _stateBagReady(): boolean {
    return this._netIdReady === true;
  }

  _onVariableDeferred(): void {
    scheduleStateBagFlush(this as any);
  }

  get position(): Vector3 {
    const coords = GetEntityCoords(this._handle);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  set position(value: Vector3) {
    SetEntityCoords(this._handle, value.x, value.y, value.z, false, false, false, false);
  }

  get rotation(): Vector3 {
    const rot = GetEntityRotation(this._handle);
    return new Vector3(rot[0], rot[1], rot[2]);
  }

  set rotation(value: Vector3) {
    SetEntityRotation(this._handle, value.x, value.y, value.z, 2, false);
  }

  get model(): number {
    return this._model || GetEntityModel(this._handle);
  }

  set model(value: number | string) {
    const modelHash = typeof value === "string" ? GetHashKey(value) : value;

    if (!DoesEntityExist(this._handle)) {
      this._model = modelHash;
      return;
    }

    const coords = GetEntityCoords(this._handle);
    const rot = GetEntityRotation(this._handle);
    const dimension = GetEntityRoutingBucket(this._handle);
    const alpha = this._alpha;

    const pool = globalThis.mp.objects;
    pool._handleToEntity.delete(this._handle);
    if (this._cachedNetId !== undefined) {
      pool._netIdToEntity.delete(this._cachedNetId);
      this._cachedNetId = undefined;
    }
    DeleteEntity(this._handle);

    const handle = CreateObjectNoOffset(modelHash, coords[0], coords[1], coords[2], true, true, false);
    this._handle = handle;
    this._model = modelHash;
    this._netIdReady = false;
    pool._handleToEntity.set(handle, this);

    FreezeEntityPosition(handle, true);
    SetEntityRotation(handle, rot[0], rot[1], rot[2], 2, false);

    if (dimension !== 0) {
      SetEntityRoutingBucket(handle, dimension);
    }

    whenNetworked(handle, (netId: number) => {
      pool._netIdToEntity.set(netId, this);
      this._cachedNetId = netId;
      this._netIdReady = true;

      try {
        globalThis.Entity(handle).state.set(STATIC_OBJECT_FLAG, true, true);
      } catch (e) {}

      if (alpha !== 255) {
        emitNet("ragemp:objectAlpha", -1, netId, alpha);
      }

      if (this._variables.size) scheduleStateBagFlush(this as any);
    });
  }

  get alpha(): number {
    return this._alpha;
  }

  set alpha(value: number) {
    this._alpha = value;
    whenNetworked(this._handle, (netId: number) => {
      if (this._alpha === value) {
        emitNet("ragemp:objectAlpha", -1, netId, value);
      }
    });
  }

  get dimension(): number {
    return GetEntityRoutingBucket(this._handle);
  }

  set dimension(value: number) {
    SetEntityRoutingBucket(this._handle, value);
  }

  destroy(): void {
    DeleteEntity(this._handle);
    globalThis.mp.objects._remove(this.id);
  }
}
