import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { EntityInternals, removeFromPool } from "@ragemp-fivem-bridge/shared/internal";
import { CheckpointInternals, initCheckpointInternals } from "../internal/checkpointInternals";
import { applyCheckpointVisibility } from "../internal/pools/checkpointPoolService";

export class CheckpointMp extends Entity {
  id: number;

  constructor(id: number, handle: number) {
    super(id, "checkpoint");
    EntityInternals.get(this).handle = handle;
    initCheckpointInternals(this);
  }

  get position(): Vector3 | undefined {
    return EntityInternals.get(this).position ?? undefined;
  }

  set position(value: Vector3 | undefined) {
    EntityInternals.get(this).position = value ?? null;
  }

  get radius(): number | undefined {
    return CheckpointInternals.get(this).radius;
  }

  set radius(value: number | undefined) {
    CheckpointInternals.get(this).radius = value;
  }

  get visible(): boolean {
    return CheckpointInternals.get(this).visible ?? true;
  }

  set visible(value: boolean) {
    CheckpointInternals.get(this).visible = value;
    applyCheckpointVisibility(this);
  }

  get color(): { r: number; g: number; b: number; a: number } {
    const rec = CheckpointInternals.get(this);
    return { r: rec.r ?? 255, g: rec.g ?? 0, b: rec.b ?? 0, a: rec.a ?? 150 };
  }

  set color(value: { r: number; g: number; b: number; a: number }) {
    const rec = CheckpointInternals.get(this);
    rec.r = value.r;
    rec.g = value.g;
    rec.b = value.b;
    rec.a = value.a;
    applyCheckpointVisibility(this);
  }

  get dimension(): number {
    return EntityInternals.get(this).dimension;
  }

  set dimension(value: number) {
    EntityInternals.get(this).dimension = value;
  }

  get _radius(): number | undefined {
    return CheckpointInternals.get(this).radius;
  }

  get _origin(): string | undefined {
    return CheckpointInternals.get(this).origin;
  }

  destroy(): void {
    DeleteCheckpoint(this.handle);
    if (globalThis.mp.checkpoints) removeFromPool(globalThis.mp.checkpoints, this.id);
  }
}
