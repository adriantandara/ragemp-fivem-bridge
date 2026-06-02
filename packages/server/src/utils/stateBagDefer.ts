import { VehicleInternals } from "../internal/vehicleInternals";
import { PedInternals } from "../internal/pedInternals";
import { ObjectInternals } from "../internal/objectInternals";
import { EntityInternals } from "@ragemp-fivem-bridge/shared/internal";

type StateBagEntity = object;

interface FlushFlags {
  get varFlushScheduled(): boolean;
  set varFlushScheduled(value: boolean);
  set netIdReady(value: boolean);
}

function flagsFor(entity: StateBagEntity): FlushFlags {
  switch (EntityInternals.get(entity).kind) {
    case "ped": {
      const rec = PedInternals.get(entity as any);
      return {
        get varFlushScheduled() { return rec.varFlushScheduled; },
        set varFlushScheduled(v: boolean) { rec.varFlushScheduled = v; },
        set netIdReady(v: boolean) { rec.netIdReady = v; },
      };
    }
    case "object": {
      const rec = ObjectInternals.get(entity as any);
      return {
        get varFlushScheduled() { return rec.varFlushScheduled; },
        set varFlushScheduled(v: boolean) { rec.varFlushScheduled = v; },
        set netIdReady(v: boolean) { rec.netIdReady = v; },
      };
    }
    default: {
      const rec = VehicleInternals.get(entity as any);
      return {
        get varFlushScheduled() { return rec.varFlushScheduled; },
        set varFlushScheduled(v: boolean) { rec.varFlushScheduled = v; },
        set netIdReady(v: boolean) { rec.netIdReady = v; },
      };
    }
  }
}

function resolveNetId(handle: number): number {
  if (!handle) return 0;
  if (typeof DoesEntityExist === "function" && !DoesEntityExist(handle)) return 0;
  try {
    return NetworkGetNetworkIdFromEntity(handle) || 0;
  } catch (e) {
    return 0;
  }
}

export function scheduleStateBagFlush(entity: StateBagEntity, maxTries: number = 50, intervalMs: number = 50): void {
  const flags = flagsFor(entity);
  if (flags.varFlushScheduled) return;
  flags.varFlushScheduled = true;

  const attempt = (tries: number): void => {
    const handle = EntityInternals.get(entity).handle;
    if (!handle || (typeof DoesEntityExist === "function" && !DoesEntityExist(handle))) {
      flags.varFlushScheduled = false;
      return;
    }

    const netId = resolveNetId(handle);
    if (!netId) {
      if (tries < maxTries) {
        setTimeout(() => attempt(tries + 1), intervalMs);
      } else {
        flags.varFlushScheduled = false;
      }
      return;
    }

    flags.netIdReady = true;
    flags.varFlushScheduled = false;

    let bag: any = null;
    try {
      bag = globalThis.Entity(handle).state;
    } catch (e) {
      bag = null;
    }
    if (!bag) return;
    for (const [key, value] of EntityInternals.get(entity).variables) {
      try {
        bag.set(key, value, true);
      } catch (e) {}
    }
  };

  setTimeout(() => attempt(0), 0);
}
