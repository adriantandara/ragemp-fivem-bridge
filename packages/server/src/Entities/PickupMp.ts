import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";

export class PickupMp extends Entity {
  _position: Vector3;
  _pickupHash: number;
  _value: number;
  _alpha: number;
  _dimension: number;

  constructor(id: number, pickupHash: number, position: Vector3, options: {
    value?: number;
    alpha?: number;
    dimension?: number;
  } = {}) {
    super(id, "pickup");
    this._pickupHash = pickupHash;
    this._position = position;
    this._value = options.value ?? 0;
    this._alpha = options.alpha ?? 255;
    this._dimension = options.dimension ?? 0;
  }

  _sync(): void {
    emitNet("ragemp:pickupUpdate", -1, this.id, this.toData());
  }

  toData(): Record<string, any> {
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

  get pickupHash(): number {
    return this._pickupHash;
  }

  get position(): Vector3 {
    return this._position;
  }

  set position(value: Vector3) {
    this._position = value;
    this._sync();
  }

  get value(): number {
    return this._value;
  }

  set value(v: number) {
    this._value = v;
    this._sync();
  }

  get alpha(): number {
    return this._alpha;
  }

  set alpha(v: number) {
    this._alpha = v;
    this._sync();
  }

  get dimension(): number {
    return this._dimension;
  }

  set dimension(v: number) {
    this._dimension = v;
    this._sync();
  }

  get model(): number {
    return this._pickupHash;
  }

  destroy(): void {
    emitNet("ragemp:pickupDestroy", -1, this.id);
    globalThis.mp?.pickups?._remove(this.id);
  }
}
