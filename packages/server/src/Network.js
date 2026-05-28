let _batchDepth = 0;
let _queue = null;
let _originalEmitNet = null;

function flushQueue() {
  if (!_queue) return;
  const q = _queue;
  _queue = null;
  if (_originalEmitNet) {
    for (const args of q) _originalEmitNet(...args);
  }
}

export class NetworkMp {
  startBatch() {
    if (_batchDepth === 0) {
      _queue = [];
      if (typeof globalThis.emitNet === "function" && !_originalEmitNet) {
        _originalEmitNet = globalThis.emitNet;
        globalThis.emitNet = (...args) => {
          if (_queue) _queue.push(args);
          else _originalEmitNet(...args);
        };
      }
    }
    _batchDepth++;
  }

  endBatch() {
    if (_batchDepth === 0) return;
    _batchDepth--;
    if (_batchDepth === 0) {
      flushQueue();
      if (_originalEmitNet) {
        globalThis.emitNet = _originalEmitNet;
        _originalEmitNet = null;
      }
    }
  }
}
