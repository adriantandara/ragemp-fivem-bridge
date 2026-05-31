const _bySource = new Map();

export function ingressAllowed(source, name) {
  const max = globalThis.mp?.config?.security?.ingressRateLimit ?? 30;
  if (!(max > 0)) return true;
  const now = Date.now();
  let byName = _bySource.get(source);
  if (!byName) {
    byName = new Map();
    _bySource.set(source, byName);
  }
  let b = byName.get(name);
  if (!b || now - b.start >= 1000) {
    b = { start: now, count: 0 };
    byName.set(name, b);
  }
  b.count++;
  return b.count <= max;
}

export function clearRateLimit(source) {
  _bySource.delete(source);
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
