import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";

export interface StreamingInternalsRec {
  handleToEntity: Map<number, any>;
  byRemote: Map<number, any>;
  netIdToRemote: Map<number, number>;
  activeSet: Set<number>;
  netType: string | null;
  makeEntity: null | ((id: number, handle: number) => any);
  filter: null | ((handle: number) => boolean);
}

export const StreamingInternals = defineInternals<StreamingInternalsRec>();

export function initStreamingInternals(pool: object, netType: string | null): StreamingInternalsRec {
  return StreamingInternals.init(pool, {
    handleToEntity: new Map(),
    byRemote: new Map(),
    netIdToRemote: new Map(),
    activeSet: new Set(),
    netType,
    makeEntity: null,
    filter: null,
  });
}

export interface StreamingEntityRec {
  isServer: boolean;
  netId: number;
  serverModel: number;
  serverPos: { x: number; y: number; z: number };
  serverDimension: number;
}

const EntityState = defineInternals<StreamingEntityRec>();

export function streamEntityState(entity: object): StreamingEntityRec {
  const existing = EntityState.peek(entity);
  if (existing) return existing;
  return EntityState.init(entity, {
    isServer: false,
    netId: 0,
    serverModel: 0,
    serverPos: { x: 0, y: 0, z: 0 },
    serverDimension: 0,
  });
}
