export class KeyManager {
  _bindings = new Map();
  _pressedKeys = new Set();
  _tick = null;

  _getKey(keyCode, isDown) {
    return `${keyCode}_${isDown ? "down" : "up"}`;
  }

  isDown(keyCode) {
    return this._pressedKeys.has(keyCode);
  }

  isUp(keyCode) {
    return !this._pressedKeys.has(keyCode);
  }

  bind(keyCode, isDown, handler) {
    const key = this._getKey(keyCode, isDown);
    if (!this._bindings.has(key)) this._bindings.set(key, new Set());
    this._bindings.get(key).add(handler);
    this._ensureTick();
  }

  unbind(keyCode, isDown, handler) {
    const key = this._getKey(keyCode, isDown);
    const handlers = this._bindings.get(key);
    if (!handlers) return;
    if (handler) {
      handlers.delete(handler);
      if (handlers.size === 0) this._bindings.delete(key);
    } else {
      this._bindings.delete(key);
    }
    if (this._bindings.size === 0) this._cleanupTick();
  }

  _fire(keyCode, isDown) {
    const handlers = this._bindings.get(this._getKey(keyCode, isDown));
    if (!handlers) return;
    for (const handler of handlers) {
      try {
        handler();
      } catch (e) {}
    }
  }

  _isPressed(keyCode) {
    return IsDisabledRawKeyPressed(keyCode) || IsRawKeyPressed(keyCode);
  }

  _ensureTick() {
    if (this._tick !== null) return;
    this._tick = setTick(() => {
      const codes = new Set();
      for (const key of this._bindings.keys()) codes.add(parseInt(key, 10));
      for (const keyCode of codes) {
        const isDown = this._isPressed(keyCode);
        const wasDown = this._pressedKeys.has(keyCode);
        if (isDown && !wasDown) {
          this._pressedKeys.add(keyCode);
          this._fire(keyCode, true);
        } else if (!isDown && wasDown) {
          this._pressedKeys.delete(keyCode);
          this._fire(keyCode, false);
        }
      }
    });
  }

  _cleanupTick() {
    if (this._tick !== null) {
      clearTick(this._tick);
      this._tick = null;
    }
  }
}
