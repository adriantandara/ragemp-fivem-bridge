import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { toVec3 } from "../utils/vec";
import { CameraInternals, initCameraInternals } from "../internal/cameraInternals";

export class CameraMp extends Entity {
  constructor(token: symbol, id: number, handle: number) {
    super(token, id, "camera");
    initCameraInternals(this, handle);
  }

  override get handle(): number {
    return CameraInternals.get(this).handle;
  }

  override get position(): Vector3 {
    return toVec3(GetCamCoord(CameraInternals.get(this).handle));
  }
  override set position(value: Vector3) {
    SetCamCoord(CameraInternals.get(this).handle, value.x, value.y, value.z);
  }

  get rotation(): Vector3 {
    return toVec3(GetCamRot(CameraInternals.get(this).handle, 2));
  }
  set rotation(value: Vector3) {
    SetCamRot(CameraInternals.get(this).handle, value.x, value.y, value.z, 2);
  }

  getDirection(): Vector3 {
    const r = GetCamRot(CameraInternals.get(this).handle, 2);
    const z = (r[2] * Math.PI) / 180;
    const x = (r[0] * Math.PI) / 180;
    const num = Math.abs(Math.cos(x));
    return new Vector3(-Math.sin(z) * num, Math.cos(z) * num, Math.sin(x));
  }

  getCoord(): Vector3 { return toVec3(GetCamCoord(CameraInternals.get(this).handle)); }
  setCoord(posX: number, posY: number, posZ: number): void { SetCamCoord(CameraInternals.get(this).handle, posX, posY, posZ); }
  getRot(rotationOrder: number): Vector3 { return toVec3(GetCamRot(CameraInternals.get(this).handle, rotationOrder ?? 2)); }
  setRot(rotX: number, rotY: number, rotZ: number, p3: number): void { SetCamRot(CameraInternals.get(this).handle, rotX, rotY, rotZ, p3 ?? 2); }

  isActive(): boolean { return IsCamActive(CameraInternals.get(this).handle); }
  setActive(active: boolean): void { SetCamActive(CameraInternals.get(this).handle, !!active); }
  setActiveWithInterp(camFrom: any, duration: number, easeLocation: number, easeRotation: number): void { SetCamActiveWithInterp(CameraInternals.get(this).handle, camFrom?.handle ?? camFrom, duration, easeLocation, easeRotation); }
  isInterpolating(): boolean { return IsCamInterpolating(CameraInternals.get(this).handle); }
  isRendering(): boolean { return IsCamRendering(CameraInternals.get(this).handle); }
  doesExist(): boolean { return DoesCamExist(CameraInternals.get(this).handle); }
  override destroy(destroy?: boolean): void { DestroyCam(CameraInternals.get(this).handle, destroy ?? false); }

  getFov(): number { return GetCamFov(CameraInternals.get(this).handle); }
  setFov(fieldOfView: number): void { SetCamFov(CameraInternals.get(this).handle, fieldOfView); }
  getNearClip(): number { return GetCamNearClip(CameraInternals.get(this).handle); }
  setNearClip(nearClip: number): void { SetCamNearClip(CameraInternals.get(this).handle, nearClip); }
  getFarClip(): number { return GetCamFarClip(CameraInternals.get(this).handle); }
  setFarClip(farClip: number): void { SetCamFarClip(CameraInternals.get(this).handle, farClip); }
  getNearDof(): number | undefined { return GetCamNearDof?.(CameraInternals.get(this).handle); }
  setNearDof(nearDof: number): void { SetCamNearDof(CameraInternals.get(this).handle, nearDof); }
  getFarDof(): number { return GetCamFarDof(CameraInternals.get(this).handle); }
  setFarDof(farDof: number): void { SetCamFarDof(CameraInternals.get(this).handle, farDof); }
  setDofStrength(dofStrength: number): void { SetCamDofStrength(CameraInternals.get(this).handle, dofStrength); }
  setDofPlanes(nearOutOfFocusPlane: number, nearInFocusPlane: number, farInFocusPlane: number, farOutOfFocusPlane: number): void { SetCamDofPlanes(CameraInternals.get(this).handle, nearOutOfFocusPlane, nearInFocusPlane, farInFocusPlane, farOutOfFocusPlane); }
  setUseShallowDofMode(toggle: boolean): void { SetCamUseShallowDofMode(CameraInternals.get(this).handle, !!toggle); }
  setDofFnumberOfLens(fnumber: number): void { SetCamDofFnumberOfLens(CameraInternals.get(this).handle, fnumber); }
  setDofFocusDistanceBias(distanceBias: number): void { SetCamDofFocusDistanceBias(CameraInternals.get(this).handle, distanceBias); }
  setDofMaxNearInFocusDistance(distance: number): void { SetCamDofMaxNearInFocusDistance(CameraInternals.get(this).handle, distance); }
  setDofMaxNearInFocuxDistanceBlendLevel(blendLevel: number): void { SetCamDofMaxNearInFocusDistanceBlendLevel(CameraInternals.get(this).handle, blendLevel); }
  // Not in the d.ts interface (getDofParam/setDofParam have different signatures). Typed from d.ts:
  getDofParam(_paramHash: number): boolean | number | any[] | undefined { return undefined; }
  setDofParam(_paramHash: number, _value: boolean | number | any[]): void {}

  setMotionBlurStrength(strength: number): void { SetCamMotionBlurStrength(CameraInternals.get(this).handle, strength); }
  setAffectsAiming(toggle: boolean): void { SetCamAffectsAiming(CameraInternals.get(this).handle, !!toggle); }
  setInheritRollVehicle(p1: boolean): void { SetCamInheritRollVehicle(CameraInternals.get(this).handle, !!p1); }
  setDebugName(name: string): void { SetCamDebugName(CameraInternals.get(this).handle, name); }

  // d.ts: attachTo(entity: Handle, xOffset, yOffset, zOffset, isRelative)
  attachTo(entity: any, xOffset: number, yOffset: number, zOffset: number, isRelative: boolean): void { AttachCamToEntity(CameraInternals.get(this).handle, entity?.handle ?? entity, xOffset, yOffset, zOffset, isRelative ?? true); }
  attachToPedBone(ped: any, boneIndex: number, x: number, y: number, z: number, heading: boolean): void { AttachCamToPedBone(CameraInternals.get(this).handle, ped?.handle ?? ped, boneIndex, x, y, z, !!heading); }
  detach(): void { DetachCam(CameraInternals.get(this).handle); }
  // d.ts: pointAt(entity: EntityMp, offsetX, offsetY, offsetZ, p4) — entity typed as any due to bridge usage
  pointAt(entity: any, offsetX: number, offsetY: number, offsetZ: number, p4: boolean): void { PointCamAtEntity(CameraInternals.get(this).handle, entity?.handle ?? entity, offsetX ?? 0, offsetY ?? 0, offsetZ ?? 0, p4 ?? true); }
  pointAtCoord(x: number, y: number, z: number): void { PointCamAtCoord(CameraInternals.get(this).handle, x, y, z); }
  pointAtPedBone(ped: any, boneIndex: number, x: number, y: number, z: number, heading: boolean): void { PointCamAtPedBone(CameraInternals.get(this).handle, ped?.handle ?? ped, boneIndex, x, y, z, !!heading); }
  stopPointing(): void { StopCamPointing(CameraInternals.get(this).handle); }

  shake(type: string, amplitude: number): void { ShakeCam(CameraInternals.get(this).handle, type, amplitude); }
  isShaking(): boolean { return IsCamShaking(CameraInternals.get(this).handle); }
  setShakeAmplitude(amplitude: number): void { SetCamShakeAmplitude(CameraInternals.get(this).handle, amplitude); }
  stopShaking(stopImmediately: boolean): void { StopCamShaking(CameraInternals.get(this).handle, !!stopImmediately); }
  animatedShake(animDict: string, animName: string, shakeName: string, amplitudeScalar: number): void { AnimatedShakeCam(CameraInternals.get(this).handle, animDict, animName, shakeName, amplitudeScalar); }

  playAnim(animName: string, propName: string, p2: number, p3: boolean, p4: boolean, p5: boolean, delta: number, bitset: any): boolean { return PlayCamAnim(CameraInternals.get(this).handle, animName, propName, p2, (p3 ?? 0) as any, (p4 ?? 0) as any, (p5 ?? 0) as any, 0, 0, !!delta, bitset ?? 2); }
  isPlayingAnim(animName: string, animDictionary: string): boolean { return IsCamPlayingAnim(CameraInternals.get(this).handle, animName, animDictionary); }
  getAnimCurrentPhase(): number { return GetCamAnimCurrentPhase(CameraInternals.get(this).handle); }
  setAnimCurrentPhase(phase: number): void { SetCamAnimCurrentPhase(CameraInternals.get(this).handle, phase); }
  getSplinePhase(): number { return GetCamSplinePhase(CameraInternals.get(this).handle); }
}
