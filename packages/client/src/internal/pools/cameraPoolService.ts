import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { CameraMpPool } from "../../Pools/CameraMpPool";

function makeGameplayCamera() {
  const cam = {
    get handle(): number {
      return GetRenderingCam();
    },
    get position(): Vector3 {
      const c = GetGameplayCamCoord();
      return new Vector3(c[0], c[1], c[2]);
    },
    get rotation(): Vector3 {
      const r = GetGameplayCamRot(2);
      return new Vector3(r[0], r[1], r[2]);
    },
    getCoord(): Vector3 {
      const c = GetGameplayCamCoord();
      return new Vector3(c[0], c[1], c[2]);
    },
    getRot(): Vector3 {
      const r = GetGameplayCamRot(2);
      return new Vector3(r[0], r[1], r[2]);
    },
    getFov(): number {
      return GetGameplayCamFov();
    },
    getDirection(): Vector3 {
      const r = GetGameplayCamRot(2);
      const z = (r[2] * Math.PI) / 180;
      const x = (r[0] * Math.PI) / 180;
      const num = Math.abs(Math.cos(x));
      return new Vector3(-Math.sin(z) * num, Math.cos(z) * num, Math.sin(x));
    },
    getRelativeHeading(): number { return GetGameplayCamRelativeHeading(); },
    setRelativeHeading(heading: number): void { SetGameplayCamRelativeHeading(heading); },
    getRelativePitch(): number { return GetGameplayCamRelativePitch(); },
    setRelativePitch(angle: number, scalingFactor?: number): void { SetGameplayCamRelativePitch(angle, scalingFactor ?? 1.0); },
    resetFullAttachParentTransformTimer(): void { ResetGameplayCamFullAttachParentTransformTimer(); },
    shake(type: string, amplitude: number): void { ShakeGameplayCam(type, amplitude); },
    isShaking(): boolean { return IsGameplayCamShaking(); },
    setShakeAmplitude(amplitude: number): void { SetGameplayCamShakeAmplitude(amplitude); },
    stopShaking(stopImmediately: boolean): void { StopGameplayCamShaking(!!stopImmediately); },
    isRendering(): boolean { return IsGameplayCamRendering(); },
    isLookingBehind(): boolean { return IsGameplayCamLookingBehind(); },
    setFollowPedThisUpdate(ped: number): void { SetGameplayCamFollowPedThisUpdate(ped); },
    setMotionBlurScalingThisUpdate(scaling: number): void { SetGameplayCamMotionBlurScalingThisUpdate(scaling); },
    setMaxMotionBlurStrengthThisUpdate(strength: number): void { SetGameplayCamMaxMotionBlurStrengthThisUpdate(strength); },
    setAltitudeFovScalingState(state: boolean): void { SetGameplayCamAltitudeFovScalingState(state); },
    disableAltitudeFovScalingThisUpdate(): void { DisableGameplayCamAltitudeFovScalingThisUpdate(); },
    setIgnoreEntityCollisionThisUpdate(entity: number, p1: boolean): void { SetGameplayCamIgnoreEntityCollisionThisUpdate(entity, p1); },
    setEntityToLimitFocusOverBoundingSphereThisUpdate(entity: number): void { SetGameplayCamEntityToLimitFocusOverBoundingSphereThisUpdate(entity); },
  };
  return cam;
}

export type GameplayCamera = ReturnType<typeof makeGameplayCamera>;

interface CameraPoolRec {
  gameplay: GameplayCamera | null;
}

const CameraPoolInternals = defineInternals<CameraPoolRec>();

export function setupCameraPool(pool: CameraMpPool): void {
  CameraPoolInternals.init(pool, { gameplay: null });
}

export function getGameplayCamera(pool: CameraMpPool): GameplayCamera {
  const rec = CameraPoolInternals.get(pool);
  if (!rec.gameplay) rec.gameplay = makeGameplayCamera();
  return rec.gameplay;
}
