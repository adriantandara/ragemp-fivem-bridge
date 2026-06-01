export function whenNetworked(handle: number, cb: (netId: number) => void, isAlive: () => boolean): void {
  const stillThere = () => {
    if (!handle) return false;
    if (typeof DoesEntityExist === "function" && !DoesEntityExist(handle)) return false;
    if (typeof isAlive === "function" && !isAlive()) return false;
    return true;
  };
  
  const attempt = (tries: number): void => {
    if (!stillThere()) return;

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

    const delay = tries < 20 ? 50 : tries < 60 ? 250 : 1000;
    setTimeout(() => attempt(tries + 1), delay);
  };

  setTimeout(() => attempt(0), 0);
}
