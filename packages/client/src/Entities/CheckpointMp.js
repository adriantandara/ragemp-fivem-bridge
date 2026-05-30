import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { withEntityNatives } from "../utils/native";

export class CheckpointMp extends Entity {
  _handle;
  _position;
  _radius;

  constructor(id, handle) {
    super(id, "checkpoint");
    this._handle = handle;
    return withEntityNatives(this, (t) => t._handle, ["Checkpoint"]);
  }

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value;
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    this._radius = value;
  }

  get visible() {
    return this._visible ?? true;
  }

  set visible(value) {
    this._visible = value;
    globalThis.mp?.checkpoints?._applyVisibility(this);
  }

  get color() {
    return { r: this._r ?? 255, g: this._g ?? 0, b: this._b ?? 0, a: this._a ?? 150 };
  }

  set color(value) {
    this._r = value.r;
    this._g = value.g;
    this._b = value.b;
    this._a = value.a;
    globalThis.mp?.checkpoints?._applyVisibility(this);
  }

  destroy() {
    DeleteCheckpoint(this._handle);
    globalThis.mp.checkpoints._remove(this.id);
  }
}
