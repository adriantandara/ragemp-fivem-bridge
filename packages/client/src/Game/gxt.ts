export class GameGxt {
  _entries: Map<string, string> = new Map();

  set(labelNameOrHash: string, newLabelValue: string): void {
    const key = String(labelNameOrHash);
    this._entries.set(key, newLabelValue);
    AddTextEntry(key, newLabelValue);
  }

  get(labelNameOrHash: string): string {
    return GetLabelText(String(labelNameOrHash));
  }

  getDefault(labelNameOrHash: string): string {
    return GetLabelText(String(labelNameOrHash));
  }

  reset(): void {
    for (const [key] of this._entries) AddTextEntry(key, "");
    this._entries.clear();
  }
}
