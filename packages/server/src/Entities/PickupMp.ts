import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { PickupInternals, initPickupInternals } from "../internal/pickupInternals";
import { removeFromPool, EntityInternals } from "@ragemp-fivem-bridge/shared/internal";

export class PickupMp extends Entity {
  constructor(id: number, pickupHash: number, position: Vector3, options: {
    value?: number;
    alpha?: number;
    dimension?: number;
  } = {}) {
    super(id, "pickup");
    const rec = EntityInternals.get(this);
    rec.position = position;
    rec.alpha = options.alpha ?? 255;
    rec.dimension = options.dimension ?? 0;
    initPickupInternals(this, pickupHash, options.value ?? 0);
  }

  _sync(): void {
    emitNet("ragemp:pickupUpdate", -1, this.id, this.toData());
  }

  toData(): Record<string, any> {
    const rec = PickupInternals.get(this);
    const ent = EntityInternals.get(this);
    return {
      id: this.id,
      pickupHash: rec.pickupHash,
      x: ent.position!.x,
      y: ent.position!.y,
      z: ent.position!.z,
      value: rec.value,
      alpha: ent.alpha,
      dimension: ent.dimension,
    };
  }

  get pickupHash(): number {
    return PickupInternals.get(this).pickupHash;
  }

  get position(): Vector3 {
    return EntityInternals.get(this).position!;
  }

  set position(value: Vector3) {
    EntityInternals.get(this).position = value;
    this._sync();
  }

  get value(): number {
    return PickupInternals.get(this).value;
  }

  set value(v: number) {
    PickupInternals.get(this).value = v;
    this._sync();
  }

  get alpha(): number {
    return EntityInternals.get(this).alpha;
  }

  set alpha(v: number) {
    EntityInternals.get(this).alpha = v;
    this._sync();
  }

  get dimension(): number {
    return EntityInternals.get(this).dimension;
  }

  set dimension(v: number) {
    EntityInternals.get(this).dimension = v;
    this._sync();
  }

  get model(): number {
    return PickupInternals.get(this).pickupHash;
  }

  destroy(): void {
    emitNet("ragemp:pickupDestroy", -1, this.id);
    const pool = globalThis.mp?.pickups;
    if (pool) removeFromPool(pool, this.id);
  }
}
