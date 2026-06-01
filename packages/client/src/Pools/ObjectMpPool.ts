import { Pool } from "@ragemp-fivem-bridge/shared";
import { ObjectMp } from "../Entities/ObjectMp";

let objectIdCounter = 0;

export class ObjectMpPool extends Pool {
  _handleToEntity: Map<number, ObjectMp> = new Map();
  _entities!: Map<number, ObjectMp>;
  _add!: (entity: ObjectMp) => void;
  at!: (id: number) => ObjectMp | null;
  exists!: (entity: number | { id: number }) => boolean;
  forEach!: (fn: (entity: ObjectMp) => void) => void;
  toArray!: () => ObjectMp[];

  constructor() {
    super();
    this._setupServerSync();
  }

  _setupServerSync(): void {
    onNet("ragemp:objectAlpha", (netId: number, value: number) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
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
    const handle = NetworkGetEntityFromNetworkId(netId);
    if (handle && DoesEntityExist(handle)) {
      FreezeEntityPosition(handle, true);
      return;
    }
    if (tries < 20) {
      setTimeout(() => this._freezeStaticObject(netId, tries + 1), 100);
    }
  }

  atRemoteId(remoteId: number): ObjectMp | null {
    return this.at(remoteId);
  }

  new(model: number | string, position: { x: number; y: number; z: number }, options: any = {}): ObjectMp {
    const modelHash = typeof model === "string" ? GetHashKey(model) : model;

    const handle = CreateObject(modelHash, position.x, position.y, position.z, true, true, false);
    const id = ++objectIdCounter;
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
    const id = ++objectIdCounter;
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

    const id = ++objectIdCounter;
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
      if (GetEntityModel(entity._handle) === modelHash) {
        result.push(entity);
      }
    });
    return result;
  }

  _remove(id: number): void {
    const entity = this._entities.get(id);
    if (entity) {
      this._handleToEntity.delete(entity._handle);
    }
    super._remove(id);
  }
}
