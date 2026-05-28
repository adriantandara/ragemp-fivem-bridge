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

export function getEnvironment() {
  const mp = globalThis.mp;
  if (!mp) return null;
  if (typeof mp.joaat === "function" && !mp.game) return "server";
  if (mp.game && typeof mp.game.joaat === "function") return "client";
  if (typeof mp.trigger === "function") return "cef";
  return null;
}

export function uid() {
  const first = (Math.random() * 46656) | 0;
  const second = (Math.random() * 46656) | 0;
  return ("000" + first.toString(36)).slice(-3) + ("000" + second.toString(36)).slice(-3);
}

function isObjectMpType(value, type) {
  const env = getEnvironment();
  const mp = globalThis.mp;
  if (!value || typeof value !== "object" || typeof value.id === "undefined") return false;
  if (env === "client") {
    switch (type) {
      case MpTypes.Blip: return value.type === "blip" && mp.blips?.at(value.id) === value;
      case MpTypes.Checkpoint: return value.type === "checkpoint" && mp.checkpoints?.at(value.id) === value;
      case MpTypes.Colshape: return value.type === "colshape" && mp.colshapes?.at(value.id) === value;
      case MpTypes.Label: return value.type === "textlabel" && mp.labels?.at(value.id) === value;
      case MpTypes.Marker: return value.type === "marker" && mp.markers?.at(value.id) === value;
      case MpTypes.Object: return value.type === "object" && mp.objects?.at(value.id) === value;
      case MpTypes.Pickup: return value.type === "pickup" && mp.pickups?.at(value.id) === value;
      case MpTypes.Player: return value.type === "player" && mp.players?.at(value.id) === value;
      case MpTypes.Vehicle: return value.type === "vehicle" && mp.vehicles?.at(value.id) === value;
    }
  } else if (env === "server") {
    switch (type) {
      case MpTypes.Blip: return mp.blips?.at(value.id) === value;
      case MpTypes.Checkpoint: return mp.checkpoints?.at(value.id) === value;
      case MpTypes.Colshape: return mp.colshapes?.at(value.id) === value;
      case MpTypes.Label: return mp.labels?.at(value.id) === value;
      case MpTypes.Marker: return mp.markers?.at(value.id) === value;
      case MpTypes.Object: return mp.objects?.at(value.id) === value;
      case MpTypes.Pickup: return mp.pickups?.at(value.id) === value;
      case MpTypes.Player: return mp.players?.at(value.id) === value;
      case MpTypes.Vehicle: return mp.vehicles?.at(value.id) === value;
    }
  }
  return false;
}

export function stringifyData(data) {
  const env = getEnvironment();
  return JSON.stringify(data, (_, value) => {
    if ((env === "client" || env === "server") && value && typeof value === "object") {
      let type = null;
      if (isObjectMpType(value, MpTypes.Blip)) type = MpTypes.Blip;
      else if (isObjectMpType(value, MpTypes.Checkpoint)) type = MpTypes.Checkpoint;
      else if (isObjectMpType(value, MpTypes.Colshape)) type = MpTypes.Colshape;
      else if (isObjectMpType(value, MpTypes.Marker)) type = MpTypes.Marker;
      else if (isObjectMpType(value, MpTypes.Object)) type = MpTypes.Object;
      else if (isObjectMpType(value, MpTypes.Pickup)) type = MpTypes.Pickup;
      else if (isObjectMpType(value, MpTypes.Player)) type = MpTypes.Player;
      else if (isObjectMpType(value, MpTypes.Vehicle)) type = MpTypes.Vehicle;
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
  return new Promise((resolve) => setTimeout(() => resolve(result), 0));
}

export function promiseReject(error) {
  return new Promise((_, reject) => setTimeout(() => reject(error), 0));
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
  try { browser.url; } catch (e) { return false; }
  return true;
}
