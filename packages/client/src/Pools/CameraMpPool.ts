import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { CameraMp } from "../Entities/CameraMp";

let cameraIdCounter = 0;

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

type GameplayCamera = ReturnType<typeof makeGameplayCamera>;

export class CameraMpPool extends Pool {
    _gameplay: GameplayCamera | null = null;
    _entities!: Map<number, CameraMp>;
    _add!: (entity: CameraMp) => void;
    at!: (id: number) => CameraMp | null;
    exists!: (entity: number | { id: number }) => boolean;
    forEach!: (fn: (entity: CameraMp) => void) => void;
    toArray!: () => CameraMp[];

    get gameplay(): GameplayCamera {
        if (!this._gameplay) this._gameplay = makeGameplayCamera();
        return this._gameplay;
    }

    new(name: string, position?: { x: number; y: number; z: number }, rotation?: { x: number; y: number; z: number }, fov?: number): CameraMp | GameplayCamera {
        if (typeof name === "string" && name.toLowerCase() === "gameplay") {
            return this.gameplay;
        }

        const camName = typeof name !== "string" || name.toLowerCase() === "default" ? "DEFAULT_SCRIPTED_CAMERA" : name;
        const handle = CreateCamWithParams(
            camName,
            position?.x ?? 0,
            position?.y ?? 0,
            position?.z ?? 0,
            rotation?.x ?? 0,
            rotation?.y ?? 0,
            rotation?.z ?? 0,
            fov ?? 50.0,
            false,
            2
        );

        const id = ++cameraIdCounter;
        const cam = new CameraMp(id, handle);
        this._add(cam);
        return cam;
    }

    _remove(id: number): void {
        super._remove(id);
    }
}
