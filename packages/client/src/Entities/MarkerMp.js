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

  constructor(id, type) {
    super(id, "marker");
    this._type = type;
    this._position = new Vector3(0, 0, 0);
    this._direction = new Vector3(0, 0, 0);
    this._rotation = new Vector3(0, 0, 0);
    this._scale = 1.0;
    this._r = 255;
    this._g = 0;
    this._b = 0;
    this._a = 255;
    this._visible = true;
  }

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value instanceof Vector3 ? value : new Vector3(value.x, value.y, value.z);
  }

  get direction() {
    return this._direction;
  }

  set direction(value) {
    this._direction = value instanceof Vector3 ? value : new Vector3(value.x, value.y, value.z);
  }

  get rotation() {
    return this._rotation;
  }

  set rotation(value) {
    this._rotation = value instanceof Vector3 ? value : new Vector3(value.x, value.y, value.z);
  }

  get scale() {
    return this._scale;
  }

  set scale(value) {
    this._scale = value;
  }

  get visible() {
    return this._visible;
  }

  set visible(value) {
    this._visible = value;
  }

  get color() {
    return { r: this._r, g: this._g, b: this._b, a: this._a };
  }

  set color(value) {
    this._r = value.r;
    this._g = value.g;
    this._b = value.b;
    this._a = value.a;
  }

  get type() {
    return this._type;
  }

  destroy() {
    globalThis.mp.markers._remove(this.id);
  }
}
