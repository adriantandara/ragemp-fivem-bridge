let _batchDepth: number = 0;
let _queue: any[][] | null = null;
let _originalEmitNet: ((...args: any[]) => void) | null = null;
let _safetyTimer: ReturnType<typeof setTimeout> | null = null;

function _install(): void {
  if (typeof globalThis.emitNet !== "function") return;
  if ((globalThis.emitNet as any).__ragempBatchWrapper) return;
  _originalEmitNet = globalThis.emitNet as (...args: any[]) => void;
  const wrapper: ((...args: any[]) => void) & { __ragempBatchWrapper?: boolean } = (...args: any[]): void => {
    if (_queue) _queue.push(args);
    else _originalEmitNet!(...args);
  };
  wrapper.__ragempBatchWrapper = true;
  (globalThis as any).emitNet = wrapper;
}

function _restore(): void {
  if (_originalEmitNet) {
    (globalThis as any).emitNet = _originalEmitNet;
    _originalEmitNet = null;
  }
}

function _flush(): void {
  if (!_queue) return;
  const q = _queue;
  _queue = null;
  for (const args of q) {
    try {
      _originalEmitNet?.(...args);
    } catch (e) {
      console.error("[mp.network] batched emitNet failed", e);
    }
  }
}

function _end(): void {
  _batchDepth = 0;
  if (_safetyTimer) {
    clearTimeout(_safetyTimer);
    _safetyTimer = null;
  }
  try {
    _flush();
  } finally {
    _restore();
  }
}

export class NetworkMp {
  startBatch(): void {
    if (_batchDepth === 0) {
      _queue = [];
      _install();
      _safetyTimer = setTimeout((): void => {
        if (_batchDepth !== 0) {
          console.warn("[mp.network] startBatch() with no matching endBatch() — auto-flushing at end of tick");
          _end();
        }
      }, 0);
    }
    _batchDepth++;
  }

  endBatch(): void {
    if (_batchDepth === 0) return;
    _batchDepth--;
    if (_batchDepth === 0) _end();
  }
}
