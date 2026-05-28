import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class BlipMp extends Entity {
  _handle;
  _dimension = 0;

  constructor(id, handle) {
    super(id, "blip");
    this._handle = handle;
  }

  get handle() {
    return this._handle;
  }

  get position() {
    const coords = GetBlipCoords(this._handle);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  set position(value) {
    SetBlipCoords(this._handle, value.x, value.y, value.z);
  }

  get sprite() {
    return GetBlipSprite(this._handle);
  }

  set sprite(value) {
    SetBlipSprite(this._handle, value);
  }

  get color() {
    return GetBlipColour(this._handle);
  }

  set color(value) {
    SetBlipColour(this._handle, value);
  }

  get scale() {
    return this._scale ?? 1.0;
  }

  set scale(value) {
    this._scale = value;
    SetBlipScale(this._handle, value);
  }

  get name() {
    return this._name ?? "";
  }

  set name(value) {
    this._name = value;
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentSubstringPlayerName(value);
    EndTextCommandSetBlipName(this._handle);
  }

  get shortRange() {
    return this._shortRange ?? false;
  }

  set shortRange(value) {
    this._shortRange = value;
    SetBlipAsShortRange(this._handle, value);
  }

  get alpha() {
    return GetBlipAlpha(this._handle);
  }

  set alpha(value) {
    SetBlipAlpha(this._handle, value);
  }

  get dimension() {
    return this._dimension;
  }

  set dimension(value) {
    this._dimension = value;
  }

  setFlashes(state) {
    SetBlipFlashes(this._handle, state);
  }

  setRoute(state) {
    SetBlipRoute(this._handle, state);
  }

  setRouteColour(colour) {
    SetBlipRouteColour(this._handle, colour);
  }

  destroy() {
    RemoveBlip(this._handle);
    globalThis.mp.blips._remove(this.id);
  }
}
