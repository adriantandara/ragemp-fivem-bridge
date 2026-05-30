import { Entity, colshapeContains } from "@ragemp-fivem-bridge/shared";

export class ColshapeMp extends Entity {
  _shapeType;
  _params;

  constructor(id, shapeType, position, params, dimension = 0) {
    super(id, "colshape");
    this._shapeType = shapeType;
    this._position = position;
    this._params = params ?? {};
    this._dimension = dimension;
  }

  get shapeType() {
    return this._shapeType;
  }

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value;
    globalThis.mp?.colshapes?._onColshapeChanged?.(this);
  }

  get dimension() {
    return this._dimension;
  }

  set dimension(value) {
    this._dimension = value;
    globalThis.mp?.colshapes?._onColshapeChanged?.(this);
  }

  isPointWithin(point, margin = 0) {
    return colshapeContains(this._shapeType, this._position, this._params, point, margin);
  }

  toData() {
    return {
      id: this.id,
      shapeType: this._shapeType,
      position: { x: this._position.x, y: this._position.y, z: this._position.z },
      params: this._params,
      dimension: this._dimension,
    };
  }

  destroy() {
    globalThis.mp?.colshapes?._remove(this.id);
  }
}
