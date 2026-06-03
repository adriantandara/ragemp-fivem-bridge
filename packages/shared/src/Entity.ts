import { Vector3, Vector3Like } from "./Vector3";
import { EntityInternals, initEntityInternals, type EntityInternalsRec } from "./internal/entityInternals";
import { CONSTRUCT } from "./internal/construct";

export const STATE_KEY_PREFIX = "rmp:";

interface StateBag {
  [key: string]: unknown;
  set(key: string, value: unknown, replicate: boolean): void;
}

function safeStateBag(rec: EntityInternalsRec): StateBag | null {
  if (!rec.stateBagReady()) return null;
  try {
    return rec.stateBag();
  } catch (e) {
    return null;
  }
}

export abstract class Entity {
  [key: string]: unknown;
  id: number;

  constructor(token: symbol, id: number, type: string, handle: number | null = null) {
    if (token !== CONSTRUCT) {
      throw new TypeError(`${type} entities cannot be constructed directly — use the corresponding mp.<pool>.new(...) factory`);
    }
    this.id = id;
    initEntityInternals(this, type, handle);
  }

  get handle(): number {
    return EntityInternals.get(this).handle ?? 0;
  }

  get type(): string {
    return EntityInternals.get(this).kind;
  }

  get remoteId(): number {
    return this.id;
  }

  get alpha(): number { return EntityInternals.get(this).alpha; }
  set alpha(v: number) { EntityInternals.get(this).alpha = v; }

  get dimension(): number { return EntityInternals.get(this).dimension; }
  set dimension(v: number) { EntityInternals.get(this).dimension = v; }

  get model(): number { return EntityInternals.get(this).model; }
  set model(v: number) { EntityInternals.get(this).model = v; }

  get position(): Vector3 | null { return EntityInternals.get(this).position; }
  set position(v: Vector3 | null) { EntityInternals.get(this).position = v; }

  getVariable(key: string): unknown {
    const rec = EntityInternals.get(this);
    const bag = safeStateBag(rec);
    if (bag) {
      try {
        const value = bag[STATE_KEY_PREFIX + key];
        if (value !== undefined && value !== null) return value;
      } catch (e) {  }
    }
    return rec.variables.get(key);
  }

  setVariable(key: string, value: unknown): void {
    const rec = EntityInternals.get(this);
    rec.variables.set(key, value);
    const bag = safeStateBag(rec);
    if (bag) {
      try {
        bag.set(STATE_KEY_PREFIX + key, value, true);
        return;
      } catch (e) {  }
    }
    rec.onVariableDeferred();
  }

  hasVariable(key: string): boolean {
    return this.getVariable(key) !== undefined;
  }

  setVariables(obj: Record<string, unknown>): void {
    for (const [key, value] of Object.entries(obj)) {
      this.setVariable(key, value);
    }
  }

  get data(): Record<string | symbol, unknown> {
    const rec = EntityInternals.get(this);
    if (!rec.dataProxy) {
      const self = this;
      rec.dataProxy = new Proxy({} as Record<string | symbol, unknown>, {
        get(_: Record<string | symbol, unknown>, key: string | symbol): unknown { return self.getVariable(key as string); },
        set(_: Record<string | symbol, unknown>, key: string | symbol, value: unknown): boolean { self.setVariable(key as string, value); return true; },
        has(_: Record<string | symbol, unknown>, key: string | symbol): boolean { return self.hasVariable(key as string); },
        deleteProperty(_: Record<string | symbol, unknown>, key: string | symbol): boolean { self.setVariable(key as string, undefined); return true; },
      });
    }
    return rec.dataProxy!;
  }

  dist(position: Vector3Like): number {
    const pos = this.position;
    return pos ? pos.distance(position) : Infinity;
  }

  distSquared(position: Vector3Like): number {
    const pos = this.position;
    return pos ? pos.distanceSqr(position) : Infinity;
  }

  setOwnVariable(key: string, value: unknown): void {
    const rec = EntityInternals.get(this);
    if (!rec.ownVariables) rec.ownVariables = new Map();
    rec.ownVariables.set(key, value);
  }

  setOwnVariables(obj: Record<string, unknown>): void {
    for (const [key, value] of Object.entries(obj)) {
      this.setOwnVariable(key, value);
    }
  }

  getOwnVariable(key: string): unknown {
    const rec = EntityInternals.get(this);
    if (!rec.ownVariables) return undefined;
    return rec.ownVariables.get(key);
  }

  abstract destroy(): void;
}
