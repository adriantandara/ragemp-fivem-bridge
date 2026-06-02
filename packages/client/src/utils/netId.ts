export function safeGetNetworkId(handle: number): number {
  if (!handle || !DoesEntityExist(handle)) return 0;
  if (!NetworkGetEntityIsNetworked(handle)) return 0;
  return NetworkGetNetworkIdFromEntity(handle);
}

export function safeGetEntityFromNetId(netId: number): number {
  if (!netId || netId <= 0) return 0;
  if (typeof NetworkGetEntityFromNetworkId !== "function") return 0;
  if (typeof NetworkDoesNetworkIdExist === "function" && !NetworkDoesNetworkIdExist(netId)) return 0;
  const handle = NetworkGetEntityFromNetworkId(netId);
  if (!handle) return 0;
  if (typeof DoesEntityExist === "function" && !DoesEntityExist(handle)) return 0;
  return handle;
}
