import { Mp } from "./Mp";
import * as spawnmanager from "./Plugins/builtin/spawnmanager";
import * as vehicleSync from "./Plugins/builtin/vehicle-sync";
import * as rageRpc from "./Plugins/builtin/rage-rpc";

if (GetResourceMetadata(GetCurrentResourceName(), "ragemp_bridge", 0) !== "library") {
  globalThis.mp = new Mp();
  
  globalThis.mp.plugins.registerBuiltin(rageRpc);
  globalThis.mp.plugins.registerBuiltin(spawnmanager);
  globalThis.mp.plugins.registerBuiltin(vehicleSync);
  globalThis.mp.plugins.loadAll();

  emitNet("ragemp:playerReady", GetCurrentResourceName());

  const _clothesState = new Map();

  function applyClothes(ped, component, drawable, texture, palette) {
    if (!ped || ped === 0) return false;
    let d = drawable | 0;
    if (d < 0) d = 0;
    let t = texture | 0;
    if (t < 0) t = 0;
    const maxD = GetNumberOfPedDrawableVariations(ped, component);
    if (maxD > 0 && d >= maxD) return false;
    const maxT = GetNumberOfPedTextureVariations(ped, component, d);
    if (maxT > 0 && t >= maxT) t = 0;
    SetPedComponentVariation(ped, component, d, t, palette | 0);
    return true;
  }

  globalThis.mp.events.add("playerSpawn", () => {
    const ped = PlayerPedId();
    for (const [component, c] of _clothesState) {
      applyClothes(ped, component, c[0], c[1], c[2]);
    }
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
    applyClothes(PlayerPedId(), component, drawable, texture, palette);
  });

  onNet("ragemp:notify", (message) => {
    SetNotificationTextEntry("STRING");
    AddTextComponentString(message);
    DrawNotification(false, false);
  });

  onNet("ragemp:chatMessage", (message) => {
    emit("chat:addMessage", { args: [message] });
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

  onNet("ragemp:setWeatherTransition", (from, to) => {
    if (typeof to === "string") SetWeatherTypeNowPersist(to);
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
