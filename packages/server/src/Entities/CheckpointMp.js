import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class CheckpointMp extends Entity {
  _type;
  _position;
  _nextPosition;
  _radius;
  _color;
  _dimension;
  _visible;

  constructor(id, type, position, nextPosition, radius, options = {}) {
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

  _sync() {
    emitNet("ragemp:checkpointUpdate", -1, this.id, this.toData());
  }

  toData() {
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

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value;
    this._sync();
  }

  get nextPosition() {
    return this._nextPosition;
  }

  set nextPosition(value) {
    this._nextPosition = value;
    this._sync();
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    this._radius = value;
    this._sync();
  }

  get color() {
    return this._color;
  }

  set color(value) {
    this._color = value;
    this._sync();
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
    this._sync();
  }

  get dimension() {
    return this._dimension;
  }

  set dimension(value) {
    this._dimension = value;
    this._sync();
  }

  get visible() {
    return this._visible;
  }

  set visible(value) {
    this._visible = value;
    this._sync();
  }

  getColor() {
    return this._color;
  }

  setColor(r, g, b, a) {
    this._color = { r, g, b, a };
    this._sync();
  }

  hideFor(player) {
    emitNet("ragemp:checkpointHide", player.id ?? player, this.id);
  }

  showFor(player) {
    emitNet("ragemp:checkpointShow", player.id ?? player, this.id);
  }

  destroy() {
    emitNet("ragemp:checkpointDestroy", -1, this.id);
    globalThis.mp.checkpoints._remove(this.id);
  }
}
