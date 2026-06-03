import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { EntityInternals, hasHandle, poolAdd, removeFromPool, CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { CheckpointMp } from "../../Entities/CheckpointMp";
import { CheckpointInternals } from "../checkpointInternals";
import { isVisibleHere, onDimensionChange } from "../../utils/dimension";
import { setupNetworkedReceiver } from "./networkedReceiverService";
import type { CheckpointMpPool } from "../../Pools/CheckpointMpPool";

export function applyCheckpointVisibility(cp: CheckpointMp): void {
  if (!hasHandle(cp)) return;
  const rec = CheckpointInternals.get(cp);
  const shown = rec.visible && isVisibleHere(EntityInternals.get(cp).dimension);
  if (shown) {
    SetCheckpointRgba(cp.handle, rec.r, rec.g, rec.b, rec.a);
  } else {
    SetCheckpointRgba(cp.handle, 0, 0, 0, 0);
  }
}

function createFromData(pool: CheckpointMpPool, data: any): CheckpointMp {
  const handle = CreateCheckpoint(
    data.type,
    data.x, data.y, data.z,
    data.nextX, data.nextY, data.nextZ,
    data.radius,
    data.r, data.g, data.b, data.a,
    0
  );

  const cp = new CheckpointMp(CONSTRUCT, data.id, handle);
  const rec = CheckpointInternals.get(cp);
  rec.r = data.r;
  rec.g = data.g;
  rec.b = data.b;
  rec.a = data.a;
  rec.visible = data.visible;
  EntityInternals.get(cp).position = new Vector3(data.x, data.y, data.z);
  rec.radius = data.radius;
  EntityInternals.get(cp).dimension = data.dimension ?? 0;
  rec.origin = "server";
  poolAdd(pool, cp as any);
  applyCheckpointVisibility(cp);
  return cp;
}

export function setupCheckpointPool(pool: CheckpointMpPool): void {
  onDimensionChange(() => pool.forEach(((cp: CheckpointMp) => applyCheckpointVisibility(cp)) as any));

  setupNetworkedReceiver(pool, {
    createEvent: "ragemp:checkpointCreate",
    syncAllEvent: "ragemp:checkpointSyncAll",
    updateEvent: "ragemp:checkpointUpdate",
    destroyEvent: "ragemp:checkpointDestroy",
    create: (p, data) => createFromData(p, data),
    update: (p, id, data) => {
      const existing = p.at(id) as unknown as CheckpointMp | null;
      if (existing) {
        DeleteCheckpoint(existing.handle);
        removeFromPool(p, id);
        createFromData(p, data);
      }
    },
    destroy: (p, id) => {
      const existing = p.at(id) as unknown as CheckpointMp | null;
      if (existing) existing.destroy();
    },
  });
}

export function createCheckpoint(
  pool: CheckpointMpPool,
  id: number,
  type: number,
  position: { x: number; y: number; z: number },
  nextPosition: { x: number; y: number; z: number } | null | undefined,
  radius: number,
  options: any
): CheckpointMp {
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

  const cp = new CheckpointMp(CONSTRUCT, id, handle);
  const rec = CheckpointInternals.get(cp);
  rec.r = r;
  rec.g = g;
  rec.b = b;
  rec.a = a;
  rec.visible = options.visible ?? true;
  EntityInternals.get(cp).position = new Vector3(position.x, position.y, position.z);
  rec.radius = radius;
  EntityInternals.get(cp).dimension = options.dimension ?? 0;
  rec.origin = "local";
  poolAdd(pool, cp as any);
  applyCheckpointVisibility(cp);
  return cp;
}
