export class KeyManager {
  _bindings = new Map();
  _pressedKeys = new Set();
  _nuiPressed = new Set();
  _tick = null;

  constructor() {
    if (typeof RegisterNuiCallbackType === "function") {
      RegisterNuiCallbackType("ragemp:__keyEvent");
      on("__cfx_nui:ragemp:__keyEvent", (data, cb) => {
        if (data && typeof data.code === "number") {
          this._setNuiKey(data.code, !!data.down);
        }
        cb({});
      });
    }
  }

  _getKey(keyCode, isDown) {
    return `${keyCode}_${isDown ? "down" : "up"}`;
  }

  isDown(keyCode) {
    return this._pressedKeys.has(keyCode);
  }

  isUp(keyCode) {
    return !this._pressedKeys.has(keyCode);
  }

  _setNuiKey(code, down) {
    if (down) this._nuiPressed.add(code);
    else this._nuiPressed.delete(code);
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

  _ensureTick() {
    if (this._tick !== null) return;
    this._tick = setTick(() => {
      const focused = typeof IsNuiFocused === "function" && IsNuiFocused();
      if (!focused && this._nuiPressed.size) this._nuiPressed.clear();
      for (const key of this._bindings.keys()) {
        const keyCode = parseInt(key, 10);
        const isDown = focused
          ? this._nuiPressed.has(keyCode)
          : IsDisabledRawKeyPressed(keyCode) || IsRawKeyPressed(keyCode);
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
