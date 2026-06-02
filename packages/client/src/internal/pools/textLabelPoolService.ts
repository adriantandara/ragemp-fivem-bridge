import { defineInternals, poolStore, poolAdd } from "@ragemp-fivem-bridge/shared/internal";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { TextLabelMp } from "../../Entities/TextLabelMp";
import { TextLabelInternals } from "../textLabelInternals";
import { isVisibleHere } from "../../utils/dimension";
import { framePlayerCoords } from "../../utils/frame";
import type { TextLabelMpPool } from "../../Pools/TextLabelMpPool";

interface TextLabelPoolRec {
  renderTick: number | null;
}

const TextLabelPoolInternals = defineInternals<TextLabelPoolRec>();

function createFromData(pool: TextLabelMpPool, data: any): TextLabelMp {
  const label = new TextLabelMp(data.id);
  const rec = TextLabelInternals.get(label);
  rec.text = data.text;
  rec.position = new Vector3(data.x, data.y, data.z);
  rec.r = data.r;
  rec.g = data.g;
  rec.b = data.b;
  rec.a = data.a;
  rec.drawDistance = data.drawDistance;
  rec.los = data.los;
  rec.font = data.font;
  rec.dimension = data.dimension ?? 0;
  rec.visible = true;
  poolAdd(pool, label as any);
  return label;
}

export function setupTextLabelPool(pool: TextLabelMpPool): void {
  TextLabelPoolInternals.init(pool, { renderTick: null });

  onNet("ragemp:labelCreate", (data: any) => {
    createFromData(pool, data);
  });

  onNet("ragemp:labelSyncAll", (labels: any[]) => {
    for (const data of labels) {
      if (!pool.exists(data.id)) {
        createFromData(pool, data);
      }
    }
  });

  onNet("ragemp:labelUpdate", (id: number, data: any) => {
    const existing = pool.at(id) as unknown as TextLabelMp | null;
    if (existing) {
      const rec = TextLabelInternals.get(existing);
      rec.text = data.text;
      rec.position = new Vector3(data.x, data.y, data.z);
      rec.r = data.r;
      rec.g = data.g;
      rec.b = data.b;
      rec.a = data.a;
      rec.drawDistance = data.drawDistance;
      rec.los = data.los;
      rec.font = data.font;
      rec.dimension = data.dimension ?? 0;
    }
  });

  onNet("ragemp:labelDestroy", (id: number) => {
    const existing = pool.at(id) as unknown as TextLabelMp | null;
    if (existing) {
      existing.destroy();
    }
  });

  startRendering(pool);
}

function startRendering(pool: TextLabelMpPool): void {
  const poolRec = TextLabelPoolInternals.get(pool);
  poolRec.renderTick = setTick(() => {
    const entities = poolStore(pool).entities;
    if (entities.size === 0) return;
    const coords = framePlayerCoords();
    const playerX = coords[0];
    const playerY = coords[1];
    const playerZ = coords[2];

    entities.forEach((entity) => {
      const label = entity as unknown as TextLabelMp;
      const rec = TextLabelInternals.get(label);
      if (!rec.visible) return;

      const pos = rec.position;
      if (!pos) return;

      // Cheapest, most-selective cull first: squared distance.
      const dx = playerX - pos.x;
      const dy = playerY - pos.y;
      const dz = playerZ - pos.z;
      const distSq = dx * dx + dy * dy + dz * dz;
      const drawDist = rec.drawDistance;

      if (distSq > drawDist * drawDist) return;

      // Only survivors pay for the dimension predicate.
      if (!isVisibleHere(rec.dimension)) return;

      SetDrawOrigin(pos.x, pos.y, pos.z, 0);
      SetTextFont(rec.font);
      SetTextScale(0.0, 0.35);
      SetTextColour(rec.r, rec.g, rec.b, rec.a);
      SetTextOutline();
      SetTextCentre(true);
      BeginTextCommandDisplayText("STRING");
      AddTextComponentSubstringPlayerName(rec.text);
      EndTextCommandDisplayText(0.0, 0.0);
      ClearDrawOrigin();
    });
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