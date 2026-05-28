import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class TextLabelMp extends Entity {
  _position;
  _text;
  _r;
  _g;
  _b;
  _a;
  _drawDistance;
  _los;
  _font;
  _dimension;

  constructor(id, text, position) {
    super(id, "textlabel");
    this._text = text;
    this._position = position;
    this._r = 255;
    this._g = 255;
    this._b = 255;
    this._a = 255;
    this._drawDistance = 50;
    this._los = false;
    this._font = 0;
    this._dimension = 0;
  }

  _sync() {
    emitNet("ragemp:labelUpdate", -1, this.id, this.toData());
  }

  toData() {
    return {
      id: this.id,
      text: this._text,
      x: this._position.x,
      y: this._position.y,
      z: this._position.z,
      r: this._r,
      g: this._g,
      b: this._b,
      a: this._a,
      drawDistance: this._drawDistance,
      los: this._los,
      font: this._font,
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

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
    this._sync();
  }

  get color() {
    return { r: this._r, g: this._g, b: this._b, a: this._a };
  }

  set color(value) {
    this._r = value.r ?? this._r;
    this._g = value.g ?? this._g;
    this._b = value.b ?? this._b;
    this._a = value.a ?? this._a;
    this._sync();
  }

  get drawDistance() {
    return this._drawDistance;
  }

  set drawDistance(value) {
    this._drawDistance = value;
    this._sync();
  }

  get los() {
    return this._los;
  }

  set los(value) {
    this._los = value;
    this._sync();
  }

  get font() {
    return this._font;
  }

  set font(value) {
    this._font = value;
    this._sync();
  }

  get dimension() {
    return this._dimension;
  }

  set dimension(value) {
    this._dimension = value;
    this._sync();
  }

  destroy() {
    emitNet("ragemp:labelDestroy", -1, this.id);
    globalThis.mp.labels._remove(this.id);
  }
}
