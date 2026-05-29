import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { CameraMp } from "../Entities/CameraMp";
import { withGameNatives } from "../utils/native";

let cameraIdCounter = 0;

function makeGameplayCamera() {
  const cam = {
    get handle() {
      return GetRenderingCam();
    },
    get position() {
      const c = GetGameplayCamCoord();
      return new Vector3(c[0], c[1], c[2]);
    },
    get rotation() {
      const r = GetGameplayCamRot(2);
      return new Vector3(r[0], r[1], r[2]);
    },
    getCoord() {
      const c = GetGameplayCamCoord();
      return new Vector3(c[0], c[1], c[2]);
    },
    getRot() {
      const r = GetGameplayCamRot(2);
      return new Vector3(r[0], r[1], r[2]);
    },
    getFov() {
      return GetGameplayCamFov();
    },
    getDirection() {
      const r = GetGameplayCamRot(2);
      const z = (r[2] * Math.PI) / 180;
      const x = (r[0] * Math.PI) / 180;
      const num = Math.abs(Math.cos(x));
      return new Vector3(-Math.sin(z) * num, Math.cos(z) * num, Math.sin(x));
    },
  };
  return withGameNatives(cam, "gameplayCam", ["GameplayCam"]);
}

export class CameraMpPool extends Pool {
  get gameplay() {
    if (!this._gameplay) this._gameplay = makeGameplayCamera();
    return this._gameplay;
  }

  new(name, position, rotation, fov) {
    const camName =
      typeof name !== "string" || name.toLowerCase() === "default"
        ? "DEFAULT_SCRIPTED_CAMERA"
        : name;
    const handle = CreateCamWithParams(
      camName,
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
