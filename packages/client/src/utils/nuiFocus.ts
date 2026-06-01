let _pauseTick: number | null = null;

export function ensureNuiPauseGuard(): void {
  if (_pauseTick !== null) return;
  if (typeof setTick !== "function") return;
  _pauseTick = setTick(() => {
    if (typeof IsNuiFocused === "function" && !IsNuiFocused()) {
      clearTick(_pauseTick!);
      _pauseTick = null;
      return;
    }
    if (typeof DisableControlAction === "function") {
      DisableControlAction(0, 199, true);
      DisableControlAction(0, 200, true);
    }
  });
}
