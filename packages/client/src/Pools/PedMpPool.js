import { StreamingPool } from "./StreamingPool";
import { PedMp } from "../Entities/PedMp";
import { getPedPool } from "../utils/worldScan";

export class PedMpPool extends StreamingPool {
  constructor() {
    super();
    this._startStreaming(
      getPedPool,
      (netId, handle) => new PedMp(netId, handle),
      (handle) => !IsPedAPlayer(handle)
    );
    this._setupServerSync();
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
}
