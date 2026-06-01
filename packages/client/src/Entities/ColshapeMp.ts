import { Entity, Vector3, colshapeContains } from "@ragemp-fivem-bridge/shared";

export class ColshapeMp extends Entity {
  id: number;
  _shapeType: string;
  _params: Record<string, any>;
  _origin: string = "local";
  _position: Vector3 | undefined;
  _dimension: number;

  constructor(id: number, shapeType: string, position: Vector3 | undefined, params: Record<string, any> | undefined, dimension: number = 0) {
    super(id, "colshape");
    this._shapeType = shapeType;
    this._position = position;
    this._params = params ?? {};
    this._dimension = dimension;
  }

  get shapeType(): string {
    return this._shapeType;
  }

  get position(): Vector3 | undefined {
    return this._position;
  }

  set position(value: Vector3 | undefined) {
    this._position = value;
  }

  get dimension(): number {
    return this._dimension;
  }

  set dimension(value: number) {
    this._dimension = value;
  }

  isPointWithin(point: Vector3, margin: number = 0): boolean {
    return colshapeContains(this._shapeType, this._position, this._params, point, margin);
  }

  destroy(): void {
    if (this._origin === "server") return;
    globalThis.mp?.colshapes?._remove(this.id);
  }
}
