import { GLOBAL_DIMENSION, normalizeDimension, dimensionsMatch } from "@ragemp-fivem-bridge/shared";

let localDimension = 0;
const subscribers = new Set();

export function getLocalDimension() {
  return localDimension;
}

export function setLocalDimension(value) {
  const next = normalizeDimension(value);
  if (next === localDimension) return;
  const previous = localDimension;
  localDimension = next;
  for (const callback of subscribers) {
    try { callback(next, previous); } catch (e) {  }
  }
}

export function onDimensionChange(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

export function isVisibleHere(entityDimension) {
  return dimensionsMatch(entityDimension, localDimension);
}

export { GLOBAL_DIMENSION };
