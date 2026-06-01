import { Entity } from "@ragemp-fivem-bridge/shared";

export class DummyMp extends Entity {
  id: number;
  _dummyType: number;
  _data: Record<string, any>;

  constructor(id: number, dummyType: number, data: Record<string, any> | undefined) {
    super(id, "dummy");
    this._dummyType = dummyType;
    this._data = data ?? {};
  }

  get dummyType(): number {
    return this._dummyType;
  }

  get data(): Record<string, any> {
    return this._data;
  }

  destroy(): void {
    globalThis.mp?.dummies?._remove(this.id);
  }
}
