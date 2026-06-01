import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { toVec3 } from "../utils/vec";

export class CameraMp extends Entity {
  id: number;
  _handle: number;

  constructor(id: number, handle: number) {
    super(id, "camera");
    this._handle = handle;
  }

  get handle(): number {
    return this._handle;
  }

  get position(): Vector3 {
    return toVec3(GetCamCoord(this._handle));
  }
  set position(value: Vector3) {
    SetCamCoord(this._handle, value.x, value.y, value.z);
  }

  get rotation(): Vector3 {
    return toVec3(GetCamRot(this._handle, 2));
  }
  set rotation(value: Vector3) {
    SetCamRot(this._handle, value.x, value.y, value.z, 2);
  }

  getDirection(): Vector3 {
    const r = GetCamRot(this._handle, 2);
    const z = (r[2] * Math.PI) / 180;
    const x = (r[0] * Math.PI) / 180;
    const num = Math.abs(Math.cos(x));
    return new Vector3(-Math.sin(z) * num, Math.cos(z) * num, Math.sin(x));
  }

  getCoord(): Vector3 { return toVec3(GetCamCoord(this._handle)); }
  setCoord(posX: number, posY: number, posZ: number): void { SetCamCoord(this._handle, posX, posY, posZ); }
  getRot(rotationOrder: number): Vector3 { return toVec3(GetCamRot(this._handle, rotationOrder ?? 2)); }
  setRot(rotX: number, rotY: number, rotZ: number, p3: number): void { SetCamRot(this._handle, rotX, rotY, rotZ, p3 ?? 2); }

  isActive(): boolean { return IsCamActive(this._handle); }
  setActive(active: boolean): void { SetCamActive(this._handle, !!active); }
  setActiveWithInterp(camFrom: any, duration: number, easeLocation: number, easeRotation: number): void { SetCamActiveWithInterp(this._handle, camFrom?.handle ?? camFrom, duration, easeLocation, easeRotation); }
  isInterpolating(): boolean { return IsCamInterpolating(this._handle); }
  isRendering(): boolean { return IsCamRendering(this._handle); }
  doesExist(): boolean { return DoesCamExist(this._handle); }
  destroy(destroy?: boolean): void { DestroyCam(this._handle, destroy ?? false); }

  getFov(): number { return GetCamFov(this._handle); }
  setFov(fieldOfView: number): void { SetCamFov(this._handle, fieldOfView); }
  getNearClip(): number { return GetCamNearClip(this._handle); }
  setNearClip(nearClip: number): void { SetCamNearClip(this._handle, nearClip); }
  getFarClip(): number { return GetCamFarClip(this._handle); }
  setFarClip(farClip: number): void { SetCamFarClip(this._handle, farClip); }
  getNearDof(): number | undefined { return GetCamNearDof?.(this._handle); }
  setNearDof(nearDof: number): void { SetCamNearDof(this._handle, nearDof); }
  getFarDof(): number { return GetCamFarDof(this._handle); }
  setFarDof(farDof: number): void { SetCamFarDof(this._handle, farDof); }
  setDofStrength(dofStrength: number): void { SetCamDofStrength(this._handle, dofStrength); }
  setDofPlanes(nearOutOfFocusPlane: number, nearInFocusPlane: number, farInFocusPlane: number, farOutOfFocusPlane: number): void { SetCamDofPlanes(this._handle, nearOutOfFocusPlane, nearInFocusPlane, farInFocusPlane, farOutOfFocusPlane); }
  setUseShallowDofMode(toggle: boolean): void { SetCamUseShallowDofMode(this._handle, !!toggle); }
  setDofFnumberOfLens(fnumber: number): void { SetCamDofFnumberOfLens(this._handle, fnumber); }
  setDofFocusDistanceBias(distanceBias: number): void { SetCamDofFocusDistanceBias(this._handle, distanceBias); }
  setDofMaxNearInFocusDistance(distance: number): void { SetCamDofMaxNearInFocusDistance(this._handle, distance); }
  setDofMaxNearInFocuxDistanceBlendLevel(blendLevel: number): void { SetCamDofMaxNearInFocusDistanceBlendLevel(this._handle, blendLevel); }
  // Not in the d.ts interface (getDofParam/setDofParam have different signatures). Typed from d.ts:
  getDofParam(_paramHash: number): boolean | number | any[] | undefined { return undefined; }
  setDofParam(_paramHash: number, _value: boolean | number | any[]): void {}

  setMotionBlurStrength(strength: number): void { SetCamMotionBlurStrength(this._handle, strength); }
  setAffectsAiming(toggle: boolean): void { SetCamAffectsAiming(this._handle, !!toggle); }
  setInheritRollVehicle(p1: boolean): void { SetCamInheritRollVehicle(this._handle, !!p1); }
  setDebugName(name: string): void { SetCamDebugName(this._handle, name); }

  // d.ts: attachTo(entity: Handle, xOffset, yOffset, zOffset, isRelative)
  attachTo(entity: any, xOffset: number, yOffset: number, zOffset: number, isRelative: boolean): void { AttachCamToEntity(this._handle, entity?.handle ?? entity, xOffset, yOffset, zOffset, isRelative ?? true); }
  attachToPedBone(ped: any, boneIndex: number, x: number, y: number, z: number, heading: boolean): void { AttachCamToPedBone(this._handle, ped?.handle ?? ped, boneIndex, x, y, z, !!heading); }
  detach(): void { DetachCam(this._handle); }
  // d.ts: pointAt(entity: EntityMp, offsetX, offsetY, offsetZ, p4) — entity typed as any due to bridge usage
  pointAt(entity: any, offsetX: number, offsetY: number, offsetZ: number, p4: boolean): void { PointCamAtEntity(this._handle, entity?.handle ?? entity, offsetX ?? 0, offsetY ?? 0, offsetZ ?? 0, p4 ?? true); }
  pointAtCoord(x: number, y: number, z: number): void { PointCamAtCoord(this._handle, x, y, z); }
  pointAtPedBone(ped: any, boneIndex: number, x: number, y: number, z: number, heading: boolean): void { PointCamAtPedBone(this._handle, ped?.handle ?? ped, boneIndex, x, y, z, !!heading); }
  stopPointing(): void { StopCamPointing(this._handle); }

  shake(type: string, amplitude: number): void { ShakeCam(this._handle, type, amplitude); }
  isShaking(): boolean { return IsCamShaking(this._handle); }
  setShakeAmplitude(amplitude: number): void { SetCamShakeAmplitude(this._handle, amplitude); }
  stopShaking(stopImmediately: boolean): void { StopCamShaking(this._handle, !!stopImmediately); }
  animatedShake(animDict: string, animName: string, shakeName: string, amplitudeScalar: number): void { AnimatedShakeCam(this._handle, animDict, animName, shakeName, amplitudeScalar); }

  playAnim(animName: string, propName: string, p2: number, p3: boolean, p4: boolean, p5: boolean, delta: number, bitset: any): boolean { return PlayCamAnim(this._handle, animName, propName, p2, (p3 ?? 0) as any, (p4 ?? 0) as any, (p5 ?? 0) as any, 0, 0, !!delta, bitset ?? 2); }
  isPlayingAnim(animName: string, animDictionary: string): boolean { return IsCamPlayingAnim(this._handle, animName, animDictionary); }
  getAnimCurrentPhase(): number { return GetCamAnimCurrentPhase(this._handle); }
  setAnimCurrentPhase(phase: number): void { SetCamAnimCurrentPhase(this._handle, phase); }
  getSplinePhase(): number { return GetCamSplinePhase(this._handle); }
}
