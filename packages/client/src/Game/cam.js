import { createUnkProxy, toVec3 } from "./_helpers.js";

export class GameCamNs {
  unk = createUnkProxy();

  createCam(camName, p1) { return CreateCam(camName, p1 ?? false); }
  createCamWithParams(camName, x, y, z, rotX, rotY, rotZ, fov, p8, p9) {
    return CreateCamWithParams(camName, x, y, z, rotX, rotY, rotZ, fov, p8 ?? false, p9 ?? 0);
  }
  createCamera(camHash, p1) { return CreateCamera(camHash, p1 ?? false); }
  createCameraWithParams(camHash, x, y, z, rotX, rotY, rotZ, fov, p8, p9) {
    return CreateCameraWithParams(camHash, x, y, z, rotX, rotY, rotZ, fov, p8 ?? false, p9 ?? 0);
  }
  destroyCam(cam, bScriptHostCam) { DestroyCam(cam, bScriptHostCam ?? false); }
  destroyAllCams(bScriptHostCam) { DestroyAllCams(bScriptHostCam ?? false); }
  doesCamExist(cam) { return DoesCamExist(cam); }

  getCoord(cam) { return toVec3(GetCamCoord(cam)); }
  setCoord(cam, x, y, z) { SetCamCoord(cam, x, y, z); }
  getRot(cam, rotationOrder) { return toVec3(GetCamRot(cam, rotationOrder ?? 2)); }
  setRot(cam, pitch, roll, yaw, rotationOrder) { SetCamRot(cam, pitch, roll, yaw, rotationOrder ?? 2); }
  getFov(cam) { return GetCamFov(cam); }
  setFov(cam, fov) { SetCamFov(cam, fov); }
  getNearClip(cam) { return GetCamNearClip(cam); }
  setNearClip(cam, nearClip) { SetCamNearClip(cam, nearClip); }
  getFarClip(cam) { return GetCamFarClip(cam); }
  setFarClip(cam, farClip) { SetCamFarClip(cam, farClip); }
  getNearDof(cam) { return GetCamNearDof(cam); }
  setNearDof(cam, nearDOF) { SetCamNearDof(cam, nearDOF); }
  getFarDof(cam) { return GetCamFarDof(cam); }
  setFarDof(cam, farDOF) { SetCamFarDof(cam, farDOF); }
  setDofStrength(cam, strength) { SetCamDofStrength(cam, strength); }
  setDofPlanes(cam, nearStart, nearEnd, farStart, farEnd) { SetCamDofPlanes(cam, nearStart, nearEnd, farStart, farEnd); }
  setMotionBlurStrength(cam, strength) { SetCamMotionBlurStrength(cam, strength); }

  isActive(cam) { return IsCamActive(cam); }
  setActive(cam, active) { SetCamActive(cam, active); }
  isInterpolating(cam) { return IsCamInterpolating(cam); }
  setActiveWithInterp(camTo, camFrom, duration, easeLocation, easeRotation) {
    SetCamActiveWithInterp(camTo, camFrom, duration, easeLocation ?? 1, easeRotation ?? 1);
  }
  renderScriptCams(render, ease, easeTime, easeCoordsAnim, p4) {
    RenderScriptCams(render, ease ?? false, easeTime ?? 0, easeCoordsAnim ?? true, p4 ?? false);
  }

  attachToEntity(cam, entity, xOffset, yOffset, zOffset, isRelative) {
    AttachCamToEntity(cam, entity, xOffset, yOffset, zOffset, isRelative ?? true);
  }
  attachToPedBone(cam, ped, boneIndex, xOffset, yOffset, zOffset, heading) {
    AttachCamToPedBone(cam, ped, boneIndex, xOffset, yOffset, zOffset, heading ?? true);
  }
  attachToVehicleBone(cam, vehicle, boneIndex, xOffset, yOffset, zOffset, isRelative) {
    AttachCamToVehicleBone(cam, vehicle, boneIndex, xOffset, yOffset, zOffset, isRelative ?? true);
  }
  detach(cam) { DetachCam(cam); }
  pointAtCoord(cam, x, y, z) { PointCamAtCoord(cam, x, y, z); }
  pointAtEntity(cam, entity, offsetX, offsetY, offsetZ, isRelative) {
    PointCamAtEntity(cam, entity, offsetX ?? 0, offsetY ?? 0, offsetZ ?? 0, isRelative ?? false);
  }
  pointAtPedBone(cam, ped, boneIndex, x, y, z, isRelative) {
    PointCamAtPedBone(cam, ped, boneIndex, x ?? 0, y ?? 0, z ?? 0, isRelative ?? false);
  }
  stopPointing(cam) { StopCamPointing(cam); }

  shake(cam, shakeName, intensity) { ShakeCam(cam, shakeName, intensity); }
  stopShake(cam) { StopCamShaking(cam, true); }
  isShaking(cam) { return IsCamShaking(cam); }

  getGameplayCoord() { return toVec3(GetGameplayCamCoord()); }
  getGameplayRot(rotationOrder) { return toVec3(GetGameplayCamRot(rotationOrder ?? 2)); }
  getGameplayFov() { return GetGameplayCamFov(); }
  setGameplayRelativeHeading(heading) { SetGameplayCamRelativeHeading(heading); }
  setGameplayRelativePitch(pitch, scalingFactor) { SetGameplayCamRelativePitch(pitch, scalingFactor ?? 1.0); }
  clampGameplayCamYaw(minimum, maximum) { ClampGameplayCamYaw(minimum, maximum); }
  clampGameplayCamPitch(minimum, maximum) { ClampGameplayCamPitch(minimum, maximum); }

  doScreenFadeIn(duration) { DoScreenFadeIn(duration); }
  doScreenFadeOut(duration) { DoScreenFadeOut(duration); }
  isScreenFadedIn() { return IsScreenFadedIn(); }
  isScreenFadedOut() { return IsScreenFadedOut(); }
  isScreenFadingIn() { return IsScreenFadingIn(); }
  isScreenFadingOut() { return IsScreenFadingOut(); }
  setCinematicModeActive(p0) { SetCinematicModeActive(p0); }
  isCinematicCamActive() { return IsCinematicCamActive(); }
  setWidescreenBorders(p0) { SetWidescreenBorders(p0); }
}
