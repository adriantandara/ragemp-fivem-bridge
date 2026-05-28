export class NametagsMp {
  _enabled = true;

  get enabled() {
    return this._enabled;
  }

  set enabled(v) {
    this._enabled = v;
  }

  set(style) {
    this._style = style;
  }
}
