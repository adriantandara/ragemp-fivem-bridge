import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { PickupMp } from "../Entities/PickupMp";

let pickupIdCounter = 0;

export class PickupMpPool extends Pool {
  constructor() {
    super();
    this._setupSync();
  }

  _setupSync(): void {
    onNet("ragemp:playerReady", () => {
      const playerSource = source;
      const pickups: ReturnType<PickupMp["toData"]>[] = [];
      this.forEach(((pickup: PickupMp) => pickups.push(pickup.toData())) as any);
      if (pickups.length > 0) {
        emitNet("ragemp:pickupSyncAll", playerSource, pickups);
      }
    });

    onNet("ragemp:playerPickup", (pickupId: number) => {
      const pickup = this.at(pickupId) as unknown as PickupMp | null;
      const player = globalThis.mp?.players?.at(source);
      if (!pickup || !player) return;
      try {
        const pp = player.position;
        const pos = pickup._position;
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

  new(pickupHash: number, position: Vector3, options: {
    value?: number;
    alpha?: number;
    dimension?: number;
  } = {}): PickupMp {
    const id = ++pickupIdCounter;
    const pickup = new PickupMp(id, pickupHash, position, options);
    this._add(pickup as any);
    emitNet("ragemp:pickupCreate", -1, pickup.toData());
    return pickup;
  }
}
