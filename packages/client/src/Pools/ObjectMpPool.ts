import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { poolStore, poolAdd, CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { ObjectMp } from "../Entities/ObjectMp";
import { StreamingPool } from "./StreamingPool";
import { StreamingInternals } from "../internal/streamingInternals";
import { ObjectInternals } from "../internal/objectInternals";
import { setupObjectPool, nextLocalObjectId } from "../internal/pools/objectPoolService";
import { startNetworked } from "../internal/pools/streamingService";

export class ObjectMpPool extends StreamingPool<ObjectMp> {
  constructor() {
    super("object");
    setupObjectPool(this);
    startNetworked(this, (id, handle) => new ObjectMp(CONSTRUCT, id, handle));
  }

  new(model: number | string, position: Vector3, options: {
    alpha?: number;
    dimension?: number;
    rotation?: Vector3;
    isNetwork?: boolean;
  } = {}): ObjectMp {
    const modelHash = typeof model === "string" ? GetHashKey(model) : model;
    const isNetwork = options.isNetwork !== undefined ? !!options.isNetwork : true;

    const handle = CreateObject(modelHash, position.x, position.y, position.z, isNetwork, true, false);
    const id = nextLocalObjectId();
    const obj = new ObjectMp(CONSTRUCT, id, handle);

    if (options.rotation) {
      obj.rotation = options.rotation;
    }

    if (options.alpha !== undefined) {
      obj.alpha = options.alpha;
    }

    if (options.dimension !== undefined) {
      obj.dimension = options.dimension;
    }

    poolAdd(this, obj);
    StreamingInternals.get(this).handleToEntity.set(handle, obj);
    globalThis.mp?.events?.call("entityStreamIn", obj);

    return obj;
  }

  newWeak(handle: number): ObjectMp {
    const id = nextLocalObjectId();
    const obj = new ObjectMp(CONSTRUCT, id, handle);
    ObjectInternals.get(obj).isWeak = true;

    poolAdd(this, obj);
    StreamingInternals.get(this).handleToEntity.set(handle, obj);

    return obj;
  }

  newWeaponObject(weaponHash: number | string, position: Vector3, options: {
    alpha?: number;
    dimension?: number;
    rotation?: Vector3;
    ammoCount?: number;
    createDefaultComponents?: boolean;
    scale?: number;
    customModelHash?: number;
  } = {}): ObjectMp {
    const hash = typeof weaponHash === "string" ? GetHashKey(weaponHash) : weaponHash;
    const ammoCount = options.ammoCount ?? 0;
    const createDefaultComponents = options.createDefaultComponents ?? true;
    const scale = options.scale ?? 1.0;
    const customModelHash = options.customModelHash ?? 0;

    const handle = CreateWeaponObject(
      hash,
      ammoCount,
      position.x,
      position.y,
      position.z,
      createDefaultComponents,
      scale,
      customModelHash
    );

    const id = nextLocalObjectId();
    const obj = new ObjectMp(CONSTRUCT, id, handle);

    if (options.rotation) {
      obj.rotation = options.rotation;
    }

    if (options.alpha !== undefined) {
      obj.alpha = options.alpha;
    }

    if (options.dimension !== undefined) {
      obj.dimension = options.dimension;
    }

    poolAdd(this, obj);
    StreamingInternals.get(this).handleToEntity.set(handle, obj);
    globalThis.mp?.events?.call("entityStreamIn", obj);

    return obj;
  }

  getAllByHash(hash: number | string): ObjectMp[] {
    const modelHash = typeof hash === "string" ? GetHashKey(hash) : hash;
    const result: ObjectMp[] = [];
    poolStore(this).entities.forEach((entity) => {
      const obj = entity as ObjectMp;
      if (obj.handle && GetEntityModel(obj.handle) === modelHash) {
        result.push(obj);
      }
    });
    return result;
  }
}
