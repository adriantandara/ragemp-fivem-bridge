import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { CheckpointMp } from "../Entities/CheckpointMp";

let checkpointIdCounter = 0;

export class CheckpointMpPool extends Pool {
  _inside: Map<number, Set<number>> = new Map();

  constructor() {
    super();
    this._setupSync();
  }

  _setupSync(): void {
    onNet("ragemp:playerReady", () => {
      const playerSource = source;
      const checkpoints: ReturnType<CheckpointMp["toData"]>[] = [];
      this.forEach(((cp: CheckpointMp) => checkpoints.push(cp.toData())) as any);
      if (checkpoints.length > 0) {
        emitNet("ragemp:checkpointSyncAll", playerSource, checkpoints);
      }
    });

    onNet("ragemp:checkpoint:enter", (id: number) => {
      this._handleTransition(source, id, true);
    });

    onNet("ragemp:checkpoint:exit", (id: number) => {
      this._handleTransition(source, id, false);
    });

    on("playerDropped", () => {
      const dropped = source;
      for (const [id, set] of this._inside) {
        set.delete(dropped);
        if (set.size === 0) this._inside.delete(id);
      }
    });
  }

  _handleTransition(playerSource: number, id: number, entering: boolean): void {
    const mp = globalThis.mp;
    const player = mp?.players?.at(playerSource);
    const checkpoint = this.at(id) as unknown as CheckpointMp | null;
    if (!player || !checkpoint) return;

    let inside = this._inside.get(id);
    if (!inside) {
      inside = new Set();
      this._inside.set(id, inside);
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
      mp.events._fire("playerEnterCheckpoint", player, checkpoint);
    } else {
      if (!inside.has(playerSource)) return;
      inside.delete(playerSource);
      if (inside.size === 0) this._inside.delete(id);
      mp.events._fire("playerExitCheckpoint", player, checkpoint);
    }
  }

  new(type: number, position: Vector3, nextPosition: Vector3 | null, radius: number, options: {
    color?: [number, number, number, number] | { r: number; g: number; b: number; a: number };
    dimension?: number;
    direction?: Vector3;
    visible?: boolean;
  } = {}): CheckpointMp {
    const id = ++checkpointIdCounter;
    const checkpoint = new CheckpointMp(id, type, position, nextPosition, radius, options);

    this._add(checkpoint as any);
    emitNet("ragemp:checkpointCreate", -1, checkpoint.toData());

    return checkpoint;
  }

  _remove(id: number): void {
    this._inside.delete(id);
    super._remove(id);
  }
}
