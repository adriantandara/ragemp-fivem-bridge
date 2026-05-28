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

  get data() {
    return this._data;
  }

  destroy() {
    globalThis.mp?.dummies?._remove(this.id);
  }
}
