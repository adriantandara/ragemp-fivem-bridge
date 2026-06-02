import { Pool } from "@ragemp-fivem-bridge/shared";
import { onWorldScan } from "../utils/worldScan";
import { safeGetNetworkId, safeGetEntityFromNetId } from "../utils/netId";
import { subscribeEntityRegistry } from "../utils/entityRegistry";

export const LOCAL_STREAM_ID_BASE = 2_000_000_000;

export class StreamingPool extends Pool {
  _handleToEntity: Map<number, any> = new Map();
  _byRemote = new Map();
  _netIdToRemote = new Map();
  _activeSet: Set<number> = new Set();
  _netType: string | null = null;
  _makeEntity: null | ((id: number, handle: number) => any) = null;
  _filter: null | ((handle: number) => boolean) = null;
  _entities!: Map<number, any>;
  _add!: (entity: any) => void;
  forEach!: (fn: (entity: any) => void) => void;
  toArray!: () => any[];

  _subscribeRegistry() {
    if (!this._netType) return;
    subscribeEntityRegistry(this._netType, {
      create: (remoteId: number, data: any) => this._onServerCreate(remoteId, data),
      netid: (remoteId: number, netId: number) => this._onServerNetId(remoteId, netId),
      destroy: (remoteId: number) => this._onServerDestroy(remoteId),
    });
  }

  _startNetworked(makeEntity: ((id: number, handle: number) => any)) {
    if (makeEntity) this._makeEntity = makeEntity;
    this._subscribeRegistry();
  }

  _startStreaming(getHandles: () => number[], makeEntity: (id: number, handle: number) => any, filter?: (handle: number) => boolean): void {
    this._makeEntity = makeEntity;
    this._filter = filter ?? null;
    this._subscribeRegistry();
    onWorldScan(() => this._scan(getHandles));
  }

  _onServerCreate(remoteId: number, data: any) {
    if (this._byRemote.has(remoteId)) return;
    const entity = this._makeEntity(remoteId, 0);
    entity._isServer = true;
    entity._netId = 0;
    entity._serverModel = data?.model ?? 0;
    entity._serverPos = { x: data?.x ?? 0, y: data?.y ?? 0, z: data?.z ?? 0 };
    entity._serverDimension = data?.dimension ?? 0;
    this._byRemote.set(remoteId, entity);
  }

   _onServerNetId(remoteId: number, netId: number) {
    if (!netId) return;
    let entity = this._byRemote.get(remoteId);
    if (!entity) {
      this._onServerCreate(remoteId, {});
      entity = this._byRemote.get(remoteId);
    }
    if (entity._netId && entity._netId !== netId) {
      this._netIdToRemote.delete(entity._netId);
    }
    entity._netId = netId;
    this._netIdToRemote.set(netId, remoteId);
    this._refreshServerHandle(entity);
  }

  _onServerDestroy(remoteId: number) {
    const entity = this._byRemote.get(remoteId);
    if (!entity) return;
    this._byRemote.delete(remoteId);
    if (entity._netId) this._netIdToRemote.delete(entity._netId);
    if (entity._handle) {
      this._handleToEntity.delete(entity._handle);
    }
    if (this._entities.has(remoteId)) {
      globalThis.mp?.events?._fire("entityStreamOut", entity);
      this._onStreamOut(entity);
      this._entities.delete(remoteId);
    }
    entity._handle = 0;
  }

  _bindHandle(remoteId: number, handle: number, netId: number) {
    let entity = this._byRemote.get(remoteId);
    if (!entity) {
      entity = this._makeEntity(remoteId, handle);
      entity._isServer = true;
      this._byRemote.set(remoteId, entity);
    }

    const occupant = this._handleToEntity.get(handle);
    if (occupant && occupant !== entity) {
      this._handleToEntity.delete(handle);
      this._entities.delete(occupant.id);
    }

    entity._isServer = true;
    if (netId) entity._netId = netId;
    if (entity._handle && entity._handle !== handle) {
      this._handleToEntity.delete(entity._handle);
    }
    entity._handle = handle;
    this._handleToEntity.set(handle, entity);
    if (!this._entities.has(entity.id)) {
      this._add(entity);
      globalThis.mp?.events?._fire("entityStreamIn", entity);
      this._onStreamIn(entity, handle, netId);
    }
    return entity;
  }

  _refreshServerHandle(entity: any) {
    if (!entity || !entity._isServer || !entity._netId) return entity;
    const handle = safeGetEntityFromNetId(entity._netId);
    const valid = !!handle;
    if (valid) {
      if (entity._handle !== handle || !this._entities.has(entity.id)) {
        this._bindHandle(entity.id, handle, entity._netId);
      }
    } else if (entity._handle) {
      this._handleToEntity.delete(entity._handle);
      if (this._entities.has(entity.id)) {
        globalThis.mp?.events?._fire("entityStreamOut", entity);
        this._onStreamOut(entity);
        this._entities.delete(entity.id);
      }
      entity._handle = 0;
    }
    return entity;
  }

  _resolveHandle(handle: number) {
    if (this._filter && !this._filter(handle)) return null;
    if (!handle || !DoesEntityExist(handle)) return null;

    const existing = this._handleToEntity.get(handle);
    if (existing) return existing;

    const netId = safeGetNetworkId(handle);
    const remoteId = netId ? this._netIdToRemote.get(netId) : undefined;

    if (remoteId !== undefined) {
      return this._bindHandle(remoteId, handle, netId);
    }

    const id = netId !== 0 ? netId : LOCAL_STREAM_ID_BASE + handle;
    let entity = this._entities.get(id);
    if (!entity) {
      entity = this._makeEntity(id, handle);
      this._add(entity);
      this._handleToEntity.set(handle, entity);
      globalThis.mp?.events?._fire("entityStreamIn", entity);
      this._onStreamIn(entity, handle, netId);
    }
    return entity;
  }

  _scan(getHandles: () => number[]) {
    const handles = getHandles();
    const activeSet = this._activeSet;
    activeSet.clear();

    for (const handle of handles) {
      const entity = this._resolveHandle(handle);
      if (entity) activeSet.add(entity.id);
    }

    for (const [handle, entity] of this._handleToEntity) {
      if (activeSet.has(entity.id)) continue;
      this._handleToEntity.delete(handle);
      this._entities.delete(entity.id);
      globalThis.mp?.events?._fire("entityStreamOut", entity);
      this._onStreamOut(entity);
      if (entity._isServer) entity._handle = 0;
    }
  }

  _onStreamIn(entity: any, handle: number, netId: number): void {}

  _onStreamOut(entity: any): void {}

  at(id: number) {
    const server = this._byRemote.get(id);
    if (server) return this._refreshServerHandle(server);
    return this._entities.get(id) ?? null;
  }

  atRemoteId(remoteId: number) {
    return this.at(remoteId);
  }

  atRemoteIdAsync(remoteId: number, options: any = {}) {
    const timeout = typeof options === "number" ? options : options.timeout ?? 5000;
    const interval = (typeof options === "object" && options.interval) || 50;
    return new Promise((resolve) => {
      const immediate = this.atRemoteId(remoteId);
      if (immediate) {
        resolve(immediate);
        return;
      }
      const now = () => (typeof GetGameTimer === "function" ? GetGameTimer() : 0);
      const start = now();
      const tick = setInterval(() => {
        const found = this.atRemoteId(remoteId);
        if (found) {
          clearInterval(tick);
          resolve(found);
          return;
        }
        if (now() - start >= timeout) {
          clearInterval(tick);
          resolve(null);
        }
      }, interval);
    });
  }

  atHandle(handle: number) {
    return this._handleToEntity.get(handle) ?? null;
  }

  atNetId(netId: number) {
    if (!netId) return null;
    const remoteId = this._netIdToRemote.get(netId);
    if (remoteId !== undefined) {
      const entity = this._byRemote.get(remoteId);
      if (entity) return this._refreshServerHandle(entity);
    }
    const ambient = this._entities.get(netId);
    if (ambient) return ambient;
    const handle = safeGetEntityFromNetId(netId);
    if (!handle) return null;
    return this._handleToEntity.get(handle) ?? null;
  }

  exists(entity: any) {
    if (typeof entity === "number") {
      return this._byRemote.has(entity) || this._entities.has(entity);
    }
    if (!entity || typeof entity !== "object") return false;
    return this._byRemote.has(entity.id) || this._entities.has(entity.id);
  }

  _remove(id: number) {
    const entity = this._entities.get(id) ?? this._byRemote.get(id);
    if (entity) {
      if (entity._handle) this._handleToEntity.delete(entity._handle);
      if (entity._netId) this._netIdToRemote.delete(entity._netId);
    }
    this._byRemote.delete(id);
    super._remove(id);
  }
}
