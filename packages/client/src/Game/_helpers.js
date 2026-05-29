import { Vector3 } from "@ragemp-fivem-bridge/shared";

export function toVec3(arr) {
  return new Vector3(arr[0] ?? 0, arr[1] ?? 0, arr[2] ?? 0);
}

export function createUnkProxy() {
  const cache = new Map();
  return new Proxy({}, {
    get(_, prop) {
      if (typeof prop !== "string") return undefined;
      if (cache.has(prop)) return cache.get(prop);
      if (prop.startsWith("_0x") || prop.startsWith("_0X")) {
        const hash = prop.slice(1);
        const fn = (...args) => Citizen.invokeNative(hash, ...args);
        cache.set(prop, fn);
        return fn;
      }
      return undefined;
    },
  });
}

export async function _pollUntilLoaded(requestFn, checkFn, asset, timeout) {
  requestFn(asset);
  const start = GetGameTimer();
  while (!checkFn(asset)) {
    if (GetGameTimer() - start > timeout) return false;
    await new Promise((r) => setTimeout(r, 0));
  }
  return true;
}
