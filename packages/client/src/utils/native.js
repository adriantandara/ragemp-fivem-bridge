const _warned = new Set();

function pascal(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function findNative(name, prefixes) {
  const p = pascal(name);
  for (const pre of prefixes) {
    const fn = globalThis[pre + p];
    if (typeof fn === "function") return fn;
  }
  return null;
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
  prefixes = ["Entity", "Ped", "", "Player"],
) {
  const cache = new Map();
  return new Proxy(instance, {
    get(target, prop, receiver) {
      if (typeof prop !== "string" || prop in target) {
        return Reflect.get(target, prop, receiver);
      }
      if (cache.has(prop)) return cache.get(prop);
      const native = findNative(prop, prefixes);
      const fn = native
        ? (...args) => native(getHandle(target), ...args)
        : () => {
            warnOnce("entity:" + prop, prop + "()");
            return undefined;
          };
      cache.set(prop, fn);
      return fn;
    },
  });
}

export function withGameNatives(instance, nsName, prefixes = [""]) {
  const cache = new Map();
  return new Proxy(instance, {
    get(target, prop, receiver) {
      if (typeof prop !== "string" || prop in target) {
        return Reflect.get(target, prop, receiver);
      }
      if (cache.has(prop)) return cache.get(prop);
      const native = findNative(prop, prefixes);
      const fn = native
        ? (...args) => native(...args)
        : () => {
            warnOnce(nsName + ":" + prop, `mp.game.${nsName}.${prop}()`);
            return undefined;
          };
      cache.set(prop, fn);
      return fn;
    },
  });
}
