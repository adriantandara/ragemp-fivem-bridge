import { setPoolLifecycleSink } from "@ragemp-fivem-bridge/shared";
import { Mp } from "./Mp";
import * as spawnmanager from "./Plugins/builtin/spawnmanager";
import * as vehicleSync from "./Plugins/builtin/vehicle-sync";
import * as rageRpc from "./Plugins/builtin/rage-rpc";
import { setLocalDimension } from "./utils/dimension";

if (GetResourceMetadata(GetCurrentResourceName(), "ragemp_bridge", 0) !== "library") {
  globalThis.mp = new Mp();

  setPoolLifecycleSink((type, entity) => globalThis.mp?.events?._fire(type, entity));

  globalThis.mp.plugins.registerBuiltin(rageRpc);
  globalThis.mp.plugins.registerBuiltin(spawnmanager);
  globalThis.mp.plugins.registerBuiltin(vehicleSync);
  globalThis.mp.plugins.loadAll();

  emitNet("ragemp:playerReady", GetCurrentResourceName());

  const _clothesState = new Map();
  const _propsState = new Map();
  const _appearance = {
    headBlend: null,
    eyeColor: null,
    hairColor: null,
    faceFeatures: new Map(),
    headOverlays: new Map(),
    decorations: [],
  };
  let _appearanceTick = null;
  let _appearanceDeadline = 0;
  let _appearanceApplied = false;

  function isFreemodeModel(model) {
    const m = model >>> 0;
    return m === (GetHashKey("mp_m_freemode_01") >>> 0) || m === (GetHashKey("mp_f_freemode_01") >>> 0);
  }

  function applyAppearance(ped) {
    const a = _appearance;
    if (a.headBlend) {
      const b = a.headBlend;
      SetPedHeadBlendData(
        ped,
        b.shapeFirst | 0, b.shapeSecond | 0, b.shapeThird | 0,
        b.skinFirst | 0, b.skinSecond | 0, b.skinThird | 0,
        b.shapeMix || 0, b.skinMix || 0, b.thirdMix || 0,
        false
      );
    }
    if (a.eyeColor != null) SetPedEyeColor(ped, a.eyeColor | 0);
    if (a.hairColor) SetPedHairColor(ped, a.hairColor.color | 0, (a.hairColor.highlight ?? a.hairColor.color) | 0);
    for (const [index, scale] of a.faceFeatures) SetPedFaceFeature(ped, index | 0, scale);
    for (const [overlay, p] of a.headOverlays) {
      SetPedHeadOverlay(ped, overlay | 0, p.value | 0, p.opacity ?? 1.0);
      if (p.color !== undefined && p.color !== null) {
        SetPedHeadOverlayColor(ped, overlay | 0, p.colorType ?? 1, p.color | 0, (p.secondColor ?? p.color) | 0);
      }
    }
    if (a.decorations.length) {
      ClearPedDecorations(ped);
      for (const d of a.decorations) {
        const c = typeof d.collection === "string" ? GetHashKey(d.collection) : d.collection;
        const o = typeof d.overlay === "string" ? GetHashKey(d.overlay) : d.overlay;
        AddPedDecorationFromHashes(ped, c, o);
      }
    }
  }

  function hasAppearance() {
    const a = _appearance;
    return !!(a.headBlend || a.eyeColor != null || a.hairColor || a.faceFeatures.size || a.headOverlays.size || a.decorations.length);
  }

  function applyAppearanceOnce() {
    if (!hasAppearance()) return true;
    const ped = PlayerPedId();
    if (!ped || ped === 0) return false;
    if (_appearance.headBlend && !isFreemodeModel(GetEntityModel(ped))) return false;
    applyAppearance(ped);
    _appearanceApplied = true;
    return true;
  }

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

  function applyAllProps() {
    const ped = PlayerPedId();
    if (!ped || ped === 0) return false;
    for (const [prop, v] of _propsState) {
      if (v[0] < 0) {
        ClearPedProp(ped, prop);
      } else {
        SetPedPropIndex(ped, prop, v[0], v[1], true);
      }
    }
    return true;
  }

  function ensureAppearance() {
    _appearanceApplied = false;
    _appearanceDeadline = GetGameTimer() + 10000;
    if (_appearanceTick !== null) return;
    _appearanceTick = setTick(() => {
      const faceOk = _appearanceApplied || applyAppearanceOnce();
      const clothesOk = !_clothesState.size || applyAllClothes();
      const propsOk = !_propsState.size || applyAllProps();
      if ((faceOk && clothesOk && propsOk) || GetGameTimer() > _appearanceDeadline) {
        clearTick(_appearanceTick);
        _appearanceTick = null;
      }
    });
  }

  globalThis.mp.events.add("playerSpawn", () => {
    ensureAppearance();
  });

  onNet("ragemp:setDimension", (dimension) => {
    setLocalDimension(dimension);
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
    ensureAppearance();
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
        SetPedDefaultComponentVariation(PlayerPedId());
        ensureAppearance();
      } else if (++tries > 100) {
        clearInterval(timer);
      }
    }, 50);
  });

  onNet("ragemp:setProp", (prop, drawable, texture) => {
    _propsState.set(prop, [drawable, texture]);
    ensureAppearance();
  });

  onNet("ragemp:setEyeColor", (index) => {
    _appearance.eyeColor = index;
    ensureAppearance();
  });

  onNet("ragemp:setHairColor", (color, highlight) => {
    _appearance.hairColor = { color, highlight: highlight ?? color };
    ensureAppearance();
  });

  onNet("ragemp:setFaceFeature", (index, scale) => {
    _appearance.faceFeatures.set(index, scale);
    ensureAppearance();
  });

  onNet("ragemp:setHeadBlend", (sf, ss, st, kf, ks, kt, shapeMix, skinMix, thirdMix) => {
    _appearance.headBlend = {
      shapeFirst: sf, shapeSecond: ss, shapeThird: st ?? 0,
      skinFirst: kf, skinSecond: ks, skinThird: kt ?? 0,
      shapeMix: shapeMix ?? 0, skinMix: skinMix ?? 0, thirdMix: thirdMix ?? 0,
    };
    ensureAppearance();
  });

  onNet("ragemp:updateHeadBlend", (shapeMix, skinMix, thirdMix) => {
    if (!_appearance.headBlend) {
      _appearance.headBlend = {
        shapeFirst: 0, shapeSecond: 0, shapeThird: 0,
        skinFirst: 0, skinSecond: 0, skinThird: 0,
        shapeMix: 0, skinMix: 0, thirdMix: 0,
      };
    }
    _appearance.headBlend.shapeMix = shapeMix ?? 0;
    _appearance.headBlend.skinMix = skinMix ?? 0;
    _appearance.headBlend.thirdMix = thirdMix ?? 0;
    ensureAppearance();
  });

  onNet("ragemp:setHeadOverlay", (overlay, params) => {
    _appearance.headOverlays.set(overlay, params || {});
    ensureAppearance();
  });

  onNet("ragemp:setDecoration", (collection, overlay) => {
    _appearance.decorations.push({ collection, overlay });
    ensureAppearance();
  });

  onNet("ragemp:clearDecorations", () => {
    _appearance.decorations = [];
    const ped = PlayerPedId();
    if (ped && ped !== 0) ClearPedDecorations(ped);
  });

  onNet("ragemp:setCustomization", (params) => {
    if (!params || typeof params !== "object") return;
    _appearance.headBlend = {
      shapeFirst: params.shapeFirst ?? 0, shapeSecond: params.shapeSecond ?? 0, shapeThird: params.shapeThird ?? 0,
      skinFirst: params.skinFirst ?? 0, skinSecond: params.skinSecond ?? 0, skinThird: params.skinThird ?? 0,
      shapeMix: params.shapeMix ?? 0, skinMix: params.skinMix ?? 0, thirdMix: params.thirdMix ?? 0,
    };
    if (params.eyeColor !== undefined) _appearance.eyeColor = params.eyeColor;
    if (params.hairColor !== undefined) {
      _appearance.hairColor = { color: params.hairColor, highlight: params.highlightColor ?? params.hairColor };
    }
    if (Array.isArray(params.faceFeatures)) {
      for (let i = 0; i < params.faceFeatures.length && i < 20; i++) {
        _appearance.faceFeatures.set(i, params.faceFeatures[i] ?? 0);
      }
    }
    ensureAppearance();
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
