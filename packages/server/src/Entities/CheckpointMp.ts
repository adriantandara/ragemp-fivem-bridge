import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";

type CheckpointColor = { r: number; g: number; b: number; a: number };

export class CheckpointMp extends Entity {
  _type: number;
  _position: Vector3;
  _nextPosition: Vector3;
  _radius: number;
  _color: CheckpointColor;
  _dimension: number;
  _visible: boolean;

  constructor(id: number, type: number, position: Vector3, nextPosition: Vector3 | null, radius: number, options: {
    color?: [number, number, number, number] | CheckpointColor;
    dimension?: number;
    visible?: boolean;
  } = {}) {
    super(id, "checkpoint");
    this._type = type;
    this._position = position;
    this._nextPosition = nextPosition ?? new Vector3(0, 0, 0);
    this._radius = radius;
    const c = options.color;
    this._color = Array.isArray(c)
      ? { r: c[0] ?? 255, g: c[1] ?? 0, b: c[2] ?? 0, a: c[3] ?? 150 }
      : (c ?? { r: 255, g: 0, b: 0, a: 150 });
    this._dimension = options.dimension ?? 0;
    this._visible = options.visible ?? true;
  }

  _sync(): void {
    emitNet("ragemp:checkpointUpdate", -1, this.id, this.toData());
  }

  toData(): Record<string, any> {
    return {
      id: this.id,
      type: this._type,
      x: this._position.x,
      y: this._position.y,
      z: this._position.z,
      nextX: this._nextPosition.x,
      nextY: this._nextPosition.y,
      nextZ: this._nextPosition.z,
      radius: this._radius,
      r: this._color.r,
      g: this._color.g,
      b: this._color.b,
      a: this._color.a,
      dimension: this._dimension,
      visible: this._visible,
    };
  }

  get position(): Vector3 {
    return this._position;
  }

  set position(value: Vector3) {
    this._position = value;
    this._sync();
  }

  get nextPosition(): Vector3 {
    return this._nextPosition;
  }

  set nextPosition(value: Vector3) {
    this._nextPosition = value;
    this._sync();
  }

  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    this._radius = value;
    this._sync();
  }

  get color(): CheckpointColor {
    return this._color;
  }

  set color(value: CheckpointColor) {
    this._color = value;
    this._sync();
  }

  // Override Entity.type (string) with checkpoint type (number) — runtime shadowing; any suppresses base mismatch
  get type(): any {
    return this._type;
  }

  set type(value: any) {
    this._type = value;
    this._sync();
  }

  get dimension(): number {
    return this._dimension;
  }

  set dimension(value: number) {
    this._dimension = value;
    this._sync();
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
    this._sync();
  }

  getColor(): number[] {
    return [this._color.r, this._color.g, this._color.b, this._color.a];
  }

  setColor(r: number, g: number, b: number, a: number): void {
    this._color = { r, g, b, a };
    this._sync();
  }

  hideFor(player: any): void {
    emitNet("ragemp:checkpointHide", player.id ?? player, this.id);
  }

  showFor(player: any): void {
    emitNet("ragemp:checkpointShow", player.id ?? player, this.id);
  }

  destroy(): void {
    emitNet("ragemp:checkpointDestroy", -1, this.id);
    globalThis.mp.checkpoints._remove(this.id);
  }
}
