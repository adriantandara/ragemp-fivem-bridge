export function safeGetNetworkId(handle: number): number | null {
  if (!handle || !DoesEntityExist(handle)) return 0;
  return NetworkGetNetworkIdFromEntity(handle) || 0;
}