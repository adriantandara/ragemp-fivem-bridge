export class EntitySyncQueue {
  _getHandle: () => number;
  _batchEvent: string;
  _queue: [string, any[]][] | null;
  _scheduled: boolean;

  constructor(getHandle: () => number, batchEvent: string) {
    this._getHandle = getHandle;
    this._batchEvent = batchEvent;
    this._queue = null;
    this._scheduled = false;
  }

  emit(event: string, ...args: any[]): void {
    if (!this._queue) this._queue = [];
    this._queue.push([event, args]);
    if (this._scheduled) return;
    this._scheduled = true;
    setTimeout(() => this._flush(0), 0);
  }

  _flush(tries: number): void {
    try {
      const handle = this._getHandle();
      if (!handle || !DoesEntityExist(handle)) {
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
      } else if (!netId && queue && queue.length) {
        console.warn(`[EntitySyncQueue] dropped ${queue.length} "${this._batchEvent}" update(s): no netId after ${tries} tries`);
      }
    } catch (err) {
      console.error(`[EntitySyncQueue] flush failed for "${this._batchEvent}":`, err);
      this._scheduled = false;
      this._queue = null;
    }
  }
}
