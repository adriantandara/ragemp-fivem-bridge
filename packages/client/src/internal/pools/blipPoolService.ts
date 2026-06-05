import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { addNetworked, addLocal } from "./clientPool";
import { BlipMp } from "../../Entities/BlipMp";
import { BlipInternals } from "../blipInternals";
import { applyBlipName } from "../../utils/blipName";
import { isVisibleHere, onDimensionChange } from "../../utils/dimension";
import { setupNetworkedReceiver } from "./networkedReceiverService";
import type { BlipMpPool } from "../../Pools/BlipMpPool";

export function applyBlipVisibility(blip: BlipMp): void {
  if (!blip.handle || !DoesBlipExist(blip.handle)) return;
  const rec = BlipInternals.get(blip);
  const shown = isVisibleHere(rec.dimension);
  SetBlipAlpha(blip.handle, shown ? rec.alpha : 0);
}

function createFromData(pool: BlipMpPool, data: any): BlipMp {
  const handle = AddBlipForCoord(data.x, data.y, data.z);
  SetBlipSprite(handle, data.sprite);
  SetBlipColour(handle, data.color);
  SetBlipScale(handle, data.scale);
  SetBlipAsShortRange(handle, data.shortRange);
  applyBlipName(handle, data.name);

  const blip = new BlipMp(CONSTRUCT, data.id, handle);
  const rec = BlipInternals.get(blip);
  rec.name = data.name;
  rec.shortRange = data.shortRange;
  rec.scale = data.scale;
  rec.alpha = data.alpha ?? 255;
  rec.dimension = data.dimension ?? 0;
  applyBlipVisibility(blip);
  addNetworked(pool, blip as any);

  if (data.name) {
    setTimeout(() => {
      if (blip.handle && DoesBlipExist(blip.handle)) {
        applyBlipName(blip.handle, BlipInternals.get(blip).name);
      }
    }, 1500);
  }

  return blip;
}

export function setupBlipPool(pool: BlipMpPool): void {
  onDimensionChange(() => pool.forEach(((blip: BlipMp) => applyBlipVisibility(blip)) as any));

  setupNetworkedReceiver(pool, {
    createEvent: "ragemp:blipCreate",
    syncAllEvent: "ragemp:blipSyncAll",
    updateEvent: "ragemp:blipUpdate",
    destroyEvent: "ragemp:blipDestroy",
    create: (p, data) => createFromData(p, data),
    update: (p, id, data) => {
      const existing = p.atRemoteId(id) as unknown as BlipMp | null;
      if (existing) {
        existing.position = new Vector3(data.x, data.y, data.z);
        existing.sprite = data.sprite;
        existing.color = data.color;
        existing.scale = data.scale;
        BlipInternals.get(existing).alpha = data.alpha ?? 255;
        existing.shortRange = data.shortRange;
        existing.dimension = data.dimension ?? 0;
        if (data.name) existing.name = data.name;
      }
    },
    destroy: (p, id) => {
      const existing = p.atRemoteId(id) as unknown as BlipMp | null;
      if (existing) existing.destroy();
    },
  });

  onNet("ragemp:blipRoute", (id: number, state: boolean, color: number | null | undefined, _scale: number) => {
    const existing = pool.atRemoteId(id) as unknown as BlipMp | null;
    if (existing) {
      SetBlipRoute(existing.handle, state);
      if (state && color !== undefined && color !== null) {
        SetBlipRouteColour(existing.handle, color);
      }
    }
  });
}

export function createBlip(pool: BlipMpPool, sprite: number, position: { x: number; y: number; z: number }, options: any): BlipMp {
  const handle = AddBlipForCoord(position.x, position.y, position.z);

  SetBlipSprite(handle, sprite);
  if (options.color !== undefined) SetBlipColour(handle, options.color);
  if (options.scale !== undefined) SetBlipScale(handle, options.scale);
  if (options.shortRange !== undefined) SetBlipAsShortRange(handle, options.shortRange);

  applyBlipName(handle, options.name);

  const blip = new BlipMp(CONSTRUCT, 0, handle);
  const rec = BlipInternals.get(blip);
  rec.name = options.name ?? "";
  rec.shortRange = options.shortRange ?? false;
  rec.scale = options.scale ?? 1.0;
  rec.alpha = options.alpha ?? 255;
  rec.dimension = options.dimension ?? 0;
  applyBlipVisibility(blip);
  addLocal(pool, blip as any);

  return blip;
}
