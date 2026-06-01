import { createUnkProxy, toVec3 } from "./_helpers.js";

export class GameNetworkNs {
  unk = createUnkProxy();

  isSessionActive(): boolean { return NetworkIsSessionActive(); }
  getNumConnectedPlayers(): number { return NetworkGetNumConnectedPlayers(); }
  isPlayerActive(player: number): boolean { return NetworkIsPlayerActive(player); }
  isHost(): boolean { return NetworkIsHost(); }

  getEntityFromNetworkId(netId: number): number { return NetworkGetEntityFromNetworkId(netId); }
  doesEntityExistWithNetworkId(netId: number): boolean { return NetworkDoesEntityExistWithNetworkId(netId); }
  requestControlOfEntity(entity: number): boolean { return NetworkRequestControlOfEntity(entity); }
  hasControlOfEntity(entity: number): boolean { return NetworkHasControlOfEntity(entity); }

  registerEntityAsNetworked(entity: number): void { RegisterNetworkEntityAsNetworked(entity); }
  unregisterNetworkedEntity(entity: number): void { UnregisterNetworkEntityAsNetworked(entity); }

  getOnlineVersion(): string { return GetOnlineVersion(); }
  refreshPlayerListStats(p0: boolean): boolean { return (RefreshPlayerListStats as any)(p0); }

  getPlayerIndex(): number { return GetPlayerIndex(); }
  participantId(): number { return ParticipantId(); }
  participantIdToInt(): number { return ParticipantIdToInt(); }

  vehToNet(vehicle: number): number { return VehToNet(vehicle); }
  pedToNet(ped: number): number { return PedToNet(ped); }
  objToNet(object: number): number { return ObjToNet(object); }
  netToVeh(netHandle: number): number { return NetToVeh(netHandle); }
  netToPed(netHandle: number): number { return NetToPed(netHandle); }
  netToObj(netHandle: number): number { return NetToObj(netHandle); }
  netToEnt(netHandle: number): number { return NetToEnt(netHandle); }

  shutdownAndLaunchSinglePlayerGame(): void { ShutdownAndLaunchSinglePlayerGame(); }
  shutdownAndLoadMostRecentSave(): boolean { return ShutdownAndLoadMostRecentSave(); }
  removeAllStickyBombsFromEntity(entity: number): void { RemoveAllStickyBombsFromEntity(entity); }

  setIdCanMigrate(netId: number, toggle: boolean): void { SetNetworkIdCanMigrate(netId, toggle); }
  setIdExistsOnAllMachines(netId: number, toggle: boolean): void { SetNetworkIdExistsOnAllMachines(netId, toggle); }
  setIdAlwaysExistsForPlayer(netId: number, player: number, toggle: boolean): void { SetNetworkIdAlwaysExistsForPlayer(netId, player, toggle); }
  setIdVisibleInCutscene(netId: number, p1: boolean, p2: boolean): void { SetNetworkIdVisibleInCutscene(netId, p1, p2); }
  setCutsceneEntities(toggle: boolean): void { SetNetworkCutsceneEntities(toggle); }
  isIdOwnedByParticipant(netId: number): boolean { return IsNetworkIdOwnedByParticipant(netId); }

  setLocalPlayerVisibleInCutscene(p0: boolean, p1: boolean): void { SetLocalPlayerVisibleInCutscene(p0, p1); }
  setLocalPlayerInvisibleLocally(p0: boolean): void { SetLocalPlayerInvisibleLocally(p0); }
  setLocalPlayerVisibleLocally(p0: boolean): void { SetLocalPlayerVisibleLocally(p0); }
  setPlayerInvisibleLocally(player: number, toggle: boolean): void { SetPlayerInvisibleLocally(player, toggle); }
  setPlayerVisibleLocally(player: number, toggle: boolean): void { SetPlayerVisibleLocally(player, toggle); }
  fadeOutLocalPlayer(p0: boolean): void { FadeOutLocalPlayer(p0); }
  isPlayerInCutscene(player: number): boolean { return IsPlayerInCutscene(player); }
  setEntityVisibleInCutscene(p0: number, p1: boolean, p2: boolean): void { SetEntityVisibleInCutscene(p0, p1, p2); }
  setEntityLocallyInvisible(entity: number): void { SetEntityLocallyInvisible(entity); }
  setEntityLocallyVisible(entity: number): void { SetEntityLocallyVisible(entity); }

  isDamageTrackerActiveOnPlayer(player: number): boolean { return IsDamageTrackerActiveOnPlayer(player); }
  activateDamageTrackerOnPlayer(player: number, toggle: boolean): void { ActivateDamageTrackerOnPlayer(player, toggle); }

  isSphereVisibleToAnotherMachine(p0: number, p1: number, p2: number, p3: number): boolean { return IsSphereVisibleToAnotherMachine(p0, p1, p2, p3); }
  isSphereVisibleToPlayer(p0: number, p1: number, p2: number, p3: number, p4: number): boolean { return IsSphereVisibleToPlayer(p0, p1, p2, p3, p4); }

  reserveMissionObjects(amount: number): void { ReserveNetworkMissionObjects(amount); }
  reserveMissionPeds(amount: number): void { ReserveNetworkMissionPeds(amount); }
  reserveMissionVehicles(amount: number): void { ReserveNetworkMissionVehicles(amount); }
  canRegisterMissionObjects(amount: number): boolean { return CanRegisterMissionObjects(amount); }
  canRegisterMissionPeds(amount: number): boolean { return CanRegisterMissionPeds(amount); }
  canRegisterMissionVehicles(amount: number): boolean { return CanRegisterMissionVehicles(amount); }
  canRegisterMissionPickups(amount: number): boolean { return CanRegisterMissionPickups(amount); }
  canRegisterMissionEntities(ped_amt: number, vehicle_amt: number, object_amt: number, pickup_amt: number): boolean { return CanRegisterMissionEntities(ped_amt, vehicle_amt, object_amt, pickup_amt); }
  getNumReservedMissionObjects(p0: boolean): number { return GetNumReservedMissionObjects(p0); }
  getNumReservedMissionPeds(p0: boolean): number { return GetNumReservedMissionPeds(p0); }
  getNumReservedMissionVehicles(p0: boolean): number { return GetNumReservedMissionVehicles(p0); }
  getNumCreatedMissionObjects(p0: boolean): number { return GetNumCreatedMissionObjects(p0); }
  getNumCreatedMissionPeds(p0: boolean): number { return GetNumCreatedMissionPeds(p0); }
  getNumCreatedMissionVehicles(p0: boolean): number { return GetNumCreatedMissionVehicles(p0); }

  getTime(): number { return GetNetworkTime(); }
  getTimeAccurate(): number { return GetNetworkTimeAccurate(); }
  hasTimeStarted(): boolean { return HasNetworkTimeStarted(); }
  getTimeOffset(timeA: number, timeB: number): number { return GetTimeOffset(timeA, timeB); }
  isTimeLessThan(timeA: number, timeB: number): boolean { return IsTimeLessThan(timeA, timeB); }
  isTimeMoreThan(timeA: number, timeB: number): boolean { return IsTimeMoreThan(timeA, timeB); }
  isTimeEqualTo(timeA: number, timeB: number): boolean { return IsTimeEqualTo(timeA, timeB); }
  getTimeDifference(timeA: number, timeB: number): number { return GetTimeDifference(timeA, timeB); }
  getTimeAsString(time: number): string { return GetTimeAsString(time); }
  getCloudTimeAsString(): string { return GetCloudTimeAsString(); }
  getCloudTimeAsInt(): number { return GetCloudTimeAsInt(); }
  convertPosixTime(posixTime: number): number { return ConvertPosixTime(posixTime); }
  getPosixTime(): number { return (GetPosixTime as any)(); }

  setVehicleRespotTimer(netId: number, time: number): void { SetNetworkVehicleRespotTimer(netId, time); }
  setVehicleAsGhost(vehicle: number, toggle: boolean): void { SetNetworkVehicleAsGhost(vehicle, toggle); }
  setLocalPlayerAsGhost(toggle: boolean): void { SetLocalPlayerAsGhost(toggle); }
  usePlayerColourInsteadOfTeamColour(toggle: boolean): void { UsePlayerColourInsteadOfTeamColour(toggle); }
  explodeVehicle(vehicle: number, isAudible: boolean, isInvisible: boolean): void { ExplodeVehicle(vehicle, isAudible, isInvisible); }

  getNumCommerceItems(): number { return GetNumCommerceItems(); }
  isCommerceDataValid(): boolean { return IsCommerceDataValid(); }
  getCommerceItemId(index: number): string { return GetCommerceItemId(index); }
  getCommerceItemName(index: number): string { return GetCommerceItemName(index); }
  getCommerceProductPrice(index: number): number { return (GetCommerceProductPrice as any)(index); }
  getCommerceItemNumCats(index: number): number { return GetCommerceItemNumCats(index); }
  getCommerceItemCat(index: number, index2: number): string { return GetCommerceItemCat(index, index2); }
  openCommerceStore(p0: string, p1: string): void { OpenCommerceStore(p0, p1); }
  isCommerceStoreOpen(): boolean { return IsCommerceStoreOpen(); }
  setStoreEnabled(toggle: boolean): void { SetStoreEnabled(toggle); }
  requestCommerceItemImage(index: number): number { return (RequestCommerceItemImage as any)(index); }
  releaseAllCommerceItemImages(): void { ReleaseAllCommerceItemImages(); }
  getCommerceItemTexturename(index: number): string { return GetCommerceItemTexturename(index); }
  isStoreAvailableToUser(): boolean { return IsStoreAvailableToUser(); }

  cloudDeleteMemberFile(p0: string): number { return CloudDeleteMemberFile(p0); }
  cloudHasRequestCompleted(handle: number): boolean { return CloudHasRequestCompleted(handle); }
  cloudDidRequestSucceed(handle: number): boolean { return CloudDidRequestSucceed(handle); }
  cloudCheckAvailability(): void { CloudCheckAvailability(); }
  cloudIsCheckingAvailability(): boolean { return CloudIsCheckingAvailability(); }
  cloudGetAvailabilityCheckResult(): number { return (CloudGetAvailabilityCheckResult as any)(); }

  ugcHasCreateFinished(): boolean { return UgcHasCreateFinished(); }
  ugcGetCreateResult(): number { return UgcGetCreateResult(); }
  ugcGetCreateContentId(): string { return UgcGetCreateContentId(); }
  ugcClearCreateResult(): void { UgcClearCreateResult(); }
  ugcQueryByContentId(contentId: string, latestVersion: boolean, contentTypeName: string): number { return (UgcQueryByContentId as any)(contentId, latestVersion, contentTypeName); }
  ugcCancelQuery(): void { UgcCancelQuery(); }
  ugcIsGetting(): boolean { return UgcIsGetting(); }
  ugcHasGetFinished(): boolean { return UgcHasGetFinished(); }
  ugcDidGetSucceed(): boolean { return (UgcDidGetSucceed as any)(); }
  ugcGetQueryResult(): number { return UgcGetQueryResult(); }
  ugcGetContentNum(): number { return UgcGetContentNum(); }
  ugcGetContentTotal(): number { return UgcGetContentTotal(); }
  ugcGetContentHash(): string { return (UgcGetContentHash as any)(); }
  ugcClearQueryResults(): void { UgcClearQueryResults(); }
  ugcGetContentUserId(p0: number): string { return UgcGetContentUserId(p0); }
  ugcGetContentUserName(p0: number): string { return UgcGetContentUserName(p0); }
  ugcGetContentCategory(p0: number): string { return (UgcGetContentCategory as any)(p0); }
  ugcGetContentId(p0: number): string { return UgcGetContentId(p0); }
  ugcGetRootContentId(p0: number): string { return UgcGetRootContentId(p0); }
  ugcGetContentName(p0: number): string { return UgcGetContentName(p0); }
  ugcGetContentDescriptionHash(p0: number): number { return UgcGetContentDescriptionHash(p0); }
  ugcGetContentPath(p0: number, p1: string): string { return (UgcGetContentPath as any)(p0, p1); }
  ugcGetContentFileVersion(p0: number, p1: string): number { return (UgcGetContentFileVersion as any)(p0, p1); }
  ugcGetContentLanguage(p0: number): string { return (UgcGetContentLanguage as any)(p0); }
  ugcGetContentIsPublished(p0: number): boolean { return UgcGetContentIsPublished(p0); }
  ugcGetContentIsVerified(p0: number): boolean { return UgcGetContentIsVerified(p0); }
  ugcGetContentRating(p0: number, p1: number): number { return UgcGetContentRating(p0, p1); }
  ugcGetContentRatingCount(p0: number, p1: number): number { return UgcGetContentRatingCount(p0, p1); }
  ugcGetContentRatingPositiveCount(p0: number, p1: number): number { return UgcGetContentRatingPositiveCount(p0, p1); }
  ugcGetContentRatingNegativeCount(p0: number, p1: number): number { return UgcGetContentRatingNegativeCount(p0, p1); }
  ugcGetContentHasPlayerRecord(p0: number): boolean { return UgcGetContentHasPlayerRecord(p0); }
  ugcGetContentHasPlayerBookmarked(p0: number): boolean { return UgcGetContentHasPlayerBookmarked(p0); }
  ugcRequestContentDataFromIndex(p0: number, p1: string): number { return (UgcRequestContentDataFromIndex as any)(p0, p1); }
  ugcRequestContentDataFromParams(contentTypeName: string, contentId: string, p2: boolean, p3: boolean, p4: boolean): number { return (UgcRequestContentDataFromParams as any)(contentTypeName, contentId, p2, p3, p4); }
  ugcRequestCachedDescription(p0: number): number { return UgcRequestCachedDescription(p0); }
  ugcGetCachedDescription(p0: number, p1: string): string { return (UgcGetCachedDescription as any)(p0, p1); }
  ugcPublish(contentId: string, baseContentId: string, contentTypeName: string): number { return (UgcPublish as any)(contentId, baseContentId, contentTypeName); }
  ugcSetBookmarked(contentId: string, bookmarked: boolean, contentTypeName: string): number { return (UgcSetBookmarked as any)(contentId, bookmarked, contentTypeName); }
  ugcHasModifyFinished(): boolean { return UgcHasModifyFinished(); }
  ugcGetModifyResult(): number { return UgcGetModifyResult(); }
  ugcClearModifyResult(): void { UgcClearModifyResult(); }
  ugcGetCreatorNum(): number { return UgcGetCreatorNum(); }
  ugcClearOfflineQuery(): void { UgcClearOfflineQuery(); }
  ugcSetQueryDataFromOffline(p0: number): void { (UgcSetQueryDataFromOffline as any)(p0); }
  ugcIsLanguageSupported(p0: number): boolean { return UgcIsLanguageSupported(p0); }

  titleTextureDownloadRequest(FilePath: string, Name: string, p2: string): number { return (TitleTextureDownloadRequest as any)(FilePath, Name, p2); }
  textureDownloadRelease(p0: number): void { TextureDownloadRelease(p0); }
  textureDownloadHasFailed(p0: number): boolean { return TextureDownloadHasFailed(p0); }
  textureDownloadGetName(p0: number): string { return TextureDownloadGetName(p0); }
  getStatusOfTextureDownload(p0: number): number { return GetStatusOfTextureDownload(p0); }

  acceptInvite(p0: number): boolean { return NetworkAcceptPresenceInvite(p0); } // unverified
  acceptPresenceInvite(p0: number): boolean { return NetworkAcceptPresenceInvite(p0); }
  accessTunableBool(tunableContext: string, tunableName: string): boolean { return NetworkAccessTunableBool(tunableContext, tunableName); }
  accessTunableBoolHash(tunableContext: number, tunableName: number): boolean { return NetworkAccessTunableBoolHash(tunableContext, tunableName); }
  accessTunableFloat(tunableContext: string, tunableName: string): number { return (NetworkAccessTunableFloat as any)(tunableContext, tunableName); }
  accessTunableFloatHash(tunableContext: number, tunableName: number): number { return (NetworkAccessTunableFloatHash as any)(tunableContext, tunableName); }
  accessTunableInt(tunableContext: string, tunableName: string): number { return (NetworkAccessTunableInt as any)(tunableContext, tunableName); }
  accessTunableIntHash(tunableContext: number, tunableName: number): number { return (NetworkAccessTunableIntHash as any)(tunableContext, tunableName); }
  actionFollowInvite(): boolean { return (NetworkActionFollowInvite as any)(); }
  activateDamageTrackerOnId(netID: number, toggle: boolean): void { ActivateDamageTrackerOnNetworkId(netID, toggle); }
  addEntityAngledArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, width: number): number { return NetworkAddEntityAngledArea(x1, y1, z1, x2, y2, z2, width); }
  addEntityArea(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number): number { return NetworkAddEntityArea(p0, p1, p2, p3, p4, p5); }
  addEntityDisplayedBoundaries(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number): number { return NetworkAddEntityArea(p0, p1, p2, p3, p4, p5); } // unverified
  addEntityToSynchronisedScene(entity: number, netScene: number, animDict: string, animName: string, speed: number, speedMulitiplier: number, flag: number): void { NetworkAddEntityToSynchronisedScene(entity, netScene, animDict, animName, speed, speedMulitiplier, flag); }
  addFollowers(p1: number): boolean { return (NetworkAddFollowers as any)(p1); }
  addFriend(message: string): boolean { return (NetworkAddFriend as any)(message); }
  addPedToSynchronisedScene(ped: number, netScene: number, animDict: string, animnName: string, speed: number, speedMultiplier: number, duration: number, flag: number, playbackRate: number, p9: boolean): void { (NetworkAddPedToSynchronisedScene as any)(ped, netScene, animDict, animnName, speed, speedMultiplier, duration, flag, playbackRate, p9); }
  allocateTunablesRegistrationDataMap(): number { return (NetworkAllocateTunablesRegistrationDataMap as any)(); } // unverified
  allowLocalEntityAttachment(entity: number, toggle: boolean): void { NetworkAllowLocalEntityAttachment(entity, toggle); } // unverified
  amIBlockedByGamer(): boolean { return (NetworkAmIBlockedByGamer as any)(); }
  amIBlockedByPlayer(player: number): boolean { return NetworkAmIBlockedByPlayer(player); } // unverified
  amIMutedByGamer(): boolean { return (NetworkAmIMutedByGamer as any)(); }
  amIMutedByPlayer(player: number): boolean { return NetworkAmIMutedByPlayer(player); } // unverified
  applyCachedPlayerHeadBlendData(ped: number, player: number): boolean { return NetworkApplyCachedPlayerHeadBlendData(ped, player); }
  applyPedScarData(ped: number, p1: number): void { NetworkApplyPedScarData(ped, p1); }
  applyTransitionParameter(p0: number, p1: number): void { NetworkApplyTransitionParameter(p0, p1); }
  applyTransitionParameterString(p0: number, string: string, p2: boolean): void { NetworkApplyTransitionParameterString(p0, string, p2); }
  applyVoiceProximityOverride(x: number, y: number, z: number): void { NetworkApplyVoiceProximityOverride(x, y, z); }
  areHandlesTheSame(): boolean { return (NetworkAreHandlesTheSame as any)(); }
  areSocialClubPoliciesCurrent(): boolean { return NetworkAreSocialClubPoliciesCurrent(); }
  areTransitionDetailsValid(p0: number): boolean { return NetworkAreTransitionDetailsValid(p0); }
  attachSynchronisedSceneToEntity(netScene: number, entity: number, bone: number): void { NetworkAttachSynchronisedSceneToEntity(netScene, entity, bone); }
  badSportPlayerLeftDetected(event: number, amountReceived: number): boolean { return (BadSportPlayerLeftDetected as any)(event, amountReceived); }
  bail(): void { NetworkBail(); }
  bailTransition(): void { NetworkBailTransition(); }
  blockInvites(toggle: boolean): void { NetworkBlockInvites(toggle); }
  blockJoinQueueInvites(toggle: boolean): void { NetworkBlockJoinQueueInvites(toggle); }
  blockKickedPlayers(p0: boolean): void { NetworkBlockKickedPlayers(p0); } // unverified
  cacheLocalPlayerHeadBlendData(): void { NetworkCacheLocalPlayerHeadBlendData(); }
  canAccessMultiplayer(): boolean { return (NetworkCanAccessMultiplayer as any)(); }
  canBail(): boolean { return NetworkCanBail(); }
  canCommunicateWithGamer(): boolean { return (NetworkCanCommunicateWithGamer as any)(); }
  canCommunicateWithGamer2(): boolean { return NetworkCanCommunicateWithGamer2(); } // unverified
  canEnterMultiplayer(): boolean { return NetworkCanEnterMultiplayer(); }
  canGamerPlayMultiplayerWithMe(): boolean { return (NetworkCanGamerPlayMultiplayerWithMe as any)(); }
  canPlayMultiplayerWithGamer(): boolean { return (NetworkCanPlayMultiplayerWithGamer as any)(); }
  canSessionEnd(): boolean { return NetworkCanSessionEnd(); }
  canSetWaypoint(): boolean { return NetworkCanSetWaypoint(); }
  canViewGamerUserContent(): boolean { return (NetworkCanViewGamerUserContent as any)(); }
  cancelRespawnSearch(): void { NetworkCancelRespawnSearch(); }
  changeTransitionSlots(p0: number, p1: number): void { NetworkChangeTransitionSlots(p0, p1); }
  checkCommunicationPrivileges(p0: number, p1: boolean, p2: boolean): boolean { return (NetworkCheckCommunicationPrivileges as any)(p0, p1, p2); }
  checkDataManagerSucceededForHandle(p0: number): boolean { return (NetworkCheckDataManagerSucceededForHandle as any)(p0); }
  checkUserContentPrivileges(p0: number, p1: boolean, p2: boolean): boolean { return (NetworkCheckUserContentPrivileges as any)(p0, p1, p2); }
  clanAnimation(animDict: string, animName: string): boolean { return NetworkClanAnimation(animDict, animName); } // unverified
  clanDownloadMembership(): boolean { return (NetworkClanDownloadMembership as any)(); }
  clanDownloadMembershipPending(): boolean { return (NetworkClanDownloadMembershipPending as any)(); }
  clanGetEmblemTxdName(): string { return (NetworkClanGetEmblemTxdName as any)(); }
  clanGetLocalMembershipsCount(): number { return NetworkClanGetLocalMembershipsCount(); }
  clanGetMembership(p2: number): any { return NetworkClanGetMembership(p2); }
  clanGetMembershipCount(): number { return (NetworkClanGetMembershipCount as any)(); }
  clanGetMembershipDesc(p1: number): any { return NetworkClanGetMembershipDesc(p1); }
  clanGetMembershipValid(p1: number): boolean { return (NetworkClanGetMembershipValid as any)(p1); }
  clanGetUiFormattedTag(bufferSize: number): string { return (NetworkClanGetUiFormattedTag as any)(bufferSize); }
  clanIsEmblemReady(p0: number): boolean { return (NetworkClanIsEmblemReady as any)(p0); }
  clanIsRockstarClan(bufferSize: number): boolean { return (NetworkClanIsRockstarClan as any)(bufferSize); }
  clanJoin(clanDesc: any): boolean { return NetworkClanJoin(clanDesc); }
  clanPlayerGetDesc(bufferSize: number): any { return NetworkClanPlayerGetDesc(bufferSize); }
  clanPlayerIsActive(): boolean { return (NetworkClanPlayerIsActive as any)(); }
  clanReleaseEmblem(p0: number): void { NetworkClanReleaseEmblem(p0); }
  clanRemoteMembershipsAreInCache(): boolean { return (NetworkClanRemoteMembershipsAreInCache as any)(); }
  clanRequestEmblem(p0: number): boolean { return NetworkClanRequestEmblem(p0); }
  clanServiceIsValid(): boolean { return NetworkClanServiceIsValid(); }
  clearClockTimeOverride(): void { NetworkClearClockTimeOverride(); }
  clearFollowInvite(): boolean { return (NetworkClearFollowInvite as any)(); }
  clearFollowers(): void { NetworkClearFollowers(); }
  clearFoundGamers(): void { NetworkClearFoundGamers(); }
  clearGetGamerStatus(): void { NetworkClearGetGamerStatus(); }
  clearLaunchParams(): void { NetworkClearLaunchParams(); } // unverified
  clearPropertyId(): void { NetworkClearPropertyId(); } // unverified
  clearTransitionCreatorHandle(): void { NetworkClearTransitionCreatorHandle(); }
  clearVoiceChannel(): void { NetworkClearVoiceChannel(); }
  clearVoiceProximityOverride(): void { NetworkClearVoiceProximityOverride(); }
  closeTransitionMatchmaking(): void { NetworkCloseTransitionMatchmaking(); }
  concealEntity(entity: number, toggle: boolean): void { NetworkConcealEntity(entity, toggle); }
  concealPlayer(player: number, toggle: boolean, p2: boolean): void { NetworkConcealPlayer(player, toggle, p2); }
  convertSynchronisedSceneToSynchronizedScene(netScene: number): number { return NetworkConvertSynchronisedSceneToSynchronizedScene(netScene); } // unverified
  createSynchronisedScene(x: number, y: number, z: number, xRot: number, yRot: number, zRot: number, rotationOrder: number, useOcclusionPortal: boolean, looped: boolean, p9: number, animTime: number, p11: number): number { return NetworkCreateSynchronisedScene(x, y, z, xRot, yRot, zRot, rotationOrder, useOcclusionPortal, looped, p9, animTime, p11); }
  disableInvincibleFlashing(player: number, toggle: boolean): void { NetworkDisableInvincibleFlashing(player, toggle); }
  disableLeaveRemotePedBehind(toggle: boolean): void { NetworkDisableLeaveRemotePedBehind(toggle); }
  disableProximityMigration(netID: number): void { NetworkDisableProximityMigration(netID); }
  doTransitionQuickmatch(p0: number, p1: number, p2: number, p3: number): boolean { return NetworkDoTransitionQuickmatch(p0, p1, p2, p3); }
  doTransitionQuickmatchAsync(p0: number, p1: number, p2: number, p3: number): boolean { return NetworkDoTransitionQuickmatchAsync(p0, p1, p2, p3); }
  doTransitionQuickmatchWithGroup(p0: number, p1: number, p2: number, p3: number, p5: number, p6: number, p7: number): boolean { return (NetworkDoTransitionQuickmatchWithGroup as any)(p0, p1, p2, p3, p5, p6, p7); }
  doTransitionToFreemode(p1: number, p2: number, players: number, p4: number): boolean { return (NetworkDoTransitionToFreemode as any)(p1, p2, players, p4); }
  doTransitionToGame(p0: number, maxPlayers: number): boolean { return (NetworkDoTransitionToGame as any)(p0, maxPlayers); }
  doTransitionToNewFreemode(players: number, p3: number, p4: number, p5: number): boolean { return (NetworkDoTransitionToNewFreemode as any)(players, p3, p4, p5); }
  doTransitionToNewGame(p0: number, maxPlayers: number, p2: number): boolean { return (NetworkDoTransitionToNewGame as any)(p0, maxPlayers, p2); }
  doesNetworkIdExist(netId: number): boolean { return NetworkDoesNetworkIdExist(netId); }
  doesTunableExist(tunableContext: string, tunableName: string): boolean { return NetworkDoesTunableExist(tunableContext, tunableName); }
  doesTunableExistHash(tunableContext: number, tunableName: number): boolean { return NetworkDoesTunableExistHash(tunableContext, tunableName); }
  endTutorialSession(): void { NetworkEndTutorialSession(); }
  entityAreaDoesExist(areaHandle: number): boolean { return NetworkEntityAreaDoesExist(areaHandle); }
  entityAreaIsOccupied(areaHandle: number): boolean { return NetworkEntityAreaIsOccupied(areaHandle); }
  facebookDoUnkCheck(): boolean { return FacebookDoUnkCheck(); } // unverified
  facebookIsAvailable(): boolean { return FacebookIsAvailable(); } // unverified
  facebookIsSendingData(): boolean { return FacebookIsSendingData(); } // unverified
  facebookSetCreateCharacterComplete(): boolean { return FacebookPostCreateCharacter(); }
  facebookSetHeistComplete(heistName: string, cashEarned: number, xpEarned: number): boolean { return FacebookPostCompletedHeist(heistName, cashEarned, xpEarned); }
  facebookSetMilestoneComplete(milestoneId: number): boolean { return FacebookPostCompletedMilestone(milestoneId); }
  fadeInEntity(entity: number, state: boolean): void { NetworkFadeInEntity(entity, state); }
  fadeOutEntity(entity: number, normal: boolean, slow: boolean): void { NetworkFadeOutEntity(entity, normal, slow); }
  filloutPmPlayerList(p1: number, p2: number): boolean { return (FilloutPmPlayerList as any)(p1, p2); }
  filloutPmPlayerListWithNames(p2: number, p3: number): boolean { return (FilloutPmPlayerListWithNames as any)(p2, p3); }
  findGamersInCrew(p0: any): boolean { return NetworkFindGamersInCrew(p0); }
  findMatchedGamers(p0: any, p1: any, p2: any, p3: any): boolean { return NetworkFindMatchedGamers(p0, p1, p2, p3); }
  finishBroadcastingData(): void { NetworkFinishBroadcastingData(); }
  forceLocalUseOfSyncedSceneCamera(netScene: number): void { NetworkForceLocalUseOfSyncedSceneCamera(netScene); }
  gamerHasHeadset(): boolean { return (NetworkGamerHasHeadset as any)(); }
  gamertagFromHandlePending(): boolean { return NetworkGamertagFromHandlePending(); }
  gamertagFromHandleStart(): boolean { return (NetworkGamertagFromHandleStart as any)(); }
  gamertagFromHandleSucceeded(): boolean { return NetworkGamertagFromHandleSucceeded(); }
  getActivityPlayerNum(p0: number): number { return (NetworkGetActivityPlayerNum as any)(p0); }
  getAgeGroup(): number { return NetworkGetAgeGroup(); }
  getContentModifierListId(contentHash: number): number { return NetworkGetContentModifierListId(contentHash); }
  getCurrentlySelectedGamerHandleFromInviteMenu(p0: number): any { return NetworkGetCurrentlySelectedGamerHandleFromInviteMenu(p0); }
  getDestroyerOfEntity(p0: number, p1: any): number { return (NetworkGetDestroyerOfEntity as any)(p0, p1); }
  getDestroyerOfNetworkId(netId: number): { weaponHash: number; result: number } { return (NetworkGetDestroyerOfNetworkId as any)(netId); }
  getDisplaynamesFromHandles(p0: any, p1: any, p2: any): boolean { return (NetworkGetDisplaynamesFromHandles as any)(p0, p1, p2); }
  getEntityIsLocal(entity: number): boolean { return NetworkGetEntityIsLocal(entity); }
  getEntityIsNetworked(entity: number): boolean { return NetworkGetEntityIsNetworked(entity); }
  getEntityKillerOfPlayer(player: number): { weaponHash: number; result: number } { return (NetworkGetEntityKillerOfPlayer as any)(player); }
  getEntityNetScriptId(entity: number): number { return NetworkGetEntityNetScriptId(entity); } // unverified
  getFoundGamer(p1: number): any { return NetworkGetFoundGamer(p1); }
  getFriendCount(): number { return NetworkGetFriendCount(); }
  getFriendName(friendIndex: number): string { return NetworkGetFriendName(friendIndex); }
  getFriendNameFromIndex(friendIndex: number): string { return NetworkGetFriendName(friendIndex); } // unverified
  getGamerStatus(): number { return (NetworkGetGamerStatusFromQueue as any)(); }
  getGamerStatusResult(p1: number): any { return NetworkGetGamerStatusResult(p1); }
  getGamertagFromHandle(networkHandle: number): any { return NetworkGetGamertagFromHandle(networkHandle); }
  getGlobalMultiplayerClock(): { hours: number; minutes: number; seconds: number } { return (NetworkGetGlobalMultiplayerClock as any)(); }
  getHostOfScript(scriptName: string, p1: number, p2: number): number { return NetworkGetHostOfScript(scriptName, p1, p2); }
  getHostOfThisScript(): number { return NetworkGetHostOfThisScript(); }
  getLocalHandle(bufferSize: number): any { return NetworkGetLocalHandle(bufferSize); }
  getMaxFriends(): number { return NetworkGetMaxFriends(); }
  getMaxNumObjects(): number { return GetMaxNumNetworkObjects(); }
  getMaxNumParticipants(): number { return NetworkGetMaxNumParticipants(); }
  getMaxNumPeds(): number { return GetMaxNumNetworkPeds(); }
  getMaxNumPickups(): number { return GetMaxNumNetworkPickups(); }
  getMaxNumVehicles(): number { return GetMaxNumNetworkVehicles(); }
  getNetworkIdFromEntity(entity: number): number { return NetworkGetNetworkIdFromEntity(entity); }
  getNumBodyTrackers(): number { return NetworkGetNumberBodyTrackerHits(); }
  getNumFoundGamers(): number { return NetworkGetNumFoundGamers(); }
  getNumParticipants(): number { return NetworkGetNumParticipants(); }
  getNumPresenceInvites(): number { return NetworkGetNumPresenceInvites(); }
  getNumScriptParticipants(p1: number, p2: number): { p0: number; result: number } { return (NetworkGetNumScriptParticipants as any)(p1, p2); }
  getNumUnackedForPlayer(player: number): number { return NetworkGetNumUnackedReliables(player); }
  getOldestResendCountForPlayer(player: number): number { return NetworkGetHighestReliableResendCount(player); }
  getParticipantIndex(index: number): number { return NetworkGetParticipantIndex(index); }
  getPlatformPartyMembers(dataSize: number): { data: number; result: number } { return (NetworkGetPlatformPartyMembers as any)(dataSize); }
  getPlatformPartyUnk(): number { return NetworkGetPlatformPartyMemberCount(); }
  getPlayerCoords(player: number): import('@ragemp-fivem-bridge/shared').Vector3 { return toVec3(NetworkGetPlayerCoords(player)); } // unverified
  getPlayerFromGamerHandle(): number { return (NetworkGetPlayerFromGamerHandle as any)(); }
  getPlayerIndexFromPed(ped: number): number { return NetworkGetPlayerIndexFromPed(ped); }
  getPlayerLoudness(player: number): number { return NetworkGetPlayerLoudness(player); }
  getPlayerOwnsWaypoint(player: number): boolean { return NetworkGetPlayerOwnsWaypoint(player); }
  getPlayerTutorialSessionInstance(player: number): number { return NetworkGetPlayerTutorialSessionInstance(player); }
  getPresenceInviteContentId(p0: number): string { return NetworkGetPresenceInviteContentId(p0); }
  getPresenceInviteFromAdmin(p0: number): boolean { return NetworkGetPresenceInviteFromAdmin(p0); }
  getPresenceInviteHandle(p0: number): any { return NetworkGetPresenceInviteHandle(p0); }
  getPresenceInviteId(p0: number): number { return NetworkGetPresenceInviteId(p0); }
  getPresenceInviteInviter(p0: number): any { return NetworkGetPresenceInviteInviter(p0); }
  getPresenceInviteIsTournament(p0: number): boolean { return NetworkGetPresenceInviteIsTournament(p0); }
  getPresenceInvitePlaylistCurrent(p0: number): number { return NetworkGetPresenceInvitePlaylistCurrent(p0); }
  getPresenceInvitePlaylistLength(p0: number): number { return NetworkGetPresenceInvitePlaylistLength(p0); }
  getPresenceInviteSessionId(p0: number): number { return NetworkGetPresenceInviteSessionId(p0); }
  getPrimaryClanDataCancel(): void { NetworkGetPrimaryClanDataCancel(); }
  getPrimaryClanDataClear(): boolean { return (NetworkGetPrimaryClanDataClear as any)(); }
  getPrimaryClanDataNew(): boolean { return (NetworkGetPrimaryClanDataNew as any)(); }
  getPrimaryClanDataPending(): boolean { return (NetworkGetPrimaryClanDataPending as any)(); }
  getPrimaryClanDataStart(p1: number): boolean { return (NetworkGetPrimaryClanDataStart as any)(p1); }
  getPrimaryClanDataSuccess(): boolean { return (NetworkGetPrimaryClanDataSuccess as any)(); }
  getRandomInt(): number { return NetworkGetRandomInt(); }
  getRandomIntRanged(rangeStart: number, rangeEnd: number): number { return NetworkGetRandomIntRanged(rangeStart, rangeEnd); }
  getRespawnResult(randomInt: number): number { return (NetworkGetRespawnResult as any)(randomInt); }
  getRespawnResultFlags(p0: number): number { return NetworkGetRespawnResultFlags(p0); }
  getRosPrivilege24(): boolean { return NetworkGetRosPrivilege24(); } // unverified
  getRosPrivilege25(): boolean { return NetworkGetRosPrivilege25(); } // unverified
  getRosPrivilege9(): boolean { return NetworkGetRosPrivilege9(); } // unverified
  getScriptStatus(): number { return NetworkGetScriptStatus(); }
  getTalkerProximity(): number { return NetworkGetTalkerProximity(); }
  getTargetingMode(): number { return GetPlayerTargetingMode(); } // unverified
  getThisScriptIsNetworkScript(): boolean { return NetworkGetThisScriptIsNetworkScript(); }
  getTimeoutTime(): number { return NetworkGetTimeoutTime(); }
  getTotalNumPlayers(): number { return NetworkGetTotalNumPlayers(); }
  getTransitionHost(): number { return (NetworkGetTransitionHost as any)(); }
  getTransitionMembers(dataCount: number): { data: number; result: number } { return (NetworkGetTransitionMembers as any)(dataCount); }
  getTunableCloudCrc(): number { return NetworkGetTunableCloudCrc(); }
  getUnreliableResendCountForPlayer(player: number): number { return NetworkGetUnreliableResendCount(player); }
  handleFromFriend(friendIndex: number, bufferSize: number): any { return NetworkHandleFromFriend(friendIndex, bufferSize); }
  handleFromMemberId(memberId: string, bufferSize: number): any { return NetworkHandleFromMemberId(memberId, bufferSize); }
  handleFromPlayer(player: number, bufferSize: number): any { return NetworkHandleFromPlayer(player, bufferSize); }
  handleFromUserId(userId: string, bufferSize: number): any { return NetworkHandleFromUserId(userId, bufferSize); }
  hasAgeRestrictedProfile(): boolean { return NetworkHasAgeRestrictedProfile(); } // unverified
  hasCachedPlayerHeadBlendData(player: number): boolean { return NetworkHasCachedPlayerHeadBlendData(player); }
  hasControlOfDoor(doorHash: number): boolean { return NetworkHasControlOfDoor(doorHash); }
  hasControlOfNetworkId(netId: number): boolean { return NetworkHasControlOfNetworkId(netId); }
  hasControlOfPickup(pickup: number): boolean { return NetworkHasControlOfPickup(pickup); }
  hasEntityBeenRegisteredWithThisThread(entity: number): boolean { return NetworkHasEntityBeenRegisteredWithThisThread(entity); }
  hasFollowInvite(): boolean { return NetworkHasFollowInvite(); }
  hasGameBeenAltered(): boolean { return NetworkHasGameBeenAltered(); } // unverified
  hasHeadset(): boolean { return NetworkHasHeadset(); }
  hasInvitedGamer(): boolean { return (NetworkHasInvitedGamer as any)(); }
  hasInvitedGamerToTransition(): boolean { return (NetworkHasInvitedGamerToTransition as any)(); }
  hasPendingInvite(): boolean { return NetworkHasPendingInvite(); }
  hasPlayerStartedTransition(player: number): boolean { return NetworkHasPlayerStartedTransition(player); }
  hasReceivedHostBroadcastData(): boolean { return NetworkHasReceivedHostBroadcastData(); }
  hasRosPrivilege(index: number): boolean { return NetworkHasRosPrivilege(index); }
  hasRosPrivilegeEndDate(privilege: number): boolean { return (NetworkHasRosPrivilegeEndDate as any)(privilege); }
  hasSocialClubAccount(): boolean { return NetworkHasSocialClubAccount(); }
  hasSocialNetworkingSharingPriv(): boolean { return NetworkHasSocialNetworkingSharingPriv(); }
  hasValidRosCredentials(): boolean { return NetworkHasValidRosCredentials(); }
  hasViewGamerUserContentResult(): boolean { return (NetworkHasViewGamerUserContentResult as any)(); }
  hashFromGamerHandle(): { networkHandle: number; result: number } { return (NetworkHashFromGamerHandle as any)(); }
  hashFromPlayerHandle(player: number): number { return NetworkHashFromPlayerHandle(player); }
  haveCommunicationPrivileges(p0: number, player: number): boolean { return NetworkHaveCommunicationPrivileges(p0, player); }
  haveOnlinePrivilege2(): boolean { return NetworkHaveOnlinePrivilege2(); } // unverified
  haveOnlinePrivileges(): boolean { return NetworkHaveOnlinePrivileges(); }
  haveRosBannedPriv(): boolean { return NetworkHaveRosBannedPriv(); }
  haveRosCreateTicketPriv(): boolean { return NetworkHaveRosCreateTicketPriv(); }
  haveRosLeaderboardWritePriv(): boolean { return NetworkHaveRosLeaderboardWritePriv(); }
  haveRosMultiplayerPriv(): boolean { return NetworkHaveRosMultiplayerPriv(); }
  haveRosSocialClubPriv(): boolean { return NetworkHaveRosSocialClubPriv(); }
  haveUserContentPrivileges(p0: number): boolean { return NetworkHaveUserContentPrivileges(p0); }
  hostTransition(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number): boolean { return (NetworkHostTransition as any)(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9); }
  inviteGamers(p1: any): boolean { return (NetworkInviteGamers as any)(p1); }
  inviteGamersToTransition(p1: any): boolean { return (NetworkInviteGamersToTransition as any)(p1); }
  isActivitySession(): boolean { return NetworkIsActivitySession(); }
  isActivitySpectator(): boolean { return NetworkIsActivitySpectator(); }
  isActivitySpectatorFromHandle(): boolean { return (NetworkIsActivitySpectatorFromHandle as any)(); }
  isAddingFriend(): boolean { return (NetworkIsAddingFriend as any)(); }
  isCableConnected(): boolean { return NetworkIsCableConnected(); }
  isChattingInPlatformParty(): boolean { return (NetworkIsChattingInPlatformParty as any)(); }
  isClanMembershipFinishedDownloading(): boolean { return (NetworkClanDownloadMembershipPending as any)(); } // unverified
  isClockTimeOverridden(): boolean { return NetworkIsClockTimeOverridden(); }
  isCloudAvailable(): boolean { return NetworkIsCloudAvailable(); }
  isCloudBackgroundScriptRequestPending(): boolean { return NetworkIsCloudBackgroundScriptRequestPending(); }
  isDamageTrackerActiveOnId(netID: number): boolean { return IsDamageTrackerActiveOnNetworkId(netID); }
  isDoorNetworked(doorHash: number): boolean { return NetworkIsDoorNetworked(doorHash); }
  isEntityConcealed(entity: number): boolean { return NetworkIsEntityConcealed(entity); }
  isEntityFading(entity: number): boolean { return NetworkIsEntityFading(entity); }
  isEntityGhostedToLocalPlayer(entity: number): boolean { return NetworkIsEntityGhostedToLocalPlayer(entity); } // unverified
  isFindingGamers(): boolean { return NetworkIsFindingGamers(); }
  isFriend(): boolean { return (NetworkIsFriend as any)(); }
  isFriendHandleOnline(): boolean { return (NetworkIsFriendHandleOnline as any)(); }
  isFriendInMultiplayer(friendName: string): boolean { return NetworkIsFriendInMultiplayer(friendName); }
  isFriendInSameTitle(friendName: string): boolean { return NetworkIsFriendInSameTitle(friendName); }
  isFriendIndexOnline(friendIndex: number): boolean { return NetworkIsFriendIndexOnline(friendIndex); }
  isFriendOnline(name: string): boolean { return NetworkIsFriendOnline(name); }
  isGameInProgress(): boolean { return NetworkIsGameInProgress(); }
  isGamerBlockedByMe(): boolean { return (NetworkIsGamerBlockedByMe as any)(); }
  isGamerInMySession(): boolean { return (NetworkIsGamerInMySession as any)(); }
  isGamerMutedByMe(): boolean { return (NetworkIsGamerMutedByMe as any)(); }
  isGamerTalking(): boolean { return (NetworkIsGamerTalking as any)(); }
  isHandleValid(bufferSize: number): boolean { return (NetworkIsHandleValid as any)(bufferSize); }
  isHostOfThisScript(): boolean { return NetworkIsHostOfThisScript(); }
  isInMpCutscene(): boolean { return NetworkIsInMpCutscene(); }
  isInPlatformParty(): boolean { return NetworkIsInPlatformParty(); }
  isInPlatformPartyChat(): boolean { return NetworkIsInPlatformPartyChat(); }
  isInSession(): boolean { return NetworkIsInSession(); }
  isInSpectatorMode(): boolean { return NetworkIsInSpectatorMode(); }
  isInTransition(): boolean { return NetworkIsInTransition(); }
  isInTutorialSession(): boolean { return NetworkIsInTutorialSession(); }
  isInactiveProfile(): boolean { return (NetworkIsInactiveProfile as any)(); }
  isLocalPlayerInvincible(): boolean { return NetworkIsLocalPlayerInvincible(); }
  isLocalTalking(): boolean { return NetworkIsLocalTalking(); } // unverified
  isMultiplayerDisabled(): boolean { return NetworkIsMultiplayerDisabled(); }
  isOfflineInvitePending(): boolean { return NetworkIsOfflineInvitePending(); }
  isParticipantActive(p0: number): boolean { return NetworkIsParticipantActive(p0); }
  isPendingFriend(p0: any): boolean { return (NetworkIsPendingFriend as any)(p0); }
  isPlayerAParticipant(player: number): boolean { return NetworkIsPlayerAParticipant(player); }
  isPlayerAParticipantOnScript(player1: number, script: string, player2: number): boolean { return NetworkIsPlayerAParticipantOnScript(player1, script, player2); }
  isPlayerBlockedByMe(player: number): boolean { return NetworkIsPlayerBlockedByMe(player); }
  isPlayerConcealed(player: number): boolean { return NetworkIsPlayerConcealed(player); }
  isPlayerConnected(player: number): boolean { return NetworkIsPlayerConnected(player); }
  isPlayerEqualToIndex(player: number, index: number): boolean { return NetworkIsPlayerEqualToIndex(player, index); } // unverified
  isPlayerFading(player: number): boolean { return NetworkIsPlayerFading(player); }
  isPlayerInMpCutscene(player: number): boolean { return NetworkIsPlayerInMpCutscene(player); }
  isPlayerMutedByMe(player: number): boolean { return NetworkIsPlayerMutedByMe(player); }
  isPlayerTalking(player: number): boolean { return NetworkIsPlayerTalking(player); }
  isScriptActive(scriptName: string, player: number, p2: boolean, p3: number): boolean { return NetworkIsScriptActive(scriptName, player, p2, p3); }
  isScriptActiveByHash(scriptHash: number, p1: number, p2: boolean, p3: number): boolean { return NetworkIsScriptActiveByHash(scriptHash, p1, p2, p3); }
  isSessionBusy(): boolean { return NetworkIsSessionBusy(); }
  isSessionStarted(): boolean { return NetworkIsSessionStarted(); }
  isSignedIn(): boolean { return NetworkIsSignedIn(); }
  isSignedOnline(): boolean { return NetworkIsSignedOnline(); }
  isTextChatActive(): boolean { return NetworkTextChatIsTyping(); } // unverified
  isThisScriptMarked(p0: number, p1: number, p2: number): boolean { return (NetworkIsThisScriptMarked as any)(p0, p1, p2); } // unverified
  isTransitionBusy(): boolean { return NetworkIsTransitionBusy(); }
  isTransitionClosedCrew(): boolean { return NetworkIsTransitionClosedCrew(); }
  isTransitionClosedFriends(): boolean { return NetworkIsTransitionClosedFriends(); }
  isTransitionHost(): boolean { return NetworkIsTransitionHost(); }
  isTransitionHostFromHandle(): boolean { return (NetworkIsTransitionHostFromHandle as any)(); }
  isTransitionMatchmaking(): boolean { return NetworkIsTransitionMatchmaking(); }
  isTransitionOpenToMatchmaking(): boolean { return NetworkIsTransitionOpenToMatchmaking(); }
  isTransitionPrivate(): boolean { return NetworkIsTransitionPrivate(); }
  isTransitionSolo(): boolean { return NetworkIsTransitionSolo(); }
  isTransitionStarted(): boolean { return NetworkIsTransitionStarted(); }
  isTransitionToGame(): boolean { return NetworkIsTransitionToGame(); }
  isTransitionVisibilityLocked(): boolean { return NetworkIsTransitionVisibilityLocked(); }
  isTunableCloudRequestPending(): boolean { return NetworkIsTunableCloudRequestPending(); }
  isTutorialSessionChangePending(): boolean { return NetworkIsTutorialSessionChangePending(); }
  joinGroupActivity(): boolean { return (NetworkJoinGroupActivity as any)(); }
  joinPreviouslyFailedSession(): boolean { return NetworkJoinPreviouslyFailedSession(); }
  joinPreviouslyFailedTransition(): boolean { return NetworkJoinPreviouslyFailedTransition(); }
  joinTransition(player: number): boolean { return NetworkJoinTransition(player); }
  launchTransition(): boolean { return NetworkLaunchTransition(); }
  leaveTransition(): boolean { return NetworkLeaveTransition(); }
  markTransitionGamerAsFullyJoined(): boolean { return (NetworkMarkTransitionGamerAsFullyJoined as any)(); }
  memberIdFromGamerHandle(): string { return (NetworkMemberIdFromGamerHandle as any)(); }
  openTransitionMatchmaking(): void { NetworkOpenTransitionMatchmaking(); }
  overrideChatRestrictions(player: number, toggle: boolean): void { NetworkOverrideChatRestrictions(player, toggle); }
  overrideClockMillisecondsPerGameMinute(ms: number): void { NetworkOverrideClockMillisecondsPerGameMinute(ms); } // unverified
  overrideClockTime(hours: number, minutes: number, seconds: number): void { NetworkOverrideClockTime(hours, minutes, seconds); }
  overrideCoordsAndHeading(entity: number, x: number, y: number, z: number, heading: number): void { NetworkOverrideCoordsAndHeading(entity, x, y, z, heading); }
  overrideReceiveRestrictions(player: number, toggle: boolean): void { NetworkOverrideReceiveRestrictions(player, toggle); }
  overrideReceiveRestrictionsAll(toggle: boolean): void { NetworkOverrideReceiveRestrictionsAll(toggle); }
  overrideSendRestrictions(player: number, toggle: boolean): void { NetworkOverrideSendRestrictions(player, toggle); }
  overrideSendRestrictionsAll(toggle: boolean): void { NetworkOverrideSendRestrictionsAll(toggle); }
  overrideTeamRestrictions(team: number, toggle: boolean): void { NetworkOverrideTeamRestrictions(team, toggle); }
  overrideTransitionChat(p0: boolean): void { NetworkOverrideTransitionChat(p0); }
  playerGetCheaterReason(): number { return NetworkPlayerGetCheaterReason(); }
  playerGetName(player: number): string { return NetworkPlayerGetName(player); }
  playerGetUserid(player: number): string { return (NetworkPlayerGetUserid as any)(player); }
  playerHasHeadset(player: number): boolean { return NetworkPlayerHasHeadset(player); }
  playerIndexIsCheater(player: number): boolean { return NetworkPlayerIndexIsCheater(player); }
  playerIsBadsport(): boolean { return NetworkPlayerIsBadsport(); }
  playerIsCheater(): boolean { return NetworkPlayerIsCheater(); }
  playerIsRockstarDev(player: number): boolean { return NetworkPlayerIsRockstarDev(player); }
  queryRespawnResults(): boolean { return (NetworkQueryRespawnResults as any)(); }
  registerHostBroadcastVariables(numVars: number): number { return NetworkRegisterHostBroadcastVariables(numVars); }
  registerPlayerBroadcastVariables(numVars: number): number { return NetworkRegisterPlayerBroadcastVariables(numVars); }
  registerTunableBoolHash(contextHash: number, nameHash: number): boolean { return (NetworkRegisterTunableBoolHash as any)(contextHash, nameHash); } // unverified
  registerTunableFloatHash(contextHash: number, nameHash: number): boolean { return (NetworkRegisterTunableFloatHash as any)(contextHash, nameHash); } // unverified
  registerTunableIntHash(contextHash: number, nameHash: number): boolean { return (NetworkRegisterTunableIntHash as any)(contextHash, nameHash); } // unverified
  remoteCheatDetected(player: number, a: number, b: number): boolean { return RemoteCheaterPlayerDetected(player, a, b); }
  removeAllTransitionInvite(): void { NetworkRemoveAllTransitionInvite(); }
  removeEntityArea(p0: number): boolean { return NetworkRemoveEntityArea(p0); }
  removePresenceInvite(p0: number): boolean { return NetworkRemovePresenceInvite(p0); }
  removeTransitionInvite(): boolean { return (NetworkRemoveTransitionInvite as any)(); }
  reportMyself(): void { NetworkReportMyself(); } // unverified
  requestCloudBackgroundScripts(): boolean { return NetworkRequestCloudBackgroundScripts(); }
  requestCloudTunables(): void { NetworkRequestCloudTunables(); }
  requestControlOfDoor(doorID: number): boolean { return NetworkRequestControlOfDoor(doorID); }
  requestControlOfNetworkId(netId: number): boolean { return NetworkRequestControlOfNetworkId(netId); }
  reserveLocalObjects(amount: number): void { ReserveLocalNetworkMissionObjects(amount); }
  reserveLocalPeds(amount: number): void { ReserveLocalNetworkMissionPeds(amount); }
  reserveLocalVehicles(amount: number): void { ReserveLocalNetworkMissionVehicles(amount); }
  resetBodyTracker(): void { NetworkResetBodyTracker(); }
  resetGhostedEntityAlpha(): void { NetworkResetGhostedEntityAlpha(); } // unverified
  respawnCoords(player: number, x: number, y: number, z: number, p4: boolean, p5: boolean): void { NetworkRespawnCoords(player, x, y, z, p4, p5); } // unverified
  resurrectLocalPlayer(x: number, y: number, z: number, heading: number, nInvincibilityTime: number, bLeaveDeadPed: boolean): void { NetworkResurrectLocalPlayer(x, y, z, heading, nInvincibilityTime, bLeaveDeadPed); }
  seedRandomNumberGenerator(seed: number): void { NetworkSeedRandomNumberGenerator(seed); }
  sendInviteViaPresence(p2: number, p3: number): boolean { return (NetworkSendInviteViaPresence as any)(p2, p3); }
  sendPresenceTransitionInvite(p2: number, p3: number): boolean { return (NetworkSendPresenceTransitionInvite as any)(p2, p3); } // unverified
  sendTextMessage(message: string): boolean { return (NetworkSendTextMessage as any)(message); }
  sendTransitionGamerInstruction(p1: any, p2: number, p3: number, p4: number): boolean { return (NetworkSendTransitionGamerInstruction as any)(p1, p2, p3, p4); }
  sessionActivityQuickmatch(p0: number, p1: number, p2: number, p3: number): boolean { return NetworkSessionDoActivityQuickmatch(p0, p1, p2, p3); } // unverified
  sessionBlockJoinRequests(toggle: boolean): void { NetworkSessionBlockJoinRequests(toggle); }
  sessionCancelInvite(): void { NetworkSessionCancelInvite(); }
  sessionChangeSlots(p0: number, p1: number): void { (NetworkSessionChangeSlots as any)(p0, p1); }
  sessionCrewMatchmaking(p0: number, p1: number, p2: number, maxPlayers: number, p4: number): boolean { return NetworkSessionDoCrewMatchmaking(p0, p1, p2, maxPlayers, p4); }
  sessionEnd(p0: boolean, p1: boolean): boolean { return NetworkSessionEnd(p0, p1); }
  sessionEnter(p0: number, p1: number, p2: number, maxPlayers: number, p4: number, p5: boolean): boolean { return (NetworkSessionEnter as any)(p0, p1, p2, maxPlayers, p4, p5); } // unverified
  sessionForceCancelInvite(): void { NetworkSessionForceCancelInvite(); }
  sessionFriendMatchmaking(p0: number, p1: number, maxPlayers: number, p3: number): boolean { return NetworkSessionDoFriendMatchmaking(p0, p1, maxPlayers, p3); }
  sessionGetInviter(): number { return (NetworkSessionGetInviter as any)(); }
  sessionGetKickVote(player: number): boolean { return NetworkSessionGetKickVote(player); }
  sessionGetMatchmakingGroupFree(p0: number): boolean { return (NetworkSessionGetMatchmakingGroupFree as any)(p0); }
  sessionGetPrivateSlots(): number { return NetworkSessionGetPrivateSlots(); }
  sessionHost(p0: number, maxPlayers: number, p2: boolean): boolean { return NetworkSessionHost(p0, maxPlayers, p2); }
  sessionHostClosed(p0: number, maxPlayers: number): boolean { return NetworkSessionHostClosed(p0, maxPlayers); }
  sessionHostFriendsOnly(p0: number, maxPlayers: number): boolean { return NetworkSessionHostFriendsOnly(p0, maxPlayers); }
  sessionHostSinglePlayer(p0: number): void { NetworkSessionHostSinglePlayer(p0); }
  sessionIsClosedCrew(): boolean { return NetworkSessionIsClosedCrew(); }
  sessionIsClosedFriends(): boolean { return NetworkSessionIsClosedFriends(); }
  sessionIsInVoiceSession(): boolean { return NetworkSessionIsInVoiceSession(); }
  sessionIsPrivate(): boolean { return NetworkSessionIsPrivate(); }
  sessionIsSolo(): boolean { return NetworkSessionIsSolo(); }
  sessionIsVisible(): boolean { return NetworkSessionIsVisible(); }
  sessionIsVoiceSessionBusy(): boolean { return NetworkSessionIsVoiceSessionBusy(); }
  sessionJoinInvite(): void { NetworkSessionJoinInvite(); }
  sessionKickPlayer(player: number): void { NetworkSessionKickPlayer(player); }
  sessionLeaveSinglePlayer(): void { NetworkSessionLeaveSinglePlayer(); }
  sessionMarkVisible(toggle: boolean): void { NetworkSessionMarkVisible(toggle); }
  sessionSetMatchmakingGroup(matchmakingGroup: number): void { NetworkSessionSetMatchmakingGroup(matchmakingGroup); }
  sessionSetMatchmakingGroupMax(playerType: number, playerCount: number): void { NetworkSessionSetMatchmakingGroupMax(playerType, playerCount); }
  sessionSetMatchmakingMentalState(p0: number): void { NetworkSessionSetMatchmakingMentalState(p0); }
  sessionSetMatchmakingPropertyId(p0: number): void { (NetworkSessionSetMatchmakingPropertyId as any)(p0); }
  sessionValidateJoin(p0: number): void { (NetworkSessionValidateJoin as any)(p0); }
  sessionVoiceConnectToPlayer(): boolean { return (NetworkSessionVoiceConnectToPlayer as any)(); }
  sessionVoiceHost(): void { NetworkSessionVoiceHost(); }
  sessionVoiceLeave(): void { NetworkSessionVoiceLeave(); }
  sessionVoiceRespondToRequest(p0: boolean, p1: boolean): void { (NetworkSessionVoiceRespondToRequest as any)(p0, p1); }
  sessionVoiceSetTimeout(timeout: number): void { NetworkSessionVoiceSetTimeout(timeout); }
  sessionWasInvited(): boolean { return NetworkSessionWasInvited(); }
  setActivitySpectator(toggle: boolean): void { NetworkSetActivitySpectator(toggle); }
  setActivitySpectatorMax(maxSpectators: number): void { NetworkSetActivitySpectatorMax(maxSpectators); }
  setBalanceAddMachine(contentId: string, contentTypeName: string): boolean { return NetworkSetBalanceAddMachine(contentId, contentTypeName); } // unverified
  setBalanceAddMachines(dataCount: number, contentTypeName: string): boolean { return NetworkSetBalanceAddMachines(dataCount, contentTypeName); } // unverified
  setChoiceMigrateOptions(toggle: boolean, player: number): void { NetworkSetChoiceMigrateOptions(toggle, player); } // unverified
  setCurrentDataManagerHandle(): boolean { return (NetworkSetCurrentDataManagerHandle as any)(); }
  setCurrentlySelectedGamerHandleFromInviteMenu(): boolean { return (NetworkSetCurrentlySelectedGamerHandleFromInviteMenu as any)(); }
  setEntityCanBlend(entity: number, toggle: boolean): void { NetworkSetEntityCanBlend(entity, toggle); }
  setEntityGhostedWithOwner(entity: number, p1: boolean): void { SetEntityGhostedForGhostPlayers(entity, p1); } // unverified
  setEntityInvisibleToNetwork(entity: number, toggle: boolean): void { NetworkSetEntityInvisibleToNetwork(entity, toggle); } // unverified
  setFriendlyFireOption(toggle: boolean): void { NetworkSetFriendlyFireOption(toggle); }
  setGamerInvitedToTransition(): boolean { return (NetworkSetGamerInvitedToTransition as any)(); }
  setGhostedEntityAlpha(alpha: number): void { NetworkSetGhostedEntityAlpha(alpha); } // unverified
  setInFreeCamMode(toggle: boolean): void { NetworkSetInFreeCamMode(toggle); }
  setInMpCutscene(p0: boolean, p1: boolean): void { NetworkSetInMpCutscene(p0, p1); }
  setInSpectatorMode(toggle: boolean, playerPed: number): void { NetworkSetInSpectatorMode(toggle, playerPed); }
  setInSpectatorModeExtended(toggle: boolean, playerPed: number, p2: boolean): void { NetworkSetInSpectatorModeExtended(toggle, playerPed, p2); }
  setInviteOnCallForInviteMenu(): boolean { return (NetworkSetInviteOnCallForInviteMenu as any)(); }
  setLocalPlayerInvincibleTime(time: number): void { NetworkSetLocalPlayerInvincibleTime(time); }
  setLocalPlayerSyncLookAt(toggle: boolean): void { NetworkSetLocalPlayerSyncLookAt(toggle); }
  setMissionFinished(): void { NetworkSetMissionFinished(); }
  setNetworkIdDynamic(netID: number, toggle: boolean): void { SetNetworkIdDynamic(netID, toggle); }
  setNoSpectatorChat(toggle: boolean): void { NetworkSetNoSpectatorChat(toggle); }
  setOverrideSpectatorMode(toggle: boolean): void { NetworkSetOverrideSpectatorMode(toggle); }
  setPlayerIsPassive(toggle: boolean): void { NetworkSetPlayerIsPassive(toggle); }
  setPropertyId(id: number): void { NetworkSetPropertyId(id); } // unverified
  setRelationshipToPlayer(player: number, p1: number): void { NetworkSetRelationshipToPlayer(player, p1); } // unverified
  setRichPresence(p0: number, p1: number, p2: number, p3: number): void { NetworkSetRichPresence(p0, p1, p2, p3); }
  setRichPresenceString(p0: number, textLabel: string): void { NetworkSetRichPresenceString(p0, textLabel); }
  setScriptReadyForEvents(toggle: boolean): void { NetworkSetScriptReadyForEvents(toggle); }
  setTalkerProximity(value: number): void { NetworkSetTalkerProximity(value); }
  setTeamOnlyChat(toggle: boolean): void { NetworkSetTeamOnlyChat(toggle); }
  setThisScriptIsNetworkScript(lobbySize: number, p1: number, playerId: number): void { (NetworkSetThisScriptIsNetworkScript as any)(lobbySize, p1, playerId); }
  setTransitionActivityId(p0: number): void { NetworkSetTransitionActivityId(p0); }
  setTransitionCreatorHandle(): boolean { return (NetworkSetTransitionCreatorHandle as any)(); }
  setTransitionVisibilityLock(p0: boolean, p1: boolean): void { NetworkSetTransitionVisibilityLock(p0, p1); }
  setVehicleWheelsDestructible(entity: number, toggle: boolean): void { NetworkSetVehicleWheelsDestructible(entity, toggle); } // unverified
  setVoiceActive(toggle: boolean): void { NetworkSetVoiceActive(toggle); }
  setVoiceChannel(channel: number): void { NetworkSetVoiceChannel(channel); }
  shouldShowConnectivityTroubleshooting(): boolean { return NetworkShouldShowStrictNatWarning(); } // unverified
  showProfileUi(): boolean { return (NetworkShowProfileUi as any)(); }
  startRespawnSearchForPlayer(player: number, x: number, y: number, z: number, radius: number, p5: boolean, p6: boolean, p7: boolean, flags: number): boolean { return (NetworkStartRespawnSearchForPlayer as any)(player, x, y, z, radius, p5, p6, p7, flags); }
  startRespawnSearchInAngledAreaForPlayer(player: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, width: number, p8: boolean, p9: boolean, p10: boolean, flags: number): boolean { return (NetworkStartRespawnSearchInAngledAreaForPlayer as any)(player, x1, y1, z1, x2, y2, z2, width, p8, p9, p10, flags); }
  startSoloTutorialSession(): void { NetworkStartSoloTutorialSession(); }
  startSynchronisedScene(netScene: number): void { NetworkStartSynchronisedScene(netScene); }
  startUserContentPermissionsCheck(): boolean { return (NetworkStartUserContentPermissionsCheck as any)(); }
  stopSynchronisedScene(netScene: number): void { NetworkStopSynchronisedScene(netScene); }
  suppressInvite(toggle: boolean): void { NetworkSuppressInvite(toggle); }
  textureDownloadRequest(FilePath: string, Name: string, p3: string): number { return (UgcTextureDownloadRequest as any)(FilePath, Name, p3); }
  transitionTrack(hash: number, p1: number, p2: number, state: number, p4: number): void { NetworkTransitionTrack(hash, p1, p2, state, p4); } // unverified
  triggerScriptCrcCheckOnPlayer(player: number, p1: number, scriptHash: number): boolean { return NetworkTriggerScriptCrcCheckOnPlayer(player, p1, scriptHash); } // unverified
  tryAccessTunableBoolHash(tunableContext: number, tunableName: number, defaultValue: boolean): boolean { return NetworkTryAccessTunableBoolHash(tunableContext, tunableName, defaultValue); }
  ugcCopyContent(): boolean { return (UgcCopyContent as any)(); }
  ugcGetBookmarkedContent(p0: number, p1: number): boolean { return (UgcGetBookmarkedContent as any)(p0, p1); }
  ugcGetContentUpdatedDate(p0: number): number { return UgcGetContentUpdatedDate(p0); }
  ugcGetCrewContent(p0: number, p1: number, p2: number): boolean { return (UgcGetCrewContent as any)(p0, p1, p2); }
  ugcGetFriendContent(p0: number, p1: number): boolean { return (UgcGetFriendContent as any)(p0, p1); }
  ugcGetGetByCategory(p0: number, p1: number, p2: number): boolean { return (UgcGetGetByCategory as any)(p0, p1, p2); }
  ugcGetMyContent(p0: number, p1: number): boolean { return (UgcGetMyContent as any)(p0, p1); }
  ugcPoliciesMakePrivate(p0: number): boolean { return UgcPoliciesMakePrivate(p0); } // unverified
  ugcQueryByContentIds(count: number, latestVersion: boolean, contentTypeName: string): number { return (UgcQueryByContentIds as any)(count, latestVersion, contentTypeName); }
  ugcQueryMyContent(p0: number, p1: number, p3: number, p4: number, p5: number): number { return (UgcQueryMyContent as any)(p0, p1, p3, p4, p5); }
  ugcQueryRecentlyCreatedContent(offset: number, count: number, contentTypeName: string, p3: number): number { return UgcQueryMostRecentlyCreatedContent(offset, count, contentTypeName, p3); } // unverified
  ugcSetDeleted(p1: string): boolean { return (UgcSetDeleted as any)(p1); }
  ugcTextureDownloadRequest(p1: string, p2: string, p3: string, p5: number): number { return (UgcTextureDownloadRequest as any)(p1, p2, p3, p5); }
  updatePlayerScars(): void { NetworkUpdatePlayerScars(); } // unverified
}
