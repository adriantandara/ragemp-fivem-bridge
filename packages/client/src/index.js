import { Mp } from "./Mp";
import * as spawnmanager from "./Plugins/builtin/spawnmanager";
import * as vehicleSync from "./Plugins/builtin/vehicle-sync";
import * as rageRpc from "./Plugins/builtin/rage-rpc";

if (GetCurrentResourceName() !== "ragemp-fivem-bridge") {
  globalThis.mp = new Mp();

  globalThis.mp.plugins.registerBuiltin(rageRpc);
  globalThis.mp.plugins.registerBuiltin(spawnmanager);
  globalThis.mp.plugins.registerBuiltin(vehicleSync);
  globalThis.mp.plugins.loadAll();

  emitNet("ragemp:playerReady");

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
    SetPedComponentVariation(PlayerPedId(), component, drawable, texture, palette);
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
