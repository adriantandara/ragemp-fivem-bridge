import { Pool } from "@ragemp-fivem-bridge/shared";
import { PlayerMp } from "../Entities/PlayerMp";

export class PlayerMpPool extends Pool {
  constructor() {
    super();
    this._setupListeners();
  }

  _setupListeners() {
    on("playerConnecting", (name, setKickReason, deferrals) => {
      const playerSource = source;
      const player = new PlayerMp(playerSource);
      this._add(player);
    });

    on("playerDropped", (reason) => {
      const playerSource = source;
      this._remove(playerSource);
    });
  }

  broadcast(eventName, ...args) {
    this.forEach((player) => {
      player.call(eventName, ...args);
    });
  }

  broadcastInRange(position, range, eventName, ...args) {
    this.forEach((player) => {
      if (player.position.distance(position) <= range) {
        player.call(eventName, ...args);
      }
    });
  }

  broadcastInDimension(dimension, eventName, ...args) {
    this.forEach((player) => {
      if (player.dimension === dimension) {
        player.call(eventName, ...args);
      }
    });
  }

  call(playersOrEventName, ...args) {
    if (typeof playersOrEventName === "string") {
      this.forEach((player) => {
        player.call(playersOrEventName, ...args);
      });
    } else {
      const [eventName, ...restArgs] = args;
      for (const player of playersOrEventName) {
        player.call(eventName, ...restArgs);
      }
    }
  }

  callInDimension(dimension, eventName, ...args) {
    this.forEach((player) => {
      if (player.dimension === dimension) {
        player.call(eventName, ...args);
      }
    });
  }

  callInRange(position, range, eventName, ...args) {
    this.forEach((player) => {
      if (player.position.distance(position) <= range) {
        player.call(eventName, ...args);
      }
    });
  }

  callUnreliable(players, eventName, ...args) {
    this.call(players, eventName, ...args);
  }

  callInDimensionUnreliable(dimension, eventName, ...args) {
    this.callInDimension(dimension, eventName, ...args);
  }

  callInRangeUnreliable(position, range, eventName, ...args) {
    this.callInRange(position, range, eventName, ...args);
  }
}
