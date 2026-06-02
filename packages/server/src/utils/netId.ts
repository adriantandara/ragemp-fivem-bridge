export function safeGetNetworkId(handle: number): number | null {
  if (!handle || !DoesEntityExist(handle)) return 0;
  return NetworkGetNetworkIdFromEntity(handle) || 0;
}

export function safeGetEntityFromNetId(netId: number): number {
  if (!netId || netId <= 0) return 0;
  if (typeof GetEntityFromStateBagName === "function") {
    const handle = GetEntityFromStateBagName("entity:" + netId);
    if (handle && (typeof DoesEntityExist !== "function" || DoesEntityExist(handle))) return handle;
    return 0;
  }
  if (typeof NetworkGetEntityFromNetworkId !== "function") return 0;
  const handle = NetworkGetEntityFromNetworkId(netId);
  if (!handle || (typeof DoesEntityExist === "function" && !DoesEntityExist(handle))) return 0;
  return handle;
}