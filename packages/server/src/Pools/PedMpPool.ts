import { HandlePool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { poolStore, poolAdd, handlePoolStore, CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { PedMp } from "../Entities/PedMp";
import { whenNetworked } from "../utils/whenNetworked";
import { entityCreated, entityBindNetId } from "../utils/entityRegistry";
import { PedInternals } from "../internal/pedInternals";
import { setupPedPool } from "../internal/pools/pedPoolService";

let pedIdCounter = 0;

export class PedMpPool extends HandlePool {
  constructor() {
    super();
    setupPedPool(this);
  }

  new(model: number | string, position: Vector3, options: {
    heading?: number;
    dimension?: number;
    frozen?: boolean;
    invincible?: boolean;
    dynamic?: boolean;
    lockController?: boolean;
  } = {}): PedMp {
    const modelHash = typeof model === "string" ? GetHashKey(model) : model;
    const heading = options.heading ?? 0;
    const dimension = options.dimension ?? 0;

    const handle = CreatePed(4, modelHash, position.x, position.y, position.z, heading, true, false);
    const id = ++pedIdCounter;
    const ped = new PedMp(CONSTRUCT, id, handle);

    if (dimension !== 0) {
      ped.dimension = dimension;
    }

    if (options.frozen) {
      ped.frozen = true;
    }

    if (options.invincible) {
      ped.invincible = true;
    }

    const rec = PedInternals.get(ped);
    rec.dynamic = options.dynamic ?? true;
    rec.lockController = options.lockController ?? false;

    poolAdd(this, ped as any);
    handlePoolStore(this).handleToEntity.set(handle, ped as any);

    entityCreated("ped", ped.id, {
      model: modelHash,
      x: position.x,
      y: position.y,
      z: position.z,
      dimension,
    });

    whenNetworked(
      handle,
      (netId) => {
        PedInternals.get(ped).cachedNetId = netId;
        entityBindNetId("ped", ped.id, netId);
      },
      () => poolStore(this).entities.has(ped.id),
    );

    return ped;
  }
}
