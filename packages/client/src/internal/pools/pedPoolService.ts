import { safeGetEntityFromNetId } from "../../utils/netId";
import { atHandle } from "./streamingService";
import { PedInternals } from "../pedInternals";
import type { PedMp } from "../../Entities/PedMp";

export function setupPedPool(pool: object): void {
  onNet("ragemp:pedInvincible", (netId: number, value: boolean) => {
    const handle = safeGetEntityFromNetId(netId);
    if (handle) {
      SetEntityInvincible(handle, value);
      const ped = atHandle(pool, handle) as PedMp | null;
      if (ped) {
        PedInternals.get(ped).invincible = value;
      }
    }
  });
}
