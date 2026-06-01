const _bySource: Map<number, Map<string, { start: number; count: number }>> = new Map();

export function ingressAllowed(source: number, name: string): boolean {
  const max: number = globalThis.mp?.config?.security?.ingressRateLimit ?? 30;
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

export function clearRateLimit(source: number): void {
  _bySource.delete(source);
}

export function isFiniteNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

export function isIndex(v: unknown): v is number {
  return Number.isInteger(v) && (v as number) >= 0;
}

export function asString(v: unknown, maxLen: number = 256): string | null {
  if (typeof v !== "string") return null;
  return v.length > maxLen ? v.slice(0, maxLen) : v;
}
