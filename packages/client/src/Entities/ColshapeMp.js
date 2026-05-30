import { Entity, colshapeContains } from "@ragemp-fivem-bridge/shared";

export class ColshapeMp extends Entity {
  _shapeType;
  _params;
  _origin = "local";

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
  }

  get dimension() {
    return this._dimension;
  }

  set dimension(value) {
    this._dimension = value;
  }

  isPointWithin(point, margin = 0) {
    return colshapeContains(this._shapeType, this._position, this._params, point, margin);
  }

  destroy() {
    if (this._origin === "server") return;
    globalThis.mp?.colshapes?._remove(this.id);
  }
}
