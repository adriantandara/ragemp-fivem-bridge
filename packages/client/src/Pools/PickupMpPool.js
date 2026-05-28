import { Pool } from "@ragemp-fivem-bridge/shared";

class ClientPickup {
  constructor(data) {
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

  _create() {
    if (this._handle) return;
    this._handle = CreatePickup(this.pickupHash, this.x, this.y, this.z, 8, this.value, false, this.pickupHash);
    if (this._handle && this.alpha !== 255) {
      SetEntityAlpha(this._handle, this.alpha, false);
    }
  }

  _destroy() {
    if (this._handle) {
      RemovePickup(this._handle);
      this._handle = null;
    }
  }
}

export class PickupMpPool extends Pool {
  _pickups = new Map();

  constructor() {
    super();
    this._setupSync();
    this._setupTick();
  }

  at(id) {
    return this._pickups.get(id) ?? null;
  }

  exists(idOrPickup) {
    const id = typeof idOrPickup === "number" ? idOrPickup : idOrPickup?.id;
    return this._pickups.has(id);
  }

  forEach(fn) {
    this._pickups.forEach((p) => fn(p));
  }

  toArray() {
    return Array.from(this._pickups.values());
  }

  get length() {
    return this._pickups.size;
  }

  get size() {
    return this._pickups.size;
  }

  _setupSync() {
    onNet("ragemp:pickupCreate", (data) => {
      this._addPickup(data);
    });

    onNet("ragemp:pickupSyncAll", (pickups) => {
      for (const data of pickups) {
        this._addPickup(data);
      }
    });

    onNet("ragemp:pickupUpdate", (id, data) => {
      const pickup = this._pickups.get(id);
      if (!pickup) return;
      pickup._destroy();
      Object.assign(pickup, data);
      pickup._handle = null;
      pickup._collected = false;
      pickup._create();
    });

    onNet("ragemp:pickupDestroy", (id) => {
      const pickup = this._pickups.get(id);
      if (pickup) {
        pickup._destroy();
        this._pickups.delete(id);
      }
    });
  }

  _addPickup(data) {
    if (this._pickups.has(data.id)) return;
    const pickup = new ClientPickup(data);
    pickup._create();
    this._pickups.set(data.id, pickup);
  }

  _setupTick() {
    setTick(() => {
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
