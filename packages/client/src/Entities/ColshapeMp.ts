import { Entity, Vector3, colshapeContains } from "@ragemp-fivem-bridge/shared";
import { ColshapeInternals, initColshapeInternals } from "../internal/colshapeInternals";
import { removeFromColshapePool } from "../internal/pools/colshapePoolService";

export class ColshapeMp extends Entity {
  constructor(token: symbol, id: number, shapeType: string, position: Vector3 | undefined, params: Record<string, any> | undefined, dimension: number = 0) {
    super(token, id, "colshape");
    initColshapeInternals(this, shapeType, position, params, dimension);
  }

  get shapeType(): string {
    return ColshapeInternals.get(this).shapeType;
  }

  override get position(): Vector3 | undefined {
    return ColshapeInternals.get(this).position;
  }

  override set position(value: Vector3 | undefined) {
    ColshapeInternals.get(this).position = value;
  }

  override get dimension(): number {
    return ColshapeInternals.get(this).dimension;
  }

  override set dimension(value: number) {
    ColshapeInternals.get(this).dimension = value;
  }

  isPointWithin(point: Vector3, margin: number = 0): boolean {
    const rec = ColshapeInternals.get(this);
    return colshapeContains(rec.shapeType, rec.position, rec.params, point, margin);
  }

  override destroy(): void {
    if (ColshapeInternals.get(this).origin === "server") return;
    const pool = globalThis.mp?.colshapes;
    if (pool) removeFromColshapePool(pool, this.id);
  }
}
