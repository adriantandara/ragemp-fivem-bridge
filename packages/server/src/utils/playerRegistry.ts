const _sourceToRemote = new Map<number, number>();

function _emit(event: string, target: number, ...args: unknown[]) {
  if (typeof emitNet === "function") emitNet(event, target, ...args);
}

export function playerMapped(source: number, remoteId: number) {
  _sourceToRemote.set(source, remoteId);
  _emit("ragemp:player:map", -1, source, remoteId);
}

export function playerUnmapped(source: number) {
  if (_sourceToRemote.delete(source)) {
    _emit("ragemp:player:unmap", -1, source);
  }
}

export function remoteIdForSource(source: number): number | undefined {
  return _sourceToRemote.get(source);
}

export function playerBySource(source: number): any {
  const remoteId = _sourceToRemote.get(source);
  if (remoteId === undefined) return null;
  return globalThis.mp?.players?.at(remoteId) ?? null;
}

export function sendPlayerSnapshot(target: number) {
  if (_sourceToRemote.size === 0) return;
  const list: [number, number][] = [];
  for (const [src, remoteId] of _sourceToRemote) list.push([src, remoteId]);
  _emit("ragemp:player:snapshot", target, list);
}
