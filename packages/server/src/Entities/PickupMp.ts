import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { BroadcastEntity } from "./BroadcastEntity";
import { PickupInternals, initPickupInternals } from "../internal/pickupInternals";
import { EntityInternals } from "@ragemp-fivem-bridge/shared/internal";

export class PickupMp extends BroadcastEntity {
  protected override readonly updateEvent = "ragemp:pickupUpdate";
  protected override readonly destroyEvent = "ragemp:pickupDestroy";

  constructor(token: symbol, id: number, pickupHash: number, position: Vector3, options: {
    value?: number;
    alpha?: number;
    dimension?: number;
  } = {}) {
    super(token, id, "pickup");
    const rec = EntityInternals.get(this);
    rec.position = position;
    rec.alpha = options.alpha ?? 255;
    rec.dimension = options.dimension ?? 0;
    initPickupInternals(this, pickupHash, options.value ?? 0);
  }

  protected override pool(): object | null | undefined {
    return globalThis.mp?.pickups;
  }

  override toData(): Record<string, any> {
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

  get value(): number {
    return PickupInternals.get(this).value;
  }

  set value(v: number) {
    PickupInternals.get(this).value = v;
    this.sync();
  }

  override get alpha(): number {
    return EntityInternals.get(this).alpha;
  }

  override set alpha(v: number) {
    EntityInternals.get(this).alpha = v;
    this.sync();
  }

  override get model(): number {
    return PickupInternals.get(this).pickupHash;
  }
}
