import { createUnkProxy } from "./_helpers.js";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class GameAudioNs {
  unk = createUnkProxy();

  registerScriptWithAudio(p0: number): void { RegisterScriptWithAudio(!!p0); }
  registerScriptWith(p0: number): void { RegisterScriptWithAudio(!!p0); }
  unregisterScriptWith(): void { UnregisterScriptWithAudio(); }
  requestMissionAudioBank(p0: string, p1: boolean): boolean { return RequestMissionAudioBank(p0, p1); }
  requestAmbientAudioBank(p0: string, p1: boolean): boolean { return RequestAmbientAudioBank(p0, p1); }
  requestScriptAudioBank(p0: string, p1: boolean): boolean { return RequestScriptAudioBank(p0, p1); }
  hintAmbientAudioBank(p0: number, p1: number, p2: number): number { return (HintAmbientAudioBank as any)(p0, p1, p2); }
  hintScriptAudioBank(p0: number, p1: number, p2: number): number { return (HintScriptAudioBank as any)(p0, p1, p2); }
  releaseNamedScriptAudioBank(audioBank: string): void { ReleaseNamedScriptAudioBank(audioBank); }

  getSoundId(): number { return GetSoundId(); }
  releaseSoundId(soundId: number): void { ReleaseSoundId(soundId); }
  playSound(soundId: number, audioName: string, audioRef: string, p3: boolean, p4: number, p5: boolean): void {
    PlaySound(soundId, audioName, audioRef, p3 ?? false, p4 ?? 0, p5 ?? true);
  }
  playSoundFrontend(soundId: number, audioName: string, audioRef: string, p3: boolean): void {
    PlaySoundFrontend(soundId, audioName, audioRef, p3 ?? true);
  }
  playDeferredSoundFrontend(soundName: string, soundsetName: string): void { PlayDeferredSoundFrontend(soundName, soundsetName); }
  playSoundFromEntity(soundId: number, audioName: string, entity: number, audioRef: string, p4: boolean, p5: number): void {
    PlaySoundFromEntity(soundId, audioName, entity, audioRef, p4 ?? false, p5 ?? 0);
  }
  playSoundFromCoord(soundId: number, audioName: string, x: number, y: number, z: number, audioRef: string, isNetwork: boolean, rangeMax: number, p8: boolean): void {
    PlaySoundFromCoord(soundId, audioName, x, y, z, audioRef, isNetwork ?? false, rangeMax ?? 0, p8 ?? false);
  }
  stopSound(soundId: number): void { StopSound(soundId); }
  getNetworkIdFromSoundId(soundId: number): number { return GetNetworkIdFromSoundId(soundId); }
  getSoundIdFromNetworkId(netId: number): number { return GetSoundIdFromNetworkId(netId); }
  hasSoundFinished(soundId: number): boolean { return HasSoundFinished(soundId); }

  playPedAmbientSpeechNative(ped: number, speechName: string, speechParam: string): void {
    PlayPedAmbientSpeechNative(ped, speechName, speechParam);
  }
  playPedAmbientSpeechAndCloneNative(ped: number, speechName: string, speechParam: string): void {
    PlayPedAmbientSpeechAndCloneNative(ped, speechName, speechParam);
  }
  playPedAmbientSpeechWithVoiceNative(ped: number, speechName: string, voiceName: string, speechParam: string, p4: boolean): void {
    PlayPedAmbientSpeechWithVoiceNative(ped, speechName, voiceName, speechParam, p4 ?? false);
  }
  playAmbientSpeechFromPositionNative(speechName: string, voiceName: string, x: number, y: number, z: number, speechParam: string): void {
    PlayAmbientSpeechFromPositionNative(speechName, voiceName, x, y, z, speechParam);
  }
  overrideTrevorRage(voiceEffect: string): void { OverrideTrevorRage(voiceEffect); }
  resetTrevorRage(): void { ResetTrevorRage(); }
  setPlayerAngry(ped: number, toggle: boolean): void { SetPlayerAngry(ped, toggle); }
  playPain(ped: number, painID: number, p1: number): void { PlayPain(ped, painID, p1); }
  setAmbientVoiceName(ped: number, name: string): void { SetAmbientVoiceName(ped, name); }
  setAmbientVoiceNameHash(ped: number, hash: number): void { SetAmbientVoiceNameHash(ped, hash); }
  getAmbientVoiceNameHash(ped: number): number { return GetAmbientVoiceNameHash(ped); }
  setPedVoiceGroup(ped: number, voiceGroupHash: number): void { SetPedVoiceGroup(ped, voiceGroupHash); }
  setPedGender(ped: number, p1: boolean): void { SetPedAudioGender(ped, p1); }
  stopCurrentPlayingSpeech(ped: number): void { StopCurrentPlayingSpeech(ped); }
  stopCurrentPlayingAmbientSpeech(ped: number): void { StopCurrentPlayingAmbientSpeech(ped); }
  isAmbientSpeechPlaying(ped: number): boolean { return IsAmbientSpeechPlaying(ped); }
  isScriptedSpeechPlaying(p0: number): boolean { return IsScriptedSpeechPlaying(p0); }
  isAnySpeechPlaying(ped: number): boolean { return IsAmbientSpeechPlaying(ped); }
  isPedInCurrentConversation(ped: number): boolean { return IsPedInCurrentConversation(ped); }
  setPedIsDrunk(ped: number, toggle: boolean): void { SetPedIsDrunk(ped, toggle); }
  stopPedSpeaking(ped: number, shaking: boolean): void { StopPedSpeaking(ped, shaking); }
  disablePedPain(ped: number, toggle: boolean): void { DisablePedPainAudio(ped, toggle); }
  isAmbientSpeechDisabled(ped: number): boolean { return IsAmbientSpeechDisabled(ped); }
  resetPedAudioFlags(ped: number): void { ResetPedAudioFlags(ped); }
  playAnimalVocalization(pedHandle: number, p1: number, speechName: string): void { PlayAnimalVocalization(pedHandle, p1, speechName); }
  isAnimalVocalizationPlaying(pedHandle: number): boolean { return IsAnimalVocalizationPlaying(pedHandle); }
  setAnimalMood(animal: number, mood: number): void { SetAnimalMood(animal, mood); }

  playPedRingtone(ringtoneName: string, ped: number, p2: boolean): void { PlayPedRingtone(ringtoneName, ped, p2); }
  isPedRingtonePlaying(ped: number): boolean { return IsPedRingtonePlaying(ped); }
  stopPedRingtone(ped: number): void { StopPedRingtone(ped); }
  isMobilePhoneCallOngoing(): boolean { return IsMobilePhoneCallOngoing(); }

  createNewScriptedConversation(): void { CreateNewScriptedConversation(); }
  addPedToConversation(index: number, ped: number, p2: string): void { AddPedToConversation(index, ped, p2); }
  startScriptPhoneConversation(p0: boolean, p1: boolean): void { StartScriptPhoneConversation(p0, p1); }
  preloadScriptPhoneConversation(p0: boolean, p1: boolean): void { PreloadScriptPhoneConversation(p0, p1); }
  startScriptConversation(p0: boolean, p1: boolean, p2: boolean, p3: boolean): void { StartScriptConversation(p0, p1, p2, p3); }
  preloadScriptConversation(p0: boolean, p1: boolean, p2: boolean, p3: boolean): void { PreloadScriptConversation(p0, p1, p2, p3); }
  startPreloadedConversation(): void { StartPreloadedConversation(); }
  getIsPreloadedConversationReady(): boolean { return GetIsPreloadedConversationReady(); }
  isScriptedConversationOngoing(): boolean { return IsScriptedConversationOngoing(); }
  isScriptedConversationLoaded(): boolean { return IsScriptedConversationLoaded(); }
  getCurrentScriptedConversationLine(): number { return GetCurrentScriptedConversationLine(); }
  pauseScriptedConversation(p0: boolean): void { PauseScriptedConversation(p0); }
  restartScriptedConversation(): void { RestartScriptedConversation(); }
  stopScriptedConversation(p0: boolean): number { return StopScriptedConversation(p0); }
  skipToNextScriptedConversationLine(): void { SkipToNextScriptedConversationLine(); }
  interruptConversationAndPause(ped: number, p1: string, p2: string): void { InterruptConversationAndPause(ped, p1, p2); }

  prepareSynchronizedAudioEvent(p0: string, p1: number): number { return (PrepareSynchronizedAudioEvent as any)(p0, p1); }
  prepareSynchronizedAudioEventForScene(p0: number, audioEvent: any): number { return (PrepareSynchronizedAudioEventForScene as any)(p0, audioEvent); }
  playSynchronizedAudioEvent(p0: number): boolean { return PlaySynchronizedAudioEvent(p0); }
  stopSynchronizedAudioEvent(p0: number): boolean { return StopSynchronizedAudioEvent(p0); }

  isMobilePhoneRadioActive(): boolean { return IsMobilePhoneRadioActive(); }
  setMobilePhoneRadioState(state: boolean): void { SetMobilePhoneRadioState(state); }
  getPlayerRadioStationIndex(): number { return GetPlayerRadioStationIndex(); }
  getPlayerRadioStationName(): string { return GetPlayerRadioStationName(); }
  getRadioStationName(radioStation: number): string { return GetRadioStationName(radioStation); }
  getPlayerRadioStationGenre(): number { return GetPlayerRadioStationGenre(); }
  isRadioRetuning(): boolean { return IsRadioRetuning(); }
  isRadioFadedOut(): boolean { return IsRadioFadedOut(); }
  setRadioToStationName(stationName: string): void { SetRadioToStationName(stationName); }
  setVehRadioStation(vehicle: number, radioStation: string): void { SetVehRadioStation(vehicle, radioStation); }
  setEmitterRadioStation(emitterName: string, radioStation: string): void { SetEmitterRadioStation(emitterName, radioStation); }
  setStaticEmitterEnabled(emitterName: string, toggle: boolean): void { SetStaticEmitterEnabled(emitterName, toggle); }
  linkStaticEmitterToEntity(emitterName: string, entity: number): void { LinkStaticEmitterToEntity(emitterName, entity); }
  setRadioToStationIndex(radioStation: number): void { SetRadioToStationIndex(radioStation); }
  setFrontendRadioActive(active: boolean): void { SetFrontendRadioActive(active); }
  unlockMissionNewsStory(newsStory: number): void { UnlockMissionNewsStory(newsStory); }
  isMissionNewsStoryUnlocked(newsStory: number): boolean { return IsMissionNewsStoryUnlocked(newsStory); }
  getAudibleMusicTrackTextId(): number { return GetAudibleMusicTrackTextId(); }
  playEndCreditsMusic(play: boolean): void { PlayEndCreditsMusic(play); }
  skipRadioForward(): void { SkipRadioForward(); }
  freezeRadioStation(radioStation: string): void { FreezeRadioStation(radioStation); }
  unfreezeRadioStation(radioStation: string): void { UnfreezeRadioStation(radioStation); }
  setRadioAutoUnfreeze(toggle: boolean): void { SetRadioAutoUnfreeze(toggle); }
  setInitialPlayerStation(radioStation: string): void { SetInitialPlayerStation(radioStation); }
  setUserRadioControlEnabled(toggle: boolean): void { SetUserRadioControlEnabled(toggle); }
  setRadioTrack(radioStation: string, radioTrack: string): void { SetRadioTrack(radioStation, radioTrack); }
  setVehicleRadioLoud(vehicle: number, toggle: boolean): void { SetVehicleRadioLoud(vehicle, toggle); }
  setMobileRadioEnabledDuringGameplay(toggle: boolean): void { SetMobileRadioEnabledDuringGameplay(toggle); }
  doesPlayerVehHaveRadio(): boolean { return DoesPlayerVehHaveRadio(); }
  isPlayerVehRadioEnable(): boolean { return IsPlayerVehRadioEnable(); }
  setVehicleRadioEnabled(vehicle: number, toggle: boolean): void { SetVehicleRadioEnabled(vehicle, toggle); }
  setCustomRadioTrackList(radioStation: string, trackListName: string, p2: boolean): void { SetCustomRadioTrackList(radioStation, trackListName, p2); }
  clearCustomRadioTrackList(radioStation: string): void { ClearCustomRadioTrackList(radioStation); }
  getNumUnlockedRadioStations(): number { return GetNumUnlockedRadioStations(); }
  findRadioStationIndex(station: number): number { return FindRadioStationIndex(station); }
  setRadioStationMusicOnly(radioStation: string, toggle: boolean): void { SetRadioStationMusicOnly(radioStation, toggle); }
  setRadioFrontendFadeTime(fadeTime: number): void { SetRadioFrontendFadeTime(fadeTime); }
  unlockRadioStationTrackList(radioStation: string, trackListName: string): void { UnlockRadioStationTrackList(radioStation, trackListName); }
  lockRadioStation(radioStationName: string, toggle: boolean): void { LockRadioStation(radioStationName, toggle); }

  setAmbientZoneState(zoneName: string, p1: boolean, p2: boolean): void { SetAmbientZoneState(zoneName, p1, p2); }
  clearAmbientZoneState(zoneName: string, p1: boolean): void { ClearAmbientZoneState(zoneName, p1); }
  setAmbientZoneListState(ambientZone: any, p1: boolean, p2: boolean): number { SetAmbientZoneListState(ambientZone, p1, p2); return 0; }
  clearAmbientZoneListState(ambientZone: any, p1: boolean): number { ClearAmbientZoneListState(ambientZone, p1); return 0; }
  setAmbientZoneStatePersistent(ambientZone: string, p1: boolean, p2: boolean): void { SetAmbientZoneStatePersistent(ambientZone, p1, p2); }
  setAmbientZoneListStatePersistent(ambientZone: string, p1: boolean, p2: boolean): void { SetAmbientZoneListStatePersistent(ambientZone, p1, p2); }
  isAmbientZoneEnabled(ambientZone: string): boolean { return IsAmbientZoneEnabled(ambientZone); }

  playPoliceReport(name: string, p1: number): number { return PlayPoliceReport(name, p1); }

  blipSiren(vehicle: number): void { BlipSiren(vehicle); }
  overrideVehHorn(vehicle: number, override: boolean, hornHash: number): void { OverrideVehHorn(vehicle, override, hornHash); }
  isHornActive(vehicle: number): boolean { return IsHornActive(vehicle); }
  setAggressiveHorns(toggle: boolean): void { SetAggressiveHorns(toggle); }
  setSirenWithNoDriver(vehicle: number, toggle: boolean): void { SetSirenWithNoDriver(vehicle, toggle); }
  triggerSiren(vehicle: number): void { TriggerSiren(vehicle); }
  setHornEnabled(vehicle: number, toggle: boolean): void { SetHornEnabled(vehicle, toggle); }
  setVehiclePriority(vehicle: number, p1: number): void { SetAudioVehiclePriority(vehicle, p1); }
  useSirenAsHorn(vehicle: number, toggle: boolean): void { UseSirenAsHorn(vehicle, toggle); }
  enableVehicleExhaustPops(vehicle: number, toggle: boolean): void { EnableVehicleExhaustPops(vehicle, toggle); }
  setVehicleBoostActive(vehicle: number, toggle: boolean): void { SetVehicleBoostActive(vehicle, toggle); }
  setScriptUpdateDoor(doorHash: number, toggle: boolean): void { SetScriptUpdateDoorAudio(doorHash, toggle); }
  playVehicleDoorOpenSound(vehicle: number, doorIndex: number): void { PlayVehicleDoorOpenSound(vehicle, doorIndex); }
  playVehicleDoorCloseSound(vehicle: number, doorIndex: number): void { PlayVehicleDoorCloseSound(vehicle, doorIndex); }
  enableStallWarningSounds(vehicle: number, toggle: boolean): void { EnableStallWarningSounds(vehicle, toggle); }
  getVehicleDefaultHorn(vehicle: number): number { return GetVehicleDefaultHorn(vehicle); }
  getVehicleDefaultHornIgnoreMods(vehicle: number): number { return GetVehicleDefaultHornIgnoreMods(vehicle); }

  isStreamPlaying(): boolean { return IsStreamPlaying(); }
  getStreamPlayTime(): number { return GetStreamPlayTime(); }
  loadStream(streamName: string, soundSet: string): boolean { return LoadStream(streamName, soundSet); }
  loadStreamWithStartOffset(streamName: string, startOffset: number, soundSet: string): boolean { return LoadStreamWithStartOffset(streamName, startOffset, soundSet); }
  playStreamFromPed(ped: number): void { PlayStreamFromPed(ped); }
  playStreamFromVehicle(vehicle: number): void { PlayStreamFromVehicle(vehicle); }
  playStreamFromObject(object: number): void { PlayStreamFromObject(object); }
  playStreamFrontend(): void { PlayStreamFrontend(); }
  playStreamFromPosition(x: number, y: number, z: number): void { PlayStreamFromPosition(x, y, z); }
  stopStream(): void { StopStream(); }
  setVariableOnStream(p0: string, p1: number): void { SetVariableOnStream(p0, p1); }
  setVariableOnUnderWaterStream(variableName: string, value: number): void { SetVariableOnUnderWaterStream(variableName, value); }

  startAudioScene(scene: string): boolean { return StartAudioScene(scene); }
  stopAudioScene(scene: string): void { StopAudioScene(scene); }
  isAudioSceneActive(audioSceneName: string): boolean { return IsAudioSceneActive(audioSceneName); }
  setAudioSceneVariable(scene: string, variable: string, value: number): void { SetAudioSceneVariable(scene, variable, value); }
  startScene(scene: string): boolean { return StartAudioScene(scene); }
  stopScene(scene: string): void { StopAudioScene(scene); }
  stopScenes(): void { StopAudioScenes(); }
  isSceneActive(scene: string): boolean { return IsAudioSceneActive(scene); }
  setSceneVariable(scene: string, variable: string, value: number): void { SetAudioSceneVariable(scene, variable, value); }
  setScriptCleanupTime(time: number): void { SetAudioScriptCleanupTime(time); }
  setCutsceneAudioOverride(name: string): void { SetCutsceneAudioOverride(name); }

  isGameInControlOfMusic(): boolean { return IsGameInControlOfMusic(); }
  setGpsActive(active: boolean): void { SetGpsActive(active); }
  playMissionComplete(audioName: string): void { PlayMissionCompleteAudio(audioName); }
  playMissionCompleteAudio(audioName: string): void { PlayMissionCompleteAudio(audioName); }
  isMissionCompletePlaying(): boolean { return IsMissionCompletePlaying(); }
  isMissionCompleteReadyForUi(): boolean { return IsMissionCompleteReadyForUi(); }
  blockDeathJingle(toggle: boolean): void { BlockDeathJingle(toggle); }

  prepareMusicEvent(eventName: string): boolean { return PrepareMusicEvent(eventName); }
  cancelMusicEvent(eventName: string): boolean { return CancelMusicEvent(eventName); }
  triggerMusicEvent(eventName: string): boolean { return TriggerMusicEvent(eventName); }
  isMusicOneshotPlaying(): boolean { return IsMusicOneshotPlaying(); }
  getMusicPlaytime(): number { return GetMusicPlaytime(); }

  recordBrokenGlass(x: number, y: number, z: number, radius: number): void { RecordBrokenGlass(x, y, z, radius); }
  clearAllBrokenGlass(): void { ClearAllBrokenGlass(); }
  prepareAlarm(alarmName: string): boolean { return PrepareAlarm(alarmName); }
  startAlarm(alarmName: string, p2: boolean): void { StartAlarm(alarmName, p2); }
  stopAlarm(alarmName: string, toggle: boolean): void { StopAlarm(alarmName, toggle); }
  stopAllAlarms(stop: boolean): void { StopAllAlarms(stop); }
  isAlarmPlaying(alarmName: string): boolean { return IsAlarmPlaying(alarmName); }

  setAudioFlag(flagName: string, toggle: boolean): void { SetAudioFlag(flagName, toggle); }
  setFlag(flagName: string, toggle: boolean): void { SetAudioFlag(flagName, toggle); }
  releaseWeapon(): void { ReleaseWeaponAudio(); }
  activateSlowmoMode(p0: string): void { ActivateAudioSlowmoMode(p0); }
  deactivateSlowmoMode(p0: string): void { DeactivateAudioSlowmoMode(p0); }
  overridePlayerGroundMaterial(hash: number, toggle: boolean): void { OverridePlayerGroundMaterial(hash, toggle); }
  overrideMicrophoneSettings(hash: number, toggle: boolean): void { OverrideMicrophoneSettings(hash, toggle); }
  freezeMicrophone(): void { FreezeMicrophone(); }
  distantCopCarSirens(value: boolean): void { DistantCopCarSirens(value); }
  setSpecialEffectMode(mode: number): void { SetAudioSpecialEffectMode(mode); }
  setPortalSettingsOverride(p0: string, p1: string): void { SetPortalSettingsOverride(p0, p1); }
  removePortalSettingsOverride(p0: string): void { RemovePortalSettingsOverride(p0); }

  requestMissionBank(p0: string, p1: boolean): boolean { return RequestMissionAudioBank(p0, p1); }
  requestAmbientBank(p0: string, p1: boolean): boolean { return RequestAmbientAudioBank(p0, p1); }
  requestScriptBank(p0: string, p1: boolean): boolean { return RequestScriptAudioBank(p0, p1); }
  hintAmbientBank(p0: number, p1: number, p2: number): number { return (HintAmbientAudioBank as any)(p0, p1, p2); }
  hintScriptBank(p0: number, p1: number, p2: number): number { return (HintScriptAudioBank as any)(p0, p1, p2); }
  releaseMissionBank(): void { ReleaseMissionAudioBank(); }
  releaseAmbientBank(): void { ReleaseAmbientAudioBank(); }
  releaseScriptBank(): void { ReleaseScriptAudioBank(); }
  releaseNamedScriptBank(audioBank: string): void { ReleaseNamedScriptAudioBank(audioBank); }

  playSoundHash(soundId: number, audioNameHash: number, audioRef: string, p3: boolean, p4: number, p5: boolean): void { PlaySoundHash(soundId, audioNameHash, audioRef, p3 ?? false, p4 ?? 0, p5 ?? true); }
  setVariableOnSound(soundId: number, p2: number): number { return (SetVariableOnSound as any)(soundId, p2); }
  overrideUnderwaterStream(p1: boolean): number { return (OverrideUnderwaterStream as any)(p1); }

  playAmbientSpeechWithVoice(ped: number, speechName: string, voiceName: string, speechParam: string, p4: boolean): void { PlayAmbientSpeechWithVoice(ped, speechName, voiceName, speechParam, p4); }
  playAmbientSpeechAtCoords(speechName: string, voiceName: string, x: number, y: number, z: number, speechParam: string): void { PlayAmbientSpeechAtCoords(speechName, voiceName, x, y, z, speechParam); }
  getNumberOfPassengerVoiceVariations(newsStory: number): boolean { return GetNumberOfPassengerVoiceVariations(newsStory); }
  setPedScream(ped: number): void { SetPedScream(ped); }
  canPedSpeak(ped: number, speechName: string, unk: boolean): boolean { return CanPedSpeak(ped, speechName, unk); }
  setPedTalk(ped: number): void { SetPedTalk(ped); }
  getPlayerHeadsetSoundAlternate(variableName: string, value: number): void { GetPlayerHeadsetSoundAlternate(variableName, value); }
  specialFrontendEqual(x: number, y: number, z: number): void { SpecialFrontendEqual(x, y, z); }
  resetPedFlags(ped: number): void { ResetPedAudioFlags(ped); }
  setPedFootstepLoud(ped: number, toggle: boolean): void { SetPedAudioFootstepLoud(ped, toggle); }
  setPedFootstepQuiet(ped: number, toggle: boolean): void { SetPedAudioFootstepQuiet(ped, toggle); }

  setSynchronizedAudioEventPositionThisFrame(p0: string, p1: number): void { SetSynchronizedAudioEventPositionThisFrame(p0, p1); }
  prepareSynchronizedEvent(p0: string, p1: number): number { return (PrepareSynchronizedAudioEvent as any)(p0, p1); }
  prepareSynchronizedEventForScene(p0: number): number { return (PrepareSynchronizedAudioEventForScene as any)(p0); }
  playSynchronizedEvent(p0: number): boolean { return PlaySynchronizedAudioEvent(p0); }
  stopSynchronizedEvent(p0: number): boolean { return StopSynchronizedAudioEvent(p0); }
  setSynchronizedEventPositionThisFrame(p0: string, p1: number): void { SetSynchronizedAudioEventPositionThisFrame(p0, p1); }

  addLineToConversation(index: number, p1: string, p2: string, p3: number, p4: number, p5: boolean, p6: boolean, p7: boolean, p8: boolean, p9: number, p10: boolean, p11: boolean, p12: boolean): void {
    AddLineToConversation(index, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12);
  }
  setMicrophonePosition(p0: boolean, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, x3: number, y3: number, z3: number): void {
    SetMicrophonePosition(p0, x1, y1, z1, x2, y2, z2, x3, y3, z3);
  }
  interruptConversation(p0: number): { p1: number; p2: number } {
    const r = (InterruptConversation as any)(p0);
    return { p1: r[0], p2: r[1] };
  }

  setCutsceneOverride(name: string): void { SetCutsceneAudioOverride(name); }
  setVariableOnCutscene(variableName: string, value: number): void { SetVariableOnCutsceneAudio(variableName, value); }
  stopCutscene(p0: boolean): void { StopCutscene(p0); }

  setRadioTrackMix(radioStationName: string, mixName: string, p2: number): void { SetRadioTrackMix(radioStationName, mixName, p2); }
  isVehicleRadioLoud(vehicle: number): boolean { return IsVehicleRadioLoud(vehicle); }
  updateLsur(enableMixes: boolean): void { UpdateLsur(enableMixes); }
  getCurrentRadioStationHash(radioStationName: string): number { return GetCurrentRadioStationHash(radioStationName); }

  cancelCurrentPoliceReport(): void { CancelCurrentPoliceReport(); }
  playPoliceCrimeReport(position: Vector3, crimeIndex: number, playDelay: number, localPlayer: boolean): void {
    PlayPoliceCrimeReport(position?.x ?? (position as any)?.[0] ?? 0, position?.y ?? (position as any)?.[1] ?? 0, position?.z ?? (position as any)?.[2] ?? 0, crimeIndex, playDelay, localPlayer);
  }

  soundVehicleHornThisFrame(vehicle: number): void { SoundVehicleHornThisFrame(vehicle); }
  forceVehicleEngine(vehicle: number, audioName: string): void { ForceVehicleEngineAudio(vehicle, audioName); }
  preloadVehicle(vehicleModel: number): void { PreloadVehicleAudio(vehicleModel); }
  setVehicleEngineDamageFactor(vehicle: number, damageFactor: number): void { SetVehicleAudioEngineDamageFactor(vehicle, damageFactor); }
  setVehicleBodyDamageFactor(vehicle: number, p1: number): void { SetVehicleAudioBodyDamageFactor(vehicle, p1); }
  getVehicleDefaultHornVariation(vehicle: number): number { return GetVehicleDefaultHornVariation(vehicle); }
  setVehicleHornVariation(vehicle: number, value: number): void { SetVehicleHornVariation(vehicle, value); }

  addEntityToMixGroup(entity: number, groupName: string, p2: number): void { AddEntityToAudioMixGroup(entity, groupName, p2); }
  removeEntityFromMixGroup(entity: number, p1: number): void { RemoveEntityFromAudioMixGroup(entity, p1); }
  isScriptedMusicPlaying(): boolean { return AudioIsScriptedMusicPlaying(); }

  hasMultiplayerDataLoaded(): boolean { return HasMpDataLoaded(); }
  hasMultiplayerDataUnloaded(): boolean { return HasMpDataUnloaded(); }

  getCategoryVariable(categoryHash: number, fieldNameHash: number): void { return GetAudioCategoryVariable(categoryHash, fieldNameHash); }
  setCategoryVariable(categoryHash: number, fieldNameHash: number, value: any): void { SetAudioCategoryVariable(categoryHash, fieldNameHash, value); }
  copyCategoryVariables(categoryTo: number, categoryFrom: number): void { CopyAudioCategoryVariables(categoryTo, categoryFrom); }
  restoreCategoryVariables(categoryHash: number): void { RestoreAudioCategoryVariables(categoryHash); }

  ["_0xC8B1B2425604CDD0"](): any { return Citizen.invokeNative("0xC8B1B2425604CDD0"); }
  ["_0x33E3C6C6F2F0B506"](...args: any[]): any { return Citizen.invokeNative("0x33E3C6C6F2F0B506", ...args); }
  ["_0x892B6AB8F33606F5"](...args: any[]): any { return Citizen.invokeNative("0x892B6AB8F33606F5", ...args); }
  ["_0x0B568201DD99F0EB"](...args: any[]): any { return Citizen.invokeNative("0x0B568201DD99F0EB", ...args); }
  ["_0x61631F5DF50D1C34"](...args: any[]): any { return Citizen.invokeNative("0x61631F5DF50D1C34", ...args); }
  ["_0xAA19F5572C38B564"](): { p0: number; result: number } {
    const r: any = Citizen.invokeNative("0xAA19F5572C38B564");
    return { p0: r?.[0], result: r?.[1] };
  }
  ["_0xB542DE8C3D1CB210"](...args: any[]): any { return Citizen.invokeNative("0xB542DE8C3D1CB210", ...args); }
  ["_0x40763EA7B9B783E7"](...args: any[]): any { return Citizen.invokeNative("0x40763EA7B9B783E7", ...args); }
  ["_0x19AF7ED9B9D23058"](): any { return Citizen.invokeNative("0x19AF7ED9B9D23058"); }
  ["_0x9AC92EED5E4793AB"](): any { return Citizen.invokeNative("0x9AC92EED5E4793AB"); }
  ["_0x11579D940949C49E"](...args: any[]): any { return Citizen.invokeNative("0x11579D940949C49E", ...args); }
  ["_0x5B9853296731E88D"](...args: any[]): any { return Citizen.invokeNative("0x5B9853296731E88D", ...args); }
  ["_0x7EC3C679D0E7E46B"](...args: any[]): any { return Citizen.invokeNative("0x7EC3C679D0E7E46B", ...args); }
  ["_0x1B7ABE26CBCBF8C7"](...args: any[]): any { return Citizen.invokeNative("0x1B7ABE26CBCBF8C7", ...args); }
  ["_0x30CA2EF91D15ADF8"](): any { return Citizen.invokeNative("0x30CA2EF91D15ADF8"); }
  ["_0xFF266D1D0EB1195D"](): any { return Citizen.invokeNative("0xFF266D1D0EB1195D"); }
  ["_0xDD6BCF9E94425DF9"](): any { return Citizen.invokeNative("0xDD6BCF9E94425DF9"); }
  ["_0x0BE4BE946463F917"](...args: any[]): any { return Citizen.invokeNative("0x0BE4BE946463F917", ...args); }
  ["_0xC1805D05E6D4FE10"](...args: any[]): any { return Citizen.invokeNative("0xC1805D05E6D4FE10", ...args); }
  ["_0x55ECF4D13D9903B0"](...args: any[]): any { return Citizen.invokeNative("0x55ECF4D13D9903B0", ...args); }
  ["_0xDA07819E452FFE8F"](...args: any[]): any { return Citizen.invokeNative("0xDA07819E452FFE8F", ...args); }
  ["_0xC64A06D939F826F5"](): { p0: number; p1: number; p2: number; result: boolean } {
    const r: any = Citizen.invokeNative("0xC64A06D939F826F5");
    return { p0: r?.[0], p1: r?.[1], p2: r?.[2], result: r?.[3] };
  }
  ["_0x34D66BC058019CE0"](...args: any[]): any { return Citizen.invokeNative("0x34D66BC058019CE0", ...args); }
  ["_0xF3365489E0DD50F9"](...args: any[]): any { return Citizen.invokeNative("0xF3365489E0DD50F9", ...args); }
  ["_0x5D2BFAAB8D956E0E"](): any { return Citizen.invokeNative("0x5D2BFAAB8D956E0E"); }
  ["_0x02E93C796ABD3A97"](...args: any[]): any { return Citizen.invokeNative("0x02E93C796ABD3A97", ...args); }
  ["_0x58BB377BEC7CD5F4"](...args: any[]): any { return Citizen.invokeNative("0x58BB377BEC7CD5F4", ...args); }
  ["_0x9BD7BD55E4533183"](...args: any[]): any { return Citizen.invokeNative("0x9BD7BD55E4533183", ...args); }
  ["_0xF8AD2EED7C47E8FE"](...args: any[]): any { return Citizen.invokeNative("0xF8AD2EED7C47E8FE", ...args); }
  ["_0xAB6781A5F3101470"](...args: any[]): any { return Citizen.invokeNative("0xAB6781A5F3101470", ...args); }
  ["_0xA8A7D434AFB4B97B"](...args: any[]): any { return Citizen.invokeNative("0xA8A7D434AFB4B97B", ...args); }
  ["_0x2ACABED337622DF2"](...args: any[]): any { return Citizen.invokeNative("0x2ACABED337622DF2", ...args); }
  ["_0x9D3AF56E94C9AE98"](...args: any[]): any { return Citizen.invokeNative("0x9D3AF56E94C9AE98", ...args); }
  ["_0xF1F8157B8C3F171C"](...args: any[]): any { return Citizen.invokeNative("0xF1F8157B8C3F171C", ...args); }
  ["_0xD2DCCD8E16E20997"](...args: any[]): any { return Citizen.invokeNative("0xD2DCCD8E16E20997", ...args); }
  ["_0x5DB8010EE71FDEF2"](...args: any[]): any { return Citizen.invokeNative("0x5DB8010EE71FDEF2", ...args); }
  ["_0x1C073274E065C6D2"](...args: any[]): any { return Citizen.invokeNative("0x1C073274E065C6D2", ...args); }
  ["_0x6FDDAD856E36988A"](...args: any[]): any { return Citizen.invokeNative("0x6FDDAD856E36988A", ...args); }
  ["_0x2DD39BF3E2F9C47F"](): any { return Citizen.invokeNative("0x2DD39BF3E2F9C47F"); }
  ["_0x159B7318403A1CD8"](...args: any[]): any { return Citizen.invokeNative("0x159B7318403A1CD8", ...args); }
  ["_0x70B8EC8FC108A634"](...args: any[]): any { return Citizen.invokeNative("0x70B8EC8FC108A634", ...args); }
  ["_0x149AEE66F0CB3A99"](...args: any[]): any { return Citizen.invokeNative("0x149AEE66F0CB3A99", ...args); }
  ["_0x8BF907833BE275DE"](...args: any[]): any { return Citizen.invokeNative("0x8BF907833BE275DE", ...args); }
  ["_0x062D5EAD4DA2FA6A"](): any { return Citizen.invokeNative("0x062D5EAD4DA2FA6A"); }
  ["_0xBF4DC1784BE94DFA"](...args: any[]): any { return Citizen.invokeNative("0xBF4DC1784BE94DFA", ...args); }
  ["_0x43FA0DFC5DF87815"](...args: any[]): any { return Citizen.invokeNative("0x43FA0DFC5DF87815", ...args); }
  ["_0xB81CF134AEB56FFB"](): any { return Citizen.invokeNative("0xB81CF134AEB56FFB"); }
  ["_0xC8EDE9BDBCCBA6D4"](...args: any[]): any { return Citizen.invokeNative("0xC8EDE9BDBCCBA6D4", ...args); }
  ["_0xE4E6DD5566D28C82"](): any { return Citizen.invokeNative("0xE4E6DD5566D28C82"); }
  ["_0x3A48AB4445D499BE"](): any { return Citizen.invokeNative("0x3A48AB4445D499BE"); }
  ["_0x0150B6FF25A9E2E5"](): any { return Citizen.invokeNative("0x0150B6FF25A9E2E5"); }
  ["_0xBEF34B1D9624D5DD"](...args: any[]): any { return Citizen.invokeNative("0xBEF34B1D9624D5DD", ...args); }
}
