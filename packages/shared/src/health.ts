export const RAGE_HEALTH_OFFSET = 100;

export function gtaPedHealthToRage(gtaHealth: number): number {
  return Math.max(0, Math.round(gtaHealth) - RAGE_HEALTH_OFFSET);
}

export function rageHealthToGtaPed(rageHealth: number): number {
  return Math.max(0, Math.round(rageHealth)) + RAGE_HEALTH_OFFSET;
}
