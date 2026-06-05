import { defineInternals, poolStore, poolAdd, IdAllocator } from "@ragemp-fivem-bridge/shared/internal";

interface BroadcastPoolRec {
  ids: IdAllocator;
  createEvent: string;
}

const Store = defineInternals<BroadcastPoolRec>();

export function setupBroadcastPool(pool: object, createEvent: string, syncAllEvent: string): void {
  Store.init(pool, { ids: new IdAllocator(), createEvent });
  onNet("ragemp:playerReady", () => {
    const playerSource = source;
    const list: Record<string, any>[] = [];
    poolStore(pool).entities.forEach((entity) => list.push((entity as any).toData()));
    if (list.length > 0) {
      emitNet(syncAllEvent, playerSource, list);
    }
  });
}

export function nextBroadcastId(pool: object): number {
  return Store.get(pool).ids.allocate();
}

export function registerBroadcast<T extends { id: number; toData(): Record<string, any> }>(pool: object, entity: T): T {
  poolAdd(pool, entity as any);
  emitNet(Store.get(pool).createEvent, -1, entity.toData());
  return entity;
}

export function freeBroadcastId(pool: object, id: number): void {
  Store.get(pool).ids.free(id);
}
