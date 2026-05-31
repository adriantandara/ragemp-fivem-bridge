export const STATE_KEY_PREFIX = "rmp:";

export class Entity {
  _variables = new Map();

  _alpha = 255;
  _dimension = 0;
  _model = 0;
  _position = null;

  constructor(id, type) {
    this.id = id;
    this._kind = type;
  }

  get type() {
    return this._kind;
  }

  get remoteId() {
    return this.id;
  }

  get alpha() { return this._alpha; }
  set alpha(v) { this._alpha = v; }

  get dimension() { return this._dimension; }
  set dimension(v) { this._dimension = v; }

  get model() { return this._model; }
  set model(v) { this._model = v; }

  get position() { return this._position; }
  set position(v) { this._position = v; }

  _stateBag() {
    return null;
  }

  _stateBagReady() {
    return true;
  }

  _onVariableDeferred() {}

  _safeStateBag() {
    if (!this._stateBagReady()) return null;
    try {
      return this._stateBag();
    } catch (e) {
      return null;
    }
  }

  getVariable(key) {
    const bag = this._safeStateBag();
    if (bag) {
      try {
        const value = bag[STATE_KEY_PREFIX + key];
        if (value !== undefined && value !== null) return value;
      } catch (e) {  }
    }
    return this._variables.get(key);
  }

  setVariable(key, value) {
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

  hasVariable(key) {
    return this.getVariable(key) !== undefined;
  }

  setVariables(obj) {
    for (const [key, value] of Object.entries(obj)) {
      this.setVariable(key, value);
    }
  }

  get data() {
    if (!this._dataProxy) {
      const self = this;
      this._dataProxy = new Proxy({}, {
        get(_, key) { return self.getVariable(key); },
        set(_, key, value) { self.setVariable(key, value); return true; },
        has(_, key) { return self.hasVariable(key); },
        deleteProperty(_, key) { self.setVariable(key, undefined); return true; },
      });
    }
    return this._dataProxy;
  }

  dist(position) {
    return this.position.distance(position);
  }

  distSquared(position) {
    return this.position.distanceSqr(position);
  }

  setOwnVariable(key, value) {
    if (!this._ownVariables) this._ownVariables = new Map();
    this._ownVariables.set(key, value);
  }

  setOwnVariables(obj) {
    for (const [key, value] of Object.entries(obj)) {
      this.setOwnVariable(key, value);
    }
  }

  getOwnVariable(key) {
    if (!this._ownVariables) return undefined;
    return this._ownVariables.get(key);
  }

  destroy() {
  }
}
