import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { gtaPedHealthToRage } from "@ragemp-fivem-bridge/shared";

export class PlayerMp extends Entity {
  constructor(source) {
    super(source, "player");

    this._weapon = 0;
    this._isAiming = false;
    this._isJumping = false;
    this._isClimbing = false;
    this._isInCover = false;
    this._isInMelee = false;
    this._isReloading = false;
    this._isEnteringVehicle = false;
    this._isLeavingVehicle = false;
    this._isOnLadder = false;
    this._action = "";
    this._weapons = [];
    this._hairColor = 0;
    this._hairHighlightColor = 0;
    this._clothes = {};
    this._props = {};
    this._weaponAmmo = {};
    this._alpha = 255;
    this._eyeColor = 0;
    this._faceFeatures = {};
    this._headBlend = null;
    this._headOverlays = {};
    this._decorations = [];
    this._disableOutgoingSync = false;
    this._gameType = "";
  }

  _stateBag() {
    return globalThis.Player(this.id).state;
  }

  get name() {
    return this._name ?? GetPlayerName(this.id.toString());
  }

  set name(value) {
    this._name = value;
  }

  get ip() {
    return GetPlayerEndpoint(this.id.toString());
  }

  get ping() {
    return GetPlayerPing(this.id.toString());
  }

  get identifiers() {
    const out = {};
    const src = this.id.toString();
    const count = GetNumPlayerIdentifiers(src);
    for (let i = 0; i < count; i++) {
      const id = GetPlayerIdentifier(src, i);
      if (!id) continue;
      const sep = id.indexOf(":");
      if (sep > 0) out[id.slice(0, sep)] = id.slice(sep + 1);
    }
    return out;
  }

  getIdentifier(type) {
    return this.identifiers[type] ?? null;
  }

  get serial() {
    const ids = this.identifiers;
    return ids.license2 || ids.license || ids.fivem || "";
  }

  get socialClub() {
    return this.identifiers.fivem || this.name;
  }

  get rgscId() {
    return this.identifiers.license2 || this.identifiers.license || "";
  }

  get ped() {
    return GetPlayerPed(this.id.toString());
  }

  get health() {
    return gtaPedHealthToRage(GetEntityHealth(this.ped));
  }

  set health(value) {
    emitNet("ragemp:setHealth", this.id, value);
  }

  getHealth() {
    return gtaPedHealthToRage(GetEntityHealth(this.ped));
  }

  setHealth(value) {
    emitNet("ragemp:setHealth", this.id, value);
  }

  get armour() {
    return GetPedArmour(this.ped);
  }

  set armour(value) {
    emitNet("ragemp:setArmour", this.id, value);
  }

  get heading() {
    return GetEntityHeading(this.ped);
  }

  set heading(value) {
    SetEntityHeading(this.ped, value);
  }

  get position() {
    const coords = GetEntityCoords(this.ped);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  set position(value) {
    SetEntityCoords(this.ped, value.x, value.y, value.z, false, false, false, false);
  }

  get dimension() {
    return GetPlayerRoutingBucket(this.id.toString());
  }

  set dimension(value) {
    SetPlayerRoutingBucket(this.id.toString(), value);
  }

  get model() {
    return this._model || GetEntityModel(this.ped);
  }

  set model(value) {
    this._model = typeof value === "string" ? GetHashKey(value) : value;
    emitNet("ragemp:setModel", this.id, this._model);
  }

  get weapon() {
    return this._weapon;
  }

  set weapon(value) {
    emitNet("ragemp:setWeapon", this.id, value);
  }

  get weaponAmmo() {
    return this._weaponAmmo[this._weapon] ?? 0;
  }

  set weaponAmmo(value) {
    this._weaponAmmo[this._weapon] = value;
    emitNet("ragemp:setWeaponAmmo", this.id, this._weapon, value);
  }

  get eyeColor() {
    return this._eyeColor;
  }

  set eyeColor(value) {
    this._eyeColor = value;
    emitNet("ragemp:setEyeColor", this.id, value);
  }

  get packetLoss() {
    return 0.0;
  }

  get streamedPlayers() {
    const dim = this.dimension;
    const result = [];
    const pool = globalThis.mp.players;
    pool.forEach((player) => {
      if (player.id !== this.id && player.dimension === dim) {
        result.push(player);
      }
    });
    return result;
  }

  get disableOutgoingSync() {
    return this._disableOutgoingSync;
  }

  set disableOutgoingSync(value) {
    this._disableOutgoingSync = value;
  }

  get gameType() {
    return this._gameType;
  }

  set gameType(value) {
    this._gameType = value;
  }

  get alpha() {
    return this._alpha;
  }

  set alpha(value) {
    this._alpha = value;
    emitNet("ragemp:setAlpha", this.id, value);
  }

  get seat() {
    const ped = GetPlayerPed(String(this.id));
    const veh = GetVehiclePedIsIn(ped, false);
    if (veh === 0) return -1;
    for (let i = -1; i < 16; i++) {
      if (GetPedInVehicleSeat(veh, i) === ped) return i + 1;
    }
    return -1;
  }

  get isAiming() {
    return this._isAiming;
  }

  get isJumping() {
    return this._isJumping;
  }

  get isClimbing() {
    return this._isClimbing;
  }

  get isInCover() {
    return this._isInCover;
  }

  get isInMelee() {
    return this._isInMelee;
  }

  get isReloading() {
    return this._isReloading;
  }

  get isEnteringVehicle() {
    return this._isEnteringVehicle;
  }

  get isLeavingVehicle() {
    return this._isLeavingVehicle;
  }

  get isOnLadder() {
    return this._isOnLadder;
  }

  get action() {
    return this._action;
  }

  get weapons() {
    return this._weapons;
  }

  get allWeapons() {
    return this._weapons;
  }

  get hairColor() {
    return this._hairColor;
  }

  set hairColor(value) {
    this._hairColor = value;
    emitNet("ragemp:setHairColor", this.id, this._hairColor, this._hairHighlightColor);
  }

  get hairHighlightColor() {
    return this._hairHighlightColor;
  }

  set hairHighlightColor(value) {
    this._hairHighlightColor = value;
    emitNet("ragemp:setHairColor", this.id, this._hairColor, this._hairHighlightColor);
  }

  get vehicle() {
    const pool = globalThis.mp.vehicles;
    if (this._vehicle && pool.exists(this._vehicle.id)) return this._vehicle;
    const veh = GetVehiclePedIsIn(this.ped, false);
    if (!veh || veh === 0) return null;
    return pool.atHandle(veh) ?? null;
  }

  set vehicle(value) {
    this._vehicle = value ?? null;
  }

  kick(reason) {
    DropPlayer(this.id.toString(), reason ?? "Kicked");
  }

  spawn(position) {
    this.position = position;
    this.removeAllWeapons();
  }

  call(eventName, args) {
    emitNet(eventName, this.id, ...(Array.isArray(args) ? args : args == null ? [] : [args]));
  }

  notify(message) {
    this.call("ragemp:notify", message);
  }

  outputChatBox(message) {
    this.call("ragemp:chatMessage", message);
  }

  giveWeapon(weaponOrArray, ammo) {
    if (Array.isArray(weaponOrArray)) {
      for (const [hash, amt] of weaponOrArray) {
        this.call("ragemp:giveWeapon", [hash, amt]);
      }
    } else {
      this.call("ragemp:giveWeapon", [weaponOrArray, ammo]);
    }
  }

  removeWeapon(weaponHash) {
    this.call("ragemp:removeWeapon", weaponHash);
  }

  removeAllWeapons() {
    this._resetWeaponState();
    this.call("ragemp:removeAllWeapons");
  }

  _resetWeaponState() {
    this._weapons = [];
    this._weapon = 0;
    this._weaponAmmo = {};
  }

  setClothes(component, drawable, texture, palette) {
    this._clothes[component] = { drawable, texture, palette: palette ?? 0 };
    this.call("ragemp:setClothes", [component, drawable, texture, palette ?? 0]);
  }

  putIntoVehicle(vehicle, seat) {
    if (!vehicle?._handle) return;
    this._vehicle = vehicle;
    const targetSeat = typeof seat === "number" ? seat : 0;
    const playerId = this.id;
    const send = (tries) => {
      if (!DoesEntityExist(vehicle._handle)) return;
      const netId = NetworkGetNetworkIdFromEntity(vehicle._handle);
      if (netId) {
        emitNet("ragemp:putIntoVehicle", playerId, netId, targetSeat);
      } else if (tries < 50) {
        setTimeout(() => send(tries + 1), 50);
      }
    };
    send(0);
  }

  removeFromVehicle() {
    TaskLeaveAnyVehicle(this.ped, 0);
  }

  ban(reason) {
    DropPlayer(String(this.id), reason ?? "Banned");
  }

  kickSilent(reason) {
    DropPlayer(String(this.id), reason ?? "");
  }

  getClothes(component) {
    return this._clothes?.[component] ?? { drawable: 0, texture: 0, palette: 0 };
  }

  getProp(prop) {
    return this._props?.[prop] ?? { drawable: 0, texture: 0 };
  }

  setProp(prop, drawable, texture) {
    this._props[prop] = { drawable, texture };
    emitNet("ragemp:setProp", this.id, prop, drawable, texture);
  }

  getWeaponAmmo(hash) {
    return this._weaponAmmo?.[hash] ?? 0;
  }

  setWeaponAmmo(hash, ammo) {
    this._weaponAmmo[hash] = ammo;
    emitNet("ragemp:setWeaponAmmo", this.id, hash, ammo);
  }

  playAnimation(dict, name, speed, flag) {
    emitNet("ragemp:playAnimation", this.id, dict, name, speed ?? 8.0, flag ?? 0);
  }

  stopAnimation() {
    emitNet("ragemp:stopAnimation", this.id);
  }

  playScenario(name) {
    emitNet("ragemp:playScenario", this.id, name);
  }

  setHairColor(color, highlight) {
    this._hairColor = color;
    this._hairHighlightColor = highlight;
    emitNet("ragemp:setHairColor", this.id, color, highlight);
  }

  setHeadBlend(shapeFirst, shapeSecond, shapeThird, skinFirst, skinSecond, skinThird, shapeMix, skinMix, thirdMix) {
    this._headBlend = {
      shapeFirst, shapeSecond, shapeThird,
      skinFirst, skinSecond, skinThird,
      shapeMix, skinMix, thirdMix,
    };
    emitNet("ragemp:setHeadBlend", this.id, shapeFirst, shapeSecond, shapeThird, skinFirst, skinSecond, skinThird, shapeMix, skinMix, thirdMix);
  }

  getHeadBlend() {
    return this._headBlend ?? {
      shapeFirst: 0, shapeSecond: 0, shapeThird: 0,
      skinFirst: 0, skinSecond: 0, skinThird: 0,
      shapeMix: 0, skinMix: 0, thirdMix: 0,
    };
  }

  updateHeadBlend(shapeMix, skinMix, thirdMix) {
    if (this._headBlend) {
      this._headBlend.shapeMix = shapeMix;
      this._headBlend.skinMix = skinMix;
      this._headBlend.thirdMix = thirdMix;
    } else {
      this._headBlend = {
        shapeFirst: 0, shapeSecond: 0, shapeThird: 0,
        skinFirst: 0, skinSecond: 0, skinThird: 0,
        shapeMix, skinMix, thirdMix,
      };
    }
    emitNet("ragemp:updateHeadBlend", this.id, shapeMix, skinMix, thirdMix);
  }

  setFaceFeature(index, scale) {
    this._faceFeatures[index] = scale;
    emitNet("ragemp:setFaceFeature", this.id, index, scale);
  }

  getFaceFeature(index) {
    return this._faceFeatures[index] ?? 0.0;
  }

  setHeadOverlay(overlay, params) {
    this._headOverlays[overlay] = params;
    emitNet("ragemp:setHeadOverlay", this.id, overlay, params);
  }

  getHeadOverlay(overlay) {
    return this._headOverlays[overlay] ?? { value: 0, opacity: 1.0, color: 0, secondColor: 0 };
  }

  setCustomization(gender, shapeFirst, shapeSecond, shapeThird, skinFirst, skinSecond, skinThird, shapeMix, skinMix, thirdMix, eyeColor, hairColor, highlightColor, faceFeatures) {
    const params =
      gender !== null && typeof gender === "object"
        ? gender
        : {
            gender,
            shapeFirst, shapeSecond, shapeThird,
            skinFirst, skinSecond, skinThird,
            shapeMix, skinMix, thirdMix,
            eyeColor, hairColor, highlightColor, faceFeatures,
          };
    this._customization = params;
    emitNet("ragemp:setCustomization", this.id, params);
  }

  setDecoration(collection, overlay) {
    this._decorations.push({ collection, overlay });
    emitNet("ragemp:setDecoration", this.id, collection, overlay);
  }

  getDecoration(collection, overlay) {
    return this._decorations.find(
      (d) => d.collection === collection && d.overlay === overlay
    ) ?? null;
  }

  clearDecorations() {
    this._decorations = [];
    emitNet("ragemp:clearDecorations", this.id);
  }

  eval(code) {
    if (!globalThis.mp?.config?.security?.allowRemoteEval) {
      console.warn("[mp] player.eval() will be ignored by the client unless the replicated convar `ragemp_allow_remote_eval 1` is set");
    }
    emitNet("ragemp:eval", this.id, code);
  }

  invoke(hash, ...args) {
    if (!globalThis.mp?.config?.security?.allowRemoteInvoke) {
      console.warn("[mp] player.invoke() will be ignored by the client unless the replicated convar `ragemp_allow_remote_invoke 1` is set");
    }
    emitNet("ragemp:invoke", this.id, hash, ...args);
  }

  isStreamed(target) {
    if (!target) return false;
    const other = typeof target === "number" ? globalThis.mp.players.at(target) : target;
    if (!other) return false;
    if (this.dimension !== other.dimension) return false;
    const a = this.position;
    const b = other.position;
    if (!a || !b) return false;
    const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
    return (dx * dx + dy * dy + dz * dz) <= 300 * 300;
  }

  callUnreliable(eventName, args) {
    emitNet(eventName, this.id, ...(Array.isArray(args) ? args : args == null ? [] : [args]));
  }

  callToStreamed(includeSelf, eventName, args) {
    if (typeof includeSelf === "string") {
      args = eventName;
      eventName = includeSelf;
      includeSelf = false;
    }
    const argArray = Array.isArray(args) ? args : args == null ? [] : [args];
    globalThis.mp.players.forEach((other) => {
      if (other === this) {
        if (includeSelf) emitNet(eventName, other.id, ...argArray);
        return;
      }
      if (this.isStreamed(other)) {
        emitNet(eventName, other.id, ...argArray);
      }
    });
  }

  _resolveProc(reqId, error, result) {
    const entry = this._pendingProcs?.get(reqId);
    if (!entry) return;
    if (entry.timer) clearTimeout(entry.timer);
    this._pendingProcs.delete(reqId);
    if (error) entry.reject(new Error(error));
    else entry.resolve(result);
  }

  callProc(procName, ...args) {
    if (!this._pendingProcs) this._pendingProcs = new Map();
    if (this._procCounter === undefined) this._procCounter = 0;
    return new Promise((resolve, reject) => {
      const reqId = ++this._procCounter;
      const timer = setTimeout(() => {
        if (this._pendingProcs.has(reqId)) {
          this._pendingProcs.delete(reqId);
          reject(new Error(`callProc timeout (${procName})`));
        }
      }, 30000);
      this._pendingProcs.set(reqId, { procName, resolve, reject, timer });
      emitNet("ragemp:callProc", this.id, procName, reqId, ...args);
    });
  }

  cancelPendingProc(procName) {
    if (!this._pendingProcs) return;
    for (const [reqId, entry] of this._pendingProcs) {
      if (procName != null && entry.procName !== procName) continue;
      if (entry.timer) clearTimeout(entry.timer);
      entry.reject(new Error("Cancelled"));
      this._pendingProcs.delete(reqId);
    }
  }

  hasPendingProc(procName) {
    if (!this._pendingProcs || this._pendingProcs.size === 0) return false;
    if (procName == null) return true;
    for (const entry of this._pendingProcs.values()) {
      if (entry.procName === procName) return true;
    }
    return false;
  }

  enableVoiceTo(target) {
    emitNet("ragemp:enableVoiceTo", this.id, target.id);
  }

  disableVoiceTo(target) {
    emitNet("ragemp:disableVoiceTo", this.id, target.id);
  }

  destroy() {
    this.kick("Destroyed");
  }
}
