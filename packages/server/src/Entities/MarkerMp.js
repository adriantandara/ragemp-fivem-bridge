import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class MarkerMp extends Entity {
  _type;
  _position;
  _direction;
  _rotation;
  _scale;
  _r;
  _g;
  _b;
  _a;
  _visible;
  _dimension;

  constructor(id, type, position, scale) {
    super(id, "marker");
    this._type = type;
    this._position = position;
    this._scale = scale;
    this._direction = new Vector3(0, 0, 0);
    this._rotation = new Vector3(0, 0, 0);
    this._r = 255;
    this._g = 0;
    this._b = 0;
    this._a = 255;
    this._visible = true;
    this._dimension = 0;
  }

  _sync() {
    emitNet("ragemp:markerUpdate", -1, this.id, this.toData());
  }

  toData() {
    return {
      id: this.id,
      type: this._type,
      x: this._position.x,
      y: this._position.y,
      z: this._position.z,
      dirX: this._direction.x,
      dirY: this._direction.y,
      dirZ: this._direction.z,
      rotX: this._rotation.x,
      rotY: this._rotation.y,
      rotZ: this._rotation.z,
      scale: this._scale,
      r: this._r,
      g: this._g,
      b: this._b,
      a: this._a,
      visible: this._visible,
      dimension: this._dimension,
    };
  }

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value;
    this._sync();
  }

  get dimension() {
    return this._dimension;
  }

  set dimension(value) {
    this._dimension = value;
    this._sync();
  }

  get direction() {
    return this._direction;
  }

  set direction(value) {
    this._direction = value;
    this._sync();
  }

  get scale() {
    return this._scale;
  }

  set scale(value) {
    this._scale = value;
    this._sync();
  }

  get visible() {
    return this._visible;
  }

  set visible(value) {
    this._visible = value;
    this._sync();
  }

  get color() {
    return { r: this._r, g: this._g, b: this._b, a: this._a };
  }

  set color(value) {
    this._r = value.r;
    this._g = value.g;
    this._b = value.b;
    this._a = value.a;
    this._sync();
  }

  get rotation() {
    return this._rotation;
  }

  set rotation(value) {
    this._rotation = value;
    this._sync();
  }

  get type() {
    return this._type;
  }

  getColor() {
    return { r: this._r, g: this._g, b: this._b, a: this._a };
  }

  setColor(r, g, b, a) {
    this._r = r;
    this._g = g;
    this._b = b;
    this._a = a;
    this._sync();
  }

  hideFor(player) {
    emitNet("ragemp:markerHide", player.id, this.id);
  }

  showFor(player) {
    emitNet("ragemp:markerShow", player.id, this.id);
  }

  destroy() {
    emitNet("ragemp:markerDestroy", -1, this.id);
    globalThis.mp.markers._remove(this.id);
  }
}
