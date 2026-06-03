import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { BroadcastEntity } from "./BroadcastEntity";
import { EntityInternals } from "@ragemp-fivem-bridge/shared/internal";
import { CheckpointInternals, initCheckpointInternals, type CheckpointColor } from "../internal/checkpointInternals";
import { removeFromCheckpointPool } from "../internal/pools/checkpointPoolService";

export class CheckpointMp extends BroadcastEntity {
  protected override readonly updateEvent = "ragemp:checkpointUpdate";
  protected override readonly destroyEvent = "ragemp:checkpointDestroy";

  constructor(token: symbol, id: number, type: number, position: Vector3, nextPosition: Vector3 | null, radius: number, options: {
    color?: [number, number, number, number] | CheckpointColor;
    dimension?: number;
    visible?: boolean;
  } = {}) {
    super(token, id, "checkpoint");
    const ent = EntityInternals.get(this);
    ent.position = position;
    ent.dimension = options.dimension ?? 0;
    const c = options.color;
    const color: CheckpointColor = Array.isArray(c)
      ? { r: c[0] ?? 255, g: c[1] ?? 0, b: c[2] ?? 0, a: c[3] ?? 150 }
      : (c ?? { r: 255, g: 0, b: 0, a: 150 });
    initCheckpointInternals(this, {
      type,
      nextPosition: nextPosition ?? new Vector3(0, 0, 0),
      radius,
      color,
      visible: options.visible ?? true,
    });
  }

  protected override pool(): object | null | undefined {
    return globalThis.mp.checkpoints;
  }

  override toData(): Record<string, any> {
    const rec = CheckpointInternals.get(this);
    const ent = EntityInternals.get(this);
    return {
      id: this.id,
      type: rec.type,
      x: ent.position!.x,
      y: ent.position!.y,
      z: ent.position!.z,
      nextX: rec.nextPosition.x,
      nextY: rec.nextPosition.y,
      nextZ: rec.nextPosition.z,
      radius: rec.radius,
      r: rec.color.r,
      g: rec.color.g,
      b: rec.color.b,
      a: rec.color.a,
      dimension: ent.dimension,
      visible: rec.visible,
    };
  }

  get nextPosition(): Vector3 {
    return CheckpointInternals.get(this).nextPosition;
  }

  set nextPosition(value: Vector3) {
    CheckpointInternals.get(this).nextPosition = value;
    this.sync();
  }

  get radius(): number {
    return CheckpointInternals.get(this).radius;
  }

  set radius(value: number) {
    CheckpointInternals.get(this).radius = value;
    this.sync();
  }

  get color(): CheckpointColor {
    return CheckpointInternals.get(this).color;
  }

  set color(value: CheckpointColor) {
    CheckpointInternals.get(this).color = value;
    this.sync();
  }

  // Override Entity.type (string) with checkpoint type (number) — runtime shadowing; any suppresses base mismatch
  override get type(): any {
    return CheckpointInternals.get(this).type;
  }

  override set type(value: any) {
    CheckpointInternals.get(this).type = value;
    this.sync();
  }

  get visible(): boolean {
    return CheckpointInternals.get(this).visible;
  }

  set visible(value: boolean) {
    CheckpointInternals.get(this).visible = value;
    this.sync();
  }

  getColor(): number[] {
    const c = CheckpointInternals.get(this).color;
    return [c.r, c.g, c.b, c.a];
  }

  setColor(r: number, g: number, b: number, a: number): void {
    CheckpointInternals.get(this).color = { r, g, b, a };
    this.sync();
  }

  hideFor(player: any): void {
    emitNet("ragemp:checkpointHide", player.id ?? player, this.id);
  }

  showFor(player: any): void {
    emitNet("ragemp:checkpointShow", player.id ?? player, this.id);
  }

  override destroy(): void {
    emitNet(this.destroyEvent, -1, this.id);
    removeFromCheckpointPool(globalThis.mp.checkpoints, this.id);
  }
}
