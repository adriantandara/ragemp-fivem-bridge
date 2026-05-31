import { Entity } from "./Entity.js";

export const NET_REF_KEY = "__mpRef";

function entityToRef(entity) {
  const ref = { [NET_REF_KEY]: entity.type, id: entity.id };
  try {
    const netId = entity.netId;
    if (netId !== undefined && netId !== null) ref.netId = netId;
  } catch (e) {}
  return ref;
}

export function sanitizeForNet(value, seen) {
  if (value === null || typeof value !== "object") return value;
  if (value instanceof Entity) return entityToRef(value);

  if (!seen) seen = new WeakSet();
  if (seen.has(value)) return null;
  seen.add(value);

  let result;
  if (Array.isArray(value)) {
    result = new Array(value.length);
    for (let i = 0; i < value.length; i++) result[i] = sanitizeForNet(value[i], seen);
  } else if (value instanceof Map) {
    result = {};
    for (const [key, entry] of value) result[String(key)] = sanitizeForNet(entry, seen);
  } else if (value instanceof Set) {
    result = [];
    for (const entry of value) result.push(sanitizeForNet(entry, seen));
  } else {
    result = {};
    for (const key of Object.keys(value)) result[key] = sanitizeForNet(value[key], seen);
  }

  seen.delete(value);
  return result;
}

export function sanitizeArgsForNet(args) {
  if (!Array.isArray(args)) return args;
  let out = null;
  for (let i = 0; i < args.length; i++) {
    const value = args[i];
    if (value !== null && typeof value === "object") {
      if (!out) out = args.slice();
      out[i] = sanitizeForNet(value);
    }
  }
  return out ?? args;
}

export function isNetRef(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value[NET_REF_KEY] === "string" &&
    "id" in value
  );
}

export function rehydrateFromNet(value, resolve, seen) {
  if (value === null || typeof value !== "object") return value;

  if (isNetRef(value)) {
    const entity = resolve(value[NET_REF_KEY], value.id, value.netId);
    return entity ?? null;
  }

  if (!seen) seen = new WeakSet();
  if (seen.has(value)) return value;
  seen.add(value);

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) value[i] = rehydrateFromNet(value[i], resolve, seen);
  } else {
    for (const key of Object.keys(value)) value[key] = rehydrateFromNet(value[key], resolve, seen);
  }
  return value;
}

export function rehydrateArgsFromNet(args, resolve) {
  if (!Array.isArray(args)) return args;
  for (let i = 0; i < args.length; i++) {
    if (args[i] !== null && typeof args[i] === "object") {
      args[i] = rehydrateFromNet(args[i], resolve);
    }
  }
  return args;
}
