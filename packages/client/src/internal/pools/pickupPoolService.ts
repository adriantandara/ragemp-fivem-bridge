import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import { PickupInternals, initPickupInternals, type PickupRec } from "../pickupInternals";
import { onWorldScan } from "../../utils/worldScan";
import { isVisibleHere, onDimensionChange } from "../../utils/dimension";
import type { PickupMpPool } from "../../Pools/PickupMpPool";

export class ClientPickup {
  [key: string]: unknown;
  id: number;
  pickupHash: number;
  x: number;
  y: number;
  z: number;
  value: number;
  alpha: number;
  dimension: number;

  constructor(data: any) {
    this.id = data.id;
    this.pickupHash = data.pickupHash;
    this.x = data.x;
    this.y = data.y;
    this.z = data.z;
    this.value = data.value ?? 0;
    this.alpha = data.alpha ?? 255;
    this.dimension = data.dimension ?? 0;
    initPickupInternals(this);
  }

  get position(): { distance(v: { x: number; y: number; z: number }): number; distanceSqr(v: { x: number; y: number; z: number }): number } {
    const { x, y, z } = this;
    return {
      distance(v: { x: number; y: number; z: number }): number {
        return Math.sqrt((x - v.x) ** 2 + (y - v.y) ** 2 + (z - v.z) ** 2);
      },
      distanceSqr(v: { x: number; y: number; z: number }): number {
        return (x - v.x) ** 2 + (y - v.y) ** 2 + (z - v.z) ** 2;
      },
    };
  }
}

function createNative(pickup: ClientPickup, rec: PickupRec): void {
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
  pickups: Map<number, ClientPickup>;
}

const PickupPoolInternals = defineInternals<PickupPoolRec>();

export function pickupMap(pool: PickupMpPool): Map<number, ClientPickup> {
  return PickupPoolInternals.get(pool).pickups;
}

function applyVisibility(pickup: ClientPickup): void {
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
  const pickup = new ClientPickup(data);
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
    const pickups = PickupPoolInternals.get(pool).pickups;
    const pickup = pickups.get(id);
    if (pickup) {
      destroyNative(PickupInternals.get(pickup));
      pickups.delete(id);
    }
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
