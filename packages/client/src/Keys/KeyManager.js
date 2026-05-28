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
    if (!this._bindings.has(key)) {
      this._bindings.set(key, new Set());
    }
    this._bindings.get(key).add(handler);
    this._ensureTick();
  }

  unbind(keyCode, isDown, handler) {
    const key = this._getKey(keyCode, isDown);
    const handlers = this._bindings.get(key);
    if (!handlers) return;

    if (handler) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this._bindings.delete(key);
      }
    } else {
      this._bindings.delete(key);
    }

    if (this._bindings.size === 0) {
      this._cleanupTick();
    }
  }

  _ensureTick() {
    if (this._tick !== null) return;
    this._tick = setTick(() => {
      const trackedKeyCodes = new Set();

      for (const [key, handlers] of this._bindings) {
        const [keyCodeStr, direction] = key.split("_");
        const keyCode = parseInt(keyCodeStr);
        trackedKeyCodes.add(keyCode);

        if (direction === "down") {
          if (IsDisabledRawKeyPressed(keyCode) || IsRawKeyPressed(keyCode)) {
            for (const handler of handlers) {
              handler();
            }
          }
        } else {
          if (IsDisabledRawKeyReleased(keyCode) || IsRawKeyReleased(keyCode)) {
            for (const handler of handlers) {
              handler();
            }
          }
        }
      }

      for (const keyCode of trackedKeyCodes) {
        if (IsDisabledRawKeyPressed(keyCode) || IsRawKeyPressed(keyCode)) {
          this._pressedKeys.add(keyCode);
        }
        if (IsDisabledRawKeyReleased(keyCode) || IsRawKeyReleased(keyCode)) {
          this._pressedKeys.delete(keyCode);
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
