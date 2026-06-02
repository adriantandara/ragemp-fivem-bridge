type EntitySyncQueueOptions = {
   range?: number;
   useRoutingBucket?: boolean;
};

export class EntitySyncQueue {
   _getHandle: () => number;
   _batchEvent: string;
   _queue: [string, any[]][] | null;
   _scheduled: boolean;
   _range: number;
   _useRoutingBucket: boolean;

   constructor(
      getHandle: () => number,
      batchEvent: string,
      options: EntitySyncQueueOptions = {},
   ) {
      this._getHandle = getHandle;
      this._batchEvent = batchEvent;
      this._queue = null;
      this._scheduled = false;

      this._range = options.range ?? 250;
      this._useRoutingBucket = options.useRoutingBucket ?? true;
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
            this._emitScoped(handle, netId, queue);
         } else if (!netId && queue && queue.length) {
            console.warn(
               `[EntitySyncQueue] dropped ${queue.length} "${this._batchEvent}" update(s): no netId after ${tries} tries`,
            );
         }
      } catch (err) {
         console.error(
            `[EntitySyncQueue] flush failed for "${this._batchEvent}":`,
            err,
         );

         this._scheduled = false;
         this._queue = null;
      }
   }

   _emitScoped(handle: number, netId: number, queue: [string, any[]][]): void {
      const entityCoords = GetEntityCoords(handle);
      const entityBucket = GetEntityRoutingBucket(handle);

      const rangeSq = this._range * this._range;

      for (const playerId of getPlayers()) {
         const playerPed = GetPlayerPed(playerId);

         if (!playerPed || !DoesEntityExist(playerPed)) continue;

         if (this._useRoutingBucket) {
            const playerBucket = GetPlayerRoutingBucket(playerId);
            if (playerBucket !== entityBucket) continue;
         }

         const playerCoords = GetEntityCoords(playerPed);

         const dx = playerCoords[0] - entityCoords[0];
         const dy = playerCoords[1] - entityCoords[1];
         const dz = playerCoords[2] - entityCoords[2];

         const distSq = dx * dx + dy * dy + dz * dz;

         if (distSq > rangeSq) continue;

         emitNet(this._batchEvent, Number(playerId), netId, queue);
      }
   }
}