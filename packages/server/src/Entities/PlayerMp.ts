import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { gtaPedHealthToRage } from "@ragemp-fivem-bridge/shared";
import { normalizeDimension } from "@ragemp-fivem-bridge/shared";
import { sanitizeArgsForNet } from "@ragemp-fivem-bridge/shared";

export class PlayerMp extends Entity {
  _ready: boolean;
  _autoRespawnAfterDeath: boolean;
  _weapon: number;
  _isAiming: boolean;
  _isJumping: boolean;
  _isClimbing: boolean;
  _isInCover: boolean;
  _isInMelee: boolean;
  _isReloading: boolean;
  _isEnteringVehicle: boolean;
  _isLeavingVehicle: boolean;
  _isOnLadder: boolean;
  _action: string;
  _weapons: any[];
  _hairColor: number;
  _hairHighlightColor: number;
  _clothes: Record<number, { drawable: number; texture: number; palette: number }>;
  _props: Record<number, { drawable: number; texture: number }>;
  _weaponAmmo: Record<number, number>;
  _alpha: number;
  _eyeColor: number;
  _faceFeatures: Record<number, number>;
  _headBlend: {
    shapeFirst: number; shapeSecond: number; shapeThird: number;
    skinFirst: number; skinSecond: number; skinThird: number;
    shapeMix: number; skinMix: number; thirdMix: number;
  } | null;
  _headOverlays: Record<number, [number, number, number, number]>;
  _decorations: Array<{ collection: number; overlay: number }>;
  _disableOutgoingSync: boolean;
  _gameType: string;
  _name?: string;
  _vehicle?: any;
  _customization?: any;
  _pendingProcs?: Map<number, { procName: string; resolve: (v: any) => void; reject: (e: Error) => void; timer: ReturnType<typeof setTimeout> }>;
  _procCounter?: number;

  constructor(source: number) {
    super(source, "player");

    this._ready = true;
    this._autoRespawnAfterDeath = true;
    this._spawnIssued = false;
    this._autoSpawn = true;
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

  _stateBag(): any {
    return globalThis.Player(this.id).state;
  }

  get name(): string {
    return this._name ?? GetPlayerName(this.id.toString());
  }

  set name(value: string) {
    this._name = value;
  }

  get ip(): string {
    return GetPlayerEndpoint(this.id.toString());
  }

  get ping(): number {
    return GetPlayerPing(this.id.toString());
  }

  get identifiers(): Record<string, string> {
    const out: Record<string, string> = {};
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

  getIdentifier(type: string): string | null {
    return this.identifiers[type] ?? null;
  }

  get serial(): string {
    const ids = this.identifiers;
    return ids.license2 || ids.license || ids.fivem || "";
  }

  get socialClub(): string {
    return this.identifiers.fivem || this.name;
  }

  get rgscId(): string {
    return this.identifiers.license2 || this.identifiers.license || "";
  }

  get ped(): number {
    return GetPlayerPed(this.id.toString());
  }

  get health(): number {
    return gtaPedHealthToRage(GetEntityHealth(this.ped));
  }

  set health(value: number) {
    emitNet("ragemp:setHealth", this.id, value);
  }

  getHealth(): number {
    return gtaPedHealthToRage(GetEntityHealth(this.ped));
  }

  setHealth(value: number): void {
    emitNet("ragemp:setHealth", this.id, value);
  }

  get armour(): number {
    return GetPedArmour(this.ped);
  }

  set armour(value: number) {
    emitNet("ragemp:setArmour", this.id, value);
  }

  get heading(): number {
    return GetEntityHeading(this.ped);
  }

  set heading(value: number) {
    SetEntityHeading(this.ped, value);
  }

  get position(): Vector3 {
    const coords = GetEntityCoords(this.ped);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  set position(value: Vector3) {
    SetEntityCoords(this.ped, value.x, value.y, value.z, false, false, false, false);
  }

  get dimension(): number {
    return GetPlayerRoutingBucket(this.id.toString());
  }

  set dimension(value: number) {
    const dim = normalizeDimension(value);
    SetPlayerRoutingBucket(this.id.toString(), dim);
    emitNet("ragemp:setDimension", this.id, dim);
  }

  get model(): number {
    return this._model || GetEntityModel(this.ped);
  }

  set model(value: number | string) {
    this._model = typeof value === "string" ? GetHashKey(value) : value;
    emitNet("ragemp:setModel", this.id, this._model);
  }

  get weapon(): number {
    return this._weapon;
  }

  set weapon(value: number) {
    emitNet("ragemp:setWeapon", this.id, value);
  }

  get weaponAmmo(): number {
    return this._weaponAmmo[this._weapon] ?? 0;
  }

  set weaponAmmo(value: number) {
    this._weaponAmmo[this._weapon] = value;
    emitNet("ragemp:setWeaponAmmo", this.id, this._weapon, value);
  }

  get eyeColor(): number {
    return this._eyeColor;
  }

  set eyeColor(value: number) {
    this._eyeColor = value;
    emitNet("ragemp:setEyeColor", this.id, value);
  }

  get packetLoss(): number {
    return 0.0;
  }

  get streamedPlayers(): PlayerMp[] {
    const result: PlayerMp[] = [];
    const pool = globalThis.mp.players;
    pool.forEach((player: PlayerMp) => {
      if (player.id !== this.id && this.isStreamed(player)) {
        result.push(player);
      }
    });
    return result;
  }

  get disableOutgoingSync(): boolean {
    return this._disableOutgoingSync;
  }

  set disableOutgoingSync(value: boolean) {
    this._disableOutgoingSync = value;
  }

  get gameType(): string {
    return this._gameType;
  }

  set gameType(value: string) {
    this._gameType = value;
  }

  get alpha(): number {
    return this._alpha;
  }

  set alpha(value: number) {
    this._alpha = value;
    emitNet("ragemp:setAlpha", this.id, value);
  }

  get seat(): number {
    const ped = GetPlayerPed(String(this.id));
    const veh = GetVehiclePedIsIn(ped, false);
    if (veh === 0) return -1;
    for (let i = -1; i < 16; i++) {
      if (GetPedInVehicleSeat(veh, i) === ped) return i + 1;
    }
    return -1;
  }

  get isAiming(): boolean {
    return this._isAiming;
  }

  get isJumping(): boolean {
    return this._isJumping;
  }

  get isClimbing(): boolean {
    return this._isClimbing;
  }

  get isInCover(): boolean {
    return this._isInCover;
  }

  get isInMelee(): boolean {
    return this._isInMelee;
  }

  get isReloading(): boolean {
    return this._isReloading;
  }

  get isEnteringVehicle(): boolean {
    return this._isEnteringVehicle;
  }

  get isLeavingVehicle(): boolean {
    return this._isLeavingVehicle;
  }

  get isOnLadder(): boolean {
    return this._isOnLadder;
  }

  get action(): string {
    return this._action;
  }

  get weapons(): any[] {
    return this._weapons;
  }

  get allWeapons(): any[] {
    return this._weapons;
  }

  get hairColor(): number {
    return this._hairColor;
  }

  set hairColor(value: number) {
    this._hairColor = value;
    emitNet("ragemp:setHairColor", this.id, this._hairColor, this._hairHighlightColor);
  }

  get hairHighlightColor(): number {
    return this._hairHighlightColor;
  }

  set hairHighlightColor(value: number) {
    this._hairHighlightColor = value;
    emitNet("ragemp:setHairColor", this.id, this._hairColor, this._hairHighlightColor);
  }

  get vehicle(): any {
    const pool = globalThis.mp.vehicles;
    if (this._vehicle && pool.exists(this._vehicle.id)) return this._vehicle;
    const veh = GetVehiclePedIsIn(this.ped, false);
    if (!veh || veh === 0) return null;
    return pool.atHandle(veh) ?? null;
  }

  set vehicle(value: any) {
    this._vehicle = value ?? null;
  }

  kick(reason: string): void {
    DropPlayer(this.id.toString(), reason ?? "Kicked");
  }

  spawn(position: Vector3, heading?: number): void {
    const pos = position ?? this.position;
    const info: any = { x: pos.x, y: pos.y, z: pos.z, heading: heading ?? 0 };
    if (this._model) info.model = this._model;
    this._spawnIssued = true;
    if (typeof this._resetWeaponState === "function")
      this._resetWeaponState();
    emitNet("ragemp:spawnmanager:spawn", this.id, info);
  }

  get autoSpawn() {
    return this._autoSpawn;
  }

  setAutoSpawn(state: boolean): void {
    this._autoSpawn = state !== false;
  }

  get autoRespawnAfterDeath(): boolean {
    return this._autoRespawnAfterDeath;
  }

  setAutoRespawnAfterDeath(state: boolean): void {
    this._autoRespawnAfterDeath = state !== false;
    emitNet("ragemp:setAutoRespawn", this.id, this._autoRespawnAfterDeath);
  }

  call(eventName: string, args?: any[]): void {
    const list = Array.isArray(args) ? args : args == null ? [] : [args];
    emitNet(eventName, this.id, ...sanitizeArgsForNet(list));
  }

  notify(message: string): void {
    this.call("ragemp:notify", [message]);
  }

  outputChatBox(message: string): void {
    this.call("ragemp:chatMessage", [message]);
  }

  giveWeapon(weaponOrArray: number | number[], ammo: number): void {
    if (Array.isArray(weaponOrArray)) {
      for (const [hash, amt] of weaponOrArray as any) {
        this.call("ragemp:giveWeapon", [hash, amt]);
      }
    } else {
      this.call("ragemp:giveWeapon", [weaponOrArray, ammo]);
    }
  }

  removeWeapon(weaponHash: number): void {
    this.call("ragemp:removeWeapon", [weaponHash]);
  }

  removeAllWeapons(): void {
    this._resetWeaponState();
    this.call("ragemp:removeAllWeapons");
  }

  _resetWeaponState(): void {
    this._weapons = [];
    this._weapon = 0;
    this._weaponAmmo = {};
  }

  setClothes(component: number, drawable: number, texture: number, palette: number): void {
    this._clothes[component] = { drawable, texture, palette: palette ?? 0 };
    this.call("ragemp:setClothes", [component, drawable, texture, palette ?? 0]);
  }

  putIntoVehicle(vehicle: any, seat: number): void {
    if (!vehicle?._handle) return;
    this._vehicle = vehicle;
    const targetSeat = typeof seat === "number" ? seat : 0;
    const playerId = this.id;
    const send = (tries: number): void => {
      if (!globalThis.mp?.players?.at?.(playerId)) return;
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

  removeFromVehicle(): void {
    TaskLeaveAnyVehicle(this.ped, 0, 0);
  }

  ban(reason: string): void {
    DropPlayer(String(this.id), reason ?? "Banned");
  }

  kickSilent(reason?: string): void {
    DropPlayer(String(this.id), reason ?? "");
  }

  getClothes(component: number): { drawable: number; texture: number; palette: number } {
    return this._clothes?.[component] ?? { drawable: 0, texture: 0, palette: 0 };
  }

  getProp(prop: number): { drawable: number; texture: number } {
    return this._props?.[prop] ?? { drawable: 0, texture: 0 };
  }

  setProp(prop: number, drawable: number, texture: number): void {
    this._props[prop] = { drawable, texture };
    emitNet("ragemp:setProp", this.id, prop, drawable, texture);
  }

  getWeaponAmmo(hash: number): number {
    return this._weaponAmmo?.[hash] ?? 0;
  }

  setWeaponAmmo(hash: number, ammo: number): void {
    this._weaponAmmo[hash] = ammo;
    emitNet("ragemp:setWeaponAmmo", this.id, hash, ammo);
  }

  playAnimation(dict: string, name: string, speed: number, flag: number): void {
    emitNet("ragemp:playAnimation", this.id, dict, name, speed ?? 8.0, flag ?? 0);
  }

  stopAnimation(): void {
    emitNet("ragemp:stopAnimation", this.id);
  }

  playScenario(name: string): void {
    emitNet("ragemp:playScenario", this.id, name);
  }

  setHairColor(color: number, highlight: number): void {
    this._hairColor = color;
    this._hairHighlightColor = highlight;
    emitNet("ragemp:setHairColor", this.id, color, highlight);
  }

  setHeadBlend(shapeFirst: number, shapeSecond: number, shapeThird: number, skinFirst: number, skinSecond: number, skinThird: number, shapeMix: number, skinMix: number, thirdMix: number): void {
    this._headBlend = {
      shapeFirst, shapeSecond, shapeThird,
      skinFirst, skinSecond, skinThird,
      shapeMix, skinMix, thirdMix,
    };
    emitNet("ragemp:setHeadBlend", this.id, shapeFirst, shapeSecond, shapeThird, skinFirst, skinSecond, skinThird, shapeMix, skinMix, thirdMix);
  }

  getHeadBlend(): { shapes: number[]; skins: number[]; shapeMix: number; skinMix: number; thirdMix: number } {
    const b = this._headBlend ?? {
      shapeFirst: 0, shapeSecond: 0, shapeThird: 0,
      skinFirst: 0, skinSecond: 0, skinThird: 0,
      shapeMix: 0, skinMix: 0, thirdMix: 0,
    };
    return {
      shapes: [b.shapeFirst, b.shapeSecond, b.shapeThird],
      skins: [b.skinFirst, b.skinSecond, b.skinThird],
      shapeMix: b.shapeMix,
      skinMix: b.skinMix,
      thirdMix: b.thirdMix,
    };
  }

  updateHeadBlend(shapeMix: number, skinMix: number, thirdMix: number): void {
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

  setFaceFeature(index: number, scale: number): void {
    this._faceFeatures[index] = scale;
    emitNet("ragemp:setFaceFeature", this.id, index, scale);
  }

  getFaceFeature(index: number): number {
    return this._faceFeatures[index] ?? 0.0;
  }

  setHeadOverlay(overlay: number, params: [number, number, number, number]): void {
    this._headOverlays[overlay] = params;
    emitNet("ragemp:setHeadOverlay", this.id, overlay, params);
  }

  getHeadOverlay(overlay: number): [number, number, number, number] {
    return this._headOverlays[overlay] ?? [0, 0, 0, 0];
  }

  setCustomization(gender: boolean, shapeFirst: number, shapeSecond: number, shapeThird: number, skinFirst: number, skinSecond: number, skinThird: number, shapeMix: number, skinMix: number, thirdMix: number, eyeColor: number, hairColor: number, highlightColor: number, faceFeatures: number[]): void {
    const params: any =
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

  setDecoration(collection: number, overlay: number): void {
    this._decorations.push({ collection, overlay });
    emitNet("ragemp:setDecoration", this.id, collection, overlay);
  }

  getDecoration(collection: number, overlay?: number): { collection: number; overlay: number } | null {
    return this._decorations.find(
      (d) => d.collection === collection && d.overlay === overlay
    ) ?? null;
  }

  clearDecorations(): void {
    this._decorations = [];
    emitNet("ragemp:clearDecorations", this.id);
  }

  eval(code: string): void {
    if (!globalThis.mp?.config?.security?.allowRemoteEval) {
      console.warn("[mp] player.eval() will be ignored by the client unless the replicated convar `ragemp_allow_remote_eval 1` is set");
    }
    emitNet("ragemp:eval", this.id, code);
  }

  invoke(hash: string, ...args: any[]): void {
    if (!globalThis.mp?.config?.security?.allowRemoteInvoke) {
      console.warn("[mp] player.invoke() will be ignored by the client unless the replicated convar `ragemp_allow_remote_invoke 1` is set");
    }
    emitNet("ragemp:invoke", this.id, hash, ...args);
  }

  isStreamed(target: PlayerMp | number): boolean {
    if (!target) return false;
    const other: PlayerMp | undefined = typeof target === "number" ? globalThis.mp.players.at(target) : target;
    if (!other) return false;
    if ((this as any)._ready === false || (other as any)._ready === false) return false;
    if (this.dimension !== other.dimension) return false;
    const a = this.position;
    const b = other.position;
    if (!a || !b) return false;
    const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
    return (dx * dx + dy * dy + dz * dz) <= 300 * 300;
  }

  callUnreliable(eventName: string, args?: any[]): void {
    const list = Array.isArray(args) ? args : args == null ? [] : [args];
    emitNet(eventName, this.id, ...sanitizeArgsForNet(list));
  }

  callToStreamed(includeSelf: boolean | string, eventName: string | any[], args?: any[]): void {
    if (typeof includeSelf === "string") {
      args = eventName as any[];
      eventName = includeSelf;
      includeSelf = false;
    }
    const argArray = sanitizeArgsForNet(Array.isArray(args) ? args : args == null ? [] : [args]);
    globalThis.mp.players.forEach((other: PlayerMp) => {
      if (other === this) {
        if (includeSelf) emitNet(eventName as string, other.id, ...argArray);
        return;
      }
      if (this.isStreamed(other)) {
        emitNet(eventName as string, other.id, ...argArray);
      }
    });
  }

  _resolveProc(reqId: number, error: string | null, result: any): void {
    const entry = this._pendingProcs?.get(reqId);
    if (!entry) return;
    if (entry.timer) clearTimeout(entry.timer);
    this._pendingProcs!.delete(reqId);
    if (error) entry.reject(new Error(error));
    else entry.resolve(result);
  }

  callProc<T = any>(procName: string, ...args: any[]): Promise<T> {
    if (!this._pendingProcs) this._pendingProcs = new Map();
    if (this._procCounter === undefined) this._procCounter = 0;
    return new Promise<T>((resolve, reject) => {
      const reqId = ++this._procCounter!;
      const timer = setTimeout(() => {
        if (this._pendingProcs!.has(reqId)) {
          this._pendingProcs!.delete(reqId);
          reject(new Error(`callProc timeout (${procName})`));
        }
      }, 30000);
      this._pendingProcs!.set(reqId, { procName, resolve, reject, timer });
      emitNet("ragemp:callProc", this.id, procName, reqId, ...sanitizeArgsForNet(args));
    });
  }

  cancelPendingProc(procName?: string): void {
    if (!this._pendingProcs) return;
    for (const [reqId, entry] of this._pendingProcs) {
      if (procName != null && entry.procName !== procName) continue;
      if (entry.timer) clearTimeout(entry.timer);
      entry.reject(new Error("Cancelled"));
      this._pendingProcs.delete(reqId);
    }
  }

  hasPendingProc(procName?: string): boolean {
    if (!this._pendingProcs || this._pendingProcs.size === 0) return false;
    if (procName == null) return true;
    for (const entry of this._pendingProcs.values()) {
      if (entry.procName === procName) return true;
    }
    return false;
  }

  enableVoiceTo(target: PlayerMp): void {
    emitNet("ragemp:enableVoiceTo", this.id, target.id);
  }

  disableVoiceTo(target: PlayerMp): void {
    emitNet("ragemp:disableVoiceTo", this.id, target.id);
  }

  destroy(): void {
    this.kick("Destroyed");
  }
}
