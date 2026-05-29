const VK_TO_NAME = (() => {
  const map = {};
  for (let i = 0; i < 12; i++) map[0x70 + i] = `F${i + 1}`;
  for (let c = 0x41; c <= 0x5a; c++) map[c] = String.fromCharCode(c);
  for (let d = 0x30; d <= 0x39; d++) map[d] = String.fromCharCode(d);
  map[0x20] = "SPACE";
  map[0x0d] = "RETURN";
  map[0x1b] = "ESCAPE";
  map[0x09] = "TAB";
  map[0x10] = "LSHIFT";
  map[0x11] = "LCONTROL";
  map[0x12] = "LMENU";
  map[0x25] = "LEFT";
  map[0x26] = "UP";
  map[0x27] = "RIGHT";
  map[0x28] = "DOWN";
  return map;
})();

export class KeyManager {
  _bindings = new Map();
  _pressedKeys = new Set();
  _mapped = new Set();
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

    const name = VK_TO_NAME[keyCode];
    if (name && typeof RegisterKeyMapping === "function") {
      this._ensureMapping(keyCode, name);
    } else {
      this._ensureTick();
    }
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
    if (![...this._bindings.keys()].some((k) => !VK_TO_NAME[parseInt(k)])) {
      this._cleanupTick();
    }
  }

  _fire(keyCode, isDown) {
    const handlers = this._bindings.get(this._getKey(keyCode, isDown));
    if (!handlers) return;
    for (const handler of handlers) {
      try { handler(); } catch (e) {  }
    }
  }

  _ensureMapping(keyCode, name) {
    if (this._mapped.has(keyCode)) return;
    this._mapped.add(keyCode);
    const cmd = `ragempkey_${keyCode}`;
    RegisterCommand(`+${cmd}`, () => {
      this._pressedKeys.add(keyCode);
      this._fire(keyCode, true);
    }, false);
    RegisterCommand(`-${cmd}`, () => {
      this._pressedKeys.delete(keyCode);
      this._fire(keyCode, false);
    }, false);
    RegisterKeyMapping(`+${cmd}`, `RAGE:MP key ${name}`, "keyboard", name);
  }

  _ensureTick() {
    if (this._tick !== null) return;
    this._tick = setTick(() => {
      const tracked = new Set();
      for (const [key, handlers] of this._bindings) {
        const keyCode = parseInt(key);
        if (VK_TO_NAME[keyCode]) continue;
        const direction = key.endsWith("_down") ? "down" : "up";
        tracked.add(keyCode);

        const isDown = IsDisabledRawKeyPressed(keyCode) || IsRawKeyPressed(keyCode);
        const wasDown = this._pressedKeys.has(keyCode);

        if (direction === "down") {
          if (isDown && !wasDown) for (const handler of handlers) handler();
        } else if (!isDown && wasDown) {
          for (const handler of handlers) handler();
        }
      }
      for (const keyCode of tracked) {
        if (IsDisabledRawKeyPressed(keyCode) || IsRawKeyPressed(keyCode)) this._pressedKeys.add(keyCode);
        else this._pressedKeys.delete(keyCode);
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
