import { Pool } from "@ragemp-fivem-bridge/shared";
import { onWorldScan } from "../utils/worldScan";
import { isVisibleHere, onDimensionChange } from "../utils/dimension";

class ClientPickup {
  [key: string]: unknown;
  id: number;
  pickupHash: number;
  x: number;
  y: number;
  z: number;
  value: number;
  alpha: number;
  dimension: number;
  _handle: number | null;
  _collected: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.pickupHash = data.pickupHash;
    this.x = data.x;
    this.y = data.y;
    this.z = data.z;
    this.value = data.value ?? 0;
    this.alpha = data.alpha ?? 255;
    this.dimension = data.dimension ?? 0;
    this._handle = null;
    this._collected = false;
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

  _create(): void {
    if (this._handle) return;
    this._handle = CreatePickup(this.pickupHash, this.x, this.y, this.z, 8, this.value, false, this.pickupHash);
    if (this._handle && this.alpha !== 255) {
      SetEntityAlpha(this._handle, this.alpha, false);
    }
  }

  _destroy(): void {
    if (this._handle) {
      RemovePickup(this._handle);
      this._handle = null;
    }
  }
}

export class PickupMpPool extends Pool {
  _pickups: Map<number, ClientPickup> = new Map();

  constructor() {
    super();
    this._setupSync();
    this._setupTick();
    onDimensionChange(() => this._pickups.forEach((p: ClientPickup) => this._applyVisibility(p)));
  }

  _applyVisibility(pickup: ClientPickup): void {
    if (pickup._collected) return;
    const shown = isVisibleHere(pickup.dimension);
    if (shown && !pickup._handle) {
      pickup._create();
    } else if (!shown && pickup._handle) {
      pickup._destroy();
    }
  }

  at(id: number): ClientPickup | null {
    return this._pickups.get(id) ?? null;
  }

  exists(idOrPickup: number | { id: number }): boolean {
    const id = typeof idOrPickup === "number" ? idOrPickup : idOrPickup?.id;
    return this._pickups.has(id);
  }

  forEach(fn: (p: ClientPickup) => void): void {
    this._pickups.forEach((p: ClientPickup) => fn(p));
  }

  toArray(): ClientPickup[] {
    return Array.from(this._pickups.values());
  }

  get length(): number {
    return this._pickups.size;
  }

  get size(): number {
    return this._pickups.size;
  }

  _setupSync(): void {
    onNet("ragemp:pickupCreate", (data: any) => {
      this._addPickup(data);
    });

    onNet("ragemp:pickupSyncAll", (pickups: any[]) => {
      for (const data of pickups) {
        this._addPickup(data);
      }
    });

    onNet("ragemp:pickupUpdate", (id: number, data: any) => {
      const pickup = this._pickups.get(id);
      if (!pickup) return;
      pickup._destroy();
      Object.assign(pickup, data);
      pickup._handle = null;
      pickup._collected = false;
      this._applyVisibility(pickup);
    });

    onNet("ragemp:pickupDestroy", (id: number) => {
      const pickup = this._pickups.get(id);
      if (pickup) {
        pickup._destroy();
        this._pickups.delete(id);
      }
    });
  }

  _addPickup(data: any): void {
    if (this._pickups.has(data.id)) return;
    const pickup = new ClientPickup(data);
    this._pickups.set(data.id, pickup);
    this._applyVisibility(pickup);
  }

  _setupTick(): void {
    onWorldScan(() => {
      for (const [id, pickup] of this._pickups) {
        if (pickup._collected || !pickup._handle) continue;
        if (HasPickupBeenCollected(pickup._handle)) {
          pickup._collected = true;
          pickup._handle = null;
          emitNet("ragemp:playerPickup", id);
          globalThis.mp?.events?._fire("playerPickup", globalThis.mp?.players?.local, pickup);
        }
      }
    });
  }
}
