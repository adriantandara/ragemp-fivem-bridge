import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { CheckpointMp } from "../Entities/CheckpointMp";

let localCheckpointIdCounter = 100000;

export class CheckpointMpPool extends Pool {
  constructor() {
    super();
    this._setupServerSync();
  }

  atRemoteId(remoteId) {
    return this.at(remoteId);
  }

  _createFromData(data) {
    const handle = CreateCheckpoint(
      data.type,
      data.x, data.y, data.z,
      data.nextX, data.nextY, data.nextZ,
      data.radius,
      data.r, data.g, data.b, data.a,
      0
    );

    const cp = new CheckpointMp(data.id, handle);
    cp._r = data.r;
    cp._g = data.g;
    cp._b = data.b;
    cp._a = data.a;
    cp._visible = data.visible;
    cp._position = new Vector3(data.x, data.y, data.z);
    cp._radius = data.radius;

    if (!data.visible) {
      SetCheckpointRgba(handle, 0, 0, 0, 0);
    }

    cp._origin = "server";
    this._add(cp);
    return cp;
  }

  _setupServerSync() {
    onNet("ragemp:checkpointCreate", (data) => {
      this._createFromData(data);
    });

    onNet("ragemp:checkpointSyncAll", (checkpoints) => {
      for (const data of checkpoints) {
        if (!this.exists(data.id)) {
          this._createFromData(data);
        }
      }
    });

    onNet("ragemp:checkpointUpdate", (id, data) => {
      const existing = this.at(id);
      if (existing) {
        DeleteCheckpoint(existing._handle);
        this._remove(id);
        this._createFromData(data);
      }
    });

    onNet("ragemp:checkpointDestroy", (id) => {
      const existing = this.at(id);
      if (existing) {
        existing.destroy();
      }
    });
  }

  new(type, position, nextPosition, radius, options = {}) {
    const id = ++localCheckpointIdCounter;
    const nx = nextPosition?.x ?? 0;
    const ny = nextPosition?.y ?? 0;
    const nz = nextPosition?.z ?? 0;
    const c = options.color;
    const arr = Array.isArray(c);
    const r = (arr ? c[0] : c?.r) ?? 255;
    const g = (arr ? c[1] : c?.g) ?? 0;
    const b = (arr ? c[2] : c?.b) ?? 0;
    const a = (arr ? c[3] : c?.a) ?? 150;

    const handle = CreateCheckpoint(
      type,
      position.x, position.y, position.z,
      nx, ny, nz,
      radius,
      r, g, b, a,
      0
    );

    const cp = new CheckpointMp(id, handle);
    cp._r = r;
    cp._g = g;
    cp._b = b;
    cp._a = a;
    cp._visible = options.visible ?? true;
    cp._position = new Vector3(position.x, position.y, position.z);
    cp._radius = radius;

    if (!cp._visible) {
      SetCheckpointRgba(handle, 0, 0, 0, 0);
    }

    cp._origin = "local";
    this._add(cp);
    return cp;
  }
}
