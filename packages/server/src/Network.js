let _batchDepth = 0;
let _queue = null;
let _originalEmitNet = null;
let _safetyTimer = null;

function _install() {
  if (typeof globalThis.emitNet !== "function") return;
  if (globalThis.emitNet.__ragempBatchWrapper) return;
  _originalEmitNet = globalThis.emitNet;
  const wrapper = (...args) => {
    if (_queue) _queue.push(args);
    else _originalEmitNet(...args);
  };
  wrapper.__ragempBatchWrapper = true;
  globalThis.emitNet = wrapper;
}

function _restore() {
  if (_originalEmitNet) {
    globalThis.emitNet = _originalEmitNet;
    _originalEmitNet = null;
  }
}

function _flush() {
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

function _end() {
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
  startBatch() {
    if (_batchDepth === 0) {
      _queue = [];
      _install();
      _safetyTimer = setTimeout(() => {
        if (_batchDepth !== 0) {
          console.warn("[mp.network] startBatch() with no matching endBatch() — auto-flushing at end of tick");
          _end();
        }
      }, 0);
    }
    _batchDepth++;
  }

  endBatch() {
    if (_batchDepth === 0) return;
    _batchDepth--;
    if (_batchDepth === 0) _end();
  }
}
