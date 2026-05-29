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
    isSpawning = true;
    const data = { ...spawnInfo, ...(info ?? {}) };

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
      doSpawn();
    }
  });

  onNet("ragemp:spawnmanager:spawn", (info) => {
    doSpawn(info);
  });

  mp.spawnmanager = {
    setAutoSpawn(state) {
      autoSpawnEnabled = !!state;
    },
    get autoSpawn() {
      return autoSpawnEnabled;
    },
    setSpawnPoint(info) {
      spawnInfo = { ...spawnInfo, ...(info ?? {}) };
    },
    get spawnPoint() {
      return { ...spawnInfo };
    },
    spawn(info) {
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
