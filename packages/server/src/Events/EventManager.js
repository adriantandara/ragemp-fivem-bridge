import { EventEmitter } from "@ragemp-fivem-bridge/shared";
import { sanitizeArgsForNet } from "@ragemp-fivem-bridge/shared";
import { ingressAllowed, clearRateLimit } from "../utils/guard";

const RAGEMP_TO_FIVEM_EVENTS = {
  playerJoin: "playerJoining",
  playerQuit: "playerDropped",
  playerReady: "ragemp:playerReady",
  playerChat: "chatMessage",
  incomingConnection: "playerConnecting",
};

export class EventManager extends EventEmitter {
  _procs = new Map();

  _playerReadyHandled = new Set();

  _commands = new Map();

  constructor() {
    super();
    this._setupBuiltinEvents();
  }

  _setupBuiltinEvents() {
    onNet("ragemp:playerReady", (forResource) => {
      const src = source;
      if (!ingressAllowed(src, "playerReady")) return;
      const player = globalThis.mp.players.at(src);
      if (!player) return;
      emitNet("ragemp:playerReady", src, forResource);
      if (this._playerReadyHandled.has(src)) return;
      this._playerReadyHandled.add(src);
      this._fire("playerReady", player);
    });

    on("playerDropped", () => {
      this._playerReadyHandled.delete(source);
      clearRateLimit(`${source}:`);
    });

    onNet("ragemp:command", (commandText) => {
      const src = source;
      if (!ingressAllowed(src, "command")) return;
      this._processCommand(src, commandText);
    });

    onNet("ragemp:proc", async (procName, requestId, ...args) => {
      const src = source;
      if (!ingressAllowed(src, "proc")) return;
      const player = globalThis.mp.players.at(src);
      if (!player) return;
      const handler = this._procs.get(procName);
      if (!handler) {
        emitNet("ragemp:procResult", src, requestId, `Proc not found: ${procName}`, null);
        return;
      }
      try {
        const result = await handler(player, ...args);
        emitNet("ragemp:procResult", src, requestId, null, result);
      } catch (err) {
        emitNet("ragemp:procResult", src, requestId, String(err), null);
      }
    });

    onNet("ragemp:chat:message", (rawText) => {
      const player = globalThis.mp.players.at(source);
      if (!player || typeof rawText !== "string") return;
      const text = rawText.slice(0, 256);

      let cancelled = false;
      const handlers = this._handlers.get("playerChat");
      if (handlers) {
        for (const handler of handlers) {
          if (handler(player, text) === false) cancelled = true;
        }
      }
      if (cancelled) return;

      const safe = text.replace(/[<>]/g, "");
      globalThis.mp.players.forEach((p) =>
        p.outputChatBox(`${player.name}: ${safe}`),
      );
    });

    onNet("ragemp:playerDeath", (reason, killerId) => {
      if (!ingressAllowed(source, "playerDeath")) return;
      const player = globalThis.mp.players.at(source);
      const killer = killerId ? globalThis.mp.players.at(killerId) : null;
      if (player) this._fire("playerDeath", player, reason, killer);
    });

    onNet("ragemp:playerSpawn", () => {
      const player = globalThis.mp.players.at(source);
      if (player) this._fire("playerSpawn", player);
    });

    if (typeof AddStateBagChangeHandler === "function") {
      AddStateBagChangeHandler(null, null, (bagName, key, value) => {
        const mp = globalThis.mp;
        if (!mp || typeof bagName !== "string" || typeof key !== "string") return;
        let entity = null;
        if (bagName.indexOf("player:") === 0) {
          entity = mp.players?.at?.(parseInt(bagName.slice(7), 10)) ?? null;
        } else if (bagName.indexOf("entity:") === 0) {
          const handle =
            typeof GetEntityFromStateBagName === "function"
              ? GetEntityFromStateBagName(bagName)
              : 0;
          if (handle && handle !== 0) {
            entity =
              mp.vehicles?.atHandle?.(handle) ??
              mp.objects?.atHandle?.(handle) ??
              mp.peds?.atHandle?.(handle) ??
              null;
          }
        }
        if (entity) {
          entity._variables.set(key, value);
          this._fire("entityDataChange", entity, key, value);
        }
      });
    }

    onNet("ragemp:playerEnterVehicle", (vehicleNetId, seatIndex) => {
      const player = globalThis.mp.players.at(source);
      const vehicle = globalThis.mp.vehicles.atNetId(vehicleNetId);
      if (player) {
        player._vehicle = vehicle ?? null;
        this._fire(
          "playerEnterVehicle",
          player,
          vehicle,
          (seatIndex ?? -1) + 1,
        );
      }
    });

    onNet("ragemp:playerExitVehicle", (vehicleNetId) => {
      const player = globalThis.mp.players.at(source);
      const vehicle = globalThis.mp.vehicles.atNetId(vehicleNetId);
      if (player) {
        player._vehicle = null;
        this._fire("playerExitVehicle", player, vehicle);
      }
    });

    onNet("ragemp:playerStartEnterVehicle", (vehicleNetId, seatIndex) => {
      const player = globalThis.mp.players.at(source);
      const vehicle = globalThis.mp.vehicles.atNetId(vehicleNetId);
      if (player)
        this._fire("playerStartEnterVehicle", player, vehicle, seatIndex);
    });

    onNet("ragemp:playerStartExitVehicle", (vehicleNetId) => {
      const player = globalThis.mp.players.at(source);
      const vehicle = globalThis.mp.vehicles.atNetId(vehicleNetId);
      if (player) this._fire("playerStartExitVehicle", player, vehicle);
    });

    onNet("ragemp:playerWeaponChange", (oldWeapon, newWeapon) => {
      const player = globalThis.mp.players.at(source);
      if (player)
        this._fire("playerWeaponChange", player, oldWeapon, newWeapon);
    });

    onNet("ragemp:playerDamage", (healthLoss, armorLoss) => {
      const player = globalThis.mp.players.at(source);
      if (player) this._fire("playerDamage", player, healthLoss, armorLoss);
    });

    onNet("ragemp:vehicleDeath", (vehicleNetId) => {
      const vehicle = globalThis.mp.vehicles.atNetId(vehicleNetId);
      if (vehicle) this._fire("vehicleDeath", vehicle);
    });

    onNet(
      "ragemp:vehicleDamage",
      (vehicleNetId, bodyHealthLoss, engineHealthLoss) => {
        const vehicle = globalThis.mp.vehicles.atNetId(vehicleNetId);
        if (vehicle)
          this._fire(
            "vehicleDamage",
            vehicle,
            bodyHealthLoss,
            engineHealthLoss,
          );
      },
    );

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

    on("entityRemoved", (handle) => {
      const mp = globalThis.mp;
      if (!mp) return;
      for (const pool of [mp.vehicles, mp.peds, mp.objects]) {
        const entity = pool?.atHandle?.(handle);
        if (entity) {
          pool._remove(entity.id);
          break;
        }
      }
    });

    onNet("ragemp:vehicleHorn", (vehicleNetId, state) => {
      const vehicle = globalThis.mp?.vehicles?.atNetId?.(vehicleNetId);
      if (vehicle) this._fire("vehicleHornToggle", vehicle, !!state);
    });

    onNet("ragemp:vehicleSiren", (vehicleNetId, state) => {
      const vehicle = globalThis.mp?.vehicles?.atNetId?.(vehicleNetId);
      if (vehicle) this._fire("vehicleSirenToggle", vehicle, !!state);
    });

    onNet("ragemp:trailerAttached", (vehicleNetId, trailerNetId) => {
      const vehicle = globalThis.mp?.vehicles?.atNetId?.(vehicleNetId);
      const trailer = globalThis.mp?.vehicles?.atNetId?.(trailerNetId);
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
        entity =
          mp.vehicles?.atNetId?.(entityNetId) ??
          mp.peds?.atNetId?.(entityNetId) ??
          mp.objects?.atNetId?.(entityNetId) ??
          mp.players?.at(source) ??
          null;
      }
      this._fire("entityModelChange", entity, oldModel, newModel);
    });
  }

  _onAdd(eventName) {
    const fivemEvent = RAGEMP_TO_FIVEM_EVENTS[eventName];
    if (fivemEvent && !this._handlers.get(`__fivem_${eventName}`)) {
      this._handlers.set(`__fivem_${eventName}`, new Set([true]));

      if (eventName === "playerJoin") {
        on("playerJoining", (oldId) => {
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
          let serial = "";
          let rgscId = "";
          try {
            const count = GetNumPlayerIdentifiers(String(playerSrc));
            for (let i = 0; i < count; i++) {
              const ident = GetPlayerIdentifier(String(playerSrc), i) || "";
              if (!serial && ident.indexOf("license:") === 0) serial = ident.slice(8);
              else if (!rgscId && ident.indexOf("steam:") === 0) rgscId = ident.slice(6);
            }
          } catch (e) {}
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
      const isFrameworkEvent = eventName.indexOf("__rpc:") === 0;
      onNet(eventName, (...args) => {
        const src = source;
        if (!isFrameworkEvent && !ingressAllowed(src, eventName)) return;
        const player = globalThis.mp.players.at(src);
        if (player) {
          this._fire(eventName, player, ...args);
        }
      });
    }
  }

  addProc(procName, handler) {
    this._procs.set(procName, handler);
  }

  removeProc(procName) {
    this._procs.delete(procName);
  }

  reset() {
    for (const key of this._handlers.keys()) {
      if (key.indexOf("__fivem_") === 0 || key.indexOf("__net_") === 0) continue;
      this._handlers.delete(key);
    }
  }

  get binded() {
    const handlers = this._handlers;
    return new Proxy(
      {},
      {
        get(_, eventName) {
          const set = handlers.get(eventName);
          return set ? set.size > 0 : false;
        },
        has(_, eventName) {
          const set = handlers.get(eventName);
          return set ? set.size > 0 : false;
        },
      },
    );
  }

  addCommand(name, handler) {
    if (name && typeof name === "object" && handler === undefined) {
      for (const [cmd, fn] of Object.entries(name)) this.addCommand(cmd, fn);
      return;
    }
    if (typeof name === "string" && typeof handler === "function") {
      this._commands.set(name, handler);
    }
  }

  removeCommand(name) {
    this._commands.delete(name);
  }

  _processCommand(src, commandText) {
    const player = globalThis.mp?.players?.at(src);
    if (!player) return;
    const raw = String(commandText ?? "").trim();
    if (!raw) return;
    const cleaned = raw.charAt(0) === "/" ? raw.slice(1).trim() : raw;
    if (!cleaned) return;
    const parts = cleaned.split(/\s+/);
    const name = parts.shift();
    if (!name) return;

    this._fire("playerCommand", player, cleaned);

    const handler = this._commands.get(name);
    if (handler) {
      try {
        handler(player, parts.join(" "), ...parts);
      } catch (e) {
        console.error(`[bridge] command "${name}" handler error:`, e);
      }
    }
  }

  call(eventName, ...args) {
    emit(eventName, ...args);
    this._fire(eventName, ...args);
  }

  callRemote(player, eventName, args) {
    const list = Array.isArray(args) ? args : args === undefined ? [] : [args];
    emitNet(eventName, player.id, ...sanitizeArgsForNet(list));
  }

  get delayShutdown() {
    return false;
  }
  set delayShutdown(_v) {}
  get delayTermination() {
    return false;
  }
  set delayTermination(_v) {}
  get delayInitialization() {
    return false;
  }
  set delayInitialization(_v) {}
}
