/** FiveM vehicle "type" for CreateVehicleServerSetter (not the same as vehicle class). */
const MODEL_TYPE_OVERRIDES: Record<string, string> = {
  akula: "heli",
  annihilator: "heli",
  buzzard: "heli",
  cargobob: "heli",
  frogger: "heli",
  havok: "heli",
  hunter: "heli",
  maverick: "heli",
  savage: "heli",
  sparrow: "heli",
  volatus: "heli",
  dinghy: "boat",
  jetmax: "boat",
  marquis: "boat",
  seashark: "boat",
  speeder: "boat",
  squalo: "boat",
  suntrap: "boat",
  toro: "boat",
  tropic: "boat",
  bmx: "bike",
  faggio: "bike",
  hakuchou: "bike",
  oppressor: "bike",
  oppressor2: "bike",
  sanchez: "bike",
  bati: "bike",
  lazer: "plane",
  hydra: "plane",
  titan: "plane",
  luxor: "plane",
  shamal: "plane",
  velum: "plane",
  dodo: "plane",
  nimbus: "plane",
  pyro: "plane",
  trailers: "trailer",
  trailers2: "trailer",
  trailers3: "trailer",
  trailers4: "trailer",
  docktrailer: "trailer",
  tanker: "trailer",
  tanker2: "trailer",
};

const NAME_TYPE_HINTS: Array<[RegExp, string]> = [
  [/bike|bmx|faggio|hakuchou|sanchez|bati|daemon|chimera|defiler|pcj|enduro|manchez|shotaro|stryder/i, "bike"],
  [/boat|dinghy|jetmax|marquis|seashark|speeder|toro|tropic|submersible|patrolboat|kosatka/i, "boat"],
  [/heli|buzzard|maverick|frogger|sparrow|volatus|akula|hunter|annihilator|cargobob|havok|savage/i, "heli"],
  [/plane|lazer|hydra|titan|luxor|shamal|velum|dodo|nimbus|pyro|molotok|starling|rogue|tula|howard/i, "plane"],
  [/trailer|docktrailer|tanker|trailers/i, "trailer"],
];

export function resolveServerVehicleType(modelHash: number, modelName?: string): string {
  const name = (modelName ?? "").trim().toLowerCase();
  if (name && MODEL_TYPE_OVERRIDES[name]) {
    return MODEL_TYPE_OVERRIDES[name];
  }
  for (const [pattern, type] of NAME_TYPE_HINTS) {
    if (name && pattern.test(name)) {
      return type;
    }
  }
  return "automobile";
}

/** Prefer CreateVehicleServerSetter (works without players nearby); fallback to CreateVehicle. */
export function createServerVehicleHandle(
  modelHash: number,
  x: number,
  y: number,
  z: number,
  heading: number,
  modelName?: string,
): number {
  const setter = (globalThis as {
    CreateVehicleServerSetter?: (
      modelHash: number,
      vehicleType: string,
      x: number,
      y: number,
      z: number,
      heading: number,
    ) => number;
  }).CreateVehicleServerSetter;
  if (typeof setter === "function") {
    const vehicleType = resolveServerVehicleType(modelHash, modelName);
    const handle = setter(modelHash, vehicleType, x, y, z, heading);
    if (handle && (typeof DoesEntityExist !== "function" || DoesEntityExist(handle))) {
      return handle;
    }
  }
  return CreateVehicle(modelHash, x, y, z, heading, true, true);
}
