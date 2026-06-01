import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";

type MarkerColor = { r: number; g: number; b: number; a: number };

export class MarkerMp extends Entity {
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
  _dimension: number;

  constructor(id: number, type: number, position: Vector3, scale: number) {
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

  _sync(): void {
    emitNet("ragemp:markerUpdate", -1, this.id, this.toData());
  }

  toData(): Record<string, any> {
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

  get position(): Vector3 {
    return this._position;
  }

  set position(value: Vector3) {
    this._position = value;
    this._sync();
  }

  get dimension(): number {
    return this._dimension;
  }

  set dimension(value: number) {
    this._dimension = value;
    this._sync();
  }

  get direction(): Vector3 {
    return this._direction;
  }

  set direction(value: Vector3) {
    this._direction = value;
    this._sync();
  }

  get scale(): number {
    return this._scale;
  }

  set scale(value: number) {
    this._scale = value;
    this._sync();
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
    this._sync();
  }

  get color(): MarkerColor {
    return { r: this._r, g: this._g, b: this._b, a: this._a };
  }

  set color(value: MarkerColor) {
    this._r = value.r;
    this._g = value.g;
    this._b = value.b;
    this._a = value.a;
    this._sync();
  }

  get rotation(): Vector3 {
    return this._rotation;
  }

  set rotation(value: Vector3) {
    this._rotation = value;
    this._sync();
  }

  // Override Entity.type (string) with marker type (number) — runtime shadowing; any suppresses base mismatch
  get type(): any {
    return this._type;
  }

  getColor(): number[] {
    return [this._r, this._g, this._b, this._a];
  }

  setColor(r: number, g: number, b: number, a: number): void {
    this._r = r;
    this._g = g;
    this._b = b;
    this._a = a;
    this._sync();
  }

  hideFor(player: any): void {
    emitNet("ragemp:markerHide", player.id, this.id);
  }

  showFor(player: any): void {
    emitNet("ragemp:markerShow", player.id, this.id);
  }

  destroy(): void {
    emitNet("ragemp:markerDestroy", -1, this.id);
    globalThis.mp.markers._remove(this.id);
  }
}
