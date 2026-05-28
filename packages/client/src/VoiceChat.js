const LISTEN_CHANNEL = 31;

export class VoiceChatMp {
  _enabled = true;

  get connected() {
    return MumbleIsConnected();
  }

  get enabled() {
    return this._enabled;
  }

  set enabled(value) {
    this._enabled = !!value;
    NetworkSetVoiceActive(this._enabled);
  }

  get proximity() {
    return MumbleGetTalkerProximity();
  }

  set proximity(value) {
    MumbleSetTalkerProximity(value);
  }

  listenTo(player) {
    const serverId = typeof player === "number" ? player : player?.id;
    if (serverId != null) {
      MumbleAddVoiceTargetPlayerByServerId(LISTEN_CHANNEL, serverId);
      MumbleAddVoiceChannelListen(LISTEN_CHANNEL);
    }
  }

  stopListenTo(player) {
    const serverId = typeof player === "number" ? player : player?.id;
    if (serverId != null) {
      MumbleRemoveVoiceTargetPlayerByServerId(LISTEN_CHANNEL, serverId);
    }
  }

  stopListenToAll() {
    MumbleClearVoiceTarget(LISTEN_CHANNEL);
    MumbleRemoveVoiceChannelListen(LISTEN_CHANNEL);
  }

  isTalking(player) {
    const p = typeof player === "number" ? player : player?.id;
    if (p == null) return NetworkIsPlayerTalking(PlayerId());
    return MumbleIsPlayerTalking(GetPlayerFromServerId(p));
  }

  setChannel(channel) {
    MumbleSetVoiceChannel(channel);
  }

  setAudioInputDistance(distance) {
    MumbleSetAudioInputDistance(distance);
  }

  setAudioOutputDistance(distance) {
    MumbleSetAudioOutputDistance(distance);
  }
}
