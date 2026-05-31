import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { withEntityNatives } from "../utils/native";

export class CameraMp extends Entity {
  _handle;

  constructor(id, handle) {
    super(id, "camera");
    this._handle = handle;
    return withEntityNatives(this, (t) => t._handle, ["Cam"]);
  }

  getDirection() {
    const r = GetCamRot(this._handle, 2);
    const z = (r[2] * Math.PI) / 180;
    const x = (r[0] * Math.PI) / 180;
    const num = Math.abs(Math.cos(x));
    return new Vector3(-Math.sin(z) * num, Math.cos(z) * num, Math.sin(x));
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

  get rotation() {
    const rot = GetCamRot(this._handle, 2);
    return new Vector3(rot[0], rot[1], rot[2]);
  }
  set rotation(value) {
    SetCamRot(this._handle, value.x, value.y, value.z, 2);
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

  doesExist() {
    return DoesCamExist(this._handle);
  }

  isRendering() {
    return IsCamRendering(this._handle);
  }

  isPlayingAnim() {
    return IsCamPlayingAnim(this._handle);
  }

  getCoord() {
    const c = GetCamCoord(this._handle);
    return { x: c[0], y: c[1], z: c[2] };
  }

  getRot(rotationOrder) {
    const r = GetCamRot(this._handle, rotationOrder ?? 2);
    return { x: r[0], y: r[1], z: r[2] };
  }

  getFov() {
    return GetCamFov(this._handle);
  }

  getNearClip() {
    return GetCamNearClip(this._handle);
  }

  getFarClip() {
    return GetCamFarClip(this._handle);
  }

  getFarDof() {
    return GetCamFarDof(this._handle);
  }

  setCoord(x, y, z) {
    SetCamCoord(this._handle, x, y, z);
  }

  setRot(x, y, z, rotationOrder) {
    SetCamRot(this._handle, x, y, z, rotationOrder ?? 2);
  }

  setAffectsAiming(toggle) {
    SetCamAffectsAiming(this._handle, !!toggle);
  }

  setDebugName(name) {
    SetCamDebugName(this._handle, name);
  }

  setUseShallowDofMode(toggle) {
    SetUseHiDof();
    SetCamUseShallowDofMode(this._handle, !!toggle);
  }

  setInheritRollVehicle(toggle) {
    SetCamInheritRollVehicle(this._handle, !!toggle);
  }

  setShakeAmplitude(amplitude) {
    SetCamShakeAmplitude(this._handle, amplitude);
  }

  setParams(posX, posY, posZ, rotX, rotY, rotZ, fov, duration, easePos, easeRot, rotOrder) {
    SetCamParams(this._handle, posX, posY, posZ, rotX, rotY, rotZ, fov, duration ?? 0, easePos ?? 1, easeRot ?? 1, rotOrder ?? 2);
  }

  getSplinePhase() {
    return GetCamSplinePhase(this._handle);
  }

  getAnimCurrentPhase() {
    return GetCamAnimCurrentPhase(this._handle);
  }

  setAnimCurrentPhase(phase) {
    SetCamAnimCurrentPhase(this._handle, phase);
  }

  setDofFnumberOfLens(value) {
    SetCamDofFnumberOfLens(this._handle, value);
  }

  setDofFocusDistanceBias(value) {
    SetCamDofFocusDistanceBias(this._handle, value);
  }

  setDofMaxNearInFocusDistance(value) {
    SetCamDofMaxNearInFocusDistance(this._handle, value);
  }

  setDofMaxNearInFocuxDistanceBlendLevel(value) {
    SetCamDofMaxNearInFocuxDistanceBlendLevel(this._handle, value);
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
  
  pointAt(entity, offsetX = 0, offsetY = 0, offsetZ = 0, isRelative = true) {
    const handle =
      entity && typeof entity === "object" && "handle" in entity
        ? entity.handle
        : entity;
    PointCamAtEntity(this._handle, handle, offsetX, offsetY, offsetZ, isRelative);
  }

  destroy() {
    SetCamActive(this._handle, false);
    RenderScriptCams(false, false, 0, true, false);
    DestroyCam(this._handle, false);
    globalThis.mp.cameras._remove(this.id);
  }
}
