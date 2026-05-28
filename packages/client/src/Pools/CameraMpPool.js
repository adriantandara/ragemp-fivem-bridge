import { Pool } from "@ragemp-fivem-bridge/shared";
import { CameraMp } from "../Entities/CameraMp";

let cameraIdCounter = 0;

export class CameraMpPool extends Pool {
  get gameplay() {
    return GetRenderingCam();
  }

  new(name, position, rotation, fov) {
    const hash = typeof name === "string" ? GetHashKey(name) : name;
    const handle = CreateCamWithParams(
      hash || "DEFAULT_SCRIPTED_CAMERA",
      position?.x ?? 0, position?.y ?? 0, position?.z ?? 0,
      rotation?.x ?? 0, rotation?.y ?? 0, rotation?.z ?? 0,
      fov ?? 50.0,
      false, 2
    );

    const id = ++cameraIdCounter;
    const cam = new CameraMp(id, handle);
    this._add(cam);
    return cam;
  }

  _remove(id) {
    super._remove(id);
  }
}
