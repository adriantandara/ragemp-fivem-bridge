interface StateBagEntity {
  _handle: number;
  _varFlushScheduled: boolean;
  _netIdReady: boolean;
  _variables: Map<string, any>;
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
  if (entity._varFlushScheduled) return;
  entity._varFlushScheduled = true;

  const attempt = (tries: number): void => {
    const handle = entity._handle;
    if (!handle || (typeof DoesEntityExist === "function" && !DoesEntityExist(handle))) {
      entity._varFlushScheduled = false;
      return;
    }

    const netId = resolveNetId(handle);
    if (!netId) {
      if (tries < maxTries) {
        setTimeout(() => attempt(tries + 1), intervalMs);
      } else {
        entity._varFlushScheduled = false;
      }
      return;
    }

    entity._netIdReady = true;
    entity._varFlushScheduled = false;

    let bag: any = null;
    try {
      bag = globalThis.Entity(handle).state;
    } catch (e) {
      bag = null;
    }
    if (!bag) return;
    for (const [key, value] of entity._variables) {
      try {
        bag.set(key, value, true);
      } catch (e) {}
    }
  };

  setTimeout(() => attempt(0), 0);
}
