import { Entity, Vector3, colshapeContains } from "@ragemp-fivem-bridge/shared";

export class ColshapeMp extends Entity {
  _shapeType: string;
  _params: Record<string, any>;

  constructor(id: number, shapeType: string, position: Vector3, params: Record<string, any> | null, dimension: number = 0) {
    super(id, "colshape");
    this._shapeType = shapeType;
    this._position = position;
    this._params = params ?? {};
    this._dimension = dimension;
  }

  get shapeType(): string {
    return this._shapeType;
  }

  get position(): Vector3 {
    return this._position;
  }

  set position(value: Vector3) {
    this._position = value;
    globalThis.mp?.colshapes?._onColshapeChanged?.(this);
  }

  get dimension(): number {
    return this._dimension;
  }

  set dimension(value: number) {
    this._dimension = value;
    globalThis.mp?.colshapes?._onColshapeChanged?.(this);
  }

  isPointWithin(point: Vector3, margin: number = 0): boolean {
    return colshapeContains(this._shapeType, this._position, this._params, point, margin);
  }

  toData(): Record<string, any> {
    return {
      id: this.id,
      shapeType: this._shapeType,
      position: { x: this._position.x, y: this._position.y, z: this._position.z },
      params: this._params,
      dimension: this._dimension,
    };
  }

  destroy(): void {
    globalThis.mp?.colshapes?._remove(this.id);
  }
}
