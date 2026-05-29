import { StreamingPool } from "./StreamingPool";
import { PedMp } from "../Entities/PedMp";
import { getPedPool } from "../utils/worldScan";

let localPedIdCounter = 1000000;

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

  new(model, position, options = {}) {
    const hash = typeof model === "string" ? GetHashKey(model) : model;
    const id = ++localPedIdCounter;
    const ped = new PedMp(id, 0);
    this._add(ped);

    const finish = () => {
      const handle = CreatePed(
        options.type ?? 4,
        hash,
        position.x, position.y, position.z,
        options.heading ?? 0,
        false,
        false
      );
      ped._handle = handle;
      if (options.frozen) FreezeEntityPosition(handle, true);
      if (typeof options.dimension === "number" && typeof SetEntityRoutingBucket === "function") {
        SetEntityRoutingBucket(handle, options.dimension);
      }
      SetModelAsNoLongerNeeded(hash);
    };

    if (HasModelLoaded(hash)) {
      finish();
    } else {
      RequestModel(hash);
      let tries = 0;
      const tick = setTick(() => {
        if (HasModelLoaded(hash)) {
          clearTick(tick);
          finish();
        } else if (++tries > 200) {
          clearTick(tick);
        }
      });
    }

    return ped;
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
