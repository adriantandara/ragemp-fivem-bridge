const _subscribers = Object.create(null);

export function subscribeEntityRegistry(type: string, handlers: {
  create: (remoteId: number, data: any) => void,
  netid: (remoteId: number, netId: number) => void,
  destroy: (remoteId: number) => void
}) {
  _subscribers[type] = handlers;
}

function _create(type: string, remoteId: number, model: any, x: number, y: number, z: number, dimension: number) {
  const sub = _subscribers[type];
  if (sub && sub.create) sub.create(remoteId, { model, x, y, z, dimension });
}

function _bind(type: string, remoteId: number, netId: number) {
  const sub = _subscribers[type];
  if (sub && sub.netid) sub.netid(remoteId, netId);
}

function _destroy(type: string, remoteId: number) {
  const sub = _subscribers[type];
  if (sub && sub.destroy) sub.destroy(remoteId);
}

if (typeof onNet === "function") {
  onNet("ragemp:entity:create", (type: string, remoteId: number, model: string, x: number, y: number, z: number, dimension: number) => {
    _create(type, remoteId, model, x, y, z, dimension);
  });

  onNet("ragemp:entity:netid", (type: string, remoteId: number, netId: number) => {
    _bind(type, remoteId, netId);
  });

  onNet("ragemp:entity:destroy", (type: string, remoteId: number) => {
    _destroy(type, remoteId);
  });

  onNet("ragemp:entity:snapshot", (list: unknown) => {
    if (!Array.isArray(list)) return;
    for (const entry of list) {
      if (!Array.isArray(entry)) continue;
      const [type, remoteId, model, x, y, z, dimension, netId] = entry;
      _create(type, remoteId, model, x, y, z, dimension);
      if (netId) _bind(type, remoteId, netId);
    }
  });
}