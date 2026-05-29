import { safeGetNetworkId } from "../utils/netId";
import { onWorldScan } from "../utils/worldScan";

export class EventManager {
  _handlers = new Map();

  _renderTick = null;

  _wasAlive = true;
  _wasInVehicle = false;
  _lastVehicleHandle = 0;
  _lastWeaponHash = 0;
  _builtinTickStarted = false;
  _isTryingToEnterVehicle = false;
  _tryingToEnterVehicleHandle = 0;
  _isTryingToExitVehicle = false;

  _trackedHealth = -1;
  _trackedArmour = -1;

  _wasShooting = false;

  _wasClicking = false;

  _streamedPlayers = new Set();

  _connectedPlayers = new Set();

  _talkingPlayers = new Set();

  _entityOwners = new Map();

  _insideCheckpoints = new Set();

  _waypointActive = false;
  _waypointX = 0;
  _waypointY = 0;
  _waypointZ = 0;
  _waypointReached = false;

  constructor() {
    this._setupBuiltinEvents();
  }

  _setupBuiltinEvents() {
    this._setupConsoleAndChat();
    this._setupGameEvents();
    this._setupGlobalErrorHandlers();
    this._setupStateBags();
    this._setupMainTick();

    onNet("ragemp:playerReady", () => {
      const localPlayer = globalThis.mp?.players?.local;
      if (localPlayer) this._fire("playerReady", localPlayer);
    });
  }

  _setupConsoleAndChat() {
    on("__cfx_internal:commandFallback", (commandName, ...args) => {
      this._fire("consoleCommand", commandName, ...args);
    });

    on("chatMessage", (source, name, message) => {
      const localPlayer = globalThis.mp?.players?.local;
      if (!localPlayer) return;
      this._fire("playerChat", localPlayer, message);
    });

    on("__cfx_internal:commandFallback", (commandName, ...rawArgs) => {
      const localPlayer = globalThis.mp?.players?.local;
      if (!localPlayer) return;
      const args = typeof rawArgs === "string" ? rawArgs.split(" ").filter(Boolean) : (Array.isArray(rawArgs) ? rawArgs : []);
      this._fire("playerCommand", localPlayer, commandName, ...args);
    });
  }

  _setupGameEvents() {
    on("gameEventTriggered", (name, args) => {
      const localPlayer = globalThis.mp?.players?.local;
      if (!localPlayer) return;

      if (name === "CEventNetworkEntityDamage") {
        const victim = args[0];
        const attacker = args[1];
        const damageAmount = args[3];
        const weaponHash = args[4];
        const localPed = PlayerPedId();

        if (victim === localPed) {
          this._fire("incomingDamage", localPlayer, attacker, weaponHash, damageAmount, false, 0);
        }
        if (attacker === localPed) {
          this._fire("outgoingDamage", localPlayer, victim, weaponHash, damageAmount, false, 0);
        }
        return;
      }

      if (name === "CEventExplosion") {
        const posX = args[2] ?? 0;
        const posY = args[3] ?? 0;
        const posZ = args[4] ?? 0;
        const explosionType = args[1] ?? -1;
        this._fire("explosion", localPlayer, { x: posX, y: posY, z: posZ }, explosionType);
        return;
      }

      if (name === "CEventMeleeDamage") {
        const target = args[0];
        const attacker = args[1];
        const weaponHash = args[2] ?? 0;
        const damageAmount = args[3] ?? 0;
        const localPed = PlayerPedId();
        if (attacker === localPed) {
          this._fire("meleeActionDamage", localPlayer, target, weaponHash, damageAmount);
        }
        return;
      }

      if (name === "CProjectileImpactEvent") {
        const weaponHash = args[0];
        const impactX = args[1] ?? 0;
        const impactY = args[2] ?? 0;
        const impactZ = args[3] ?? 0;
        const targetEntity = args[4] ?? 0;
        this._fire("playerWeaponShot", localPlayer, { x: impactX, y: impactY, z: impactZ }, targetEntity);
        this._fire("projectile", { x: impactX, y: impactY, z: impactZ }, weaponHash);
        return;
      }
    });
  }

  _setupStateBags() {
    if (typeof AddStateBagChangeHandler !== "function") return;
    AddStateBagChangeHandler(null, null, (bagName, key, value) => {
      const mp = globalThis.mp;
      if (!mp || typeof bagName !== "string") return;
      let entity = null;
      if (bagName.indexOf("player:") === 0) {
        entity = mp.players?.atRemoteId?.(parseInt(bagName.slice(7), 10)) ?? null;
      } else if (bagName.indexOf("entity:") === 0) {
        const handle = NetworkGetEntityFromNetworkId(parseInt(bagName.slice(7), 10));
        if (handle) {
          entity = mp.vehicles?.atHandle?.(handle)
            ?? mp.peds?.atHandle?.(handle)
            ?? mp.objects?.atHandle?.(handle)
            ?? null;
        }
      }
      if (entity) {
        entity._variables.set(key, value);
        this._fire("entityDataChange", entity, key, value);
      }
    });
  }

  _setupGlobalErrorHandlers() {
    on("unhandledPromiseRejection", (error) => {
      this._fire("unhandledRejection", error);
    });

    if (typeof process !== "undefined" && process.on) {
      try {
        process.on("uncaughtException", (error) => {
          this._fire("uncaughtException", error);
        });
      } catch (_) {}
    }
  }

  _setupMainTick() {
    this._builtinTick = onWorldScan((cache) => {
      const ped = PlayerPedId();
      if (ped === 0) return;

      if (!this._builtinTickStarted) {
        this._builtinTickStarted = true;
        this._wasAlive = !IsPedDeadOrDying(ped, true);
        this._wasInVehicle = IsPedInAnyVehicle(ped, false);
        if (this._wasInVehicle) {
          this._lastVehicleHandle = GetVehiclePedIsIn(ped, false);
        }
        this._lastWeaponHash = GetSelectedPedWeapon(ped);
        this._trackedHealth = GetEntityHealth(ped);
        this._trackedArmour = GetPedArmour(ped);
        this._lastHornState = false;
        this._lastSirenState = false;
        this._lastTrailerNetId = 0;
        this._lastPedModel = GetEntityModel(ped);
        this._waypointActive = IsWaypointActive();
        if (this._waypointActive) {
          const waypointBlipId = GetFirstBlipInfoId(GetWaypointBlipEnumId());
          if (DoesBlipExist(waypointBlipId)) {
            const coords = GetBlipInfoIdCoord(waypointBlipId);
            this._waypointX = coords[0];
            this._waypointY = coords[1];
            this._waypointZ = coords[2];
          }
        }
        const activePlayers = cache.players;
        for (const p of activePlayers) this._connectedPlayers.add(p);
        return;
      }

      const localPlayer = globalThis.mp?.players?.local;
      if (!localPlayer) return;

      const isDead = IsPedDeadOrDying(ped, true);

      if (isDead && this._wasAlive) {
        const causeOfDeath = GetPedCauseOfDeath(ped);
        const killerEntity = GetPedSourceOfDeath(ped);

        let killerId = null;
        if (killerEntity !== 0 && killerEntity !== ped) {
          try {
            if (IsEntityAPed(killerEntity)) {
              const killerPlayer = NetworkGetPlayerIndexFromPed(killerEntity);
              if (killerPlayer >= 0) {
                killerId = GetPlayerServerId(killerPlayer);
              }
            }
          } catch (_) {
          }
        }

        const killer = killerId ? (globalThis.mp?.players?.atRemoteId?.(killerId) ?? null) : null;
        this._fire("playerDeath", localPlayer, causeOfDeath, killer);
        emitNet("ragemp:playerDeath", causeOfDeath, killerId);
      } else if (!isDead && !this._wasAlive && !globalThis.mp?.spawnmanager?.isSpawning) {
        this._fire("playerSpawn", localPlayer);
        this._fire("playerResurrect", localPlayer);
        emitNet("ragemp:playerSpawn");
      }
      this._wasAlive = !isDead;

      const inVehicle = IsPedInAnyVehicle(ped, false);

      if (inVehicle && !this._wasInVehicle) {
        const vehicleHandle = GetVehiclePedIsIn(ped, false);
        this._lastVehicleHandle = vehicleHandle;

        let seatIndex = -1;
        const maxPassengers = GetVehicleMaxNumberOfPassengers(vehicleHandle);
        for (let s = -1; s < maxPassengers; s++) {
          if (GetPedInVehicleSeat(vehicleHandle, s) === ped) {
            seatIndex = s;
            break;
          }
        }

        const vehicleNetId = safeGetNetworkId(vehicleHandle);

        this._fire("playerEnterVehicle", localPlayer, vehicleHandle, seatIndex);
        emitNet("ragemp:playerEnterVehicle", vehicleNetId, seatIndex);
      } else if (!inVehicle && this._wasInVehicle) {
        const lastVehicle = this._lastVehicleHandle;
        const vehicleNetId = safeGetNetworkId(lastVehicle);

        this._fire("playerLeaveVehicle", localPlayer, lastVehicle);
        emitNet("ragemp:playerExitVehicle", vehicleNetId);
        this._lastVehicleHandle = 0;
      }
      this._wasInVehicle = inVehicle;

      const tryingToEnterVehicle = GetVehiclePedIsTryingToEnter(ped);
      if (tryingToEnterVehicle !== 0 && !this._isTryingToEnterVehicle) {
        this._isTryingToEnterVehicle = true;
        this._tryingToEnterVehicleHandle = tryingToEnterVehicle;

        let seatIndex = -1;
        const maxPassengers = GetVehicleMaxNumberOfPassengers(tryingToEnterVehicle);
        for (let s = -1; s < maxPassengers; s++) {
          if (GetPedInVehicleSeat(tryingToEnterVehicle, s) === 0) {
            seatIndex = s;
            break;
          }
        }

        const vehicleNetId = safeGetNetworkId(tryingToEnterVehicle);
        this._fire("playerStartEnterVehicle", localPlayer, tryingToEnterVehicle, seatIndex);
        emitNet("ragemp:playerStartEnterVehicle", vehicleNetId, seatIndex);
      } else if (tryingToEnterVehicle === 0 && this._isTryingToEnterVehicle) {
        this._isTryingToEnterVehicle = false;
        this._tryingToEnterVehicleHandle = 0;
      }

      const isTryingToExit = this._wasInVehicle && GetIsTaskActive(ped, 2);
      if (isTryingToExit && !this._isTryingToExitVehicle) {
        this._isTryingToExitVehicle = true;
        const vehicleHandle = GetVehiclePedIsIn(ped, false);
        const vehicleNetId = safeGetNetworkId(vehicleHandle);
        this._fire("playerStartExitVehicle", localPlayer, vehicleHandle);
        emitNet("ragemp:playerStartExitVehicle", vehicleNetId);
      } else if (!isTryingToExit && this._isTryingToExitVehicle) {
        this._isTryingToExitVehicle = false;
      }

      const currentWeapon = GetSelectedPedWeapon(ped);
      if (currentWeapon !== this._lastWeaponHash) {
        const oldWeapon = this._lastWeaponHash;
        this._lastWeaponHash = currentWeapon;

        this._fire("playerWeaponChange", localPlayer, oldWeapon, currentWeapon);
        emitNet("ragemp:playerWeaponChange", oldWeapon, currentWeapon);
      }

      const checkpointPool = globalThis.mp?.checkpoints;
      if (checkpointPool) {
        const playerCoords = GetEntityCoords(ped, true);
        const px = playerCoords[0];
        const py = playerCoords[1];
        const pz = playerCoords[2];

        for (const checkpoint of checkpointPool) {
          const pos = checkpoint._position;
          const radius = checkpoint._radius;
          if (!pos || radius == null) continue;

          const dx = px - pos.x;
          const dy = py - pos.y;
          const dz = pz - pos.z;
          const distSq = dx * dx + dy * dy + dz * dz;
          const isInside = distSq <= radius * radius;

          if (isInside && !this._insideCheckpoints.has(checkpoint.id)) {
            this._insideCheckpoints.add(checkpoint.id);
            this._fire("playerEnterCheckpoint", localPlayer, checkpoint);
          } else if (!isInside && this._insideCheckpoints.has(checkpoint.id)) {
            this._insideCheckpoints.delete(checkpoint.id);
            this._fire("playerExitCheckpoint", localPlayer, checkpoint);
          }
        }

        for (const cpId of this._insideCheckpoints) {
          if (!checkpointPool.exists(cpId)) {
            this._insideCheckpoints.delete(cpId);
          }
        }
      }

      const waypointNowActive = IsWaypointActive();

      if (waypointNowActive) {
        const waypointBlipId = GetFirstBlipInfoId(GetWaypointBlipEnumId());
        if (DoesBlipExist(waypointBlipId)) {
          const coords = GetBlipInfoIdCoord(waypointBlipId);
          const wx = coords[0];
          const wy = coords[1];
          const wz = coords[2];

          if (!this._waypointActive || wx !== this._waypointX || wy !== this._waypointY || wz !== this._waypointZ) {
            this._waypointX = wx;
            this._waypointY = wy;
            this._waypointZ = wz;
            this._waypointReached = false;
            this._fire("playerCreateWaypoint", localPlayer, wx, wy, wz);
          }

          if (!this._waypointReached) {
            const playerCoords2 = GetEntityCoords(ped, true);
            const dxW = playerCoords2[0] - wx;
            const dyW = playerCoords2[1] - wy;
            const dist2D = Math.sqrt(dxW * dxW + dyW * dyW);
            if (dist2D <= 5.0) {
              this._waypointReached = true;
              this._fire("playerReachWaypoint", localPlayer, wx, wy, wz);
              emitNet("ragemp:playerReachWaypoint", wx, wy, wz);
            }
          }
        }
      } else if (this._waypointActive) {
        this._waypointReached = false;
      }

      this._waypointActive = waypointNowActive;

      const vehPed = GetVehiclePedIsIn(ped, false);
      if (vehPed !== 0) {
        const isHornActive = IsVehicleHornActive(vehPed);
        if (isHornActive !== this._lastHornState) {
          this._lastHornState = isHornActive;
          emitNet("ragemp:vehicleHorn", safeGetNetworkId(vehPed), isHornActive);
        }
        const isSirenActive = IsVehicleSirenOn(vehPed);
        if (isSirenActive !== this._lastSirenState) {
          this._lastSirenState = isSirenActive;
          emitNet("ragemp:vehicleSiren", safeGetNetworkId(vehPed), isSirenActive);
        }
        const trailerHandle = GetVehicleTrailerVehicle(vehPed);
        const trailerNetId = safeGetNetworkId(trailerHandle);
        if (trailerNetId !== (this._lastTrailerNetId ?? 0)) {
          this._lastTrailerNetId = trailerNetId;
          if (trailerNetId !== 0) {
            emitNet("ragemp:trailerAttached", safeGetNetworkId(vehPed), trailerNetId);
          }
        }
      } else {
        this._lastHornState = false;
        this._lastSirenState = false;
        this._lastTrailerNetId = 0;
      }

      const currentModel = GetEntityModel(ped);
      if (currentModel !== (this._lastPedModel ?? 0)) {
        if (this._lastPedModel !== undefined) {
          emitNet("ragemp:entityModelChange", 0, this._lastPedModel, currentModel);
        }
        this._lastPedModel = currentModel;
      }

      const currentHealth = GetEntityHealth(ped);
      const currentArmour = GetPedArmour(ped);
      if (this._trackedHealth > 0) {
        const healthLoss = this._trackedHealth - currentHealth;
        const armourLoss = this._trackedArmour - currentArmour;
        if (healthLoss > 0 || armourLoss > 0) {
          emitNet("ragemp:playerDamage", healthLoss, armourLoss);
        }
      }
      this._trackedHealth = currentHealth;
      this._trackedArmour = currentArmour;

      const isShooting = IsPedShooting(ped);
      if (isShooting && !this._wasShooting) {
        const [hit, impactCoords] = GetPedLastWeaponImpactCoord(ped);
        const targetPos = hit ? { x: impactCoords[0], y: impactCoords[1], z: impactCoords[2] } : null;
        this._fire("playerWeaponShot", localPlayer, targetPos, 0);
      }
      this._wasShooting = isShooting;

      const isClicking = IsControlPressed(0, 24);
      if (isClicking && !this._wasClicking) {
        const [, cursorX, cursorY] = GetNuiCursorPosition();
        this._fire("click", { x: cursorX ?? 0, y: cursorY ?? 0 }, "down");
      } else if (!isClicking && this._wasClicking) {
        const [, cursorX, cursorY] = GetNuiCursorPosition();
        this._fire("click", { x: cursorX ?? 0, y: cursorY ?? 0 }, "up");
      }
      this._wasClicking = isClicking;

      const activePlayers = cache.players;
      const activeSet = new Set(activePlayers);
      const localPlayerId = PlayerId();
      for (const p of activePlayers) {
        if (p === localPlayerId) continue;
        const pPed = GetPlayerPed(p);
        const isStreamed = pPed !== 0 && DoesEntityExist(pPed);
        if (isStreamed && !this._streamedPlayers.has(p)) {
          this._streamedPlayers.add(p);
          const remoteMp = globalThis.mp?.players?.atRemoteId?.(GetPlayerServerId(p));
          this._fire("playerStreamIn", remoteMp ?? p);
        } else if (!isStreamed && this._streamedPlayers.has(p)) {
          this._streamedPlayers.delete(p);
          const remoteMp = globalThis.mp?.players?.atRemoteId?.(GetPlayerServerId(p));
          this._fire("playerStreamOut", remoteMp ?? p);
        }
      }
      for (const p of this._streamedPlayers) {
        if (!activeSet.has(p)) this._streamedPlayers.delete(p);
      }

      for (const p of activePlayers) {
        if (!this._connectedPlayers.has(p)) {
          this._connectedPlayers.add(p);
          const joinedMp = globalThis.mp?.players?.atRemoteId?.(GetPlayerServerId(p));
          this._fire("playerJoin", joinedMp ?? p);
        }
      }
      for (const p of this._connectedPlayers) {
        if (!activeSet.has(p)) {
          this._connectedPlayers.delete(p);
          const quitMp = globalThis.mp?.players?.atRemoteId?.(GetPlayerServerId(p));
          this._fire("playerQuit", quitMp ?? p, "quit", "");
        }
      }

      for (const p of activePlayers) {
        const isTalking = NetworkIsPlayerTalking(p);
        if (isTalking && !this._talkingPlayers.has(p)) {
          this._talkingPlayers.add(p);
          const talkingMp = globalThis.mp?.players?.atRemoteId?.(GetPlayerServerId(p));
          this._fire("playerStartTalking", talkingMp ?? p);
        } else if (!isTalking && this._talkingPlayers.has(p)) {
          this._talkingPlayers.delete(p);
          const talkingMp = globalThis.mp?.players?.atRemoteId?.(GetPlayerServerId(p));
          this._fire("playerStopTalking", talkingMp ?? p);
        }
      }
      for (const p of this._talkingPlayers) {
        if (!activeSet.has(p)) this._talkingPlayers.delete(p);
      }

      const vehPool = cache.vehicles;
      for (const handle of vehPool) {
        if (!NetworkGetEntityIsNetworked(handle)) continue;
        const owner = NetworkGetEntityOwner(handle);
        const prev = this._entityOwners.get(handle);
        if (prev !== undefined && prev !== owner) {
          const vehMp = globalThis.mp?.vehicles?.atHandle?.(handle);
          this._fire("entityControllerChange", vehMp ?? handle, owner);
        }
        this._entityOwners.set(handle, owner);
      }
      for (const [h] of this._entityOwners) {
        if (!DoesEntityExist(h)) this._entityOwners.delete(h);
      }
    });
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

    if (eventName === "render" && this._renderTick === null) {
      this._renderTick = setTick(() => {
        this._fire("render");
      });
      return;
    }

    if (!this._handlers.get(`__net_${eventName}`)) {
      this._handlers.set(`__net_${eventName}`, new Set([true]));
      onNet(eventName, (...args) => {
        this._fire(eventName, ...args);
      });
    }
  }

  call(eventName, ...args) {
    emit(eventName, ...args);
    this._fire(eventName, ...args);
  }

  callRemote(eventName, ...args) {
    emitNet(eventName, ...args);
  }

  addProc(procName, handler) {
    if (!this._procs) this._procs = new Map();
    this._procs.set(procName, handler);
  }

  callRemoteProc(procName, ...args) {
    if (!this._procCounter) this._procCounter = 0;
    const requestId = ++this._procCounter;

    return new Promise((resolve, reject) => {
      const handler = (reqId, result, error) => {
        if (reqId !== requestId) return;
        removeEventListener(`ragemp:procResult:${procName}`, handler);
        if (error) reject(new Error(error));
        else resolve(result);
      };
      onNet(`ragemp:procResult:${procName}`, handler);
      emitNet(`ragemp:proc:${procName}`, requestId, ...args);
    });
  }

  callRemoteUnreliable(eventName, ...args) {
    this.callRemote(eventName, ...args);
  }

  callBrowser(browser, eventName, ...args) {
    if (browser && typeof browser.call === "function") {
      browser.call(eventName, ...args);
    } else {
      SendNuiMessage(JSON.stringify({ event: eventName, args }));
    }
  }

  addRule(name, handler) {
    if (!this._rules) this._rules = new Map();
    this._rules.set(name, handler);
  }

  removeRule(name) {
    this._rules?.delete(name);
  }

  hasPendingProc(procName) {
    return false;
  }

  cancelPendingProc(procName) {
  }

  addDataHandler(key, handler) {
    if (!this._dataHandlers) this._dataHandlers = new Map();
    if (!this._dataHandlers.has(key)) this._dataHandlers.set(key, []);
    this._dataHandlers.get(key).push(handler);
  }

  remove(eventName, handler) {
    const handlers = this._handlers.get(eventName);
    if (!handlers) return;
    if (handler) {
      handlers.delete(handler);
    } else {
      handlers.clear();
    }

    if (eventName === "render" && this._renderTick !== null) {
      const renderHandlers = this._handlers.get("render");
      if (!renderHandlers || renderHandlers.size === 0) {
        clearTick(this._renderTick);
        this._renderTick = null;
      }
    }
  }
}
