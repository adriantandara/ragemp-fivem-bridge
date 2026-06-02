import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { PlayerMp } from "../../Entities/PlayerMp";
import { PlayerInternals } from "../../internal/playerInternals";

export const name = "spawnmanager";

interface SpawnInfo {
  x: number;
  y: number;
  z: number;
  heading?: number;
  model?: number | string;
}

export default function setup({ mp }: { mp: any }): void {
  const DEFAULT_SPAWN = { x: 0, y: 0, z: 72, heading: 0 };
  
  mp.spawnmanager = {
    spawnPlayer(player: PlayerMp, info: SpawnInfo): void {
      if (!player || !info) return;
      player.spawn(new Vector3(info.x, info.y, info.z), info.heading);
    },
    _maybeAutoSpawn(player: PlayerMp) {
      if (!player) return;
      const rec = PlayerInternals.get(player);
      if (rec.autoSpawn === false || rec.spawnIssued) return;
      player.spawn(new Vector3(DEFAULT_SPAWN.x, DEFAULT_SPAWN.y, DEFAULT_SPAWN.z), DEFAULT_SPAWN.heading);
    }
  };
}
