import { Pool } from "@ragemp-fivem-bridge/shared";
import { DummyMp } from "../Entities/DummyMp";

export class DummyMpPool extends Pool {
  _entities!: Map<number, DummyMp>;
  _add!: (entity: DummyMp) => void;
  _remove!: (id: number) => void;
  at!: (id: number) => DummyMp | null;
  exists!: (entity: number | { id: number }) => boolean;
  forEach!: (fn: (entity: DummyMp) => void) => void;
  toArray!: () => DummyMp[];

  constructor() {
    super();
    this._setupSync();
  }

  _setupSync(): void {
    onNet("ragemp:dummyCreate", (data: any) => {
      this._addDummy(data);
    });

    onNet("ragemp:dummySyncAll", (dummies: any[]) => {
      for (const d of dummies) this._addDummy(d);
    });

    onNet("ragemp:dummyDestroy", (id: number) => {
      const dummy = this.at(id);
      if (dummy) {
        this._remove(id);
        globalThis.mp?.events?._fire("dummyEntityDestroyed", dummy);
      }
    });
  }

  _addDummy(data: any): void {
    if (this.exists(data.id)) return;
    const dummy = new DummyMp(data.id, data.dummyType, data.data);
    this._add(dummy);
    globalThis.mp?.events?._fire("dummyEntityCreated", dummy);
  }

  atRemoteId(remoteId: number): DummyMp | null {
    return this.at(remoteId);
  }

  forEachByType(type: number, fn: (d: DummyMp) => void): void {
    this.forEach((d: DummyMp) => {
      if (d.dummyType === type) fn(d);
    });
  }
}
