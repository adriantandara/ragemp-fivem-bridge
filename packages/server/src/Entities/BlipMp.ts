import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";

export class BlipMp extends Entity {
  _position: Vector3;
  _sprite: number;
  _color: number;
  _scale: number;
  _name: string;
  _shortRange: boolean;
  _alpha: number;
  _dimension: number;
  _drawDistance: number;
  _rotation: number;

  constructor(id: number, sprite: number, position: Vector3, options: {
    color?: number;
    scale?: number;
    name?: string;
    shortRange?: boolean;
    alpha?: number;
    dimension?: number;
    drawDistance?: number;
    rotation?: number;
  } = {}) {
    super(id, "blip");
    this._sprite = sprite;
    this._position = position;
    this._color = options.color ?? 0;
    this._scale = options.scale ?? 1.0;
    this._name = options.name ?? "";
    this._shortRange = options.shortRange ?? false;
    this._alpha = options.alpha ?? 255;
    this._dimension = options.dimension ?? 0;
    this._drawDistance = options.drawDistance ?? 0;
    this._rotation = options.rotation ?? 0;
  }

  _sync(): void {
    emitNet("ragemp:blipUpdate", -1, this.id, this.toData());
  }

  toData(): Record<string, any> {
    return {
      id: this.id,
      sprite: this._sprite,
      x: this._position.x,
      y: this._position.y,
      z: this._position.z,
      color: this._color,
      scale: this._scale,
      name: this._name,
      shortRange: this._shortRange,
      alpha: this._alpha,
      dimension: this._dimension,
      drawDistance: this._drawDistance,
      rotation: this._rotation,
    };
  }

  get position(): Vector3 {
    return this._position;
  }

  set position(value: Vector3) {
    this._position = value;
    this._sync();
  }

  get sprite(): number {
    return this._sprite;
  }

  set sprite(value: number) {
    this._sprite = value;
    this._sync();
  }

  get color(): number {
    return this._color;
  }

  set color(value: number) {
    this._color = value;
    this._sync();
  }

  get scale(): number {
    return this._scale;
  }

  set scale(value: number) {
    this._scale = value;
    this._sync();
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
    this._sync();
  }

  get shortRange(): boolean {
    return this._shortRange;
  }

  set shortRange(value: boolean) {
    this._shortRange = value;
    this._sync();
  }

  get alpha(): number {
    return this._alpha;
  }

  set alpha(value: number) {
    this._alpha = value;
    this._sync();
  }

  get dimension(): number {
    return this._dimension;
  }

  set dimension(value: number) {
    this._dimension = value;
    this._sync();
  }

  get drawDistance(): number {
    return this._drawDistance;
  }

  set drawDistance(value: number) {
    this._drawDistance = value;
    this._sync();
  }

  get rotation(): number {
    return this._rotation;
  }

  set rotation(value: number) {
    this._rotation = value;
    this._sync();
  }

  routeFor(player: any | any[] | undefined, color: number, scale: number): void {
    const target = player?.id ?? player;
    emitNet("ragemp:blipRoute", target, this.id, true, color, scale);
  }

  unrouteFor(player: any | any[]): void {
    const target = player?.id ?? player;
    emitNet("ragemp:blipRoute", target, this.id, false);
  }

  destroy(): void {
    emitNet("ragemp:blipDestroy", -1, this.id);
    globalThis.mp.blips._remove(this.id);
  }
}
