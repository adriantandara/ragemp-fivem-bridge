import { setPoolLifecycleSink } from "@ragemp-fivem-bridge/shared";
import { Mp } from "./Mp";
import * as spawnmanager from "./Plugins/builtin/spawnmanager";
import * as vehicleSync from "./Plugins/builtin/vehicle-sync";
import * as rageRpc from "./Plugins/builtin/rage-rpc";

if (GetResourceMetadata(GetCurrentResourceName(), "ragemp_bridge", 0) !== "library") {
  globalThis.mp = new Mp();

  setPoolLifecycleSink((type, entity) => globalThis.mp?.events?._fire(type, entity));

  globalThis.mp.plugins.registerBuiltin(rageRpc);
  globalThis.mp.plugins.registerBuiltin(spawnmanager);
  globalThis.mp.plugins.registerBuiltin(vehicleSync);
  globalThis.mp.plugins.loadAll();

  emitNet("ragemp:playerReady", GetCurrentResourceName());

  const _clothesState = new Map();
  let _clothesTick = null;
  let _clothesDeadline = 0;

  function applyOneClothes(ped, component, c) {
    let d = c[0] | 0;
    if (d < 0) d = 0;
    let t = c[1] | 0;
    if (t < 0) t = 0;
    const maxD = GetNumberOfPedDrawableVariations(ped, component);
    if (!maxD || d >= maxD) return false;
    const maxT = GetNumberOfPedTextureVariations(ped, component, d);
    if (maxT > 0 && t >= maxT) t = 0;
    SetPedComponentVariation(ped, component, d, t, c[2] | 0);
    return true;
  }

  function applyAllClothes() {
    const ped = PlayerPedId();
    if (!ped || ped === 0) return false;
    let allDone = true;
    for (const [component, c] of _clothesState) {
      if (!applyOneClothes(ped, component, c)) allDone = false;
    }
    return allDone;
  }

  function ensureClothesApplied() {
    _clothesDeadline = GetGameTimer() + 10000;
    if (_clothesTick !== null) return;
    _clothesTick = setTick(() => {
      if (!_clothesState.size || applyAllClothes() || GetGameTimer() > _clothesDeadline) {
        clearTick(_clothesTick);
        _clothesTick = null;
      }
    });
  }

  globalThis.mp.events.add("playerSpawn", () => {
    if (_clothesState.size) ensureClothesApplied();
  });

  onNet("ragemp:giveWeapon", (weaponHash, ammo) => {
    GiveWeaponToPed(PlayerPedId(), weaponHash, ammo, false, true);
  });

  onNet("ragemp:removeWeapon", (weaponHash) => {
    RemoveWeaponFromPed(PlayerPedId(), weaponHash);
  });

  onNet("ragemp:removeAllWeapons", () => {
    RemoveAllPedWeapons(PlayerPedId(), false);
  });

  onNet("ragemp:setClothes", (component, drawable, texture, palette) => {
    _clothesState.set(component, [drawable, texture, palette]);
    ensureClothesApplied();
  });

  onNet("ragemp:setModel", (model) => {
    if (!model) return;
    RequestModel(model);
    let tries = 0;
    const timer = setInterval(() => {
      if (HasModelLoaded(model)) {
        clearInterval(timer);
        SetPlayerModel(PlayerId(), model);
        SetModelAsNoLongerNeeded(model);
        if (_clothesState.size) ensureClothesApplied();
      } else if (++tries > 100) {
        clearInterval(timer);
      }
    }, 50);
  });

  onNet("ragemp:setProp", (prop, drawable, texture) => {
    SetPedPropIndex(PlayerPedId(), prop, drawable, texture, true);
  });

  onNet("ragemp:setEyeColor", (index) => {
    SetPedEyeColor(PlayerPedId(), index);
  });

  onNet("ragemp:setHairColor", (color, highlight) => {
    SetPedHairColor(PlayerPedId(), color, highlight ?? color);
  });

  onNet("ragemp:setFaceFeature", (index, scale) => {
    SetPedFaceFeature(PlayerPedId(), index, scale);
  });

  onNet("ragemp:setHeadBlend", (sf, ss, st, kf, ks, kt, shapeMix, skinMix, thirdMix) => {
    SetPedHeadBlendData(PlayerPedId(), sf, ss, st ?? 0, kf, ks, kt ?? 0, shapeMix ?? 0, skinMix ?? 0, thirdMix ?? 0, false);
  });

  onNet("ragemp:updateHeadBlend", (shapeMix, skinMix, thirdMix) => {
    UpdatePedHeadBlendData(PlayerPedId(), shapeMix ?? 0, skinMix ?? 0, thirdMix ?? 0);
  });

  onNet("ragemp:setHeadOverlay", (overlay, params) => {
    const ped = PlayerPedId();
    const p = params || {};
    SetPedHeadOverlay(ped, overlay, p.value ?? 0, p.opacity ?? 1.0);
    if (p.color !== undefined) {
      SetPedHeadOverlayColor(ped, overlay, p.colorType ?? 1, p.color ?? 0, p.secondColor ?? p.color ?? 0);
    }
  });

  onNet("ragemp:setDecoration", (collection, overlay) => {
    const c = typeof collection === "string" ? GetHashKey(collection) : collection;
    const o = typeof overlay === "string" ? GetHashKey(overlay) : overlay;
    AddPedDecorationFromHashes(PlayerPedId(), c, o);
  });

  onNet("ragemp:clearDecorations", () => {
    ClearPedDecorations(PlayerPedId());
  });

  onNet("ragemp:setCustomization", (params) => {
    if (!params || typeof params !== "object") return;
    const ped = PlayerPedId();
    if (params.shapeFirst !== undefined) {
      SetPedHeadBlendData(ped, params.shapeFirst, params.shapeSecond ?? 0, params.shapeThird ?? 0, params.skinFirst ?? 0, params.skinSecond ?? 0, params.skinThird ?? 0, params.shapeMix ?? 0, params.skinMix ?? 0, params.thirdMix ?? 0, false);
    }
    if (params.eyeColor !== undefined) SetPedEyeColor(ped, params.eyeColor);
    if (params.hairColor !== undefined) SetPedHairColor(ped, params.hairColor, params.highlightColor ?? params.hairColor);
  });

  onNet("ragemp:setWeapon", (weapon) => {
    const ped = PlayerPedId();
    if (!weapon) {
      RemoveAllPedWeapons(ped, true);
      return;
    }
    GiveWeaponToPed(ped, weapon, 0, false, true);
    SetCurrentPedWeapon(ped, weapon, true);
  });

  onNet("ragemp:setWeaponAmmo", (weapon, ammo) => {
    SetPedAmmo(PlayerPedId(), weapon, ammo);
  });

  onNet("ragemp:playAnimation", (dict, name, speed, flag) => {
    if (typeof dict !== "string" || typeof name !== "string") return;
    RequestAnimDict(dict);
    let tries = 0;
    const timer = setInterval(() => {
      if (HasAnimDictLoaded(dict)) {
        clearInterval(timer);
        TaskPlayAnim(PlayerPedId(), dict, name, speed ?? 8.0, -8.0, -1, flag ?? 0, 0, false, false, false);
      } else if (++tries > 100) {
        clearInterval(timer);
      }
    }, 50);
  });

  onNet("ragemp:stopAnimation", () => {
    ClearPedTasks(PlayerPedId());
  });

  onNet("ragemp:playScenario", (name) => {
    if (typeof name === "string") TaskStartScenarioInPlace(PlayerPedId(), name, 0, true);
  });

  onNet("ragemp:eval", (code) => {
    if (GetConvarInt("ragemp_allow_remote_eval", 0) !== 1) {
      console.warn("[ragemp:eval] blocked — set replicated convar `ragemp_allow_remote_eval 1` to enable remote eval");
      return;
    }
    try {
      (0, eval)(code);
    } catch (e) {
      console.error("[ragemp:eval]", e);
    }
  });

  onNet("ragemp:invoke", (hash, ...args) => {
    if (GetConvarInt("ragemp_allow_remote_invoke", 0) !== 1) {
      console.warn("[ragemp:invoke] blocked — set replicated convar `ragemp_allow_remote_invoke 1` to enable remote native invoke");
      return;
    }
    if (typeof Citizen !== "undefined" && Citizen.invokeNative) {
      Citizen.invokeNative(hash, ...args);
    }
  });

  onNet("ragemp:notify", (message) => {
    SetNotificationTextEntry("STRING");
    AddTextComponentString(message);
    DrawNotification(false, false);
  });

  onNet("ragemp:chatMessage", (message) => {
    emit("chat:addMessage", { args: [message] });
    globalThis.mp?.browsers?._chatBrowser?.call("chat:push", message);
  });

  onNet("ragemp:requestVehicleControl", (targetServerId, netId) => {
    if (targetServerId !== -1 && targetServerId !== GetPlayerServerId(PlayerId())) return;
    if (!NetworkDoesNetworkIdExist(netId)) return;
    NetworkRequestControlOfNetworkId(netId);
  });

  onNet("ragemp:setTime", (hour, minute, second) => {
    NetworkOverrideClockTime(hour | 0, minute | 0, (second | 0) || 0);
  });

  onNet("ragemp:setWeather", (weather) => {
    if (typeof weather !== "string") return;
    SetWeatherTypeNowPersist(weather);
    SetWeatherTypePersist(weather);
  });

  onNet("ragemp:setWeatherTransition", (weather, easeTime) => {
    if (typeof weather !== "string") return;
    const ms = typeof easeTime === "number" ? easeTime : 0;
    if (ms > 0 && typeof SetWeatherTypeOvertimePersist === "function") {
      SetWeatherTypeOvertimePersist(weather, ms / 1000);
    } else {
      SetWeatherTypeNowPersist(weather);
      SetWeatherTypePersist(weather);
    }
  });

  onNet("ragemp:requestIpl", (name) => {
    if (typeof RequestIpl === "function") RequestIpl(name);
  });

  onNet("ragemp:removeIpl", (name) => {
    if (typeof RemoveIpl === "function") RemoveIpl(name);
  });

  onNet("ragemp:putIntoVehicle", (netId, seat) => {
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        clearInterval(timer);
        if (!NetworkHasControlOfNetworkId || !NetworkHasControlOfNetworkId(netId)) {
          NetworkRequestControlOfNetworkId(netId);
        }
        const gtaSeat = (typeof seat === "number" ? seat : 0) - 1;
        SetPedIntoVehicle(PlayerPedId(), handle, gtaSeat);
      } else if (tries > 100) {
        clearInterval(timer);
      }
    }, 50);
  });
}
