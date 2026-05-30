export const GLOBAL_DIMENSION = 4294967295;

export function normalizeDimension(value) {
  if (value === undefined || value === null) return 0;
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return n < 0 ? 0 : Math.floor(n);
}

export function isGlobalDimension(value) {
  return normalizeDimension(value) === GLOBAL_DIMENSION;
}

export function dimensionsMatch(entityDimension, observerDimension) {
  const e = normalizeDimension(entityDimension);
  if (e === GLOBAL_DIMENSION) return true;
  return e === normalizeDimension(observerDimension);
}
