import type { Vector3 } from "@ragemp-fivem-bridge/shared";
import { PlayerMp } from "../../Entities/PlayerMp";

export const name = "spawnmanager";

interface SpawnInfo {
  x: number;
  y: number;
  z: number;
  heading?: number;
  model?: number | string;
}

export default function setup({ mp }: { mp: any }): void {
  function buildSpawnInfo(player: PlayerMp, position: Vector3): SpawnInfo {
    return {
      x: position.x,
      y: position.y,
      z: position.z,
      heading: (player as any).heading ?? 0,
      model: (player as any).model || undefined,
    };
  }

  function spawnPlayer(player: PlayerMp, info: SpawnInfo): void {
    if (!player) return;
    (player as any).call("ragemp:spawnmanager:spawn", info);
  }

  PlayerMp.prototype.spawn = function spawn(position: Vector3): void {
    if (typeof (this as any)._resetWeaponState === "function") (this as any)._resetWeaponState();
    spawnPlayer(this, buildSpawnInfo(this, position));
  };

  mp.spawnmanager = {
    spawnPlayer(player: PlayerMp, info: SpawnInfo): void {
      if (!player || !info) return;
      const data: SpawnInfo = {
        x: info.x,
        y: info.y,
        z: info.z,
        heading: info.heading ?? (player as any).heading ?? 0,
        model: info.model ?? (player as any).model,
      };
      spawnPlayer(player, data);
    },
  };
}
