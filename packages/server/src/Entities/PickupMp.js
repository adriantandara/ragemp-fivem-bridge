import { Entity } from "@ragemp-fivem-bridge/shared";

export class PickupMp extends Entity {
  _position;
  _pickupHash;
  _value;
  _alpha;
  _dimension;

  constructor(id, pickupHash, position, options = {}) {
    super(id, "pickup");
    this._pickupHash = pickupHash;
    this._position = position;
    this._value = options.value ?? 0;
    this._alpha = options.alpha ?? 255;
    this._dimension = options.dimension ?? 0;
  }

  _sync() {
    emitNet("ragemp:pickupUpdate", -1, this.id, this.toData());
  }

  toData() {
    return {
      id: this.id,
      pickupHash: this._pickupHash,
      x: this._position.x,
      y: this._position.y,
      z: this._position.z,
      value: this._value,
      alpha: this._alpha,
      dimension: this._dimension,
    };
  }

  get pickupHash() {
    return this._pickupHash;
  }

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value;
    this._sync();
  }

  get value() {
    return this._value;
  }

  set value(v) {
    this._value = v;
    this._sync();
  }

  get alpha() {
    return this._alpha;
  }

  set alpha(v) {
    this._alpha = v;
    this._sync();
  }

  get dimension() {
    return this._dimension;
  }

  set dimension(v) {
    this._dimension = v;
    this._sync();
  }

  get model() {
    return this._pickupHash;
  }

  destroy() {
    emitNet("ragemp:pickupDestroy", -1, this.id);
    globalThis.mp?.pickups?._remove(this.id);
  }
}
