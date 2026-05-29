export class EntitySyncQueue {
  constructor(getHandle, batchEvent) {
    this._getHandle = getHandle;
    this._batchEvent = batchEvent;
    this._queue = null;
    this._scheduled = false;
  }

  emit(event, ...args) {
    if (!this._queue) this._queue = [];
    this._queue.push([event, args]);
    if (this._scheduled) return;
    this._scheduled = true;
    setTimeout(() => this._flush(0), 0);
  }

  _flush(tries) {
    const handle = this._getHandle();
    if (!DoesEntityExist(handle)) {
      this._scheduled = false;
      this._queue = null;
      return;
    }
    const netId = NetworkGetNetworkIdFromEntity(handle);
    if (!netId && tries < 50) {
      setTimeout(() => this._flush(tries + 1), 50);
      return;
    }
    const queue = this._queue;
    this._queue = null;
    this._scheduled = false;
    if (netId && queue && queue.length) {
      emitNet(this._batchEvent, -1, netId, queue);
    }
  }
}
