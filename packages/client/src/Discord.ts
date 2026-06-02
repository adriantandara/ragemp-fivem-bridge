export class DiscordMp {
  update(status: string, state?: string): void {
    const parts = [status, state].filter((p) => p != null && p !== "");
    SetRichPresence(parts.join(" - "));
  }

  requestOAuth2(_appId: string): Promise<never> {
    return Promise.reject(new Error("Discord OAuth2 not available in FiveM"));
  }
}
