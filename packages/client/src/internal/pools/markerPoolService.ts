import { defineInternals, poolStore, poolAdd, CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { MarkerMp } from "../../Entities/MarkerMp";
import { MarkerInternals } from "../markerInternals";
import { isVisibleHere } from "../../utils/dimension";
import { setupNetworkedReceiver } from "./networkedReceiverService";
import type { MarkerMpPool } from "../../Pools/MarkerMpPool";

interface MarkerPoolRec {
  hiddenSet: Set<number>;
  renderTick: number | null;
}

const MarkerPoolInternals = defineInternals<MarkerPoolRec>();

function createFromData(pool: MarkerMpPool, data: any): MarkerMp {
  const marker = new MarkerMp(CONSTRUCT, data.id, data.type);
  const rec = MarkerInternals.get(marker);
  rec.position = new Vector3(data.x, data.y, data.z);
  rec.direction = new Vector3(data.dirX, data.dirY, data.dirZ);
  rec.rotation = new Vector3(data.rotX, data.rotY, data.rotZ);
  rec.scale = data.scale;
  rec.r = data.r;
  rec.g = data.g;
  rec.b = data.b;
  rec.a = data.a;
  rec.visible = data.visible;
  rec.dimension = data.dimension ?? 0;
  poolAdd(pool, marker as any);
  return marker;
}

export function setupMarkerPool(pool: MarkerMpPool): void {
  MarkerPoolInternals.init(pool, { hiddenSet: new Set(), renderTick: null });

  setupNetworkedReceiver(pool, {
    createEvent: "ragemp:markerCreate",
    syncAllEvent: "ragemp:markerSyncAll",
    updateEvent: "ragemp:markerUpdate",
    destroyEvent: "ragemp:markerDestroy",
    create: (p, data) => createFromData(p, data),
    update: (p, id, data) => {
      const existing = p.at(id) as unknown as MarkerMp | null;
      if (existing) {
        const rec = MarkerInternals.get(existing);
        rec.position = new Vector3(data.x, data.y, data.z);
        rec.direction = new Vector3(data.dirX, data.dirY, data.dirZ);
        rec.rotation = new Vector3(data.rotX, data.rotY, data.rotZ);
        rec.scale = data.scale;
        rec.r = data.r;
        rec.g = data.g;
        rec.b = data.b;
        rec.a = data.a;
        rec.visible = data.visible;
        rec.dimension = data.dimension ?? 0;
      }
    },
    destroy: (p, id) => {
      const existing = p.at(id) as unknown as MarkerMp | null;
      if (existing) {
        MarkerPoolInternals.get(p).hiddenSet.delete(id);
        existing.destroy();
      }
    },
  });

  onNet("ragemp:markerHide", (id: number) => {
    MarkerPoolInternals.get(pool).hiddenSet.add(id);
  });

  onNet("ragemp:markerShow", (id: number) => {
    MarkerPoolInternals.get(pool).hiddenSet.delete(id);
  });

  startRendering(pool);
}

function startRendering(pool: MarkerMpPool): void {
  const MAX_DIST = 150.0;
  const poolRec = MarkerPoolInternals.get(pool);
  poolRec.renderTick = setTick(() => {
    if (poolStore(pool).entities.size === 0) return;

    const coords = GetEntityCoords(PlayerPedId(), true);
    const px = coords[0], py = coords[1], pz = coords[2];
    const hiddenSet = poolRec.hiddenSet;

    pool.forEach(((marker: MarkerMp) => {
      const rec = MarkerInternals.get(marker);
      if (!rec.visible) return;
      if (hiddenSet.has(marker.id)) return;
      if (!isVisibleHere(rec.dimension)) return;

      const pos = rec.position;
      const dx = px - pos.x, dy = py - pos.y, dz = pz - pos.z;
      const limit = rec.drawDistance || MAX_DIST;
      if (dx * dx + dy * dy + dz * dz > limit * limit) return;

      DrawMarker(
        rec.type,
        pos.x, pos.y, pos.z,
        rec.direction.x, rec.direction.y, rec.direction.z,
        rec.rotation.x, rec.rotation.y, rec.rotation.z,
        rec.scale, rec.scale, rec.scale,
        rec.r, rec.g, rec.b, rec.a,
        false, false, 2, false, null, null, false
      );
    }) as any);
  });

  if (typeof on === "function") {
    on("onResourceStop", (name: string) => {
      if (typeof GetCurrentResourceName === "function" && name !== GetCurrentResourceName()) return;
      if (poolRec.renderTick != null) {
        clearTick(poolRec.renderTick);
        poolRec.renderTick = null;
      }
    });
  }
}
