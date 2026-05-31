export const name = "spawnmanager";

export default function setup({ mp, plugin }) {
  const DEFAULT_SPAWN = {
    x: 0,
    y: 0,
    z: 72,
    heading: 0,
    model: "mp_m_freemode_01",
  };

  let autoSpawnEnabled = true;
  let isSpawning = false;
  let firstSpawn = true;
  let spawnInfo = { ...DEFAULT_SPAWN };
  let autoRespawnAfterDeath = true;
  let respawnSuppressTick = null;
  let defaultSpawnTimer = null;
  let serverSpawnRequested = false;
  let defaultSpawnGrace = 2000;
  let pendingTarget = null;
  let pendingHeading = null;

  function applyPending() {
    const ped = PlayerPedId();
    if (pendingTarget) {
      const t = pendingTarget;
      pendingTarget = null;
      SetEntityCoordsNoOffset(ped, t.x, t.y, t.z, false, false, false);
    }
    if (pendingHeading !== null) {
      const h = pendingHeading;
      pendingHeading = null;
      SetEntityHeading(ped, h);
    }
  }

  function cancelDefaultSpawn() {
    if (defaultSpawnTimer === null) return;
    clearTimeout(defaultSpawnTimer);
    defaultSpawnTimer = null;
  }

  function scheduleDefaultSpawn() {
    if (!autoSpawnEnabled) return;
    if (serverSpawnRequested || !firstSpawn) return;
    if (defaultSpawnTimer !== null) return;
    defaultSpawnTimer = setTimeout(() => {
      defaultSpawnTimer = null;
      if (serverSpawnRequested || !firstSpawn || !autoSpawnEnabled) return;
      doSpawn();
    }, defaultSpawnGrace);
  }

  function startRespawnSuppress() {
    if (respawnSuppressTick !== null) return;
    if (typeof SetFadeOutAfterDeath === "function") SetFadeOutAfterDeath(false);
    respawnSuppressTick = setTick(() => {
      const ped = PlayerPedId();
      if (IsEntityDead(ped)) {
        IgnoreNextRestart(true);
        PauseDeathArrestRestart(true);
      }
    });
  }

  function stopRespawnSuppress() {
    if (respawnSuppressTick === null) return;
    clearTick(respawnSuppressTick);
    respawnSuppressTick = null;
    if (typeof SetFadeOutAfterDeath === "function") SetFadeOutAfterDeath(true);
    if (typeof PauseDeathArrestRestart === "function") PauseDeathArrestRestart(false);
  }

  async function loadModel(model) {
    const hash = typeof model === "string" ? GetHashKey(model) : model;
    if (!IsModelInCdimage(hash) || !IsModelValid(hash)) return null;
    RequestModel(hash);
    const start = Date.now();
    while (!HasModelLoaded(hash)) {
      if (Date.now() - start > 5000) return null;
      await mp.game.waitAsync(50);
    }
    return hash;
  }

  async function waitForGameReady() {
    while (!NetworkIsSessionStarted()) {
      await mp.game.waitAsync(100);
    }
  }

  async function doSpawn(info) {
    if (isSpawning) return;
    cancelDefaultSpawn();
    isSpawning = true;
    const data = { ...spawnInfo, ...(info && typeof info === "object" ? info : {}) };

    try {
      await waitForGameReady();

      const modelHash = await loadModel(data.model);
      if (modelHash !== null) {
        SetPlayerModel(PlayerId(), modelHash);
        SetModelAsNoLongerNeeded(modelHash);
      }

      const ped = PlayerPedId();
      SetPedDefaultComponentVariation(ped);

      DoScreenFadeOut(500);
      const fadeStart = Date.now();
      while (!IsScreenFadedOut() && Date.now() - fadeStart < 1500) {
        await mp.game.waitAsync(10);
      }

      RequestCollisionAtCoord(data.x, data.y, data.z);
      await mp.game.waitAsync(500);

      NetworkResurrectLocalPlayer(
        data.x,
        data.y,
        data.z,
        data.heading,
        0,
        false,
      );
      const newPed = PlayerPedId();
      FreezeEntityPosition(newPed, true);
      ClearPedTasksImmediately(newPed);
      RemoveAllPedWeapons(newPed, false);
      ClearPlayerWantedLevel(PlayerId());
      SetEntityHealth(newPed, 200);

      ShutdownLoadingScreen();
      if (typeof ShutdownLoadingScreenNui === "function")
        ShutdownLoadingScreenNui();

      const collisionStart = Date.now();
      while (
        !HasCollisionLoadedAroundEntity(newPed) &&
        Date.now() - collisionStart < 10000
      ) {
        await mp.game.waitAsync(100);
      }

      const [found, groundZ] = GetGroundZFor_3dCoord(
        data.x,
        data.y,
        data.z + 100.0,
        false,
      );
      if (found) {
        SetEntityCoordsNoOffset(
          newPed,
          data.x,
          data.y,
          groundZ,
          false,
          false,
          false,
        );
      }

      FreezeEntityPosition(newPed, false);
      DoScreenFadeIn(500);
      SetPlayerControl(PlayerId(), true, 0);

      if (globalThis.mp?.events) globalThis.mp.events._wasAlive = true;
      mp.events.call("playerSpawn", firstSpawn);
      emitNet("ragemp:playerSpawn");
      firstSpawn = false;
      applyPending();
    } catch (err) {
      plugin.log("spawn failed:", err);
    } finally {
      isSpawning = false;
    }
  }

  on("onClientResourceStart", (resName) => {
    if (resName !== GetCurrentResourceName()) return;
    if (autoSpawnEnabled) {
      ShutdownLoadingScreen();
      if (typeof ShutdownLoadingScreenNui === "function")
        ShutdownLoadingScreenNui();
      scheduleDefaultSpawn();
    }
  });

  onNet("ragemp:spawnmanager:spawn", (id, info) => {
    serverSpawnRequested = true;
    cancelDefaultSpawn();
    doSpawn(info);
  });

  onNet("ragemp:spawnmanager:setAutoSpawn", (id, state) => {
    autoSpawnEnabled = state !== false;
    if (!autoSpawnEnabled) cancelDefaultSpawn();
    else scheduleDefaultSpawn();
  });

  onNet("ragemp:setPosition", (id, pos) => {
    if (!pos || typeof pos !== "object") return;
    if (firstSpawn) {
      serverSpawnRequested = true;
      cancelDefaultSpawn();
      if (isSpawning) {
        pendingTarget = { x: pos.x, y: pos.y, z: pos.z };
        return;
      }
      doSpawn({ x: pos.x, y: pos.y, z: pos.z });
      return;
    }
    SetEntityCoordsNoOffset(PlayerPedId(), pos.x, pos.y, pos.z, false, false, false);
  });

  onNet("ragemp:setHeading", (id, heading) => {
    if (firstSpawn) {
      if (isSpawning) pendingHeading = heading;
      return;
    }
    SetEntityHeading(PlayerPedId(), heading);
  });

  onNet("ragemp:setAutoRespawn", (state) => {
    autoRespawnAfterDeath = state !== false;
    if (autoRespawnAfterDeath) stopRespawnSuppress();
    else startRespawnSuppress();
  });

  mp.spawnmanager = {
    setAutoSpawn(state) {
      autoSpawnEnabled = !!state;
      if (!autoSpawnEnabled) cancelDefaultSpawn();
    },
    get autoSpawn() {
      return autoSpawnEnabled;
    },
    setDefaultSpawnGrace(ms) {
      if (typeof ms === "number" && ms >= 0) defaultSpawnGrace = ms;
    },
    setSpawnPoint(info) {
      spawnInfo = { ...spawnInfo, ...(info ?? {}) };
    },
    get spawnPoint() {
      return { ...spawnInfo };
    },
    spawn(info) {
      serverSpawnRequested = true;
      return doSpawn(info);
    },
    forceRespawn() {
      firstSpawn = true;
      return doSpawn();
    },
    get isSpawning() {
      return isSpawning;
    },
    get hasSpawned() {
      return !firstSpawn;
    },
  };
}
