import { EventEmitter } from "@ragemp-fivem-bridge/shared";
import { sanitizeArgsForNet, STATE_KEY_PREFIX } from "@ragemp-fivem-bridge/shared";
import { sendEntitySnapshot } from "../utils/entityRegistry";
import { EntityInternals } from "@ragemp-fivem-bridge/shared/internal";
import { PlayerInternals } from "../internal/playerInternals";
import { removeFromVehiclePool } from "../internal/pools/vehiclePoolService";
import { removeFromPedPool } from "../internal/pools/pedPoolService";
import { removeFromObjectPool } from "../internal/pools/objectPoolService";

const RAGEMP_TO_FIVEM_EVENTS: Record<string, string> = {
  playerJoin: "playerJoining",
  playerQuit: "playerDropped",
  playerReady: "ragemp:playerReady",
  playerChat: "chatMessage",
  incomingConnection: "playerConnecting",
};

export class EventManager extends EventEmitter {
  _procs: Map<string, (...args: any[]) => any> = new Map();

  _playerReadyHandled: Set<number> = new Set();

  _commands: Map<string, (...args: any[]) => any> = new Map();

  _dataHandlers: Map<string, Array<(...args: any[]) => void>> | null = null;
  _dataSnapshots: WeakMap<object, Map<string, any>> | null = null;

  constructor() {
    super();
    this._setupBuiltinEvents();
  }

  _setupBuiltinEvents(): void {
    onNet("ragemp:playerReady", (forResource: string) => {
      const src = source;
      const player = globalThis.mp.players.at(src);
      if (!player) return;
      emitNet("ragemp:playerReady", src, forResource);
      sendEntitySnapshot(src);
      if (this._playerReadyHandled.has(src)) return;
      this._playerReadyHandled.add(src);
      this._fire("playerReady", player);
      globalThis.mp?.spawnmanager?._maybeAutoSpawn?.(player);
    });

    on("playerDropped", () => {
      this._playerReadyHandled.delete(source);
    });

    onNet("ragemp:command", (commandText: string) => {
      const src = source;
      this._processCommand(src, commandText);
    });

    onNet("ragemp:proc", async (procName: string, requestId: string, ...args: any[]) => {
      const src = source;
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

    onNet("ragemp:chat:message", (rawText: string) => {
      const player = globalThis.mp.players.at(source);
      if (!player || typeof rawText !== "string") return;
      const text = rawText.slice(0, 256);

      let cancelled = false;
      const handlers = this._handlers.get("playerChat");
      if (handlers) {
        for (const handler of handlers) {
          if ((handler as any)(player, text) === false) cancelled = true;
        }
      }
      if (cancelled) return;

      const safe = text.replace(/[<>]/g, "");
      globalThis.mp.players.forEach((p: any) =>
        p.outputChatBox(`${player.name}: ${safe}`),
      );
    });

    onNet("ragemp:playerDeath", (reason: number, killerId: number | null) => {
      const player = globalThis.mp.players.at(source);
      const killer = killerId ? globalThis.mp.players.at(killerId) : null;
      if (player) this._fire("playerDeath", player, reason, killer);
    });

    onNet("ragemp:playerSpawn", () => {
      const player = globalThis.mp.players.at(source);
      if (player) this._fire("playerSpawn", player);
    });

    if (typeof AddStateBagChangeHandler === "function") {
      AddStateBagChangeHandler(null, null, (bagName: string, key: string, value: any) => {
        const mp = globalThis.mp;
        if (!mp || typeof bagName !== "string" || typeof key !== "string") return;
        if (key.indexOf(STATE_KEY_PREFIX) !== 0) return;
        const realKey = key.slice(STATE_KEY_PREFIX.length);
        let entity: any = null;
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
          this._emitDataChange(entity, realKey, value);
        }
      });
    }

    onNet("ragemp:playerEnterVehicle", (vehicleNetId: number, seatIndex: number) => {
      const player = globalThis.mp.players.at(source);
      const vehicle = globalThis.mp.vehicles.atNetId(vehicleNetId);
      if (player) {
        PlayerInternals.get(player as any).vehicle = vehicle ?? null;
        this._fire(
          "playerEnterVehicle",
          player,
          vehicle,
          (seatIndex ?? -1) + 1,
        );
      }
    });

    onNet("ragemp:playerExitVehicle", (vehicleNetId: number) => {
      const player = globalThis.mp.players.at(source);
      const vehicle = globalThis.mp.vehicles.atNetId(vehicleNetId);
      if (player) {
        PlayerInternals.get(player as any).vehicle = null;
        this._fire("playerExitVehicle", player, vehicle);
      }
    });

    onNet("ragemp:playerStartEnterVehicle", (vehicleNetId: number, seatIndex: number) => {
      const player = globalThis.mp.players.at(source);
      const vehicle = globalThis.mp.vehicles.atNetId(vehicleNetId);
      if (player)
        this._fire("playerStartEnterVehicle", player, vehicle, seatIndex);
    });

    onNet("ragemp:playerStartExitVehicle", (vehicleNetId: number) => {
      const player = globalThis.mp.players.at(source);
      const vehicle = globalThis.mp.vehicles.atNetId(vehicleNetId);
      if (player) this._fire("playerStartExitVehicle", player, vehicle);
    });

    onNet("ragemp:playerWeaponChange", (oldWeapon: number, newWeapon: number) => {
      const player = globalThis.mp.players.at(source);
      if (player)
        this._fire("playerWeaponChange", player, oldWeapon, newWeapon);
    });

    onNet("ragemp:playerDamage", (healthLoss: number, armorLoss: number) => {
      const player = globalThis.mp.players.at(source);
      if (player) this._fire("playerDamage", player, healthLoss, armorLoss);
    });

    onNet("ragemp:vehicleDeath", (vehicleNetId: number) => {
      const vehicle = globalThis.mp.vehicles.atNetId(vehicleNetId);
      if (vehicle) this._fire("vehicleDeath", vehicle);
    });

    onNet(
      "ragemp:vehicleDamage",
      (vehicleNetId: number, bodyHealthLoss: number, engineHealthLoss: number) => {
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

    on("onResourceStop", (resource: string) => {
      if (resource === GetCurrentResourceName()) {
        this._fire("serverShutdown");
      }
    });

    on("onResourceStart", (resource: string) => {
      if (resource === GetCurrentResourceName()) {
        this._fire("packagesLoaded");
      }
    });

    on("playerEnteredScope", (data: { player: number; for: number }) => {
      const observer = globalThis.mp?.players?.at(data.player);
      const entered = globalThis.mp?.players?.at(data["for"]);
      if (observer && entered) this._fire("playerStreamIn", entered, observer);
    });

    on("playerLeftScope", (data: { player: number; for: number }) => {
      const observer = globalThis.mp?.players?.at(data.player);
      const left = globalThis.mp?.players?.at(data["for"]);
      if (observer && left) this._fire("playerStreamOut", left, observer);
    });

    on("entityRemoved", (handle: number) => {
      const mp = globalThis.mp;
      if (!mp) return;
      const vehicle = mp.vehicles?.atHandle?.(handle);
      if (vehicle) {
        removeFromVehiclePool(mp.vehicles, vehicle.id);
        return;
      }
      const ped = mp.peds?.atHandle?.(handle);
      if (ped) {
        removeFromPedPool(mp.peds, ped.id);
        return;
      }
      const object = mp.objects?.atHandle?.(handle);
      if (object) {
        removeFromObjectPool(mp.objects, object.id);
        return;
      }
    });

    onNet("ragemp:vehicleHorn", (vehicleNetId: number, state: boolean) => {
      const vehicle = globalThis.mp?.vehicles?.atNetId?.(vehicleNetId);
      if (vehicle) this._fire("vehicleHornToggle", vehicle, !!state);
    });

    onNet("ragemp:vehicleSiren", (vehicleNetId: number, state: boolean) => {
      const vehicle = globalThis.mp?.vehicles?.atNetId?.(vehicleNetId);
      if (vehicle) this._fire("vehicleSirenToggle", vehicle, !!state);
    });

    onNet("ragemp:trailerAttached", (vehicleNetId: number, trailerNetId: number) => {
      const vehicle = globalThis.mp?.vehicles?.atNetId?.(vehicleNetId);
      const trailer = globalThis.mp?.vehicles?.atNetId?.(trailerNetId);
      if (vehicle) this._fire("trailerAttached", vehicle, trailer ?? null);
    });

    onNet("ragemp:playerReachWaypoint", (x: number, y: number, z: number) => {
      const player = globalThis.mp?.players?.at(source);
      if (player) this._fire("playerReachWaypoint", player, x, y, z);
    });

    onNet("ragemp:entityModelChange", (entityNetId: number, oldModel: number, newModel: number) => {
      const mp = globalThis.mp;
      let entity: any = null;
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

  _onAdd(eventName: string): void {
    const fivemEvent = RAGEMP_TO_FIVEM_EVENTS[eventName];
    if (fivemEvent && !this._handlers.get(`__fivem_${eventName}`)) {
      this._handlers.set(`__fivem_${eventName}`, new Set([true]) as any);

      if (eventName === "playerJoin") {
        on("playerJoining", (_oldId: string) => {
          const player = globalThis.mp.players.at(source);
          if (player) {
            this._fire("playerJoin", player);
          }
        });
      } else if (eventName === "playerQuit") {
        on("playerDropped", (reason: string) => {
          const player = globalThis.mp.players.at(source);
          if (player) {
            this._fire("playerQuit", player, "disconnect", reason);
          }
        });
      } else if (eventName === "incomingConnection") {
        on("playerConnecting", (name: string, setKickReason: (reason: string) => void, deferrals: any) => {
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
          const cancel = (reason?: string): void => {
            setKickReason(reason ?? "Connection rejected");
            CancelEvent();
          };
          this._fire("incomingConnection", ip, serial, rgscId, cancel);
        });
      }
    }

    if (!fivemEvent && !this._handlers.get(`__net_${eventName}`)) {
      this._handlers.set(`__net_${eventName}`, new Set([true]) as any);
      onNet(eventName, (...args: any[]) => {
        const src = source;
        const player = globalThis.mp.players.at(src);
        if (player) {
          this._fire(eventName, player, ...args);
        }
      });
    }
  }

  addProc(procName: string, handler: (...args: any[]) => any): void {
    this._procs.set(procName, handler);
  }

  removeProc(procName: string): void {
    this._procs.delete(procName);
  }

  addDataHandler(key: string, handler: (...args: any[]) => void): void {
    if (!this._dataHandlers) this._dataHandlers = new Map();
    if (!this._dataHandlers.has(key)) this._dataHandlers.set(key, []);
    this._dataHandlers.get(key)!.push(handler);
  }

  _emitDataChange(entity: any, key: string, value: any): void {
    if (!this._dataSnapshots) this._dataSnapshots = new WeakMap();
    let snapshot = this._dataSnapshots.get(entity);
    if (!snapshot) {
      snapshot = new Map();
      this._dataSnapshots.set(entity, snapshot);
    }
    const oldValue = snapshot.get(key);
    snapshot.set(key, value);
    EntityInternals.get(entity).variables.set(key, value);

    const handlers = this._dataHandlers?.get(key);
    if (handlers) {
      for (const handler of handlers) {
        try {
          handler(entity, value, oldValue);
        } catch (e) {
          console.error(`[bridge] addDataHandler("${key}") handler error:`, e);
        }
      }
    }
  }

  reset(): void {
    for (const key of this._handlers.keys()) {
      if (key.indexOf("__fivem_") === 0 || key.indexOf("__net_") === 0) continue;
      this._handlers.delete(key);
    }
  }

  get binded(): Record<string, boolean> {
    const handlers = this._handlers;
    return new Proxy(
      {},
      {
        get(_: Record<string, boolean>, eventName: string): boolean {
          const set = handlers.get(eventName);
          return set ? set.size > 0 : false;
        },
        has(_: Record<string, boolean>, eventName: string): boolean {
          const set = handlers.get(eventName);
          return set ? set.size > 0 : false;
        },
      },
    );
  }

  addCommand(name: string | Record<string, (...args: any[]) => any>, handler?: (...args: any[]) => any): void {
    if (name && typeof name === "object" && handler === undefined) {
      for (const [cmd, fn] of Object.entries(name)) this.addCommand(cmd, fn);
      return;
    }
    if (typeof name === "string" && typeof handler === "function") {
      this._commands.set(name, handler);
    }
  }

  removeCommand(name: string): void {
    this._commands.delete(name);
  }

  _processCommand(src: number, commandText: string): void {
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

  call(eventName: string, ...args: any[]): void {
    this._fire(eventName, ...args);
  }

  callRemote(player: { id: number }, eventName: string, args: any[] | any): void {
    const list = Array.isArray(args) ? args : args === undefined ? [] : [args];
    emitNet(eventName, player.id, ...sanitizeArgsForNet(list));
  }

  get delayShutdown(): boolean {
    return false;
  }
  set delayShutdown(_v: boolean) {}
  get delayTermination(): boolean {
    return false;
  }
  set delayTermination(_v: boolean) {}
  get delayInitialization(): boolean {
    return false;
  }
  set delayInitialization(_v: boolean) {}
}
