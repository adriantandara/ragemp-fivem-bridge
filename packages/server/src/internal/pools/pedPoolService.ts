import { removeFromPool } from "@ragemp-fivem-bridge/shared/internal";
import { entityDestroyed } from "../../utils/entityRegistry";
import type { PedMpPool } from "../../Pools/PedMpPool";

export function setupPedPool(_pool: PedMpPool): void {
}

export function removeFromPedPool(pool: PedMpPool, id: number): void {
  entityDestroyed("ped", id);
  removeFromPool(pool, id);
}
