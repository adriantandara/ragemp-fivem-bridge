export class Entity {
  _variables = new Map();

  _alpha = 255;
  _dimension = 0;
  _model = 0;
  _position = null;

  constructor(id, type) {
    this.id = id;
    this.type = type;
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

  getVariable(key) {
    return this._variables.get(key);
  }

  setVariable(key, value) {
    this._variables.set(key, value);
  }

  hasVariable(key) {
    return this._variables.has(key);
  }

  setVariables(obj) {
    for (const [key, value] of Object.entries(obj)) {
      this.setVariable(key, value);
    }
  }

  get data() {
    if (!this._data) this._data = {};
    return this._data;
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
