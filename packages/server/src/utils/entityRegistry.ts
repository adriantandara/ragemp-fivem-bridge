const _entries = new Map();

function _key(type: string, remoteId: number) {
  return `${type}:${remoteId}`;
}

function _emit(event: string, target: number, ...args: unknown[]) {
  if (typeof emitNet === "function") emitNet(event, target, ...args);
}

export function entityCreated(type: string, remoteId: number, data: any = {}) {
  const entry = {
    type,
    remoteId,
    model: data.model ?? 0,
    x: data.x ?? 0,
    y: data.y ?? 0,
    z: data.z ?? 0,
    dimension: data.dimension ?? 0,
    netId: 0,
  };
  _entries.set(_key(type, remoteId), entry);
  _emit("ragemp:entity:create", -1, type, remoteId, entry.model, entry.x, entry.y, entry.z, entry.dimension);
}

export function entityBindNetId(type: string, remoteId: number, netId: number) {
  if (!netId) return;
  const entry = _entries.get(_key(type, remoteId));
  if (!entry) return;
  if (entry.netId === netId) return;
  entry.netId = netId;
  _emit("ragemp:entity:netid", -1, type, remoteId, netId);
}

export function entityDestroyed(type: string, remoteId: number) {
  if (_entries.delete(_key(type, remoteId))) {
    _emit("ragemp:entity:destroy", -1, type, remoteId);
  }
}

export function sendEntitySnapshot(src: any) {
  if (_entries.size === 0) return;
  const list = [];
  for (const e of _entries.values()) {
    list.push([e.type, e.remoteId, e.model, e.x, e.y, e.z, e.dimension, e.netId]);
  }
  _emit("ragemp:entity:snapshot", src, list);
}