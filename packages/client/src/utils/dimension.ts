import { GLOBAL_DIMENSION, normalizeDimension, dimensionsMatch } from "@ragemp-fivem-bridge/shared";

type DimensionChangeCallback = (next: number, previous: number) => void;

let localDimension = 0;
const subscribers: Set<DimensionChangeCallback> = new Set();

export function getLocalDimension(): number {
  return localDimension;
}

export function setLocalDimension(value: number): void {
  const next = normalizeDimension(value);
  if (next === localDimension) return;
  const previous = localDimension;
  localDimension = next;
  for (const callback of subscribers) {
    try { callback(next, previous); } catch (e) {  }
  }
}

export function onDimensionChange(callback: DimensionChangeCallback): () => void {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

export function isVisibleHere(entityDimension: number): boolean {
  return dimensionsMatch(entityDimension, localDimension);
}

export { GLOBAL_DIMENSION };
