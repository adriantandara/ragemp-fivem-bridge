import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { CheckpointMp } from "../Entities/CheckpointMp";
import { isVisibleHere, onDimensionChange } from "../utils/dimension";

let localCheckpointIdCounter = 100000;

export class CheckpointMpPool extends Pool {
  _entities!: Map<number, CheckpointMp>;
  _add!: (entity: CheckpointMp) => void;
  _remove!: (id: number) => void;
  at!: (id: number) => CheckpointMp | null;
  exists!: (entity: number | { id: number }) => boolean;
  forEach!: (fn: (entity: CheckpointMp) => void) => void;
  toArray!: () => CheckpointMp[];

  constructor() {
    super();
    this._setupServerSync();
    onDimensionChange(() => this.forEach((cp: CheckpointMp) => this._applyVisibility(cp)));
  }

  atRemoteId(remoteId: number): CheckpointMp | null {
    return this.at(remoteId);
  }

  _applyVisibility(cp: CheckpointMp): void {
    if (!cp._handle) return;
    const shown = cp._visible && isVisibleHere(cp._dimension);
    if (shown) {
      SetCheckpointRgba(cp._handle, cp._r, cp._g, cp._b, cp._a);
    } else {
      SetCheckpointRgba(cp._handle, 0, 0, 0, 0);
    }
  }

  _createFromData(data: any): CheckpointMp {
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
    cp._dimension = data.dimension ?? 0;

    cp._origin = "server";
    this._add(cp);
    this._applyVisibility(cp);
    return cp;
  }

  _setupServerSync(): void {
    onNet("ragemp:checkpointCreate", (data: any) => {
      this._createFromData(data);
    });

    onNet("ragemp:checkpointSyncAll", (checkpoints: any[]) => {
      for (const data of checkpoints) {
        if (!this.exists(data.id)) {
          this._createFromData(data);
        }
      }
    });

    onNet("ragemp:checkpointUpdate", (id: number, data: any) => {
      const existing = this.at(id);
      if (existing) {
        DeleteCheckpoint(existing._handle);
        this._remove(id);
        this._createFromData(data);
      }
    });

    onNet("ragemp:checkpointDestroy", (id: number) => {
      const existing = this.at(id);
      if (existing) {
        existing.destroy();
      }
    });
  }

  new(type: number, position: { x: number; y: number; z: number }, nextPosition: { x: number; y: number; z: number } | null | undefined, radius: number, options: any = {}): CheckpointMp {
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
    cp._dimension = options.dimension ?? 0;

    cp._origin = "local";
    this._add(cp);
    this._applyVisibility(cp);
    return cp;
  }
}
