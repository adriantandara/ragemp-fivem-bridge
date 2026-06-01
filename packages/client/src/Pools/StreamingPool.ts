import { Pool } from "@ragemp-fivem-bridge/shared";
import { onWorldScan } from "../utils/worldScan";
import { safeGetNetworkId } from "../utils/netId";
import { netIdForRemote } from "../utils/netMap";

const LOCAL_STREAM_ID_BASE = 2_000_000_000;

export class StreamingPool extends Pool {
  _handleToEntity: Map<number, any> = new Map();
  _activeSet: Set<number> = new Set();
  _netType: string | null = null;
  _makeEntity: null | ((id: number, handle: number) => any) = null;
  _entities!: Map<number, any>;
  _add!: (entity: any) => void;
  at!: (id: number) => any;
  exists!: (entity: number | { id: number }) => boolean;
  forEach!: (fn: (entity: any) => void) => void;
  toArray!: () => any[];

  _startStreaming(getHandles: () => number[], makeEntity: (id: number, handle: number) => any, filter?: (handle: number) => boolean): void {
    this._makeEntity = makeEntity;
    onWorldScan(() => {
      const handles = getHandles();
      const activeSet = this._activeSet;
      activeSet.clear();

      for (const handle of handles) {
        if (filter && !filter(handle)) continue;
        if (!handle || !DoesEntityExist(handle)) continue;

        const existing = this._handleToEntity.get(handle);
        if (existing) {
          activeSet.add(existing.id);
          continue;
        }

        const netId = safeGetNetworkId(handle);
        const id = netId !== 0 ? netId : LOCAL_STREAM_ID_BASE + handle;
        activeSet.add(id);

        const entity = makeEntity(id, handle);
        this._add(entity);
        this._handleToEntity.set(handle, entity);
        globalThis.mp?.events?._fire("entityStreamIn", entity);
        this._onStreamIn(entity, handle, netId);
      }

      for (const [handle, entity] of this._handleToEntity) {
        if (!activeSet.has(entity.id)) {
          this._entities.delete(entity.id);
          this._handleToEntity.delete(handle);
          globalThis.mp?.events?._fire("entityStreamOut", entity);
          this._onStreamOut(entity);
        }
      }
    });
  }

  _onStreamIn(entity: any, handle: number, netId: number): void {}

  _onStreamOut(entity: any): void {}

  atHandle(handle: number): any {
    return this._handleToEntity.get(handle) ?? null;
  }

  atRemoteId(remoteId: number): any {
    const direct = this.at(remoteId);
    if (direct) return direct;
    if (!this._netType) return null;
    const netId = netIdForRemote(this._netType, remoteId);
    if (!netId) return null;
    return this._resolveByNetId(netId);
  }

  _resolveByNetId(netId: number) {
    const existing = this.at(netId);
    if (existing) return existing;
    if (typeof NetworkGetEntityFromNetworkId !== "function" || !this._makeEntity) return null;
    const handle = NetworkGetEntityFromNetworkId(netId);
    if (!handle || (typeof DoesEntityExist === "function" && !DoesEntityExist(handle))) return null;
    const byHandle = this._handleToEntity.get(handle);
    if (byHandle) return byHandle;
    const entity = this._makeEntity(netId, handle);
    this._add(entity);
    this._handleToEntity.set(handle, entity);
    return entity;
  }

  _remove(id: number): void {
    const entity = this._entities.get(id);
    if (entity) this._handleToEntity.delete(entity._handle);
    super._remove(id);
  }
}
