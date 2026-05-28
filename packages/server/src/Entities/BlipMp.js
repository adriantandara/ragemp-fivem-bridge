import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class BlipMp extends Entity {
  _position;
  _sprite;
  _color;
  _scale;
  _name;
  _shortRange;
  _alpha;
  _dimension;
  _drawDistance;
  _rotation;

  constructor(id, sprite, position, options = {}) {
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

  _sync() {
    emitNet("ragemp:blipUpdate", -1, this.id, this.toData());
  }

  toData() {
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

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value;
    this._sync();
  }

  get sprite() {
    return this._sprite;
  }

  set sprite(value) {
    this._sprite = value;
    this._sync();
  }

  get color() {
    return this._color;
  }

  set color(value) {
    this._color = value;
    this._sync();
  }

  get scale() {
    return this._scale;
  }

  set scale(value) {
    this._scale = value;
    this._sync();
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
    this._sync();
  }

  get shortRange() {
    return this._shortRange;
  }

  set shortRange(value) {
    this._shortRange = value;
    this._sync();
  }

  get alpha() {
    return this._alpha;
  }

  set alpha(value) {
    this._alpha = value;
    this._sync();
  }

  get dimension() {
    return this._dimension;
  }

  set dimension(value) {
    this._dimension = value;
    this._sync();
  }

  get drawDistance() {
    return this._drawDistance;
  }

  set drawDistance(value) {
    this._drawDistance = value;
    this._sync();
  }

  get rotation() {
    return this._rotation;
  }

  set rotation(value) {
    this._rotation = value;
    this._sync();
  }

  routeFor(player) {
    const target = player?.id ?? player;
    emitNet("ragemp:blipRoute", target, this.id, true);
  }

  unrouteFor(player) {
    const target = player?.id ?? player;
    emitNet("ragemp:blipRoute", target, this.id, false);
  }

  destroy() {
    emitNet("ragemp:blipDestroy", -1, this.id);
    globalThis.mp.blips._remove(this.id);
  }
}
