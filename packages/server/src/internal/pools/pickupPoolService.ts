import { poolStore } from "@ragemp-fivem-bridge/shared/internal";
import { setupBroadcastSync } from "./broadcastSyncService";
import type { PickupMp } from "../../Entities/PickupMp";
import type { PickupMpPool } from "../../Pools/PickupMpPool";

export function setupPickupPool(pool: PickupMpPool): void {
  setupBroadcastSync(pool, "ragemp:pickupSyncAll");

  onNet("ragemp:playerPickup", (pickupId: number) => {
    const pickup = poolStore(pool).entities.get(pickupId) as unknown as PickupMp | undefined;
    const player = globalThis.mp?.players?.at(source);
    if (!pickup || !player) return;
    try {
      const pp = player.position;
      const pos = pickup.position;
      const dx = pp.x - pos.x;
      const dy = pp.y - pos.y;
      const dz = pp.z - pos.z;
      if (dx * dx + dy * dy + dz * dz > 25) return;
    } catch (e) {
      return;
    }
    globalThis.mp.events.call("playerPickup", player, pickup);
  });
}
