import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";

type LabelColor = { r?: number; g?: number; b?: number; a?: number };

export class TextLabelMp extends Entity {
  _position: Vector3;
  _text: string;
  _r: number;
  _g: number;
  _b: number;
  _a: number;
  _drawDistance: number;
  _los: boolean;
  _font: number;
  _dimension: number;

  constructor(id: number, text: string, position: Vector3) {
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

  _sync(): void {
    emitNet("ragemp:labelUpdate", -1, this.id, this.toData());
  }

  toData(): Record<string, any> {
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

  get position(): Vector3 {
    return this._position;
  }

  set position(value: Vector3) {
    this._position = value;
    this._sync();
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
    this._sync();
  }

  get color(): { r: number; g: number; b: number; a: number } {
    return { r: this._r, g: this._g, b: this._b, a: this._a };
  }

  set color(value: LabelColor) {
    this._r = value.r ?? this._r;
    this._g = value.g ?? this._g;
    this._b = value.b ?? this._b;
    this._a = value.a ?? this._a;
    this._sync();
  }

  get drawDistance(): number {
    return this._drawDistance;
  }

  set drawDistance(value: number) {
    this._drawDistance = value;
    this._sync();
  }

  get los(): boolean {
    return this._los;
  }

  set los(value: boolean) {
    this._los = value;
    this._sync();
  }

  get font(): number {
    return this._font;
  }

  set font(value: number) {
    this._font = value;
    this._sync();
  }

  get dimension(): number {
    return this._dimension;
  }

  set dimension(value: number) {
    this._dimension = value;
    this._sync();
  }

  destroy(): void {
    emitNet("ragemp:labelDestroy", -1, this.id);
    globalThis.mp.labels._remove(this.id);
  }
}
