import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { withEntityNatives } from "../utils/native";

export class ObjectMp extends Entity {
  _isWeak = false;
  _notifyStreaming = false;
  _streamingRange = 0;

  constructor(id, handle) {
    super(id, "object");
    this._handle = handle;
    return withEntityNatives(this, (t) => t._handle, ["Entity", "Object"]);
  }

  _stateBag() {
    return globalThis.Entity(this._handle).state;
  }

  get position() {
    const coords = GetEntityCoords(this._handle, true);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  set position(value) {
    SetEntityCoords(this._handle, value.x, value.y, value.z, false, false, false, false);
  }

  get rotation() {
    const rot = GetEntityRotation(this._handle, 2);
    return new Vector3(rot[0], rot[1], rot[2]);
  }

  set rotation(value) {
    SetEntityRotation(this._handle, value.x, value.y, value.z, 2, false);
  }

  get model() {
    return GetEntityModel(this._handle);
  }

  get alpha() {
    return GetEntityAlpha(this._handle);
  }

  set alpha(value) {
    SetEntityAlpha(this._handle, value, false);
  }

  get hidden() {
    return !IsEntityVisible(this._handle);
  }

  set hidden(value) {
    SetEntityVisible(this._handle, !value, false);
  }

  get isWeak() {
    return this._isWeak;
  }

  get notifyStreaming() {
    return this._notifyStreaming;
  }

  set notifyStreaming(value) {
    this._notifyStreaming = value;
  }

  get streamingRange() {
    return this._streamingRange;
  }

  set streamingRange(value) {
    this._streamingRange = value;
  }

  hasBeenBroken() {
    return HasObjectBeenBroken(this._handle);
  }

  isVisible() {
    return IsEntityVisible(this._handle);
  }

  markForDeletion() {
    SetEntityAsMissionEntity(this._handle, false, true);
  }

  placeOnGroundProperly() {
    return PlaceObjectOnGroundProperly(this._handle);
  }

  setPhysicsParams(weight, p1, p2, p3, p4, gravity, p6, p7, p8, p9, buoyancy, p11, p12, p13) {
  }

  setTargettable(state) {
  }

  slide(toX, toY, toZ, speedX, speedY, speedZ, collision) {
    return SlideObject(this._handle, toX, toY, toZ, speedX, speedY, speedZ, collision);
  }

  destroy() {
    SetEntityAsMissionEntity(this._handle, false, true);
    DeleteEntity(this._handle);
    globalThis.mp.objects._remove(this.id);
  }
}
