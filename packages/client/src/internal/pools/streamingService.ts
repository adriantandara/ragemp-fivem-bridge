import { poolStore, poolAdd, poolRemove, EntityInternals } from "@ragemp-fivem-bridge/shared/internal";
import { onWorldScan } from "../../utils/worldScan";
import { safeGetNetworkId, safeGetEntityFromNetId } from "../../utils/netId";
import { subscribeEntityRegistry } from "../../utils/entityRegistry";
import {
  StreamingInternals,
  initStreamingInternals,
  streamEntityState,
  type StreamingInternalsRec,
} from "../streamingInternals";

export const LOCAL_STREAM_ID_BASE = 2_000_000_000;

export function setupStreamingPool(pool: object, netType: string | null): StreamingInternalsRec {
  return initStreamingInternals(pool, netType);
}

export function setStreamHandlers(
  pool: object,
  handlers: {
    onStreamIn?: (entity: any, handle: number, netId: number) => void;
    onStreamOut?: (entity: any) => void;
  },
): void {
  const rec = StreamingInternals.get(pool);
  if (handlers.onStreamIn) rec.onStreamIn = handlers.onStreamIn;
  if (handlers.onStreamOut) rec.onStreamOut = handlers.onStreamOut;
}

export function startNetworked(pool: object, makeEntity?: (id: number, handle: number) => any): void {
  const rec = StreamingInternals.get(pool);
  if (makeEntity) rec.makeEntity = makeEntity;
  subscribeRegistry(pool, rec);
}

export function startStreaming(
  pool: object,
  getHandles: () => number[],
  makeEntity: (id: number, handle: number) => any,
  filter?: (handle: number) => boolean,
): void {
  const rec = StreamingInternals.get(pool);
  rec.makeEntity = makeEntity;
  rec.filter = filter ?? null;
  subscribeRegistry(pool, rec);
  onWorldScan(() => scan(pool, getHandles));
}

function subscribeRegistry(pool: object, rec: StreamingInternalsRec): void {
  if (!rec.netType) return;
  subscribeEntityRegistry(rec.netType, {
    create: (remoteId: number, data: any) => onServerCreate(pool, remoteId, data),
    netid: (remoteId: number, netId: number) => onServerNetId(pool, remoteId, netId),
    destroy: (remoteId: number) => onServerDestroy(pool, remoteId),
  });
}

function onServerCreate(pool: object, remoteId: number, data: any): void {
  const rec = StreamingInternals.get(pool);
  if (rec.byRemote.has(remoteId)) return;
  const entity = rec.makeEntity!(remoteId, null);
  const state = streamEntityState(entity);
  state.isServer = true;
  state.netId = 0;
  state.serverModel = data?.model ?? 0;
  state.serverPos = { x: data?.x ?? 0, y: data?.y ?? 0, z: data?.z ?? 0 };
  state.serverDimension = data?.dimension ?? 0;
  rec.byRemote.set(remoteId, entity);
}

function onServerNetId(pool: object, remoteId: number, netId: number): void {
  if (!netId) return;
  const rec = StreamingInternals.get(pool);
  let entity = rec.byRemote.get(remoteId);
  if (!entity) {
    onServerCreate(pool, remoteId, {});
    entity = rec.byRemote.get(remoteId);
  }
  const state = streamEntityState(entity);
  if (state.netId && state.netId !== netId) {
    rec.netIdToRemote.delete(state.netId);
  }
  state.netId = netId;
  rec.netIdToRemote.set(netId, remoteId);
  refreshServerHandle(pool, entity);
}

function onServerDestroy(pool: object, remoteId: number): void {
  const rec = StreamingInternals.get(pool);
  const entity = rec.byRemote.get(remoteId);
  if (!entity) return;
  const state = streamEntityState(entity);
  rec.byRemote.delete(remoteId);
  if (state.netId) rec.netIdToRemote.delete(state.netId);
  if (entity.handle) {
    rec.handleToEntity.delete(entity.handle);
  }
  const entities = poolStore(pool).entities;
  if (entities.has(remoteId)) {
    globalThis.mp?.events?.call("entityStreamOut", entity);
    rec.onStreamOut?.(entity);
    entities.delete(remoteId);
  }
  EntityInternals.get(entity).handle = null;
}

export function bindHandle(pool: object, remoteId: number, handle: number, netId: number): any {
  const rec = StreamingInternals.get(pool);
  let entity = rec.byRemote.get(remoteId);
  if (!entity) {
    entity = rec.makeEntity!(remoteId, handle);
    streamEntityState(entity).isServer = true;
    rec.byRemote.set(remoteId, entity);
  }

  const state = streamEntityState(entity);
  const entities = poolStore(pool).entities;
  const occupant = rec.handleToEntity.get(handle);
  if (occupant && occupant !== entity) {
    rec.handleToEntity.delete(handle);
    entities.delete(occupant.id);
  }

  state.isServer = true;
  if (netId) state.netId = netId;
  if (entity.handle && entity.handle !== handle) {
    rec.handleToEntity.delete(entity.handle);
  }
  EntityInternals.get(entity).handle = handle;
  rec.handleToEntity.set(handle, entity);
  if (!entities.has(entity.id)) {
    poolAdd(pool, entity);
    globalThis.mp?.events?.call("entityStreamIn", entity);
    rec.onStreamIn?.(entity, handle, netId);
  }
  return entity;
}

export function refreshServerHandle(pool: object, entity: any): any {
  if (!entity) return entity;
  const rec = StreamingInternals.get(pool);
  const state = streamEntityState(entity);
  if (!state.isServer || !state.netId) return entity;
  const handle = safeGetEntityFromNetId(state.netId);
  const valid = !!handle;
  const entities = poolStore(pool).entities;
  if (valid) {
    if (entity.handle !== handle || !entities.has(entity.id)) {
      bindHandle(pool, entity.id, handle, state.netId);
    }
  } else if (entity.handle) {
    rec.handleToEntity.delete(entity.handle);
    if (entities.has(entity.id)) {
      globalThis.mp?.events?.call("entityStreamOut", entity);
      rec.onStreamOut?.(entity);
      entities.delete(entity.id);
    }
    EntityInternals.get(entity).handle = null;
  }
  return entity;
}

export function resolveHandle(pool: object, handle: number): any {
  const rec = StreamingInternals.get(pool);
  if (rec.filter && !rec.filter(handle)) return null;
  if (!handle || !DoesEntityExist(handle)) return null;

  const existing = rec.handleToEntity.get(handle);
  if (existing) return existing;

  const netId = safeGetNetworkId(handle);
  const remoteId = netId ? rec.netIdToRemote.get(netId) : undefined;

  if (remoteId !== undefined) {
    return bindHandle(pool, remoteId, handle, netId);
  }

  const id = netId !== 0 ? netId : LOCAL_STREAM_ID_BASE + handle;
  let entity = poolStore(pool).entities.get(id);
  if (!entity) {
    entity = rec.makeEntity!(id, handle);
    poolAdd(pool, entity);
    rec.handleToEntity.set(handle, entity);
    globalThis.mp?.events?.call("entityStreamIn", entity);
    rec.onStreamIn?.(entity, handle, netId);
  }
  return entity;
}

function scan(pool: object, getHandles: () => number[]): void {
  const rec = StreamingInternals.get(pool);
  const handles = getHandles();
  const activeSet = rec.activeSet;
  activeSet.clear();

  for (const handle of handles) {
    const entity = resolveHandle(pool, handle);
    if (entity) activeSet.add(entity.id);
  }

  const entities = poolStore(pool).entities;
  for (const [handle, entity] of rec.handleToEntity) {
    if (activeSet.has(entity.id)) continue;
    rec.handleToEntity.delete(handle);
    entities.delete(entity.id);
    globalThis.mp?.events?.call("entityStreamOut", entity);
    rec.onStreamOut?.(entity);
    if (streamEntityState(entity).isServer) EntityInternals.get(entity).handle = null;
  }
}

export function atRemote(pool: object, id: number): any {
  const rec = StreamingInternals.get(pool);
  const server = rec.byRemote.get(id);
  if (server) return refreshServerHandle(pool, server);
  return poolStore(pool).entities.get(id) ?? null;
}

export function atHandle(pool: object, handle: number): any {
  return StreamingInternals.get(pool).handleToEntity.get(handle) ?? null;
}

export function atNetId(pool: object, netId: number): any {
  if (!netId) return null;
  const rec = StreamingInternals.get(pool);
  const remoteId = rec.netIdToRemote.get(netId);
  if (remoteId !== undefined) {
    const entity = rec.byRemote.get(remoteId);
    if (entity) return refreshServerHandle(pool, entity);
  }
  const ambient = poolStore(pool).entities.get(netId);
  if (ambient) return ambient;
  const handle = safeGetEntityFromNetId(netId);
  if (!handle) return null;
  return rec.handleToEntity.get(handle) ?? null;
}

export function existsRemote(pool: object, entity: any): boolean {
  const rec = StreamingInternals.get(pool);
  const entities = poolStore(pool).entities;
  if (typeof entity === "number") {
    return rec.byRemote.has(entity) || entities.has(entity);
  }
  if (!entity || typeof entity !== "object") return false;
  return rec.byRemote.has(entity.id) || entities.has(entity.id);
}

export function removeFromStreamingPool(pool: object, id: number): void {
  const rec = StreamingInternals.get(pool);
  const entity = poolStore(pool).entities.get(id) ?? rec.byRemote.get(id);
  if (entity) {
    if (entity.handle) rec.handleToEntity.delete(entity.handle);
    const state = streamEntityState(entity);
    if (state.netId) rec.netIdToRemote.delete(state.netId);
  }
  rec.byRemote.delete(id);
  poolRemove(pool, id);
}
