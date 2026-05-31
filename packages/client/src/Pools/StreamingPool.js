import { Pool } from "@ragemp-fivem-bridge/shared";
import { onWorldScan } from "../utils/worldScan";
import { safeGetNetworkId } from "../utils/netId";

const LOCAL_STREAM_ID_BASE = 2_000_000_000;

export class StreamingPool extends Pool {
  _handleToEntity = new Map();
  _activeSet = new Set();

  _startStreaming(getHandles, makeEntity, filter) {
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

  _onStreamIn(entity, handle, netId) {}

  _onStreamOut(entity) {}

  atHandle(handle) {
    return this._handleToEntity.get(handle) ?? null;
  }

  atRemoteId(remoteId) {
    return this.at(remoteId);
  }

  _remove(id) {
    const entity = this._entities.get(id);
    if (entity) this._handleToEntity.delete(entity._handle);
    super._remove(id);
  }
}
