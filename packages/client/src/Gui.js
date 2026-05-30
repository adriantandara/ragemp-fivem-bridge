export class GuiMp {
  constructor() {
    this.chat = new ChatMp();
    this.cursor = new CursorMp();
  }

  execute(code) {
    SendNuiMessage(JSON.stringify({ type: "execute", code }));
  }

  takeScreenshot(callback, type, quality) {
    const encodings = ["jpg", "png", "webp"];
    const encoding = encodings[type] ?? "jpg";
    const q = typeof quality === "number" ? Math.max(0, Math.min(1, quality / 100)) : 0.85;
    const hasScreenshotBasic = typeof GetResourceState === "function" && GetResourceState("screenshot-basic") === "started";
    if (!hasScreenshotBasic) {
      console.warn("[bridge] mp.gui.takeScreenshot requires the 'screenshot-basic' FiveM resource (no pure-JS screenshot API exists). Install it from https://github.com/citizenfx/screenshot-basic and add 'ensure screenshot-basic' to server.cfg.");
      if (callback) callback(null);
      return;
    }
    try {
      global.exports["screenshot-basic"].requestScreenshot(
        { encoding, quality: q },
        (data) => { if (callback) callback(data); }
      );
    } catch (err) {
      console.warn("[bridge] screenshot-basic call failed:", err);
      if (callback) callback(null);
    }
  }
}

class ChatMp {
  _active = true;
  _visible = true;
  _colors = true;
  _safeMode = false;

  activate(state) {
    this._active = state;
    emit("chat:toggleActive", state);
    globalThis.mp?.browsers?._chatBrowser?.call("chat:activate", state);
  }

  get colors() {
    return this._colors;
  }

  set colors(value) {
    this._colors = value;
  }

  get safeMode() {
    return this._safeMode;
  }

  set safeMode(value) {
    this._safeMode = value;
  }

  push(text) {
    const out = this._colors
      ? text
      : String(text).replace(/!\{#[0-9a-fA-F]{3,6}\}/g, "").replace(/\^[0-9]/g, "");
    emit("chat:addMessage", { args: [out] });
    globalThis.mp?.browsers?._chatBrowser?.call("chat:push", out);
  }

  show(state) {
    this._visible = state;
    emit("chat:toggleVisibility", state);
    globalThis.mp?.browsers?._chatBrowser?.call("chat:show", state);
  }

  clear() {
    emit("chat:clear");
    globalThis.mp?.browsers?._chatBrowser?.call("chat:clear");
  }
}

class CursorMp {
  _visible = false;

  get visible() {
    return this._visible;
  }

  set visible(value) {
    this.show(true, !!value);
  }

  show(freezeControls, state) {
    this._visible = !!state;
    SetNuiFocus(!!state, !!state);
  }

  get position() {
    if (typeof GetNuiCursorPosition === "function") {
      const [x, y] = GetNuiCursorPosition();
      return [x ?? 0, y ?? 0];
    }
    return [0, 0];
  }
}
