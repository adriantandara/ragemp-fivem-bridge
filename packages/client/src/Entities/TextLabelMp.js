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
  _visible;
  _dimension;

  constructor(id) {
    super(id, "textlabel");
    this._r = 255;
    this._g = 255;
    this._b = 255;
    this._a = 255;
    this._drawDistance = 50;
    this._los = false;
    this._font = 0;
    this._visible = true;
    this._dimension = 0;
  }

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  get color() {
    return { r: this._r, g: this._g, b: this._b, a: this._a };
  }

  set color(value) {
    this._r = value.r ?? this._r;
    this._g = value.g ?? this._g;
    this._b = value.b ?? this._b;
    this._a = value.a ?? this._a;
  }

  get drawDistance() {
    return this._drawDistance;
  }

  set drawDistance(value) {
    this._drawDistance = value;
  }

  get los() {
    return this._los;
  }

  set los(value) {
    this._los = value;
  }

  get font() {
    return this._font;
  }

  set font(value) {
    this._font = value;
  }

  get visible() {
    return this._visible;
  }

  set visible(value) {
    this._visible = value;
  }

  get dimension() {
    return this._dimension;
  }

  set dimension(value) {
    this._dimension = value;
  }

  destroy() {
    globalThis.mp.labels._remove(this.id);
  }
}
