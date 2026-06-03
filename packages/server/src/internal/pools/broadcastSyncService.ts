import { poolStore } from "@ragemp-fivem-bridge/shared/internal";

export function setupBroadcastSync(pool: object, syncAllEvent: string): void {
  onNet("ragemp:playerReady", () => {
    const playerSource = source;
    const list: Record<string, any>[] = [];
    poolStore(pool).entities.forEach((entity) => list.push((entity as any).toData()));
    if (list.length > 0) {
      emitNet(syncAllEvent, playerSource, list);
    }
  });
}
