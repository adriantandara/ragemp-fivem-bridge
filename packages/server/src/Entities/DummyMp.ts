import { Entity } from "@ragemp-fivem-bridge/shared";

export class DummyMp extends Entity {
  _dummyType: number;
  _data: Record<string, any>;

  constructor(id: number, dummyType: number, data: Record<string, any>) {
    super(id, "dummy");
    this._dummyType = dummyType;
    this._data = data ?? {};
  }

  get dummyType(): number {
    return this._dummyType;
  }

  toData(): Record<string, any> {
    return { id: this.id, dummyType: this._dummyType, data: this._data };
  }

  destroy(): void {
    emitNet("ragemp:dummyDestroy", -1, this.id);
    globalThis.mp?.dummies?._remove(this.id);
  }
}
