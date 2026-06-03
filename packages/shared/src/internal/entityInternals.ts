import { defineInternals } from "./defineInternals";
import type { Vector3 } from "../Vector3";
import type { Entity } from "../Entity";

export const INVALID_REMOTE_ID = 65535;

export interface EntityInternalsRec {
  handle: number | null;
  remoteId: number;
  kind: string;
  variables: Map<string, unknown>;
  ownVariables: Map<string, unknown> | null;
  dataProxy: Record<string | symbol, unknown> | null;
  alpha: number;
  dimension: number;
  model: number;
  position: Vector3 | null;
  stateBag: () => any;
  stateBagReady: () => boolean;
  onVariableDeferred: () => void;
}

export const EntityInternals = defineInternals<EntityInternalsRec>();

export function hasHandle(entity: object): boolean {
  return EntityInternals.get(entity).handle !== null;
}

export function setEntityId(entity: Entity, id: number): void {
  entity.id = id;
}

export function setEntityRemoteId(entity: object, remoteId: number): void {
  EntityInternals.get(entity).remoteId = remoteId;
}

export function initEntityInternals(entity: object, kind: string, handle: number | null): EntityInternalsRec {
  return EntityInternals.init(entity, {
    handle,
    remoteId: INVALID_REMOTE_ID,
    kind,
    variables: new Map(),
    ownVariables: null,
    dataProxy: null,
    alpha: 255,
    dimension: 0,
    model: 0,
    position: null,
    stateBag: () => null,
    stateBagReady: () => true,
    onVariableDeferred: () => {},
  });
}
