import { Vector3 } from "@ragemp-fivem-bridge/shared";

export function toVec3(arr: [number, number, number] | number[]): Vector3 {
  return new Vector3(arr[0] ?? 0, arr[1] ?? 0, arr[2] ?? 0);
}

export function createUnkProxy(): any {
  const cache = new Map<string, (...args: any[]) => any>();
  return new Proxy({}, {
    get(_, prop) {
      if (typeof prop !== "string") return undefined;
      if (cache.has(prop)) return cache.get(prop);
      if (prop.startsWith("_0x") || prop.startsWith("_0X")) {
        const hash = prop.slice(1);
        const fn = (...args: any[]) => Citizen.invokeNative(hash, ...args);
        cache.set(prop, fn);
        return fn;
      }
      return undefined;
    },
  });
}

export async function _pollUntilLoaded(
  requestFn: (asset: any) => void,
  checkFn: (asset: any) => boolean,
  asset: any,
  timeout: number
): Promise<boolean> {
  requestFn(asset);
  const start = GetGameTimer();
  while (!checkFn(asset)) {
    if (GetGameTimer() - start > timeout) return false;
    await new Promise((r) => (setTimeout as any)(r, 0));
  }
  return true;
}
