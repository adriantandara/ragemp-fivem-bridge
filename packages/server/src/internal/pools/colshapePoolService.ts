import { defineInternals, poolStore, removeFromPool } from "@ragemp-fivem-bridge/shared/internal";
import { dimensionsMatch } from "@ragemp-fivem-bridge/shared";
import type { ColshapeMp } from "../../Entities/ColshapeMp";
import type { ColshapeMpPool } from "../../Pools/ColshapeMpPool";

const ENTER_VALIDATION_MARGIN = 5.0;

interface ColshapePoolRec {
  inside: Map<number, Set<number>>;
}

const ColshapePoolInternals = defineInternals<ColshapePoolRec>();

function handleTransition(pool: ColshapeMpPool, playerSource: number, id: number, entering: boolean): void {
  const mp = globalThis.mp;
  const player = mp?.players?.at(playerSource);
  const colshape = pool.at(id) as unknown as ColshapeMp | null;
  if (!player || !colshape) return;

  const insideMap = ColshapePoolInternals.get(pool).inside;
  let inside = insideMap.get(id);

  if (entering) {
    if (inside && inside.has(playerSource)) return;
    if (!dimensionsMatch(colshape.dimension, player.dimension)) return;

    let position: any = null;
    try {
      position = player.position;
    } catch (e) {
      position = null;
    }
    const posKnown = position && (position.x !== 0 || position.y !== 0 || position.z !== 0);
    if (posKnown && !colshape.isPointWithin(position, ENTER_VALIDATION_MARGIN)) return;

    if (!inside) {
      inside = new Set();
      insideMap.set(id, inside);
    }
    inside.add(playerSource);
    mp.events._fire("playerEnterColshape", player, colshape);
  } else {
    if (!inside || !inside.has(playerSource)) return;
    inside.delete(playerSource);
    if (inside.size === 0) insideMap.delete(id);
    mp.events._fire("playerExitColshape", player, colshape);
  }
}

export function setupColshapePool(pool: ColshapeMpPool): void {
  ColshapePoolInternals.init(pool, { inside: new Map() });

  onNet("ragemp:playerReady", () => {
    const playerSource = source;
    const entities = poolStore(pool).entities;
    if (entities.size === 0) return;
    const shapes: ReturnType<ColshapeMp["toData"]>[] = [];
    entities.forEach((cs) => shapes.push((cs as unknown as ColshapeMp).toData()));
    emitNet("ragemp:colshapeSyncAll", playerSource, shapes);
  });

  onNet("ragemp:colshape:enter", (id: number) => {
    handleTransition(pool, source, id, true);
  });

  onNet("ragemp:colshape:exit", (id: number) => {
    handleTransition(pool, source, id, false);
  });

  on("playerDropped", () => {
    const dropped = source;
    const insideMap = ColshapePoolInternals.get(pool).inside;
    for (const [id, set] of insideMap) {
      set.delete(dropped);
      if (set.size === 0) insideMap.delete(id);
    }
  });
}

export function colshapePoolForget(pool: ColshapeMpPool, id: number): void {
  ColshapePoolInternals.get(pool).inside.delete(id);
}

export function removeFromColshapePool(pool: ColshapeMpPool, id: number): void {
  colshapePoolForget(pool, id);
  pool._broadcast("ragemp:colshapeDestroy", id);
  removeFromPool(pool, id);
}
