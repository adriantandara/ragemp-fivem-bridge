import { HandlePool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { poolStore, poolAdd, handlePoolStore, EntityInternals } from "@ragemp-fivem-bridge/shared/internal";
import { ObjectMp } from "../Entities/ObjectMp";
import { whenNetworked } from "../utils/whenNetworked";
import { safeGetEntityFromNetId } from "../utils/netId";
import { STATIC_OBJECT_FLAG } from "../Entities/objectFlags";
import { entityCreated, entityBindNetId } from "../utils/entityRegistry";
import { ObjectInternals } from "../internal/objectInternals";
import { setupObjectPool, objectNetIdMap } from "../internal/pools/objectPoolService";

let objectIdCounter = 0;

export class ObjectMpPool extends HandlePool {
  constructor() {
    super();
    setupObjectPool(this);
  }

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
    const objRec = EntityInternals.get(obj);
    objRec.model = modelHash;
    objRec.alpha = options.alpha ?? 255;

    if (options.rotation) {
      obj.rotation = options.rotation;
    }

    if (dimension !== 0) {
      SetEntityRoutingBucket(handle, dimension);
    }

    poolAdd(this, obj as any);
    handlePoolStore(this).handleToEntity.set(handle, obj as any);

    entityCreated("object", obj.id, {
      model: modelHash,
      x: position.x,
      y: position.y,
      z: position.z,
      dimension,
    });

    whenNetworked(
      handle,
      (netId) => {
        objectNetIdMap(this).set(netId, obj);
        const rec = ObjectInternals.get(obj);
        rec.cachedNetId = netId;
        rec.netIdReady = true;
        entityBindNetId("object", obj.id, netId);

        try {
          globalThis.Entity(handle).state.set(STATIC_OBJECT_FLAG, true, true);
        } catch (e) {}

        if (objRec.alpha !== 255) {
          emitNet("ragemp:objectAlpha", -1, netId, objRec.alpha);
        }
      },
      () => poolStore(this).entities.has(obj.id),
    );

    return obj;
  }

  atNetId(netId: number): ObjectMp | null {
    if (!netId) return null;

    const map = objectNetIdMap(this);
    const cached = map.get(netId);
    if (
      cached &&
      DoesEntityExist(cached.handle) &&
      NetworkGetNetworkIdFromEntity(cached.handle) === netId
    ) {
      return cached;
    }
    if (cached) map.delete(netId);

    const handle = safeGetEntityFromNetId(netId);
    if (!handle) return null;

    const obj = handlePoolStore(this).handleToEntity.get(handle) as unknown as ObjectMp | undefined;
    if (obj) {
      map.set(netId, obj);
      ObjectInternals.get(obj).cachedNetId = netId;
      return obj;
    }
    return null;
  }
}
