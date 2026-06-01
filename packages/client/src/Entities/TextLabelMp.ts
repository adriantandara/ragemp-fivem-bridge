import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class TextLabelMp extends Entity {
  id: number;
  _position: Vector3 | undefined;
  _text: string | undefined;
  _r: number;
  _g: number;
  _b: number;
  _a: number;
  _drawDistance: number;
  _los: boolean;
  _font: number;
  _visible: boolean;
  _dimension: number;

  constructor(id: number) {
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

  get position(): Vector3 | undefined {
    return this._position;
  }

  set position(value: Vector3 | undefined) {
    this._position = value;
  }

  get text(): string | undefined {
    return this._text;
  }

  set text(value: string | undefined) {
    this._text = value;
  }

  get color(): { r: number; g: number; b: number; a: number } {
    return { r: this._r, g: this._g, b: this._b, a: this._a };
  }

  set color(value: { r?: number; g?: number; b?: number; a?: number }) {
    this._r = value.r ?? this._r;
    this._g = value.g ?? this._g;
    this._b = value.b ?? this._b;
    this._a = value.a ?? this._a;
  }

  get drawDistance(): number {
    return this._drawDistance;
  }

  set drawDistance(value: number) {
    this._drawDistance = value;
  }

  get los(): boolean {
    return this._los;
  }

  set los(value: boolean) {
    this._los = value;
  }

  get font(): number {
    return this._font;
  }

  set font(value: number) {
    this._font = value;
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }

  get dimension(): number {
    return this._dimension;
  }

  set dimension(value: number) {
    this._dimension = value;
  }

  destroy(): void {
    globalThis.mp.labels._remove(this.id);
  }
}
