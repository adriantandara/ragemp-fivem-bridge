import { Pool } from "@ragemp-fivem-bridge/shared";
import { CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { addLocal } from "../internal/pools/clientPool";
import { CameraMp } from "../Entities/CameraMp";
import { setupCameraPool, getGameplayCamera, GameplayCamera } from "../internal/pools/cameraPoolService";

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

        const cam = new CameraMp(CONSTRUCT, 0, handle);
        addLocal(this, cam);
        return cam;
    }
}
