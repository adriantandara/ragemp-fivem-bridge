import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";

export class CheckpointMp extends Entity {
  id: number;
  _handle: number;
  _position: Vector3 | undefined;
  _radius: number | undefined;
  _visible: boolean | undefined;
  _r: number | undefined;
  _g: number | undefined;
  _b: number | undefined;
  _a: number | undefined;
  _dimension: number | undefined;
  _origin: string | undefined;

  constructor(id: number, handle: number) {
    super(id, "checkpoint");
    this._handle = handle;
  }

  get handle(): number {
    return this._handle;
  }

  get position(): Vector3 | undefined {
    return this._position;
  }

  set position(value: Vector3 | undefined) {
    this._position = value;
  }

  get radius(): number | undefined {
    return this._radius;
  }

  set radius(value: number | undefined) {
    this._radius = value;
  }

  get visible(): boolean {
    return this._visible ?? true;
  }

  set visible(value: boolean) {
    this._visible = value;
    globalThis.mp?.checkpoints?._applyVisibility(this);
  }

  get color(): { r: number; g: number; b: number; a: number } {
    return { r: this._r ?? 255, g: this._g ?? 0, b: this._b ?? 0, a: this._a ?? 150 };
  }

  set color(value: { r: number; g: number; b: number; a: number }) {
    this._r = value.r;
    this._g = value.g;
    this._b = value.b;
    this._a = value.a;
    globalThis.mp?.checkpoints?._applyVisibility(this);
  }

  destroy(): void {
    DeleteCheckpoint(this._handle);
    globalThis.mp.checkpoints._remove(this.id);
  }
}
