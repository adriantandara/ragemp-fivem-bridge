import { createUnkProxy } from "./_helpers.js";

export class GameNetworkNs {
  unk = createUnkProxy();

  isSessionActive() { return NetworkIsSessionActive(); }
  isInMpSession() { return NetworkIsInMpSession(); }
  getNumConnectedPlayers() { return NetworkGetNumConnectedPlayers(); }
  isPlayerActive(player) { return NetworkIsPlayerActive(player); }
  getPlayerFromServerId(serverId) { return GetPlayerFromServerId(serverId); }
  getServerId(player) { return GetPlayerServerId(player); }
  isHost() { return NetworkIsHost(); }

  getEntityNetworkId(entity) {
    if (!entity || !DoesEntityExist(entity)) return 0;
    if (!NetworkGetEntityIsNetworked(entity)) return 0;
    return NetworkGetNetworkIdFromEntity(entity);
  }
  getEntityFromNetworkId(netId) { return NetworkGetEntityFromNetworkId(netId); }
  doesEntityExistWithNetworkId(netId) { return NetworkDoesEntityExistWithNetworkId(netId); }
  requestControlOfEntity(entity) { return NetworkRequestControlOfEntity(entity); }
  hasControlOfEntity(entity) { return NetworkHasControlOfEntity(entity); }
  doesNetworkEntityExist(entity) { return NetworkIsEntityNetworked(entity); }

  registerEntityAsNetworked(entity) { RegisterNetworkEntityAsNetworked(entity); }
  unregisterNetworkedEntity(entity) { UnregisterNetworkEntityAsNetworked(entity); }
}
