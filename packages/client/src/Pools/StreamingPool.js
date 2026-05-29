import { Pool } from "@ragemp-fivem-bridge/shared";
import { onWorldScan } from "../utils/worldScan";
import { safeGetNetworkId } from "../utils/netId";

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
        const netId = safeGetNetworkId(handle);
        if (netId === 0) continue;
        activeSet.add(netId);

        if (!this._handleToEntity.has(handle)) {
          const entity = makeEntity(netId, handle);
          this._add(entity);
          this._handleToEntity.set(handle, entity);
          globalThis.mp?.events?._fire("entityStreamIn", entity);
          this._onStreamIn(entity, handle, netId);
        }
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
