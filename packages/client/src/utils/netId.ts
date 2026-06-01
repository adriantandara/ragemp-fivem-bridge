export function safeGetNetworkId(handle: number): number {
  if (!handle || !DoesEntityExist(handle)) return 0;
  if (!NetworkGetEntityIsNetworked(handle)) return 0;
  return NetworkGetNetworkIdFromEntity(handle);
}
