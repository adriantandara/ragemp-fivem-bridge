import { Entity, Vector3, colshapeContains } from "@ragemp-fivem-bridge/shared";
import { EntityInternals } from "@ragemp-fivem-bridge/shared/internal";
import { ColshapeInternals, initColshapeInternals } from "../internal/colshapeInternals";
import { removeFromColshapePool } from "../internal/pools/colshapePoolService";

export class ColshapeMp extends Entity {
  constructor(id: number, shapeType: string, position: Vector3, params: Record<string, any> | null, dimension: number = 0) {
    super(id, "colshape");
    const rec = EntityInternals.get(this);
    rec.position = position;
    rec.dimension = dimension;
    initColshapeInternals(this, {
      shapeType,
      params: params ?? {},
    });
  }

  get shapeType(): string {
    return ColshapeInternals.get(this).shapeType;
  }

  get position(): Vector3 {
    return EntityInternals.get(this).position!;
  }

  set position(value: Vector3) {
    EntityInternals.get(this).position = value;
    globalThis.mp?.colshapes?._onColshapeChanged?.(this);
  }

  get dimension(): number {
    return EntityInternals.get(this).dimension;
  }

  set dimension(value: number) {
    EntityInternals.get(this).dimension = value;
    globalThis.mp?.colshapes?._onColshapeChanged?.(this);
  }

  isPointWithin(point: Vector3, margin: number = 0): boolean {
    const rec = ColshapeInternals.get(this);
    return colshapeContains(rec.shapeType, EntityInternals.get(this).position!, rec.params, point, margin);
  }

  toData(): Record<string, any> {
    const rec = ColshapeInternals.get(this);
    const ent = EntityInternals.get(this);
    return {
      id: this.id,
      shapeType: rec.shapeType,
      position: { x: ent.position!.x, y: ent.position!.y, z: ent.position!.z },
      params: rec.params,
      dimension: ent.dimension,
    };
  }

  destroy(): void {
    const pool = globalThis.mp?.colshapes;
    if (pool) removeFromColshapePool(pool, this.id);
  }
}
