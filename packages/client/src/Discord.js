export class DiscordMp {
  update(status, state) {
    const parts = [status, state].filter((p) => p != null && p !== "");
    SetRichPresence(parts.join(" - "));
  }

  requestOAuth2(_appId) {
    return Promise.reject(new Error("Discord OAuth2 not available in FiveM"));
  }
}
