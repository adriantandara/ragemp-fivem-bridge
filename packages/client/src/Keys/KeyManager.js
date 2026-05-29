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

  constructor() {
    if (typeof RegisterNuiCallbackType === "function") {
      RegisterNuiCallbackType("ragemp:__keyEvent");
      on("__cfx_nui:ragemp:__keyEvent", (data, cb) => {
        if (data && typeof data.code === "number") this._press(data.code, !!data.down);
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

  _fire(keyCode, isDown) {
    const handlers = this._bindings.get(this._getKey(keyCode, isDown));
    if (!handlers) return;
    for (const handler of handlers) {
      try {
        handler();
      } catch (e) {}
    }
  }

  _press(keyCode, down) {
    if (down) {
      if (this._pressedKeys.has(keyCode)) return;
      this._pressedKeys.add(keyCode);
      this._fire(keyCode, true);
    } else {
      if (!this._pressedKeys.has(keyCode)) return;
      this._pressedKeys.delete(keyCode);
      this._fire(keyCode, false);
    }
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
    const stillNeedsTick = [...this._bindings.keys()].some(
      (k) => !VK_TO_NAME[parseInt(k, 10)],
    );
    if (!stillNeedsTick) this._cleanupTick();
  }

  _ensureMapping(keyCode, name) {
    if (this._mapped.has(keyCode)) return;
    this._mapped.add(keyCode);
    const cmd = `ragempkey_${keyCode}`;
    RegisterCommand(`+${cmd}`, () => this._press(keyCode, true), false);
    RegisterCommand(`-${cmd}`, () => this._press(keyCode, false), false);
    RegisterKeyMapping(`+${cmd}`, `RAGE:MP key ${name}`, "keyboard", name);
  }

  _ensureTick() {
    if (this._tick !== null) return;
    this._tick = setTick(() => {
      if (typeof IsNuiFocused === "function" && IsNuiFocused()) return;
      for (const key of this._bindings.keys()) {
        const keyCode = parseInt(key, 10);
        if (VK_TO_NAME[keyCode]) continue;
        const down = IsDisabledRawKeyPressed(keyCode) || IsRawKeyPressed(keyCode);
        this._press(keyCode, down);
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
