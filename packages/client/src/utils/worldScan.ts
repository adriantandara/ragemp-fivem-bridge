interface WorldScanCache {
  players: number[];
  vehicles: number[];
  peds: number[];
  pass: number;
}

type WorldScanCallback = (cache: WorldScanCache) => void;

let started = false;
let intervalMs = 200;
let handle: ReturnType<typeof setInterval> | null = null;

const subscribers: Set<WorldScanCallback> = new Set();
const cache: WorldScanCache = { players: [], vehicles: [], peds: [], pass: 0 };

function scan(): void {
  cache.players = GetActivePlayers();
  cache.vehicles = GetGamePool("CVehicle");
  cache.peds = GetGamePool("CPed");
  cache.pass++;
  for (const cb of subscribers) {
    try { cb(cache); } catch (e) {  }
  }
}

export function startWorldScan(ms?: number): void {
  if (typeof ms === "number" && ms > 0) intervalMs = ms;
  if (started) return;
  started = true;
  scan();
  handle = setInterval(scan, intervalMs);
  if (typeof on === "function") {
    on("onResourceStop", (name: string) => {
      if (typeof GetCurrentResourceName === "function" && name !== GetCurrentResourceName()) return;
      if (handle !== null) {
        clearInterval(handle);
        handle = null;
      }
      started = false;
      subscribers.clear();
    });
  }
}

export function onWorldScan(cb: WorldScanCallback): () => void {
  startWorldScan();
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

export function getVehiclePool(): number[] {
  return cache.vehicles;
}

export function getPedPool(): number[] {
  return cache.peds;
}
