import {
  defineInternals,
  poolAdd,
  poolStore,
  IdAllocator,
  setEntityId,
  setEntityRemoteId,
  INVALID_REMOTE_ID,
} from "@ragemp-fivem-bridge/shared/internal";

interface ClientPoolRec {
  ids: IdAllocator;
}

const Store = defineInternals<ClientPoolRec>();

function allocator(pool: object): IdAllocator {
  return (Store.peek(pool) ?? Store.init(pool, { ids: new IdAllocator() })).ids;
}

export function addNetworked(pool: object, entity: any): any {
  const remoteId = entity.id;
  setEntityRemoteId(entity, remoteId);
  setEntityId(entity, allocator(pool).allocate());
  poolAdd(pool, entity);
  return entity;
}

export function addLocal(pool: object, entity: any): any {
  setEntityRemoteId(entity, INVALID_REMOTE_ID);
  setEntityId(entity, allocator(pool).allocate());
  poolAdd(pool, entity);
  return entity;
}

export function attachRemoteId(pool: object, entity: any, remoteId: number): void {
  setEntityRemoteId(entity, remoteId);
  if (remoteId !== INVALID_REMOTE_ID) poolStore(pool).remoteIndex.set(remoteId, entity);
}

export function freeClientId(pool: object, localId: number): void {
  Store.peek(pool)?.ids.free(localId);
}
