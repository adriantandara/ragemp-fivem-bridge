import { EventEmitter } from "@ragemp-fivem-bridge/shared";
import { sanitizeArgsForNet, rehydrateArgsFromNet, STATE_KEY_PREFIX } from "@ragemp-fivem-bridge/shared";
import { safeGetNetworkId } from "../utils/netId";
import { onWorldScan } from "../utils/worldScan";
import { isVisibleHere } from "../utils/dimension";
import { resolveNetEntity } from "../utils/netEntity";

export class EventManager extends EventEmitter {
  _renderTick: number | null = null;
  _lifecycleTick: number | null = null;
  _builtinTick: (() => void) | number | null = null;
  _lastHornState: boolean | null = null;
  _lastSirenState: boolean | null = null;
  _lastTrailerNetId: number | null = null;
  _lastAudioVehHandle: number | null = null;
  _lastPedModel: number | null = null;
  _lastVehicleSeat: number | null = null;
  _procs: Map<string, (...args: any[]) => any> | null = null;
  _pendingProcs: Map<number, { procName: string; resolve: (value: any) => void; reject: (reason?: any) => void; timer: ReturnType<typeof setTimeout> }> | null = null;
  _procCounter: number | null = null;
  _rules: Map<string, (...args: any[]) => any> | null = null;
  _dataHandlers: Map<string, Array<(...args: any[]) => void>> | null = null;
  _dataSnapshots: WeakMap<object, Map<string, any>> | null = null;

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

  _playerReadyFired = false;
  _playerReadyWaiting = false;

  _wasClicking = false;

  _streamedPlayers = new Set();

  _connectedPlayers = new Set();

  _talkingPlayers = new Set();

  _activeSet = new Set();

  _entityOwners = new Map();

  _insideCheckpoints = new Set();

  _waypointActive = false;
  _waypointX = 0;
  _waypointY = 0;
  _waypointZ = 0;
  _waypointReached = false;

  constructor() {
    super();
    this._setupBuiltinEvents();
  }

  _setupBuiltinEvents(): void {
    this._setupConsoleAndChat();
    this._setupGameEvents();
    this._setupGlobalErrorHandlers();
    this._setupStateBags();
    this._setupMainTick();
    this._setupProcChannel();

    onNet("ragemp:playerReady", (forResource: string | null) => {
      if (forResource && forResource !== GetCurrentResourceName()) return;
      if (this._playerReadyFired || this._playerReadyWaiting) return;
      const fire = () => {
        const localPlayer = globalThis.mp?.players?.local;
        if (!localPlayer) return false;
        this._playerReadyFired = true;
        this._fire("playerReady", localPlayer);
        return true;
      };
      if (fire()) return;
      this._playerReadyWaiting = true;
      const tick = setTick(() => {
        if (fire()) {
          this._playerReadyWaiting = false;
          clearTick(tick);
        }
      });
    });
  }

  _setupConsoleAndChat(): void {
    on("__cfx_internal:commandFallback", (commandName: string, ...args: any[]) => {
      this._fire("consoleCommand", commandName, ...args);
      const localPlayer = globalThis.mp?.players?.local;
      if (localPlayer) {
        this._fire("playerCommand", localPlayer, commandName, ...args);
      }
    });

    on("chatMessage", (_source: any, _name: any, message: string) => {
      const localPlayer = globalThis.mp?.players?.local;
      if (!localPlayer) return;
      this._fire("playerChat", localPlayer, message);
    });
  }

  _setupGameEvents(): void {
    on("gameEventTriggered", (name: string, args: any[]) => {
      const localPlayer = globalThis.mp?.players?.local;
      if (!localPlayer) return;

      if (name === "CEventNetworkEntityDamage") {
        const victim = args[0];
        const attacker = args[1];
        const damageAmount = args[3];
        const weaponHash = args[4];
        const localPed = PlayerPedId();

        if (victim === localPed) {
          this._fire(
            "incomingDamage",
            localPlayer,
            attacker,
            weaponHash,
            damageAmount,
            false,
            0,
          );
        }
        if (attacker === localPed) {
          this._fire(
            "outgoingDamage",
            localPlayer,
            victim,
            weaponHash,
            damageAmount,
            false,
            0,
          );
        }
        return;
      }

      if (name === "CEventExplosion") {
        const posX = args[2] ?? 0;
        const posY = args[3] ?? 0;
        const posZ = args[4] ?? 0;
        const explosionType = args[1] ?? -1;
        this._fire(
          "explosion",
          localPlayer,
          { x: posX, y: posY, z: posZ },
          explosionType,
        );
        return;
      }

      if (name === "CEventMeleeDamage") {
        const target = args[0];
        const attacker = args[1];
        const weaponHash = args[2] ?? 0;
        const damageAmount = args[3] ?? 0;
        const localPed = PlayerPedId();
        if (attacker === localPed) {
          this._fire(
            "meleeActionDamage",
            localPlayer,
            target,
            weaponHash,
            damageAmount,
          );
        }
        return;
      }

      if (name === "CProjectileImpactEvent") {
        const weaponHash = args[0];
        const impactX = args[1] ?? 0;
        const impactY = args[2] ?? 0;
        const impactZ = args[3] ?? 0;
        const targetEntity = args[4] ?? 0;
        this._fire(
          "playerWeaponShot",
          localPlayer,
          { x: impactX, y: impactY, z: impactZ },
          targetEntity,
        );
        this._fire(
          "projectile",
          { x: impactX, y: impactY, z: impactZ },
          weaponHash,
        );
        return;
      }
    });
  }

  _setupStateBags(): void {
    if (typeof AddStateBagChangeHandler !== "function") return;
    AddStateBagChangeHandler(null, null, (bagName: string, key: string, value: any) => {
      const mp = globalThis.mp;
      if (!mp || typeof bagName !== "string" || typeof key !== "string") return;
      if (key.indexOf(STATE_KEY_PREFIX) !== 0) return;
      const realKey = key.slice(STATE_KEY_PREFIX.length);
      let entity = null;
      if (bagName.indexOf("player:") === 0) {
        entity =
          mp.players?.atRemoteId?.(parseInt(bagName.slice(7), 10)) ?? null;
      } else if (bagName.indexOf("entity:") === 0) {
        const handle = NetworkGetEntityFromNetworkId(
          parseInt(bagName.slice(7), 10),
        );
        if (handle) {
          entity =
            mp.vehicles?.atHandle?.(handle) ??
            mp.peds?.atHandle?.(handle) ??
            mp.objects?.atHandle?.(handle) ??
            null;
        }
      }
      if (entity) {
        this._emitDataChange(entity, realKey, value);
      }
    });
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
    entity._variables.set(key, value);

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

  _setupGlobalErrorHandlers(): void {
    on("unhandledPromiseRejection", (error: any) => {
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

  _setupMainTick(): void {
    this._builtinTick = onWorldScan((cache: { players: number[]; vehicles: number[]; peds: number[] }) => {
      const ped = PlayerPedId();
      if (ped === 0) return;

      if (!this._builtinTickStarted) {
        this._initTick(ped, cache);
        return;
      }

      const localPlayer = globalThis.mp?.players?.local;
      if (!localPlayer) return;

      const playerCoords = GetEntityCoords(ped, true);

      this._tickCheckpoints(ped, localPlayer, playerCoords);
      this._tickWaypoint(ped, localPlayer, playerCoords);
      this._tickVehicleAudio();
      this._tickModelAndHealth(ped);
      this._tickActions(ped, localPlayer);
      this._tickStreaming(cache, localPlayer);
    });

    this._lifecycleTick = setTick(() => {
      if (!this._builtinTickStarted) return;
      const ped = PlayerPedId();
      if (ped === 0) return;
      const localPlayer = globalThis.mp?.players?.local;
      if (!localPlayer) return;

      this._tickLifecycle(ped, localPlayer);
      this._tickVehicleState(ped, localPlayer);
      this._tickWeapon(ped, localPlayer);
    });

    on("onResourceStop", (name: string) => {
      if (name !== GetCurrentResourceName()) return;
      if (this._lifecycleTick != null) {
        clearTick(this._lifecycleTick);
        this._lifecycleTick = null;
      }
      if (this._renderTick != null) {
        clearTick(this._renderTick);
        this._renderTick = null;
      }
      if (typeof this._builtinTick === "function") {
        this._builtinTick();
        this._builtinTick = null;
      }
    });
  }

  _initTick(ped: number, cache: { players: number[]; vehicles: number[]; peds: number[] }): void {
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
    this._lastAudioVehHandle = 0;
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
    const localPlayerId = PlayerId();
    for (const p of cache.players) {
      if (p === localPlayerId) continue;
      const serverId = GetPlayerServerId(p);
      if (serverId && serverId !== -1) this._connectedPlayers.add(serverId);
    }
  }

  _tickLifecycle(ped: number, localPlayer: any): void {
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
        } catch (_) {}
      }

      const killer = killerId
        ? (globalThis.mp?.players?.atRemoteId?.(killerId) ?? null)
        : null;
      this._fire("playerDeath", localPlayer, causeOfDeath, killer);
      emitNet("ragemp:playerDeath", causeOfDeath, killerId);
    } else if (
      !isDead &&
      !this._wasAlive &&
      !globalThis.mp?.spawnmanager?.isSpawning
    ) {
      this._fire("playerSpawn", localPlayer);
      this._fire("playerResurrect", localPlayer);
      emitNet("ragemp:playerSpawn");
    }
    this._wasAlive = !isDead;
  }

  _tickVehicleState(ped: number, localPlayer: any): void {
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
      this._lastVehicleSeat = seatIndex;

      const vehicleNetId = safeGetNetworkId(vehicleHandle);

      const enteredVehicle =
        globalThis.mp?.vehicles?._resolveHandle?.(vehicleHandle) ?? null;
      this._fire("playerEnterVehicle", enteredVehicle, seatIndex);

      emitNet("ragemp:playerEnterVehicle", vehicleNetId, seatIndex);
    } else if (!inVehicle && this._wasInVehicle) {
      const lastVehicle = this._lastVehicleHandle;
      const vehicleNetId = safeGetNetworkId(lastVehicle);

      const leftVehicle =
        globalThis.mp?.vehicles?._resolveHandle?.(lastVehicle) ?? null;
      this._fire(
        "playerLeaveVehicle",
        leftVehicle,
        this._lastVehicleSeat ?? -1,
      );

      emitNet("ragemp:playerExitVehicle", vehicleNetId);
      this._lastVehicleHandle = 0;
    }
    this._wasInVehicle = inVehicle;

    const tryingToEnterVehicle = GetVehiclePedIsTryingToEnter(ped);
    if (tryingToEnterVehicle !== 0 && !this._isTryingToEnterVehicle) {
      this._isTryingToEnterVehicle = true;
      this._tryingToEnterVehicleHandle = tryingToEnterVehicle;

      let seatIndex = -1;
      const maxPassengers =
        GetVehicleMaxNumberOfPassengers(tryingToEnterVehicle);
      for (let s = -1; s < maxPassengers; s++) {
        if (GetPedInVehicleSeat(tryingToEnterVehicle, s) === 0) {
          seatIndex = s;
          break;
        }
      }

      const vehicleNetId = safeGetNetworkId(tryingToEnterVehicle);
      const startVehicle =
        globalThis.mp?.vehicles?._resolveHandle?.(tryingToEnterVehicle) ?? null;
      this._fire("playerStartEnterVehicle", startVehicle, seatIndex);
      emitNet("ragemp:playerStartEnterVehicle", vehicleNetId, seatIndex);
    } else if (tryingToEnterVehicle === 0 && this._isTryingToEnterVehicle) {
      this._isTryingToEnterVehicle = false;
      this._tryingToEnterVehicleHandle = 0;
    }

    const isTryingToExit = inVehicle && GetIsTaskActive(ped, 2);
    if (isTryingToExit && !this._isTryingToExitVehicle) {
      this._isTryingToExitVehicle = true;
      const vehicleHandle = GetVehiclePedIsIn(ped, false);
      const vehicleNetId = safeGetNetworkId(vehicleHandle);
      const exitVehicle =
        globalThis.mp?.vehicles?._resolveHandle?.(vehicleHandle) ?? null;
      this._fire("playerStartExitVehicle", exitVehicle);
      emitNet("ragemp:playerStartExitVehicle", vehicleNetId);
    } else if (!isTryingToExit && this._isTryingToExitVehicle) {
      this._isTryingToExitVehicle = false;
    }
  }

  _tickWeapon(ped: number, localPlayer: any): void {
    const currentWeapon = GetSelectedPedWeapon(ped);
    if (currentWeapon !== this._lastWeaponHash) {
      const oldWeapon = this._lastWeaponHash;
      this._lastWeaponHash = currentWeapon;

      this._fire("playerWeaponChange", localPlayer, oldWeapon, currentWeapon);
      emitNet("ragemp:playerWeaponChange", oldWeapon, currentWeapon);
    }
  }

  _tickCheckpoints(ped: number, localPlayer: any, playerCoords: number[]): void {
    const checkpointPool = globalThis.mp?.checkpoints;
    if (!checkpointPool) return;

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
      const isInside =
        isVisibleHere(checkpoint._dimension) && distSq <= radius * radius;

      if (isInside && !this._insideCheckpoints.has(checkpoint.id)) {
        this._insideCheckpoints.add(checkpoint.id);
        this._fire("playerEnterCheckpoint", checkpoint);
        if (checkpoint._origin === "server")
          emitNet("ragemp:checkpoint:enter", checkpoint.id);
      } else if (!isInside && this._insideCheckpoints.has(checkpoint.id)) {
        this._insideCheckpoints.delete(checkpoint.id);
        this._fire("playerExitCheckpoint", checkpoint);
        if (checkpoint._origin === "server")
          emitNet("ragemp:checkpoint:exit", checkpoint.id);
      }
    }

    for (const cpId of this._insideCheckpoints) {
      if (!checkpointPool.exists(cpId)) {
        this._insideCheckpoints.delete(cpId);
      }
    }
  }

  _tickWaypoint(ped: number, localPlayer: any, playerCoords: number[]): void {
    const waypointNowActive = IsWaypointActive();

    if (waypointNowActive) {
      const waypointBlipId = GetFirstBlipInfoId(GetWaypointBlipEnumId());
      if (DoesBlipExist(waypointBlipId)) {
        const coords = GetBlipInfoIdCoord(waypointBlipId);
        const wx = coords[0];
        const wy = coords[1];
        const wz = coords[2];

        if (
          !this._waypointActive ||
          wx !== this._waypointX ||
          wy !== this._waypointY ||
          wz !== this._waypointZ
        ) {
          this._waypointX = wx;
          this._waypointY = wy;
          this._waypointZ = wz;
          this._waypointReached = false;
          this._fire("playerCreateWaypoint", localPlayer, wx, wy, wz);
        }

        if (!this._waypointReached) {
          const dxW = playerCoords[0] - wx;
          const dyW = playerCoords[1] - wy;
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
  }

  _tickVehicleAudio(): void {
    const vehHandle = this._wasInVehicle ? this._lastVehicleHandle : 0;
    if (vehHandle !== 0) {
      const isHornActive = IsVehicleHornActive(vehHandle);
      if (isHornActive !== this._lastHornState) {
        this._lastHornState = isHornActive;
        emitNet("ragemp:vehicleHorn", safeGetNetworkId(vehHandle), isHornActive);
      }
      const isSirenActive = IsVehicleSirenOn(vehHandle);
      if (isSirenActive !== this._lastSirenState) {
        this._lastSirenState = isSirenActive;
        emitNet("ragemp:vehicleSiren", safeGetNetworkId(vehHandle), isSirenActive);
      }
      const [hasTrailer, trailerHandle] = GetVehicleTrailerVehicle(vehHandle);
      const trailerNetId = hasTrailer ? safeGetNetworkId(trailerHandle) : 0;
      if (trailerNetId !== (this._lastTrailerNetId ?? 0)) {
        this._lastTrailerNetId = trailerNetId;
        if (trailerNetId !== 0) {
          emitNet(
            "ragemp:trailerAttached",
            safeGetNetworkId(vehHandle),
            trailerNetId,
          );
        }
      }
      this._lastAudioVehHandle = vehHandle;
    } else {
      const lastHandle = this._lastAudioVehHandle ?? 0;
      if (lastHandle !== 0 && (this._lastHornState || this._lastSirenState)) {
        const netId = safeGetNetworkId(lastHandle);
        if (this._lastHornState) emitNet("ragemp:vehicleHorn", netId, false);
        if (this._lastSirenState) emitNet("ragemp:vehicleSiren", netId, false);
      }
      this._lastHornState = false;
      this._lastSirenState = false;
      this._lastTrailerNetId = 0;
      this._lastAudioVehHandle = 0;
    }
  }

  _tickModelAndHealth(ped: number): void {
    const currentModel = GetEntityModel(ped);
    if (currentModel !== (this._lastPedModel ?? 0)) {
      if (this._lastPedModel !== undefined) {
        emitNet(
          "ragemp:entityModelChange",
          0,
          this._lastPedModel,
          currentModel,
        );
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
  }

  _tickActions(ped: number, localPlayer: any): void {
    const isShooting = IsPedShooting(ped);
    if (isShooting && !this._wasShooting) {
      const [hit, impactCoords] = GetPedLastWeaponImpactCoord(ped);
      const targetPos = hit
        ? { x: impactCoords[0], y: impactCoords[1], z: impactCoords[2] }
        : null;
      this._fire("playerWeaponShot", localPlayer, targetPos, 0);
    }
    this._wasShooting = isShooting;

    const isClicking = IsControlPressed(0, 24);
    if (isClicking && !this._wasClicking) {
      const [cursorX, cursorY] = GetNuiCursorPosition();
      this._fire("click", { x: cursorX ?? 0, y: cursorY ?? 0 }, "down");
    } else if (!isClicking && this._wasClicking) {
      const [cursorX, cursorY] = GetNuiCursorPosition();
      this._fire("click", { x: cursorX ?? 0, y: cursorY ?? 0 }, "up");
    }
    this._wasClicking = isClicking;
  }

  _tickStreaming(cache: { players: number[]; vehicles: number[]; peds: number[] }, localPlayer: any): void {
    const activePlayers = cache.players;
    const activeSet = this._activeSet;
    activeSet.clear();
    const localPlayerId = PlayerId();
    const pool = globalThis.mp?.players;

    for (const p of activePlayers) {
      const serverId = GetPlayerServerId(p);
      if (!serverId || serverId === -1) continue;
      activeSet.add(serverId);
      const remoteMp = pool?.atRemoteId?.(serverId) ?? p;
      const isLocal = p === localPlayerId;

      if (!isLocal) {
        const pPed = GetPlayerPed(p);
        const isStreamed = pPed !== 0 && DoesEntityExist(pPed);
        if (isStreamed && !this._streamedPlayers.has(serverId)) {
          this._streamedPlayers.add(serverId);
          this._fire("playerStreamIn", remoteMp);
        } else if (!isStreamed && this._streamedPlayers.has(serverId)) {
          this._streamedPlayers.delete(serverId);
          this._fire("playerStreamOut", remoteMp);
        }

        if (!this._connectedPlayers.has(serverId)) {
          this._connectedPlayers.add(serverId);
          this._fire("playerJoin", remoteMp);
        }
      }

      const isTalking = NetworkIsPlayerTalking(p);
      if (isTalking && !this._talkingPlayers.has(serverId)) {
        this._talkingPlayers.add(serverId);
        this._fire("playerStartTalking", remoteMp);
      } else if (!isTalking && this._talkingPlayers.has(serverId)) {
        this._talkingPlayers.delete(serverId);
        this._fire("playerStopTalking", remoteMp);
      }
    }

    for (const id of this._streamedPlayers) {
      if (!activeSet.has(id)) this._streamedPlayers.delete(id);
    }
    for (const id of this._connectedPlayers) {
      if (!activeSet.has(id)) {
        this._connectedPlayers.delete(id);
        const quitMp = pool?.atRemoteId?.(id) ?? id;
        this._fire("playerQuit", quitMp, "quit", "");
      }
    }
    for (const id of this._talkingPlayers) {
      if (!activeSet.has(id)) this._talkingPlayers.delete(id);
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
  }

  _onAdd(eventName: string): void {
	if (eventName === "render" && this._renderTick === null) {
       this._renderTick = setTick(() => {
         this._fire("render");
       });
       return;
   }

    if (!this._handlers.get(`__net_${eventName}`)) {
      const sentinel = (() => {}) as any;
      this._handlers.set(`__net_${eventName}`, new Set([sentinel]));
      onNet(eventName, (...args: any[]) => {
        this._fire(eventName, ...rehydrateArgsFromNet(args, resolveNetEntity));
      });
    }
  }

  call(eventName: string, ...args: any[]): void {
    this._fire(eventName, ...args);
  }

  callRemote(eventName: string, ...args: any[]): void {
    emitNet(eventName, ...sanitizeArgsForNet(args));
  }

  addProc(procName: string, handler: (...args: any[]) => any): void {
    if (!this._procs) this._procs = new Map();
    this._procs.set(procName, handler);
  }

  removeProc(procName: string): void {
    this._procs?.delete(procName);
  }

  _setupProcChannel(): void {
    if (!this._pendingProcs) this._pendingProcs = new Map();
    if (!this._procs) this._procs = new Map();

    onNet("ragemp:procResult", (reqId: number, error: string | null, result: any) => {
      const entry = this._pendingProcs.get(reqId);
      if (!entry) return;
      if (entry.timer) clearTimeout(entry.timer);
      this._pendingProcs.delete(reqId);
      if (error) entry.reject(new Error(error));
      else entry.resolve(result);
    });

    onNet("ragemp:callProc", async (procName: string, reqId: number, ...args: any[]) => {
      const handler = this._procs.get(procName);
      if (!handler) {
        emitNet(
          "ragemp:callProcResult",
          reqId,
          `Proc not found: ${procName}`,
          null,
        );
        return;
      }
      try {
        const result = await handler(...args);
        emitNet("ragemp:callProcResult", reqId, null, result);
      } catch (err) {
        emitNet("ragemp:callProcResult", reqId, String(err), null);
      }
    });
  }

  callRemoteProc(procName: string, ...args: any[]): Promise<any> {
    if (!this._pendingProcs) this._pendingProcs = new Map();
    if (!this._procCounter) this._procCounter = 0;
    const requestId = ++this._procCounter;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        if (this._pendingProcs.has(requestId)) {
          this._pendingProcs.delete(requestId);
          reject(new Error(`callRemoteProc timeout (${procName})`));
        }
      }, 30000);
      this._pendingProcs.set(requestId, { procName, resolve, reject, timer });
      emitNet("ragemp:proc", procName, requestId, ...args);
    });
  }

  callRemoteUnreliable(eventName: string, ...args: any[]): void {
    this.callRemote(eventName, ...args);
  }

  callBrowser(browser: any, eventName: string, ...args: any[]): void {
    if (browser && typeof browser.call === "function") {
      browser.call(eventName, ...args);
    } else {
      SendNuiMessage(JSON.stringify({ event: eventName, args }));
    }
  }

  addRule(name: string, handler: (...args: any[]) => any): void {
    if (!this._rules) this._rules = new Map();
    this._rules.set(name, handler);
  }

  removeRule(name: string): void {
    this._rules?.delete(name);
  }

  hasPendingProc(procName?: string | null): boolean {
    if (!this._pendingProcs) return false;
    if (procName == null) return this._pendingProcs.size > 0;
    for (const entry of this._pendingProcs.values()) {
      if (entry.procName === procName) return true;
    }
    return false;
  }

  cancelPendingProc(procName?: string | null): void {
    if (!this._pendingProcs) return;
    for (const [reqId, entry] of this._pendingProcs) {
      if (procName != null && entry.procName !== procName) continue;
      if (entry.timer) clearTimeout(entry.timer);
      entry.reject(new Error("Cancelled"));
      this._pendingProcs.delete(reqId);
    }
  }

  addDataHandler(key: string, handler: (...args: any[]) => void): void {
    if (!this._dataHandlers) this._dataHandlers = new Map();
    if (!this._dataHandlers.has(key)) this._dataHandlers.set(key, []);
    this._dataHandlers.get(key).push(handler);
  }

  _onRemove(eventName: string): void {
    if (eventName === "render" && this._renderTick !== null) {
      const renderHandlers = this._handlers.get("render");
      if (!renderHandlers || renderHandlers.size === 0) {
        clearTick(this._renderTick);
        this._renderTick = null;
      }
    }
  }
}
