const RAGEMP_TO_FIVEM_EVENTS = {
  "playerJoin": "playerConnecting",
  "playerQuit": "playerDropped",
  "playerReady": "ragemp:playerReady",
  "playerChat": "chatMessage",
  "incomingConnection": "playerConnecting",
};

export class EventManager {
  _handlers = new Map();

  _procs = new Map();

  constructor() {
    this._setupBuiltinEvents();
  }

  _playerCheckpointStates = new Map();

  _setupBuiltinEvents() {
    onNet("ragemp:playerReady", () => {
      const player = globalThis.mp.players.at(source);
      if (player) {
        this._fire("playerReady", player);
        emitNet("ragemp:playerReady", source);
      }
    });

    onNet("ragemp:playerDeath", (reason, killerId) => {
      const player = globalThis.mp.players.at(source);
      const killer = killerId ? globalThis.mp.players.at(killerId) : null;
      if (player) this._fire("playerDeath", player, reason, killer);
    });

    onNet("ragemp:playerSpawn", () => {
      const player = globalThis.mp.players.at(source);
      if (player) this._fire("playerSpawn", player);
    });

    onNet("ragemp:playerEnterVehicle", (vehicleNetId, seatIndex) => {
      const player = globalThis.mp.players.at(source);
      if (player) this._fire("playerEnterVehicle", player, vehicleNetId, seatIndex);
    });

    onNet("ragemp:playerExitVehicle", (vehicleNetId) => {
      const player = globalThis.mp.players.at(source);
      if (player) this._fire("playerExitVehicle", player, vehicleNetId);
    });

    onNet("ragemp:playerStartEnterVehicle", (vehicleNetId, seatIndex) => {
      const player = globalThis.mp.players.at(source);
      if (player) this._fire("playerStartEnterVehicle", player, vehicleNetId, seatIndex);
    });

    onNet("ragemp:playerStartExitVehicle", (vehicleNetId) => {
      const player = globalThis.mp.players.at(source);
      if (player) this._fire("playerStartExitVehicle", player, vehicleNetId);
    });

    onNet("ragemp:playerWeaponChange", (oldWeapon, newWeapon) => {
      const player = globalThis.mp.players.at(source);
      if (player) this._fire("playerWeaponChange", player, oldWeapon, newWeapon);
    });

    onNet("ragemp:playerDamage", (healthLoss, armorLoss) => {
      const player = globalThis.mp.players.at(source);
      if (player) this._fire("playerDamage", player, healthLoss, armorLoss);
    });

    onNet("ragemp:vehicleDeath", (vehicleNetId) => {
      const vehicle = globalThis.mp.vehicles.atHandle(vehicleNetId);
      if (vehicle) this._fire("vehicleDeath", vehicle);
    });

    onNet("ragemp:vehicleDamage", (vehicleNetId, bodyHealthLoss, engineHealthLoss) => {
      const vehicle = globalThis.mp.vehicles.atHandle(vehicleNetId);
      if (vehicle) this._fire("vehicleDamage", vehicle, bodyHealthLoss, engineHealthLoss);
    });

    on("onResourceStop", (resource) => {
      if (resource === GetCurrentResourceName()) {
        this._fire("serverShutdown");
      }
    });

    on("onResourceStart", (resource) => {
      if (resource === GetCurrentResourceName()) {
        this._fire("packagesLoaded");
      }
    });

    on("playerEnteredScope", (data) => {
      const observer = globalThis.mp?.players?.at(data.player);
      const entered = globalThis.mp?.players?.at(data["for"]);
      if (observer && entered) this._fire("playerStreamIn", entered, observer);
    });

    on("playerLeftScope", (data) => {
      const observer = globalThis.mp?.players?.at(data.player);
      const left = globalThis.mp?.players?.at(data["for"]);
      if (observer && left) this._fire("playerStreamOut", left, observer);
    });

    onNet("ragemp:vehicleHorn", (vehicleNetId, state) => {
      const vehicle = globalThis.mp?.vehicles?.atHandle?.(vehicleNetId);
      if (vehicle) this._fire("vehicleHornToggle", vehicle, !!state);
    });

    onNet("ragemp:vehicleSiren", (vehicleNetId, state) => {
      const vehicle = globalThis.mp?.vehicles?.atHandle?.(vehicleNetId);
      if (vehicle) this._fire("vehicleSirenToggle", vehicle, !!state);
    });

    onNet("ragemp:trailerAttached", (vehicleNetId, trailerNetId) => {
      const vehicle = globalThis.mp?.vehicles?.atHandle?.(vehicleNetId);
      const trailer = globalThis.mp?.vehicles?.atHandle?.(trailerNetId);
      if (vehicle) this._fire("trailerAttached", vehicle, trailer ?? null);
    });

    onNet("ragemp:playerReachWaypoint", (x, y, z) => {
      const player = globalThis.mp?.players?.at(source);
      if (player) this._fire("playerReachWaypoint", player, x, y, z);
    });

    onNet("ragemp:entityModelChange", (entityNetId, oldModel, newModel) => {
      const mp = globalThis.mp;
      let entity = null;
      if (entityNetId != null && mp) {
        entity = mp.vehicles?.atHandle?.(entityNetId)
          ?? mp.peds?.atHandle?.(entityNetId)
          ?? mp.objects?.atHandle?.(entityNetId)
          ?? mp.players?.at(source)
          ?? null;
      }
      this._fire("entityModelChange", entity, oldModel, newModel);
    });

    this._startCheckpointChecking();
  }

  _startCheckpointChecking() {
    setInterval(() => {
      this._checkCheckpoints();
    }, 500);
  }

  _checkCheckpoints() {
    const mp = globalThis.mp;
    if (!mp || !mp.players || !mp.checkpoints) return;

    mp.players.forEach((player) => {
      if (!this._playerCheckpointStates.has(player.id)) {
        this._playerCheckpointStates.set(player.id, new Set());
      }
      const inside = this._playerCheckpointStates.get(player.id);

      let playerPos;
      try {
        playerPos = player.position;
      } catch (e) {
        return;
      }

      for (const checkpoint of mp.checkpoints) {
        const matchesDimension =
          checkpoint.dimension === 0 || player.dimension === checkpoint.dimension;

        let isInside = false;
        if (matchesDimension && checkpoint.visible) {
          try {
            const dist = playerPos.distance(checkpoint.position);
            isInside = dist <= checkpoint.radius;
          } catch (e) {
          }
        }

        if (isInside && !inside.has(checkpoint.id)) {
          inside.add(checkpoint.id);
          this._fire("playerEnterCheckpoint", player, checkpoint);
        } else if (!isInside && inside.has(checkpoint.id)) {
          inside.delete(checkpoint.id);
          this._fire("playerExitCheckpoint", player, checkpoint);
        }
      }

      for (const checkpointId of inside) {
        if (!mp.checkpoints.exists(checkpointId)) {
          inside.delete(checkpointId);
        }
      }
    });

    for (const playerId of this._playerCheckpointStates.keys()) {
      if (!mp.players.exists(playerId)) {
        this._playerCheckpointStates.delete(playerId);
      }
    }
  }

  _getHandlers(eventName) {
    if (!this._handlers.has(eventName)) {
      this._handlers.set(eventName, new Set());
    }
    return this._handlers.get(eventName);
  }

  _fire(eventName, ...args) {
    const handlers = this._handlers.get(eventName);
    if (!handlers) return;
    for (const handler of handlers) {
      handler(...args);
    }
  }

  add(eventNameOrObject, handler) {
    if (typeof eventNameOrObject === "object" && handler === undefined) {
      for (const [name, fn] of Object.entries(eventNameOrObject)) {
        this.add(name, fn);
      }
      return;
    }

    const eventName = eventNameOrObject;
    this._getHandlers(eventName).add(handler);

    const fivemEvent = RAGEMP_TO_FIVEM_EVENTS[eventName];
    if (fivemEvent && !this._handlers.get(`__fivem_${eventName}`)) {
      this._handlers.set(`__fivem_${eventName}`, new Set([true]));

      if (eventName === "playerJoin") {
        on("playerConnecting", (name, setKickReason, deferrals) => {
          const player = globalThis.mp.players.at(source);
          if (player) {
            this._fire("playerJoin", player);
          }
        });
      } else if (eventName === "playerQuit") {
        on("playerDropped", (reason) => {
          const player = globalThis.mp.players.at(source);
          if (player) {
            this._fire("playerQuit", player, "disconnect", reason);
          }
        });
      } else if (eventName === "incomingConnection") {
        on("playerConnecting", (name, setKickReason, deferrals) => {
          const playerSrc = source;
          const ip = GetPlayerEndpoint(String(playerSrc)) ?? "";
          const serial = "";
          const rgscId = "";
          const cancel = (reason) => {
            setKickReason(reason ?? "Connection rejected");
            CancelEvent();
          };
          this._fire("incomingConnection", ip, serial, rgscId, cancel);
        });
      }
    }

    if (!fivemEvent && !this._handlers.get(`__net_${eventName}`)) {
      this._handlers.set(`__net_${eventName}`, new Set([true]));
      onNet(eventName, (...args) => {
        const player = globalThis.mp.players.at(source);
        if (player) {
          this._fire(eventName, player, ...args);
        }
      });
    }
  }

  addProc(procName, handler) {
    this._procs.set(procName, handler);
    onNet(`ragemp:proc:${procName}`, async (requestId, ...args) => {
      const src = global.source;
      const player = globalThis.mp.players.at(src);
      if (!player) return;
      try {
        const result = await handler(player, ...args);
        emitNet(`ragemp:procResult:${procName}`, src, requestId, result, null);
      } catch (err) {
        emitNet(`ragemp:procResult:${procName}`, src, requestId, null, String(err));
      }
    });
  }

  getAllOf(eventName) {
    return [...(this._handlers.get(eventName) ?? [])];
  }

  reset() {
    this._handlers.clear();
  }

  get binded() {
    const handlers = this._handlers;
    return new Proxy({}, {
      get(_, eventName) {
        const set = handlers.get(eventName);
        return set ? set.size > 0 : false;
      },
      has(_, eventName) {
        const set = handlers.get(eventName);
        return set ? set.size > 0 : false;
      },
    });
  }

  addCommand(name, handler) {
    RegisterCommand(name, (src, args, rawCommand) => {
      const player = globalThis.mp.players.at(src);
      if (player) {
        this._fire("playerCommand", player, name, rawCommand, ...args);
        handler(player, rawCommand, ...args);
      }
    }, false);
  }

  call(eventName, ...args) {
    emit(eventName, ...args);
    this._fire(eventName, ...args);
  }

  callRemote(player, eventName, ...args) {
    emitNet(eventName, player.id, ...args);
  }

  get delayShutdown() { return false; }
  set delayShutdown(_v) {}
  get delayTermination() { return false; }
  set delayTermination(_v) {}
  get delayInitialization() { return false; }
  set delayInitialization(_v) {}

  remove(eventName, handler) {
    const handlers = this._handlers.get(eventName);
    if (!handlers) return;
    if (handler) {
      handlers.delete(handler);
    } else {
      handlers.clear();
    }
  }
}
