import { Pool } from "@ragemp-fivem-bridge/shared";
import { PickupMp } from "../Entities/PickupMp";

let pickupIdCounter = 0;

export class PickupMpPool extends Pool {
  constructor() {
    super();
    this._setupSync();
  }

  _setupSync() {
    onNet("ragemp:playerReady", () => {
      const playerSource = globalThis.source;
      const pickups = [];
      this.forEach((pickup) => pickups.push(pickup.toData()));
      if (pickups.length > 0) {
        emitNet("ragemp:pickupSyncAll", playerSource, pickups);
      }
    });

    onNet("ragemp:playerPickup", (pickupId) => {
      const pickup = this.at(pickupId);
      const player = globalThis.mp?.players?.at(source);
      if (pickup && player) {
        globalThis.mp.events._fire("playerPickup", player, pickup);
      }
    });
  }

  new(pickupHash, position, options = {}) {
    const id = ++pickupIdCounter;
    const pickup = new PickupMp(id, pickupHash, position, options);
    this._add(pickup);
    emitNet("ragemp:pickupCreate", -1, pickup.toData());
    return pickup;
  }
}
