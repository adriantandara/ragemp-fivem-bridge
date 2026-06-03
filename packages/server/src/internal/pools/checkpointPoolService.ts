import { defineInternals, removeFromPool } from "@ragemp-fivem-bridge/shared/internal";
import { setupBroadcastPool, freeBroadcastId } from "./broadcastPoolService";
import { playerBySource } from "../../utils/playerRegistry";
import type { CheckpointMp } from "../../Entities/CheckpointMp";
import type { CheckpointMpPool } from "../../Pools/CheckpointMpPool";

interface CheckpointPoolRec {
  inside: Map<number, Set<number>>;
}

const CheckpointPoolInternals = defineInternals<CheckpointPoolRec>();

function handleTransition(pool: CheckpointMpPool, playerSource: number, id: number, entering: boolean): void {
  const mp = globalThis.mp;
  const player = playerBySource(playerSource);
  const checkpoint = pool.at(id) as unknown as CheckpointMp | null;
  if (!player || !checkpoint) return;

  const insideMap = CheckpointPoolInternals.get(pool).inside;
  let inside = insideMap.get(id);
  if (!inside) {
    inside = new Set();
    insideMap.set(id, inside);
  }

  if (entering) {
    if (inside.has(playerSource)) return;
    if (checkpoint.dimension !== 0 && player.dimension !== checkpoint.dimension) return;
    let position: any;
    try {
      position = player.position;
    } catch (e) {
      return;
    }
    if ((position as any).distance(checkpoint.position) > checkpoint.radius) return;
    inside.add(playerSource);
    mp.events.call("playerEnterCheckpoint", player, checkpoint);
  } else {
    if (!inside.has(playerSource)) return;
    inside.delete(playerSource);
    if (inside.size === 0) insideMap.delete(id);
    mp.events.call("playerExitCheckpoint", player, checkpoint);
  }
}

export function setupCheckpointPool(pool: CheckpointMpPool): void {
  CheckpointPoolInternals.init(pool, { inside: new Map() });

  setupBroadcastPool(pool, "ragemp:checkpointCreate", "ragemp:checkpointSyncAll");

  onNet("ragemp:checkpoint:enter", (id: number) => {
    handleTransition(pool, source, id, true);
  });

  onNet("ragemp:checkpoint:exit", (id: number) => {
    handleTransition(pool, source, id, false);
  });

  on("playerDropped", () => {
    const dropped = source;
    const insideMap = CheckpointPoolInternals.get(pool).inside;
    for (const [id, set] of insideMap) {
      set.delete(dropped);
      if (set.size === 0) insideMap.delete(id);
    }
  });
}

export function checkpointPoolForget(pool: CheckpointMpPool, id: number): void {
  CheckpointPoolInternals.get(pool).inside.delete(id);
}

export function removeFromCheckpointPool(pool: CheckpointMpPool, id: number): void {
  checkpointPoolForget(pool, id);
  removeFromPool(pool, id);
  freeBroadcastId(pool, id);
}
