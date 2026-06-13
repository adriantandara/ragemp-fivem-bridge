import {
  setVehicleCreateStrategy,
  setVehicleSpawnFallback,
  type CreateHandleOpts,
  type SpawnRequest,
} from "../../internal/pools/vehiclePoolService";

export const name = "world-vehicles";

interface PluginContext {
  name: string;
  resource: string;
  builtin: boolean;
  namespace(eventName: string): string;
  log(...args: any[]): void;
}

const TYPE_OVERRIDES: Record<string, string> = {
  dinghy: "boat",
  dinghy2: "boat",
  dinghy3: "boat",
  dinghy4: "boat",
  jetmax: "boat",
  marquis: "boat",
  seashark: "boat",
  seashark2: "boat",
  seashark3: "boat",
  speeder: "boat",
  speeder2: "boat",
  squalo: "boat",
  suntrap: "boat",
  toro: "boat",
  toro2: "boat",
  tropic: "boat",
  tropic2: "boat",
  tug: "boat",
  submersible: "submarine",
  submersible2: "submarine",
  kosatka: "submarine",
  avisa: "submarine",
  buzzard: "heli",
  buzzard2: "heli",
  maverick: "heli",
  frogger: "heli",
  frogger2: "heli",
  sparrow: "heli",
  volatus: "heli",
  akula: "heli",
  hunter: "heli",
  annihilator: "heli",
  annihilator2: "heli",
  cargobob: "heli",
  cargobob2: "heli",
  cargobob3: "heli",
  cargobob4: "heli",
  havok: "heli",
  savage: "heli",
  swift: "heli",
  swift2: "heli",
  supervolito: "heli",
  supervolito2: "heli",
  seasparrow: "heli",
  seasparrow2: "heli",
  seasparrow3: "heli",
  polmav: "heli",
  valkyrie: "heli",
  valkyrie2: "heli",
  skylift: "heli",
  lazer: "plane",
  hydra: "plane",
  titan: "plane",
  luxor: "plane",
  luxor2: "plane",
  shamal: "plane",
  velum: "plane",
  velum2: "plane",
  dodo: "plane",
  nimbus: "plane",
  pyro: "plane",
  molotok: "plane",
  starling: "plane",
  rogue: "plane",
  tula: "plane",
  howard: "plane",
  miljet: "plane",
  jet: "plane",
  besra: "plane",
  cuban800: "plane",
  duster: "plane",
  mammatus: "plane",
  stunt: "plane",
  vestra: "plane",
  alphaz1: "plane",
  bombushka: "plane",
  mogul: "plane",
  nokota: "plane",
  seabreeze: "plane",
  volatol: "plane",
  strikeforce: "plane",
  b11: "plane",
  avenger: "plane",
  freight: "train",
  freightcar: "train",
  freightcar2: "train",
  freightcont1: "train",
  freightcont2: "train",
  freightgrain: "train",
  tankercar: "train",
  metrotrain: "train",
  bati: "bike",
  bati2: "bike",
  akuma: "bike",
  bagger: "bike",
  bf400: "bike",
  carbonrs: "bike",
  chimera: "bike",
  cliffhanger: "bike",
  daemon: "bike",
  daemon2: "bike",
  defiler: "bike",
  double: "bike",
  enduro: "bike",
  esskey: "bike",
  faggio: "bike",
  faggio2: "bike",
  faggio3: "bike",
  fcr: "bike",
  fcr2: "bike",
  gargoyle: "bike",
  hakuchou: "bike",
  hakuchou2: "bike",
  hexer: "bike",
  innovation: "bike",
  lectro: "bike",
  manchez: "bike",
  manchez2: "bike",
  nemesis: "bike",
  nightblade: "bike",
  oppressor: "bike",
  oppressor2: "bike",
  pcj: "bike",
  ratbike: "bike",
  ruffian: "bike",
  sanchez: "bike",
  sanchez2: "bike",
  sanctus: "bike",
  shotaro: "bike",
  sovereign: "bike",
  stryder: "bike",
  thrust: "bike",
  vader: "bike",
  vindicator: "bike",
  vortex: "bike",
  wolfsbane: "bike",
  bmx: "bike",
  cruiser: "bike",
  fixter: "bike",
  scorcher: "bike",
  tribike: "bike",
  tribike2: "bike",
  tribike3: "bike",
  trailers: "trailer",
  trailers2: "trailer",
  trailers3: "trailer",
  trailers4: "trailer",
  trailersmall: "trailer",
  tanker: "trailer",
  tanker2: "trailer",
  armytanker: "trailer",
  baletrailer: "trailer",
  boattrailer: "trailer",
  graintrailer: "trailer",
  raketrailer: "trailer",
  tr2: "trailer",
  tr3: "trailer",
  tr4: "trailer",
  trflat: "trailer",
  tvtrailer: "trailer",
  docktrailer: "trailer",
  trailerlogs: "trailer",
  proptrailer: "trailer",
};

function resolveVehicleType(opts: CreateHandleOpts): string {
  if (opts.vehicleType) return opts.vehicleType;
  const modelName = opts.modelName ? opts.modelName.toLowerCase() : "";
  if (modelName && TYPE_OVERRIDES[modelName]) return TYPE_OVERRIDES[modelName];
  return "automobile";
}

function flagSet(resource: string): boolean {
  if (!resource) return false;
  let value: string | undefined;
  try {
    value = GetResourceMetadata(resource, "bridge_world_vehicles", 0);
  } catch (e) {
    return false;
  }
  return value === "yes" || value === "true" || value === "1";
}

function isEnabled(): boolean {
  if (flagSet(GetCurrentResourceName())) return true;
  const total = GetNumResources();
  for (let i = 0; i < total; i++) {
    const resource = GetResourceByFindIndex(i);
    if (resource && GetResourceMetadata(resource, "ragemp_bridge", 0) === "library" && flagSet(resource)) {
      return true;
    }
  }
  return false;
}

const RANGE = 400;
const RANGE_SQ = RANGE * RANGE;
const TICK_MS = 1000;
const MAX_ATTEMPTS = 60;

interface QueueItem {
  req: SpawnRequest;
  attempts: number;
}

let queue: QueueItem[] = [];
let running = false;

function stopFallback(): void {
  queue = [];
  running = false;
}

interface PlayerPos {
  x: number;
  y: number;
  z: number;
  dimension: number;
}

function snapshotPlayers(): PlayerPos[] {
  const out: PlayerPos[] = [];
  for (const playerId of getPlayers()) {
    const ped = GetPlayerPed(playerId);
    if (!ped || !DoesEntityExist(ped)) continue;
    const c = GetEntityCoords(ped);
    out.push({ x: c[0], y: c[1], z: c[2], dimension: GetPlayerRoutingBucket(playerId) });
  }
  return out;
}

function playerInRange(players: PlayerPos[], x: number, y: number, z: number, dimension: number): boolean {
  for (const p of players) {
    if (p.dimension !== dimension) continue;
    const dx = p.x - x;
    const dy = p.y - y;
    const dz = p.z - z;
    if (dx * dx + dy * dy + dz * dz <= RANGE_SQ) return true;
  }
  return false;
}

function tick(): void {
  const vehicles = globalThis.mp?.vehicles;
  const players = snapshotPlayers();

  for (let i = queue.length - 1; i >= 0; i--) {
    const item = queue[i];
    const vehicle = item.req.vehicle;

    if (!vehicles || !vehicles.exists(vehicle)) {
      queue.splice(i, 1);
      continue;
    }

    if (vehicle.handle) {
      queue.splice(i, 1);
      continue;
    }

    item.attempts++;
    if (item.attempts > MAX_ATTEMPTS) {
      queue.splice(i, 1);
      item.req.reject(`no player entered range within ${MAX_ATTEMPTS}s`);
      continue;
    }

    const pos = vehicle.position;
    if (!playerInRange(players, pos.x, pos.y, pos.z, vehicle.dimension)) continue;

    const handle = CreateVehicle(item.req.modelHash, pos.x, pos.y, pos.z, vehicle.heading, true, true);
    if (handle && DoesEntityExist(handle)) {
      queue.splice(i, 1);
      item.req.bind(handle);
    }
  }

  if (queue.length === 0) {
    running = false;
    return;
  }

  setTimeout(tick, TICK_MS);
}

function enqueue(req: SpawnRequest): void {
  queue.push({ req, attempts: 0 });
  if (!running) {
    running = true;
    setTimeout(tick, TICK_MS);
  }
}

export default function setup({ plugin }: { mp: any; plugin: PluginContext }): void {
  const g = globalThis as any;

  if (!isEnabled()) {
    plugin.log("disabled (add `bridge_world_vehicles 'yes'` to the bridge or gamemode fxmanifest.lua to enable)");
    return;
  }

  const hasSetter = typeof g.CreateVehicleServerSetter === "function";

  setVehicleCreateStrategy(
    (modelHash: number, x: number, y: number, z: number, heading: number, opts: CreateHandleOpts) => {
      if (hasSetter) {
        const vehicleType = resolveVehicleType(opts);
        const handle = g.CreateVehicleServerSetter(modelHash, vehicleType, x, y, z, heading);
        if (handle && DoesEntityExist(handle)) return handle;
      }
      return CreateVehicle(modelHash, x, y, z, heading, true, true);
    },
    { defaultOrphanMode: 2 },
  );

  setVehicleSpawnFallback(enqueue);

  on("onResourceStop", (resource: string) => {
    if (resource !== GetCurrentResourceName()) return;
    stopFallback();
    setVehicleCreateStrategy(null);
    setVehicleSpawnFallback(null);
  });

  plugin.log(`enabled (setter=${hasSetter ? "yes" : "no, using retry-queue"})`);
}
