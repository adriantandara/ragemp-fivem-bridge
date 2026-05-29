let started = false;
let intervalMs = 200;
let handle = null;

const subscribers = new Set();
const cache = { players: [], vehicles: [], peds: [], pass: 0 };

function scan() {
  cache.players = GetActivePlayers();
  cache.vehicles = GetGamePool("CVehicle");
  cache.peds = GetGamePool("CPed");
  cache.pass++;
  for (const cb of subscribers) {
    try { cb(cache); } catch (e) {  }
  }
}

export function startWorldScan(ms) {
  if (typeof ms === "number" && ms > 0) intervalMs = ms;
  if (started) return;
  started = true;
  scan();
  handle = setInterval(scan, intervalMs);
}

export function onWorldScan(cb) {
  startWorldScan();
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

export function getVehiclePool() {
  return cache.vehicles;
}

export function getPedPool() {
  return cache.peds;
}
