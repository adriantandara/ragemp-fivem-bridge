export class NametagsMp {
  _enabled: boolean = true;
  _style: unknown;

  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(v: boolean) {
    this._enabled = v;
  }

  set(style: unknown): void {
    this._style = style;
  }
}
