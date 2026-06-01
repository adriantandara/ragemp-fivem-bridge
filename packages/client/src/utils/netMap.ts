const _maps = Object.create(null);

function _map(type: string) {
  if (!_maps[type]) _maps[type] = new Map();
  return _maps[type];
}

if (typeof onNet === "function") {
  onNet("ragemp:netmap:add", (type: string, remoteId: number, netId: number) => {
    _map(type).set(remoteId, netId);
  });
  onNet("ragemp:netmap:remove", (type: string, remoteId: number) => {
    if (_maps[type]) _maps[type].delete(remoteId);
  });
  onNet("ragemp:netmap:sync", (entries) => {
    if (!Array.isArray(entries)) return;
    for (const entry of entries) {
      if (Array.isArray(entry)) _map(entry[0]).set(entry[1], entry[2]);
    }
  });
}

export function netIdForRemote(type: string, remoteId: number) {
  return _maps[type] ? (_maps[type].get(remoteId) ?? null) : null;
}