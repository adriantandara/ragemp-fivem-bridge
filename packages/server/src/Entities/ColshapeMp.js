import { Entity } from "@ragemp-fivem-bridge/shared";

export class ColshapeMp extends Entity {
  _position;
  _dimension;
  _shapeType;

  constructor(id, shapeType, position, params) {
    super(id, "colshape");
    this._shapeType = shapeType;
    this._position = position;
    this._dimension = 0;
    this._params = params;
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

  isPointWithin(point) {
    switch (this._shapeType) {
      case "sphere":
        return this._position.distance(point) <= this._params.radius;

      case "tube": {
        const dx = point.x - this._position.x;
        const dy = point.y - this._position.y;
        const dz = point.z - this._position.z;
        const horizontalDist = Math.sqrt(dx * dx + dy * dy);
        return horizontalDist <= this._params.radius && dz >= 0 && dz <= this._params.height;
      }

      case "circle": {
        const dx = point.x - this._position.x;
        const dy = point.y - this._position.y;
        return Math.sqrt(dx * dx + dy * dy) <= this._params.radius;
      }

      case "rectangle": {
        const halfW = this._params.width / 2;
        const halfH = this._params.height / 2;
        return (
          point.x >= this._position.x - halfW &&
          point.x <= this._position.x + halfW &&
          point.y >= this._position.y - halfH &&
          point.y <= this._position.y + halfH
        );
      }

      case "cuboid": {
        const halfW = this._params.width / 2;
        const halfD = this._params.depth / 2;
        const halfH = this._params.height / 2;
        return (
          point.x >= this._position.x - halfW &&
          point.x <= this._position.x + halfW &&
          point.y >= this._position.y - halfD &&
          point.y <= this._position.y + halfD &&
          point.z >= this._position.z - halfH &&
          point.z <= this._position.z + halfH
        );
      }

      default:
        return false;
    }
  }

  destroy() {
    globalThis.mp.colshapes._remove(this.id);
  }
}
