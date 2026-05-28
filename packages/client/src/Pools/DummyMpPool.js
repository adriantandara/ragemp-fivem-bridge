import { Pool } from "@ragemp-fivem-bridge/shared";
import { DummyMp } from "../Entities/DummyMp";

export class DummyMpPool extends Pool {
  constructor() {
    super();
    this._setupSync();
  }

  _setupSync() {
    onNet("ragemp:dummyCreate", (data) => {
      this._addDummy(data);
    });

    onNet("ragemp:dummySyncAll", (dummies) => {
      for (const d of dummies) this._addDummy(d);
    });

    onNet("ragemp:dummyDestroy", (id) => {
      const dummy = this.at(id);
      if (dummy) {
        this._remove(id);
        globalThis.mp?.events?._fire("dummyEntityDestroyed", dummy);
      }
    });
  }

  _addDummy(data) {
    if (this.exists(data.id)) return;
    const dummy = new DummyMp(data.id, data.dummyType, data.data);
    this._add(dummy);
    globalThis.mp?.events?._fire("dummyEntityCreated", dummy);
  }

  atRemoteId(remoteId) {
    return this.at(remoteId);
  }

  forEachByType(type, fn) {
    this.forEach((d) => {
      if (d.dummyType === type) fn(d);
    });
  }
}
