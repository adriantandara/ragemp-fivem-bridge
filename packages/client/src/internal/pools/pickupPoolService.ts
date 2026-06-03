import { defineInternals, CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { PickupInternals, type PickupRec } from "../pickupInternals";
import { onWorldScan } from "../../utils/worldScan";
import { isVisibleHere, onDimensionChange } from "../../utils/dimension";
import { PickupMp } from "../../Entities/PickupMp";
import type { PickupMpPool } from "../../Pools/PickupMpPool";

function createNative(pickup: PickupMp, rec: PickupRec): void {
  if (rec.handle) return;
  rec.handle = CreatePickup(pickup.pickupHash, pickup.x, pickup.y, pickup.z, 8, pickup.value, false, pickup.pickupHash);
  if (rec.handle && pickup.alpha !== 255) {
    SetEntityAlpha(rec.handle, pickup.alpha, false);
  }
}

function destroyNative(rec: PickupRec): void {
  if (rec.handle) {
    RemovePickup(rec.handle);
    rec.handle = null;
  }
}

interface PickupPoolRec {
  pickups: Map<number, PickupMp>;
}

const PickupPoolInternals = defineInternals<PickupPoolRec>();

export function pickupMap(pool: PickupMpPool): Map<number, PickupMp> {
  return PickupPoolInternals.get(pool).pickups;
}

export function removePickup(pool: PickupMpPool, id: number): void {
  const pickups = PickupPoolInternals.get(pool).pickups;
  const pickup = pickups.get(id);
  if (pickup) {
    destroyNative(PickupInternals.get(pickup));
    pickups.delete(id);
  }
}

function applyVisibility(pickup: PickupMp): void {
  const rec = PickupInternals.get(pickup);
  if (rec.collected) return;
  const shown = isVisibleHere(pickup.dimension);
  if (shown && !rec.handle) {
    createNative(pickup, rec);
  } else if (!shown && rec.handle) {
    destroyNative(rec);
  }
}

function addPickup(pool: PickupMpPool, data: any): void {
  const pickups = PickupPoolInternals.get(pool).pickups;
  if (pickups.has(data.id)) return;
  const pickup = new PickupMp(CONSTRUCT, data);
  pickups.set(data.id, pickup);
  applyVisibility(pickup);
}

export function setupPickupPool(pool: PickupMpPool): void {
  PickupPoolInternals.init(pool, { pickups: new Map() });

  onDimensionChange(() => PickupPoolInternals.get(pool).pickups.forEach((p) => applyVisibility(p)));

  onNet("ragemp:pickupCreate", (data: any) => {
    addPickup(pool, data);
  });

  onNet("ragemp:pickupSyncAll", (pickups: any[]) => {
    for (const data of pickups) {
      addPickup(pool, data);
    }
  });

  onNet("ragemp:pickupUpdate", (id: number, data: any) => {
    const pickup = PickupPoolInternals.get(pool).pickups.get(id);
    if (!pickup) return;
    const rec = PickupInternals.get(pickup);
    destroyNative(rec);
    Object.assign(pickup, data);
    rec.handle = null;
    rec.collected = false;
    applyVisibility(pickup);
  });

  onNet("ragemp:pickupDestroy", (id: number) => {
    removePickup(pool, id);
  });

  onWorldScan(() => {
    for (const [id, pickup] of PickupPoolInternals.get(pool).pickups) {
      const rec = PickupInternals.get(pickup);
      if (rec.collected || !rec.handle) continue;
      if (HasPickupBeenCollected(rec.handle)) {
        rec.collected = true;
        rec.handle = null;
        emitNet("ragemp:playerPickup", id);
        globalThis.mp?.events?.call("playerPickup", globalThis.mp?.players?.local, pickup);
      }
    }
  });
}
