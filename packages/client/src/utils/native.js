import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { NATIVE_SHAPES } from "./nativeShapes";

const _warned = new Set();
const _resolved = new Map();
const _probe = new Set([
  "then",
  "catch",
  "finally",
  "toJSON",
  "toArray",
  "toBSON",
  "inspect",
  "length",
  "size",
]);

function pascal(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function pascalDigits(name) {
  return pascal(name.replace(/([A-Za-z])(\d)/g, "$1_$2"));
}

function candidates(name, words) {
  const p = pascal(name);
  const list = [p];
  if (/[A-Za-z]\d/.test(name)) list.push(pascalDigits(name));
  const m = /^([a-z]+)([A-Z].*)$/.exec(name);
  const verb = m ? pascal(m[1]) : null;
  for (const w of words) {
    list.push(p + w);
    if (verb) list.push(verb + w + m[2]);
  }
  return list;
}

export function findNative(name, words) {
  const key = name + "|" + words.join(",");
  if (_resolved.has(key)) return _resolved.get(key);
  let found = null;
  for (const cand of candidates(name, words)) {
    const candidate = globalThis[cand];
    if (typeof candidate === "function") {
      found = { fn: candidate, name: cand };
      break;
    }
  }
  _resolved.set(key, found);
  return found;
}

function toVec(v) {
  if (v && typeof v === "object") {
    return new Vector3(v.x ?? v[0] ?? 0, v.y ?? v[1] ?? 0, v.z ?? v[2] ?? 0);
  }
  return v;
}

function reshape(shape, r) {
  if (shape.vec) return toVec(r);
  const out = shape.out;
  const obj = {};
  if (Array.isArray(r)) {
    let i = shape.ret ? 1 : 0;
    for (const p of out) {
      obj[p.n] = p.v ? toVec(r[i]) : r[i];
      i++;
    }
    if (shape.ret && !out.some((p) => p.n === "result")) obj.result = r[0];
  } else if (out.length === 1) {
    obj[out[0].n] = out[0].v ? toVec(r) : r;
  } else {
    return r;
  }
  return obj;
}

function invoke(resolved, args) {
  const r = resolved.fn(...args);
  const shape = NATIVE_SHAPES[resolved.name];
  return shape ? reshape(shape, r) : r;
}

function warnOnce(key, label) {
  if (_warned.has(key)) return;
  _warned.add(key);
  if (typeof console !== "undefined") {
    console.log(`[FiveM Bridge] Unmapped native ${label} — returning undefined.`);
  }
}

export function withEntityNatives(
  instance,
  getHandle,
  words = ["Entity", "Ped", "Player"],
) {
  const cache = new Map();
  return new Proxy(instance, {
    get(target, prop, receiver) {
      if (typeof prop !== "string" || prop in target) {
        return Reflect.get(target, prop, receiver);
      }
      if (_probe.has(prop)) return undefined;
      if (cache.has(prop)) return cache.get(prop);
      const resolved = findNative(prop, words);
      const fn = resolved
        ? (...args) => invoke(resolved, [getHandle(target), ...args])
        : () => {
            warnOnce("entity:" + prop, prop + "()");
            return undefined;
          };
      cache.set(prop, fn);
      return fn;
    },
  });
}

export function withGameNatives(instance, nsName, words) {
  const resolveWords = words ?? [pascal(nsName)];
  const cache = new Map();
  return new Proxy(instance, {
    get(target, prop, receiver) {
      if (typeof prop !== "string" || prop in target) {
        return Reflect.get(target, prop, receiver);
      }
      if (_probe.has(prop)) return undefined;
      if (cache.has(prop)) return cache.get(prop);
      const resolved = findNative(prop, resolveWords);
      const fn = resolved
        ? (...args) => invoke(resolved, args)
        : () => {
            warnOnce(nsName + ":" + prop, `mp.game.${nsName}.${prop}()`);
            return undefined;
          };
      cache.set(prop, fn);
      return fn;
    },
  });
}
