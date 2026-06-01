import { Vector3, Vector3Like } from "./Vector3";

export const STATE_KEY_PREFIX = "rmp:";

interface StateBag {
  [key: string]: unknown;
  set(key: string, value: unknown, replicate: boolean): void;
}

export class Entity {
  [key: string]: unknown;
  id: number;
  _handle: number;
  _kind: string;
  _variables: Map<string, unknown> = new Map();

  _alpha: number = 255;
  _dimension: number = 0;
  _model: number = 0;
  _position: Vector3 | null = null;

  _dataProxy: Record<string | symbol, unknown> | null = null;
  _ownVariables: Map<string, unknown> | null = null;

  constructor(id: number, type: string, handle: number) {
    this.id = id;
    this._kind = type;
    this._handle = handle;
  }

  get handle() {
    return this._handle;
  }

  get type(): string {
    return this._kind;
  }

  get remoteId(): number {
    return this.id;
  }

  get alpha(): number { return this._alpha; }
  set alpha(v: number) { this._alpha = v; }

  get dimension(): number { return this._dimension; }
  set dimension(v: number) { this._dimension = v; }

  get model(): number { return this._model; }
  set model(v: number) { this._model = v; }

  get position(): Vector3 | null { return this._position; }
  set position(v: Vector3 | null) { this._position = v; }

  _stateBag(): StateBag | null {
    return null;
  }

  _stateBagReady(): boolean {
    return true;
  }

  _onVariableDeferred(): void {}

  _safeStateBag(): StateBag | null {
    if (!this._stateBagReady()) return null;
    try {
      return this._stateBag();
    } catch (e) {
      return null;
    }
  }

  getVariable(key: string): unknown {
    const bag = this._safeStateBag();
    if (bag) {
      try {
        const value = bag[STATE_KEY_PREFIX + key];
        if (value !== undefined && value !== null) return value;
      } catch (e) {  }
    }
    return this._variables.get(key);
  }

  setVariable(key: string, value: unknown): void {
    this._variables.set(key, value);
    const bag = this._safeStateBag();
    if (bag) {
      try {
        bag.set(STATE_KEY_PREFIX + key, value, true);
        return;
      } catch (e) {  }
    }
    this._onVariableDeferred();
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
    if (!this._dataProxy) {
      const self = this;
      this._dataProxy = new Proxy({} as Record<string | symbol, unknown>, {
        get(_: Record<string | symbol, unknown>, key: string | symbol): unknown { return self.getVariable(key as string); },
        set(_: Record<string | symbol, unknown>, key: string | symbol, value: unknown): boolean { self.setVariable(key as string, value); return true; },
        has(_: Record<string | symbol, unknown>, key: string | symbol): boolean { return self.hasVariable(key as string); },
        deleteProperty(_: Record<string | symbol, unknown>, key: string | symbol): boolean { self.setVariable(key as string, undefined); return true; },
      });
    }
    return this._dataProxy!;
  }

  dist(position: Vector3Like): number {
    return this._position!.distance(position);
  }

  distSquared(position: Vector3Like): number {
    return this._position!.distanceSqr(position);
  }

  setOwnVariable(key: string, value: unknown): void {
    if (!this._ownVariables) this._ownVariables = new Map();
    this._ownVariables.set(key, value);
  }

  setOwnVariables(obj: Record<string, unknown>): void {
    for (const [key, value] of Object.entries(obj)) {
      this.setOwnVariable(key, value);
    }
  }

  getOwnVariable(key: string): unknown {
    if (!this._ownVariables) return undefined;
    return this._ownVariables.get(key);
  }

  destroy(): void {
  }
}
