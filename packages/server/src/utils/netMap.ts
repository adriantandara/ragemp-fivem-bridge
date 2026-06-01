const _entries = new Map();

function _key(type: string, remoteId: number) {
  return `${type}:${remoteId}`;
}

export function sendNetMapSnapshot(src: unknown) {
  if (_entries.size === 0) return;
  const list = [];
  for (const e of _entries.values()) list.push([e.type, e.remoteId, e.netId]);
  if (typeof emitNet === "function") emitNet("ragemp:netmap:sync", src, list);
}

export function registerNetMap(type: string, remoteId: number, netId: number) {
  if (!netId) return;
  _entries.set(_key(type, remoteId), { type, remoteId, netId });
  if (typeof emitNet === "function") emitNet("ragemp:netmap:add", -1, type, remoteId, netId);
}

export function unregisterNetMap(type: string, remoteId: number) {
  if (_entries.delete(_key(type, remoteId)) && typeof emitNet === "function") {
    emitNet("ragemp:netmap:remove", -1, type, remoteId);
  }
}