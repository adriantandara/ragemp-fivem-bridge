const _kbHolders = new Set<string>();
let _cursorVisible = false;
let _tick: null | number = null;

function _desired() {
  const hasFocus = _kbHolders.size > 0 || _cursorVisible;
  const hasCursor = _cursorVisible;
  const keepInput = _kbHolders.size > 0 && !_cursorVisible;
  return { hasFocus, hasCursor, keepInput };
}

function _applyFocus(hasFocus: boolean, hasCursor: boolean, keepInput: boolean) {
  if (typeof SetNuiFocus === "function") SetNuiFocus(hasFocus, hasCursor);
  if (typeof SetNuiFocusKeepInput === "function") SetNuiFocusKeepInput(keepInput);
}

function _run() {
  const { hasFocus, hasCursor, keepInput } = _desired();
  if (!hasFocus) {
    if (_tick !== null) {
      clearTick(_tick);
      _tick = null;
    }
    return;
  }
  if (typeof DisableControlAction === "function") {
    DisableControlAction(0, 199, true);
    DisableControlAction(0, 200, true);
    DisableControlAction(2, 199, true);
    DisableControlAction(2, 200, true);
  }
  if (typeof IsNuiFocused === "function" && !IsNuiFocused()) {
    _applyFocus(hasFocus, hasCursor, keepInput);
  }
}

function _apply() {
  const { hasFocus, hasCursor, keepInput } = _desired();
  _applyFocus(hasFocus, hasCursor, keepInput);
  if (hasFocus && _tick === null && typeof setTick === "function") {
    _tick = setTick(_run);
  } else if (!hasFocus && _tick !== null) {
    clearTick(_tick);
    _tick = null;
  }
}

export function setBrowserFocus(holder: string, on: boolean): void {
  if (on) _kbHolders.add(holder);
  else _kbHolders.delete(holder);
  _apply();
}

export function setCursorVisible(visible: boolean): void {
  _cursorVisible = !!visible;
  _apply();
}

export function isCursorVisible(): boolean {
  return _cursorVisible;
}
