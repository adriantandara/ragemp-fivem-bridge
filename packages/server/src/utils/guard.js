const _buckets = new Map();

export function rateLimit(key, max = 30, windowMs = 1000) {
  if (!(max > 0)) return true;
  const now = Date.now();
  let b = _buckets.get(key);
  if (!b || now - b.start >= windowMs) {
    b = { start: now, count: 0 };
    _buckets.set(key, b);
  }
  b.count++;
  return b.count <= max;
}

export function clearRateLimit(prefix) {
  for (const k of _buckets.keys()) {
    if (k.indexOf(prefix) === 0) _buckets.delete(k);
  }
}

export function ingressAllowed(source, name) {
  const max = globalThis.mp?.config?.security?.ingressRateLimit ?? 30;
  return rateLimit(`${source}:${name}`, max, 1000);
}

export function isFiniteNumber(v) {
  return typeof v === "number" && Number.isFinite(v);
}

export function isIndex(v) {
  return Number.isInteger(v) && v >= 0;
}

export function asString(v, maxLen = 256) {
  if (typeof v !== "string") return null;
  return v.length > maxLen ? v.slice(0, maxLen) : v;
}
