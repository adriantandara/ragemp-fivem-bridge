import { Pool } from "@ragemp-fivem-bridge/shared";
import { PedMp } from "../Entities/PedMp";
import { safeGetNetworkId } from "../utils/netId";

export class PedMpPool extends Pool {
  _handleToEntity = new Map();

  constructor() {
    super();
    this._setupStreaming();
    this._setupServerSync();
  }

  atRemoteId(remoteId) {
    return this.at(remoteId);
  }

  atHandle(handle) {
    return this._handleToEntity.get(handle) ?? null;
  }

  _setupStreaming() {
    setTick(() => {
      const peds = GetGamePool("CPed");
      const activeSet = new Set();

      for (const handle of peds) {
        if (IsPedAPlayer(handle)) continue;

        const netId = safeGetNetworkId(handle);
        if (netId === 0) continue;
        activeSet.add(netId);

        if (!this._handleToEntity.has(handle)) {
          const ped = new PedMp(netId, handle);
          this._add(ped);
          this._handleToEntity.set(handle, ped);
        }
      }

      for (const [handle, entity] of this._handleToEntity) {
        if (!activeSet.has(entity.id)) {
          this._entities.delete(entity.id);
          this._handleToEntity.delete(handle);
        }
      }
    });
  }

  _setupServerSync() {
    onNet("ragemp:pedInvincible", (netId, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetEntityInvincible(handle, value);
        const ped = this._handleToEntity.get(handle);
        if (ped) {
          ped._invincible = value;
        }
      }
    });
  }

  _remove(id) {
    const entity = this._entities.get(id);
    if (entity) {
      this._handleToEntity.delete(entity._handle);
    }
    super._remove(id);
  }
}
