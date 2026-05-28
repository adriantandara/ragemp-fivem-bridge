export class UserMp {
  get name() {
    return globalThis.mp?.players?.local?.name ?? GetPlayerName(PlayerId());
  }

  get socialClub() {
    return "";
  }

  get rgscId() {
    return "";
  }

  get serial() {
    return "";
  }
}
