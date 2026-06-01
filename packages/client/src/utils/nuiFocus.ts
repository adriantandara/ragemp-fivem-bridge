let _guardTick: null | number = null;
const _holders = new Set<string>();

function _tick() {
  if (_holders.size === 0) {
    if (_guardTick !== null) {
      clearTick(_guardTick);
      _guardTick = null;
    }
    return;
  }
  if (typeof DisableControlAction === "function") {
    DisableControlAction(0, 199, true);
    DisableControlAction(0, 200, true);
    DisableControlAction(2, 199, true);
    DisableControlAction(2, 200, true);
  }
}

export function acquireNuiPauseGuard(holder: string) {
  _holders.add(holder);
  if (_guardTick === null && typeof setTick === "function") {
    _guardTick = setTick(_tick);
  }
}

export function releaseNuiPauseGuard(holder: string) {
  _holders.delete(holder);
}