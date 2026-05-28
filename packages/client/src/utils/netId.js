export function safeGetNetworkId(handle) {
  if (!handle || !DoesEntityExist(handle)) return 0;
  if (!NetworkGetEntityIsNetworked(handle)) return 0;
  return NetworkGetNetworkIdFromEntity(handle);
}
