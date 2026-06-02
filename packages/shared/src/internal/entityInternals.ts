import { defineInternals } from "./defineInternals";
import type { Vector3 } from "../Vector3";

export interface EntityInternalsRec {
  handle: number;
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

export function initEntityInternals(entity: object, kind: string, handle: number): EntityInternalsRec {
  return EntityInternals.init(entity, {
    handle,
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
