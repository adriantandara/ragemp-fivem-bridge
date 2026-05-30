const MpTypes = {
  Blip: "b",
  Checkpoint: "cp",
  Colshape: "c",
  Label: "l",
  Marker: "m",
  Object: "o",
  Pickup: "p",
  Player: "pl",
  Vehicle: "v",
};

const TYPE_TO_MP = {
  blip: { code: MpTypes.Blip, pool: "blips" },
  checkpoint: { code: MpTypes.Checkpoint, pool: "checkpoints" },
  colshape: { code: MpTypes.Colshape, pool: "colshapes" },
  textlabel: { code: MpTypes.Label, pool: "labels" },
  marker: { code: MpTypes.Marker, pool: "markers" },
  object: { code: MpTypes.Object, pool: "objects" },
  pickup: { code: MpTypes.Pickup, pool: "pickups" },
  player: { code: MpTypes.Player, pool: "players" },
  vehicle: { code: MpTypes.Vehicle, pool: "vehicles" },
};

let DEBUG_MODE = false;

export function setDebugMode(state) {
  DEBUG_MODE = !!state;
}

export function getEnvironment() {
  const mp = globalThis.mp;
  if (!mp) return null;
  if (typeof mp.joaat === "function" && !mp.game) return "server";
  if (mp.game && typeof mp.game.joaat === "function") return "client";
  if (typeof mp.trigger === "function") return "cef";
  return null;
}

export function log(data, type = "info") {
  if (!DEBUG_MODE) return;

  const env = getEnvironment();
  const mp = globalThis.mp;
  const message = `RPC (${env}): ${data}`;
  const clientFormatLog = { info: "logInfo", error: "logError", warn: "logWarn" };

  try {
    if (mp && mp.console && typeof mp.console[clientFormatLog[type]] === "function") {
      mp.console[clientFormatLog[type]](message);
    } else {
      const fn = type === "info" ? "log" : type;
      (console[fn] || console.log)(message);
    }
  } catch (e) {

  }
}

export function generateId() {
  const first = (Math.random() * 46656) | 0;
  const second = (Math.random() * 46656) | 0;
  return ("000" + first.toString(36)).slice(-3) + ("000" + second.toString(36)).slice(-3);
}

function mpTypeOf(value, mp) {
  if (!mp || !value || typeof value !== "object" || typeof value.id === "undefined") return null;
  const entry = TYPE_TO_MP[value.type];
  if (!entry) return null;
  const pool = mp[entry.pool];
  if (pool && typeof pool.at === "function" && pool.at(value.id) === value) return entry.code;
  return null;
}

export function stringifyData(data) {
  const env = getEnvironment();
  const mp = globalThis.mp;
  return JSON.stringify(data, (_, value) => {
    if ((env === "client" || env === "server") && value && typeof value === "object") {
      const type = mpTypeOf(value, mp);
      if (type) return { __t: type, i: typeof value.remoteId === "number" ? value.remoteId : value.id };
    }
    return value;
  });
}

export function parseData(data) {
  const env = getEnvironment();
  const mp = globalThis.mp;
  return JSON.parse(data, (_, value) => {
    if ((env === "client" || env === "server") && value && typeof value === "object"
        && typeof value.__t === "string" && typeof value.i === "number"
        && Object.keys(value).length === 2) {
      const id = value.i;
      let collection = null;
      switch (value.__t) {
        case MpTypes.Blip: collection = mp.blips; break;
        case MpTypes.Checkpoint: collection = mp.checkpoints; break;
        case MpTypes.Colshape: collection = mp.colshapes; break;
        case MpTypes.Label: collection = mp.labels; break;
        case MpTypes.Marker: collection = mp.markers; break;
        case MpTypes.Object: collection = mp.objects; break;
        case MpTypes.Pickup: collection = mp.pickups; break;
        case MpTypes.Player: collection = mp.players; break;
        case MpTypes.Vehicle: collection = mp.vehicles; break;
      }
      if (collection) return collection[env === "client" ? "atRemoteId" : "at"](id);
    }
    return value;
  });
}

export function promiseResolve(result) {
  return Promise.resolve(result);
}

export function promiseReject(error) {
  return Promise.reject(error);
}

export function promiseTimeout(promise, timeout) {
  if (typeof timeout === "number") {
    return Promise.race([
      new Promise((_, reject) => setTimeout(() => reject("TIMEOUT"), timeout)),
      promise,
    ]);
  }
  return promise;
}

export function isBrowserValid(browser) {
  try {
    if (browser._destroyed) return false;
    browser.url;
  } catch (e) { return false; }
  return true;
}

export function chunkSubstr(str, size) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);
  let index = 0;
  for (let i = 0; i < numChunks; i += 1) {
    chunks[i] = str.substr(index, size);
    index += size;
  }
  return chunks;
}
