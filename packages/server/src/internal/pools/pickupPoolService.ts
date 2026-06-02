import { poolStore } from "@ragemp-fivem-bridge/shared/internal";
import type { PickupMp } from "../../Entities/PickupMp";
import type { PickupMpPool } from "../../Pools/PickupMpPool";

export function setupPickupPool(pool: PickupMpPool): void {
  onNet("ragemp:playerReady", () => {
    const playerSource = source;
    const pickups: ReturnType<PickupMp["toData"]>[] = [];
    poolStore(pool).entities.forEach((pickup) => pickups.push((pickup as unknown as PickupMp).toData()));
    if (pickups.length > 0) {
      emitNet("ragemp:pickupSyncAll", playerSource, pickups);
    }
  });

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
    globalThis.mp.events._fire("playerPickup", player, pickup);
  });
}
