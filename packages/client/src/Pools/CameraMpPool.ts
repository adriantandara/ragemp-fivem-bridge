import { Pool } from "@ragemp-fivem-bridge/shared";
import { poolAdd, CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { CameraMp } from "../Entities/CameraMp";
import { setupCameraPool, getGameplayCamera, GameplayCamera } from "../internal/pools/cameraPoolService";

let cameraIdCounter = 0;

export class CameraMpPool extends Pool<CameraMp> {
    constructor() {
        super();
        setupCameraPool(this);
    }

    get gameplay(): GameplayCamera {
        return getGameplayCamera(this);
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
        const cam = new CameraMp(CONSTRUCT, id, handle);
        poolAdd(this, cam);
        return cam;
    }
}
