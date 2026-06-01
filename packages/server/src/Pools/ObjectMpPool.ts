import { HandlePool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { ObjectMp } from "../Entities/ObjectMp";
import { whenNetworked } from "../utils/whenNetworked";
import { STATIC_OBJECT_FLAG } from "../Entities/objectFlags";

let objectIdCounter = 0;

export class ObjectMpPool extends HandlePool {
  _netIdToEntity: Map<number, ObjectMp> = new Map();

  new(model: number | string, position: Vector3, options: {
    alpha?: number;
    dimension?: number;
    rotation?: Vector3;
  } = {}): ObjectMp | null {
    const modelHash = typeof model === "string" ? GetHashKey(model) : model;
    const dimension = options.dimension ?? 0;

    const handle = CreateObjectNoOffset(
      modelHash,
      position.x,
      position.y,
      position.z,
      true,
      true,
      false
    );

    if (!handle) {
      console.warn(
        "[bridge] mp.objects.new failed: FiveM could not create the server-side object. " +
          "OneSync must be enabled and a player should be near the coordinates to network it."
      );
      return null;
    }

    FreezeEntityPosition(handle, true);

    const id = ++objectIdCounter;
    const obj = new ObjectMp(id, handle);
    obj._model = modelHash;
    obj._alpha = options.alpha ?? 255;

    if (options.rotation) {
      obj.rotation = options.rotation;
    }

    if (dimension !== 0) {
      SetEntityRoutingBucket(handle, dimension);
    }

    this._add(obj as any);
    this._handleToEntity.set(handle, obj as any);

    whenNetworked(handle, (netId: number) => {
      this._netIdToEntity.set(netId, obj);
      obj._cachedNetId = netId;
      obj._netIdReady = true;

      try {
        globalThis.Entity(handle).state.set(STATIC_OBJECT_FLAG, true, true);
      } catch (e) {}

      if (obj._alpha !== 255) {
        emitNet("ragemp:objectAlpha", -1, netId, obj._alpha);
      }
    });

    return obj;
  }

  atNetId(netId: number): ObjectMp | null {
    if (!netId) return null;

    const cached = this._netIdToEntity.get(netId);
    if (
      cached &&
      DoesEntityExist(cached._handle) &&
      NetworkGetNetworkIdFromEntity(cached._handle) === netId
    ) {
      return cached;
    }
    if (cached) this._netIdToEntity.delete(netId);

    if (typeof NetworkGetEntityFromNetworkId !== "function") return null;
    const handle = NetworkGetEntityFromNetworkId(netId);
    if (!handle || !DoesEntityExist(handle)) return null;

    const obj = this._handleToEntity.get(handle) as unknown as ObjectMp | undefined;
    if (obj) {
      this._netIdToEntity.set(netId, obj);
      obj._cachedNetId = netId;
      return obj;
    }
    return null;
  }

  _remove(id: number): void {
    const entity = this._entities.get(id) as unknown as ObjectMp | undefined;
    if (entity && entity._cachedNetId !== undefined) {
      this._netIdToEntity.delete(entity._cachedNetId);
      entity._cachedNetId = undefined;
    }
    super._remove(id);
  }
}
