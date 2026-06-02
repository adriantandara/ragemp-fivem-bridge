import { Pool } from "@ragemp-fivem-bridge/shared";
import { ObjectMp } from "../Entities/ObjectMp";
import { StreamingPool, LOCAL_STREAM_ID_BASE } from "./StreamingPool";
import { safeGetEntityFromNetId } from "../utils/netId";

let localObjectCounter = 0;

function nextLocalId() {
  return LOCAL_STREAM_ID_BASE + ++localObjectCounter;
}

export class ObjectMpPool extends StreamingPool  {
  _netType = "object";
  _handleToEntity: Map<number, ObjectMp> = new Map();
  _entities!: Map<number, ObjectMp>;
  _add!: (entity: ObjectMp) => void;
  at!: (id: number) => ObjectMp | null;
  exists!: (entity: number | { id: number }) => boolean;
  forEach!: (fn: (entity: ObjectMp) => void) => void;
  toArray!: () => ObjectMp[];

  constructor() {
    super();
    this._startNetworked((id, handle) => new ObjectMp(id, handle));
    this._setupServerSync();
  }

  _setupServerSync(): void {
    onNet("ragemp:objectAlpha", (netId: number, value: number) => {
      const handle = safeGetEntityFromNetId(netId);
      if (handle) {
        SetEntityAlpha(handle, value, false);
      }
    });

    if (typeof AddStateBagChangeHandler === "function") {
      AddStateBagChangeHandler("ragemp:staticObject", null, (bagName: string, _key: string, value: any) => {
        if (!value || typeof bagName !== "string" || bagName.indexOf("entity:") !== 0) return;
        const netId = parseInt(bagName.slice(7), 10);
        if (!netId) return;
        this._freezeStaticObject(netId, 0);
      });
    }
  }

  _freezeStaticObject(netId: number, tries: number): void {
    const handle = safeGetEntityFromNetId(netId);
    if (handle) {
      FreezeEntityPosition(handle, true);
      return;
    }
    if (tries < 20) {
      setTimeout(() => this._freezeStaticObject(netId, tries + 1), 100);
    }
  }

  new(model: number | string, position: { x: number; y: number; z: number }, options: any = {}): ObjectMp {
    const modelHash = typeof model === "string" ? GetHashKey(model) : model;

    const handle = CreateObject(modelHash, position.x, position.y, position.z, true, true, false);
    const id = nextLocalId();
    const obj = new ObjectMp(id, handle);

    if (options.rotation) {
      obj.rotation = options.rotation;
    }

    if (options.alpha !== undefined) {
      obj.alpha = options.alpha;
    }

    this._add(obj);
    this._handleToEntity.set(handle, obj);

    return obj;
  }

  atHandle(handle: number): ObjectMp | null {
    return this._handleToEntity.get(handle) ?? null;
  }

  newWeak(handle: number): ObjectMp {
    const id = nextLocalId();
    const obj = new ObjectMp(id, handle);
    obj._isWeak = true;

    this._add(obj);
    this._handleToEntity.set(handle, obj);

    return obj;
  }

  newWeaponObject(weaponHash: number | string, position: { x: number; y: number; z: number }, options: any = {}): ObjectMp {
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

    const id = nextLocalId();
    const obj = new ObjectMp(id, handle);

    if (options.rotation) {
      obj.rotation = options.rotation;
    }

    if (options.alpha !== undefined) {
      obj.alpha = options.alpha;
    }

    this._add(obj);
    this._handleToEntity.set(handle, obj);

    return obj;
  }

  getAllByHash(hash: number | string): ObjectMp[] {
    const modelHash = typeof hash === "string" ? GetHashKey(hash) : hash;
    const result: ObjectMp[] = [];
    this._entities.forEach((entity: ObjectMp) => {
      if (entity._handle && GetEntityModel(entity._handle) === modelHash) {
        result.push(entity);
      }
    });
    return result;
  }
}
