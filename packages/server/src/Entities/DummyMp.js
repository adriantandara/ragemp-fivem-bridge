import { Entity } from "@ragemp-fivem-bridge/shared";

export class DummyMp extends Entity {
  _dummyType;
  _data;

  constructor(id, dummyType, data) {
    super(id, "dummy");
    this._dummyType = dummyType;
    this._data = data ?? {};
  }

  get dummyType() {
    return this._dummyType;
  }

  toData() {
    return { id: this.id, dummyType: this._dummyType, data: this._data };
  }

  destroy() {
    emitNet("ragemp:dummyDestroy", -1, this.id);
    globalThis.mp?.dummies?._remove(this.id);
  }
}
