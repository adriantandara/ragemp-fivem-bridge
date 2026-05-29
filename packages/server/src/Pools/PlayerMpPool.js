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
      if (!this._entities.has(playerSource)) {
        this._add(new PlayerMp(playerSource));
      }
    });

    on("playerJoining", (oldId) => {
      const realSource = source;
      const old = Number(oldId);
      const existing = this._entities.get(old);
      if (existing && old !== realSource) {
        this._entities.delete(old);
        existing.id = realSource;
        this._entities.set(realSource, existing);
      } else if (!this._entities.has(realSource)) {
        this._add(new PlayerMp(realSource));
      }
    });

    on("playerDropped", (reason) => {
      const playerSource = source;
      this._remove(playerSource);
    });
  }

  broadcast(text) {
    this.forEach((player) => player.outputChatBox(text));
  }

  broadcastInRange(position, range, dimensionOrText, maybeText) {
    const hasDimension = typeof dimensionOrText === "number";
    const dimension = hasDimension ? dimensionOrText : null;
    const text = hasDimension ? maybeText : dimensionOrText;
    this.forEach((player) => {
      if (hasDimension && player.dimension !== dimension) return;
      if (player.position.distance(position) <= range) player.outputChatBox(text);
    });
  }

  broadcastInDimension(dimension, text) {
    this.forEach((player) => {
      if (player.dimension === dimension) player.outputChatBox(text);
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
