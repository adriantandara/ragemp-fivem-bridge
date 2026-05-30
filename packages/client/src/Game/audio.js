import { createUnkProxy } from "./_helpers.js";

export class GameAudioNs {
  unk = createUnkProxy();

  getSoundId() { return GetSoundId(); }
  releaseSoundId(soundId) { ReleaseSoundId(soundId); }
  playSound(soundId, audioName, audioRef, p3, p4, p5) {
    PlaySound(soundId, audioName, audioRef, p3 ?? false, p4 ?? 0, p5 ?? true);
  }
  playSoundFrontend(soundId, audioName, audioRef, p3) {
    PlaySoundFrontend(soundId, audioName, audioRef, p3 ?? true);
  }
  playSoundFromEntity(soundId, audioName, entity, audioRef, p4, p5) {
    PlaySoundFromEntity(soundId, audioName, entity, audioRef, p4 ?? false, p5 ?? 0);
  }
  playSoundFromCoord(soundId, audioName, x, y, z, audioRef, isNetwork, rangeMax, p8) {
    PlaySoundFromCoord(soundId, audioName, x, y, z, audioRef, isNetwork ?? false, rangeMax ?? 0, p8 ?? false);
  }
  stopSound(soundId) { StopSound(soundId); }
  hasSoundFinished(soundId) { return HasSoundFinished(soundId); }

  playPedAmbientSpeechNative(ped, speechName, speechParam, p3) {
    PlayPedAmbientSpeechNative(ped, speechName, speechParam, p3 ?? 0);
  }
  playPedAmbientSpeech(ped, speechName) {
    PlayPedAmbientSpeechNative(ped, speechName, "SPEECH_PARAMS_STANDARD", 0);
  }
  stopCurrentPlayingSpeech(ped) { StopCurrentPlayingSpeech(ped); }
  isAnySpeechPlaying(ped) { return IsAmbientSpeechPlaying(ped); }
  isSpeechPlaying(ped, _speechName) { return IsScriptedSpeechPlaying(ped); }

  setRadioToStationName(stationName) { SetRadioToStationName(stationName); }
  setRadioToStationIndex(radioStation) { SetRadioToStationIndex(radioStation); }
  getPlayerRadioStationIndex() { return GetPlayerRadioStationIndex(); }
  getPlayerRadioStationName() { return GetPlayerRadioStationName(); }
  skipRadioForward() { SkipRadioForward(); }

  setVehRadioStation(vehicle, radioStation) { SetVehRadioStation(vehicle, radioStation); }
  setVehicleRadioEnabled(vehicle, toggle) { SetVehicleRadioEnabled(vehicle, toggle); }
  overrideVehHorn(vehicle, override, hornHash) { OverrideVehHorn(vehicle, override, hornHash); }
  triggerSiren(vehicle) { TriggerSiren(vehicle); }

  setAmbZoneState(ambZoneName, state) { SetAmbZoneState(ambZoneName, state, 0, 1000); }
  clearAmbZoneState(ambZoneName) { SetAmbZoneState(ambZoneName, false, 0, 1000); }
  activateAudioScene(audioSceneName) { ActivateAudioScene(audioSceneName); }
  deactivateAudioScene(audioSceneName) { DeactivateAudioScene(audioSceneName); }
  isAudioSceneActive(audioSceneName) { return IsAudioSceneActive(audioSceneName); }

  setMusicVolume(level) { SetMusicVolume(level); }
  setMusicVolumeSmoothly(level, timeMs) { SetMusicVolumeSmoothly(level, timeMs); }
  triggerMusicEvent(eventName) { TriggerMusicEvent(eventName); }
  cancelMusicEvent(eventName) { CancelMusicEvent(eventName); }
}
