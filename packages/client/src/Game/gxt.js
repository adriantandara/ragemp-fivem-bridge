export class GameGxt {
  _entries = new Map();

  set(labelNameOrHash, newLabelValue) {
    const key = String(labelNameOrHash);
    this._entries.set(key, newLabelValue);
    AddTextEntry(key, newLabelValue);
  }

  get(labelNameOrHash) {
    return GetLabelText(String(labelNameOrHash));
  }

  getDefault(labelNameOrHash) {
    return GetLabelText(String(labelNameOrHash));
  }

  reset() {
    for (const [key] of this._entries) AddTextEntry(key, "");
    this._entries.clear();
  }
}
