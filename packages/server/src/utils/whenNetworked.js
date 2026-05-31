export function whenNetworked(handle, cb, maxTries = 60, intervalMs = 50) {
  const attempt = (tries) => {
    if (!handle || (typeof DoesEntityExist === "function" && !DoesEntityExist(handle))) {
      return;
    }

    let netId = 0;
    try {
      netId = NetworkGetNetworkIdFromEntity(handle) || 0;
    } catch (e) {
      netId = 0;
    }

    const resolved =
      netId && typeof NetworkGetEntityFromNetworkId === "function"
        ? NetworkGetEntityFromNetworkId(netId)
        : 0;

    if (netId && resolved === handle) {
      try {
        cb(netId);
      } catch (e) {
        console.error("[bridge] whenNetworked callback failed:", e);
      }
      return;
    }

    if (tries < maxTries) {
      setTimeout(() => attempt(tries + 1), intervalMs);
    }
  };

  setTimeout(() => attempt(0), 0);
}
