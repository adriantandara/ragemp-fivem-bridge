import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";

export class CameraMp extends Entity {
  _handle;

  constructor(id, handle) {
    super(id, "camera");
    this._handle = handle;
  }

  get handle() {
    return this._handle;
  }

  get position() {
    const coords = GetCamCoord(this._handle);
    return new Vector3(coords[0], coords[1], coords[2]);
  }
  set position(value) {
    SetCamCoord(this._handle, value.x, value.y, value.z);
  }

  setCoord(x, y, z) {
    SetCamCoord(this._handle, x, y, z);
  }

  get rotation() {
    const rot = GetCamRot(this._handle, 2);
    return new Vector3(rot[0], rot[1], rot[2]);
  }
  set rotation(value) {
    SetCamRot(this._handle, value.x, value.y, value.z, 2);
  }

  setRot(x, y, z) {
    SetCamRot(this._handle, x, y, z, 2);
  }

  get fov() {
    return GetCamFov(this._handle);
  }
  set fov(value) {
    SetCamFov(this._handle, value);
  }

  setFov(fov) {
    SetCamFov(this._handle, fov);
  }

  get active() {
    return IsCamActive(this._handle);
  }
  set active(value) {
    SetCamActive(this._handle, value);
    RenderScriptCams(value, false, 0, true, false);
  }

  setActive(state) {
    this.active = state;
  }

  pointAtCoord(x, y, z) {
    PointCamAtCoord(this._handle, x, y, z);
  }

  pointAtEntity(entityHandle, offsetX = 0, offsetY = 0, offsetZ = 0, isRelative = true) {
    PointCamAtEntity(this._handle, entityHandle, offsetX, offsetY, offsetZ, isRelative);
  }

  pointAtPedBone(ped, boneIndex, offsetX = 0, offsetY = 0, offsetZ = 0, isRelative = true) {
    PointCamAtPedBone(this._handle, ped, boneIndex, offsetX, offsetY, offsetZ, isRelative);
  }

  stopPointing() {
    StopCamPointing(this._handle);
  }

  shake(type, amplitude) {
    ShakeCam(this._handle, type, amplitude);
  }

  stopShaking(instant = true) {
    StopCamShaking(this._handle, instant);
  }

  isShaking() {
    return IsCamShaking(this._handle);
  }

  attachTo(entity, offsetX = 0, offsetY = 0, offsetZ = 0, isRelative = true) {
    AttachCamToEntity(this._handle, entity, offsetX, offsetY, offsetZ, isRelative);
  }

  attachToPedBone(ped, boneIndex, offsetX = 0, offsetY = 0, offsetZ = 0, isRelative = true) {
    AttachCamToPedBone(this._handle, ped, boneIndex, offsetX, offsetY, offsetZ, isRelative);
  }

  detach() {
    DetachCam(this._handle);
  }

  setNearClip(value) {
    SetCamNearClip(this._handle, value);
  }

  setFarClip(value) {
    SetCamFarClip(this._handle, value);
  }

  setNearDof(value) {
    SetCamNearDof(this._handle, value);
  }

  setFarDof(value) {
    SetCamFarDof(this._handle, value);
  }

  setDofStrength(value) {
    SetCamDofStrength(this._handle, value);
  }

  setMotionBlurStrength(value) {
    SetCamMotionBlurStrength(this._handle, value);
  }

  setActiveWithInterp(fromCam, duration, easeLocation, easeRotation) {
    SetCamActiveWithInterp(this._handle, fromCam, duration, easeLocation, easeRotation);
    RenderScriptCams(true, false, 0, true, false);
  }

  isInterpolating() {
    return IsCamInterpolating(this._handle);
  }

  destroy() {
    SetCamActive(this._handle, false);
    RenderScriptCams(false, false, 0, true, false);
    DestroyCam(this._handle, false);
    globalThis.mp.cameras._remove(this.id);
  }
}
