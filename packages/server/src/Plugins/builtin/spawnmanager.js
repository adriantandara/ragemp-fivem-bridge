import { PlayerMp } from "../../Entities/PlayerMp";

export const name = "spawnmanager";

export default function setup({ mp }) {
  function buildSpawnInfo(player, position) {
    return {
      x: position.x,
      y: position.y,
      z: position.z,
      heading: player.heading ?? 0,
      model: player.model || undefined,
    };
  }

  function spawnPlayer(player, info) {
    if (!player) return;
    player.call("ragemp:spawnmanager:spawn", info);
  }

  PlayerMp.prototype.spawn = function spawn(position) {
    spawnPlayer(this, buildSpawnInfo(this, position));
  };

  mp.spawnmanager = {
    spawnPlayer(player, info) {
      if (!player || !info) return;
      const data = {
        x: info.x,
        y: info.y,
        z: info.z,
        heading: info.heading ?? player.heading ?? 0,
        model: info.model ?? player.model,
      };
      spawnPlayer(player, data);
    },
  };
}
