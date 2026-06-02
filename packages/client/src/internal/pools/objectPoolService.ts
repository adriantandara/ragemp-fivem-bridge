import { poolStore } from "@ragemp-fivem-bridge/shared/internal";
import { safeGetEntityFromNetId } from "../../utils/netId";
import { streamEntityState } from "../streamingInternals";
import { ObjectInternals } from "../objectInternals";
import { removeFromStreamingPool } from "./streamingService";
import type { ObjectMp } from "../../Entities/ObjectMp";

export const LOCAL_STREAM_ID_BASE = 2_000_000_000;

let localObjectCounter = 0;

export function nextLocalObjectId(): number {
  return LOCAL_STREAM_ID_BASE + ++localObjectCounter;
}

export function setupObjectPool(_pool: object): void {
  onNet("ragemp:objectAlpha", (netId: number, value: number) => {
    const handle = safeGetEntityFromNetId(netId);
    if (handle) {
      SetEntityAlpha(handle, value, false);
    }
  });

  if (typeof AddStateBagChangeHandler === "function") {
    AddStateBagChangeHandler("ragemp:staticObject", null, (bagName: string, _key: string, value: any) => {
      if (!value || typeof bagName !== "string" || bagName.indexOf("entity:") !== 0) return;
      const netId = parseInt(bagName.slice(7), 10);
      if (!netId) return;
      freezeStaticObject(netId, 0);
    });
  }
}

export function removeFromObjectPool(pool: object, id: number): void {
  const entity = poolStore(pool).entities.get(id) as ObjectMp | undefined;
  if (entity && !streamEntityState(entity).isServer && !ObjectInternals.get(entity).isWeak) {
    globalThis.mp?.events?._fire("entityStreamOut", entity);
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
