import { poolStore } from "@ragemp-fivem-bridge/shared/internal";
import { safeGetEntityFromNetId } from "../../utils/netId";
import { streamEntityState } from "../streamingInternals";
import { ObjectInternals } from "../objectInternals";
import { removeFromStreamingPool } from "./streamingService";
import { onWorldScan } from "../../utils/worldScan";
import type { ObjectMp } from "../../Entities/ObjectMp";

export const LOCAL_STREAM_ID_BASE = 2_000_000_000;

const DEFAULT_OBJECT_STREAM_RANGE = 300.0;

let localObjectCounter = 0;

export function nextLocalObjectId(): number {
  return LOCAL_STREAM_ID_BASE + ++localObjectCounter;
}

export function setupObjectPool(pool: object): void {
  onNet("ragemp:objectAlpha", (netId: number, value: number) => {
    const handle = safeGetEntityFromNetId(netId);
    if (handle) {
      SetEntityAlpha(handle, value, false);
    }
  });

  if (typeof AddStateBagChangeHandler === "function") {
    AddStateBagChangeHandler(
      "ragemp:staticObject",
      null,
      (bagName: string, _key: string, value: any) => {
        if (
          !value ||
          typeof bagName !== "string" ||
          bagName.indexOf("entity:") !== 0
        )
          return;
        const netId = parseInt(bagName.slice(7), 10);
        if (!netId) return;
        freezeStaticObject(netId, 0);
      },
    );
  }

  onWorldScan(() => scanObjectStreaming(pool));
}

function isObjectStreamedIn(
  entity: ObjectMp,
  playerX: number,
  playerY: number,
  playerZ: number,
): boolean {
  const handle = entity.handle;
  if (!handle || !DoesEntityExist(handle)) return false;

  const range =
    ObjectInternals.get(entity).streamingRange || DEFAULT_OBJECT_STREAM_RANGE;
  const [ox, oy, oz] = GetEntityCoords(handle, true);
  const dx = playerX - ox;
  const dy = playerY - oy;
  const dz = playerZ - oz;
  return dx * dx + dy * dy + dz * dz <= range * range;
}

function scanObjectStreaming(pool: object): void {
  const entities = poolStore(pool).entities;
  if (entities.size === 0) return;

  const ped = PlayerPedId();
  const [px, py, pz] = GetEntityCoords(ped, true);

  entities.forEach((e) => {
    const entity = e as ObjectMp;
    const rec = ObjectInternals.get(entity);

    if (rec.isWeak || rec.removing || streamEntityState(entity).isServer)
      return;

    const streamedIn = isObjectStreamedIn(entity, px, py, pz);
    if (streamedIn === rec.streamedIn) return;

    rec.streamedIn = streamedIn;
    globalThis.mp?.events?.call(
      streamedIn ? "entityStreamIn" : "entityStreamOut",
      entity,
    );
  });
}

export function removeFromObjectPool(pool: object, id: number): void {
  const entity = poolStore(pool).entities.get(id) as ObjectMp | undefined;
  if (entity) {
    const rec = ObjectInternals.get(entity);
    if (rec.removing) return;
    rec.removing = true;
    if (rec.streamedIn && !streamEntityState(entity).isServer && !rec.isWeak) {
      globalThis.mp?.events?.call("entityStreamOut", entity);
    }
    rec.streamedIn = false;
  }
  removeFromStreamingPool(pool, id);
}

function freezeStaticObject(netId: number, tries: number): void {
  const handle = safeGetEntityFromNetId(netId);
  if (handle) {
    FreezeEntityPosition(handle, true);
    return;
  }
  if (tries < 20) {
    setTimeout(() => freezeStaticObject(netId, tries + 1), 100);
  }
}
