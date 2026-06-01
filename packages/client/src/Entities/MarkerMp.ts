import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class MarkerMp extends Entity {
  id: number;
  _type: number;
  _position: Vector3;
  _direction: Vector3;
  _rotation: Vector3;
  _scale: number;
  _r: number;
  _g: number;
  _b: number;
  _a: number;
  _visible: boolean;
  _dimension: number | undefined;
  _drawDistance: number | undefined;

  constructor(id: number, type: number) {
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

  get position(): Vector3 {
    return this._position;
  }

  set position(value: { x: number; y: number; z: number }) {
    this._position = value instanceof Vector3 ? value : new Vector3(value.x, value.y, value.z);
  }

  get direction(): Vector3 {
    return this._direction;
  }

  set direction(value: { x: number; y: number; z: number }) {
    this._direction = value instanceof Vector3 ? value : new Vector3(value.x, value.y, value.z);
  }

  get rotation(): Vector3 {
    return this._rotation;
  }

  set rotation(value: { x: number; y: number; z: number }) {
    this._rotation = value instanceof Vector3 ? value : new Vector3(value.x, value.y, value.z);
  }

  get scale(): number {
    return this._scale;
  }

  set scale(value: number) {
    this._scale = value;
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }

  get color(): { r: number; g: number; b: number; a: number } {
    return { r: this._r, g: this._g, b: this._b, a: this._a };
  }

  set color(value: { r: number; g: number; b: number; a: number }) {
    this._r = value.r;
    this._g = value.g;
    this._b = value.b;
    this._a = value.a;
  }

  destroy(): void {
    globalThis.mp.markers._remove(this.id);
  }
}
