import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { gtaPedHealthToRage } from "@ragemp-fivem-bridge/shared";
import { normalizeDimension } from "@ragemp-fivem-bridge/shared";
import { sanitizeArgsForNet } from "@ragemp-fivem-bridge/shared";
import { EntityInternals } from "@ragemp-fivem-bridge/shared/internal";
import { safeGetNetworkId } from "../utils/netId";
import { PlayerInternals, initPlayerInternals, resetWeaponState } from "../internal/playerInternals";
import { VehicleInternals } from "../internal/vehicleInternals";

export class PlayerMp extends Entity {
  constructor(source: number) {
    super(source, "player");
    initPlayerInternals(this);
    const rec = EntityInternals.get(this);
    rec.stateBag = () => globalThis.Player(this.id).state;
  }

  get name(): string {
    return PlayerInternals.get(this).name ?? GetPlayerName(this.id.toString());
  }

  set name(value: string) {
    PlayerInternals.get(this).name = value;
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
    return EntityInternals.get(this).model || GetEntityModel(this.ped);
  }

  set model(value: number | string) {
    const rec = EntityInternals.get(this);
    rec.model = typeof value === "string" ? GetHashKey(value) : value;
    emitNet("ragemp:setModel", this.id, rec.model);
  }

  get weapon(): number {
    return PlayerInternals.get(this).weapon;
  }

  set weapon(value: number) {
    emitNet("ragemp:setWeapon", this.id, value);
  }

  get weaponAmmo(): number {
    const rec = PlayerInternals.get(this);
    return rec.weaponAmmo[rec.weapon] ?? 0;
  }

  set weaponAmmo(value: number) {
    const rec = PlayerInternals.get(this);
    rec.weaponAmmo[rec.weapon] = value;
    emitNet("ragemp:setWeaponAmmo", this.id, rec.weapon, value);
  }

  get eyeColor(): number {
    return PlayerInternals.get(this).eyeColor;
  }

  set eyeColor(value: number) {
    PlayerInternals.get(this).eyeColor = value;
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
    return PlayerInternals.get(this).disableOutgoingSync;
  }

  set disableOutgoingSync(value: boolean) {
    PlayerInternals.get(this).disableOutgoingSync = value;
  }

  get gameType(): string {
    return PlayerInternals.get(this).gameType;
  }

  set gameType(value: string) {
    PlayerInternals.get(this).gameType = value;
  }

  get alpha(): number {
    return EntityInternals.get(this).alpha;
  }

  set alpha(value: number) {
    EntityInternals.get(this).alpha = value;
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
    return PlayerInternals.get(this).isAiming;
  }

  get isJumping(): boolean {
    return PlayerInternals.get(this).isJumping;
  }

  get isClimbing(): boolean {
    return PlayerInternals.get(this).isClimbing;
  }

  get isInCover(): boolean {
    return PlayerInternals.get(this).isInCover;
  }

  get isInMelee(): boolean {
    return PlayerInternals.get(this).isInMelee;
  }

  get isReloading(): boolean {
    return PlayerInternals.get(this).isReloading;
  }

  get isEnteringVehicle(): boolean {
    return PlayerInternals.get(this).isEnteringVehicle;
  }

  get isLeavingVehicle(): boolean {
    return PlayerInternals.get(this).isLeavingVehicle;
  }

  get isOnLadder(): boolean {
    return PlayerInternals.get(this).isOnLadder;
  }

  get action(): string {
    return PlayerInternals.get(this).action;
  }

  get weapons(): any[] {
    return PlayerInternals.get(this).weapons;
  }

  get allWeapons(): any[] {
    return PlayerInternals.get(this).weapons;
  }

  get hairColor(): number {
    return PlayerInternals.get(this).hairColor;
  }

  set hairColor(value: number) {
    const rec = PlayerInternals.get(this);
    rec.hairColor = value;
    emitNet("ragemp:setHairColor", this.id, rec.hairColor, rec.hairHighlightColor);
  }

  get hairHighlightColor(): number {
    return PlayerInternals.get(this).hairHighlightColor;
  }

  set hairHighlightColor(value: number) {
    const rec = PlayerInternals.get(this);
    rec.hairHighlightColor = value;
    emitNet("ragemp:setHairColor", this.id, rec.hairColor, rec.hairHighlightColor);
  }

  get vehicle(): any {
    const rec = PlayerInternals.get(this);
    const pool = globalThis.mp.vehicles;
    if (rec.vehicle && pool.exists(rec.vehicle.id)) return rec.vehicle;
    const veh = GetVehiclePedIsIn(this.ped, false);
    if (!veh || veh === 0) return null;
    return pool.atHandle(veh) ?? null;
  }

  set vehicle(value: any) {
    PlayerInternals.get(this).vehicle = value ?? null;
  }

  kick(reason: string): void {
    DropPlayer(this.id.toString(), reason ?? "Kicked");
  }

  spawn(position: Vector3, heading?: number): void {
    const pos = position ?? this.position;
    const info: any = { x: pos.x, y: pos.y, z: pos.z, heading: heading ?? 0 };
    const model = EntityInternals.get(this).model;
    if (model) info.model = model;
    const rec = PlayerInternals.get(this);
    rec.spawnIssued = true;
    resetWeaponState(rec);
    emitNet("ragemp:spawnmanager:spawn", this.id, info);
  }

  get autoSpawn() {
    return PlayerInternals.get(this).autoSpawn;
  }

  setAutoSpawn(state: boolean): void {
    PlayerInternals.get(this).autoSpawn = state !== false;
  }

  get autoRespawnAfterDeath(): boolean {
    return PlayerInternals.get(this).autoRespawnAfterDeath;
  }

  setAutoRespawnAfterDeath(state: boolean): void {
    const rec = PlayerInternals.get(this);
    rec.autoRespawnAfterDeath = state !== false;
    emitNet("ragemp:setAutoRespawn", this.id, rec.autoRespawnAfterDeath);
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
    resetWeaponState(PlayerInternals.get(this));
    this.call("ragemp:removeAllWeapons");
  }

  setClothes(component: number, drawable: number, texture: number, palette: number): void {
    PlayerInternals.get(this).clothes[component] = { drawable, texture, palette: palette ?? 0 };
    this.call("ragemp:setClothes", [component, drawable, texture, palette ?? 0]);
  }

  putIntoVehicle(vehicle: any, seat: number): void {
    if (!vehicle?.handle) return;
    PlayerInternals.get(this).vehicle = vehicle;
    const targetSeat = typeof seat === "number" ? seat : 0;
    const playerId = this.id;
    const send = (tries: number): void => {
      if (!globalThis.mp?.players?.at?.(playerId)) return;
      if (!DoesEntityExist(vehicle.handle)) return;
      const netId = VehicleInternals.get(vehicle).cachedNetId || safeGetNetworkId(vehicle.handle);
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
    return PlayerInternals.get(this).clothes?.[component] ?? { drawable: 0, texture: 0, palette: 0 };
  }

  getProp(prop: number): { drawable: number; texture: number } {
    return PlayerInternals.get(this).props?.[prop] ?? { drawable: 0, texture: 0 };
  }

  setProp(prop: number, drawable: number, texture: number): void {
    PlayerInternals.get(this).props[prop] = { drawable, texture };
    emitNet("ragemp:setProp", this.id, prop, drawable, texture);
  }

  getWeaponAmmo(hash: number): number {
    return PlayerInternals.get(this).weaponAmmo?.[hash] ?? 0;
  }

  setWeaponAmmo(hash: number, ammo: number): void {
    PlayerInternals.get(this).weaponAmmo[hash] = ammo;
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
    const rec = PlayerInternals.get(this);
    rec.hairColor = color;
    rec.hairHighlightColor = highlight;
    emitNet("ragemp:setHairColor", this.id, color, highlight);
  }

  setHeadBlend(shapeFirst: number, shapeSecond: number, shapeThird: number, skinFirst: number, skinSecond: number, skinThird: number, shapeMix: number, skinMix: number, thirdMix: number): void {
    PlayerInternals.get(this).headBlend = {
      shapeFirst, shapeSecond, shapeThird,
      skinFirst, skinSecond, skinThird,
      shapeMix, skinMix, thirdMix,
    };
    emitNet("ragemp:setHeadBlend", this.id, shapeFirst, shapeSecond, shapeThird, skinFirst, skinSecond, skinThird, shapeMix, skinMix, thirdMix);
  }

  getHeadBlend(): { shapes: number[]; skins: number[]; shapeMix: number; skinMix: number; thirdMix: number } {
    const b = PlayerInternals.get(this).headBlend ?? {
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
    const rec = PlayerInternals.get(this);
    if (rec.headBlend) {
      rec.headBlend.shapeMix = shapeMix;
      rec.headBlend.skinMix = skinMix;
      rec.headBlend.thirdMix = thirdMix;
    } else {
      rec.headBlend = {
        shapeFirst: 0, shapeSecond: 0, shapeThird: 0,
        skinFirst: 0, skinSecond: 0, skinThird: 0,
        shapeMix, skinMix, thirdMix,
      };
    }
    emitNet("ragemp:updateHeadBlend", this.id, shapeMix, skinMix, thirdMix);
  }

  setFaceFeature(index: number, scale: number): void {
    PlayerInternals.get(this).faceFeatures[index] = scale;
    emitNet("ragemp:setFaceFeature", this.id, index, scale);
  }

  getFaceFeature(index: number): number {
    return PlayerInternals.get(this).faceFeatures[index] ?? 0.0;
  }

  setHeadOverlay(overlay: number, params: [number, number, number, number]): void {
    PlayerInternals.get(this).headOverlays[overlay] = params;
    emitNet("ragemp:setHeadOverlay", this.id, overlay, params);
  }

  getHeadOverlay(overlay: number): [number, number, number, number] {
    return PlayerInternals.get(this).headOverlays[overlay] ?? [0, 0, 0, 0];
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
    PlayerInternals.get(this).customization = params;
    emitNet("ragemp:setCustomization", this.id, params);
  }

  setDecoration(collection: number, overlay: number): void {
    PlayerInternals.get(this).decorations.push({ collection, overlay });
    emitNet("ragemp:setDecoration", this.id, collection, overlay);
  }

  getDecoration(collection: number, overlay?: number): { collection: number; overlay: number } | null {
    return PlayerInternals.get(this).decorations.find(
      (d) => d.collection === collection && d.overlay === overlay
    ) ?? null;
  }

  clearDecorations(): void {
    PlayerInternals.get(this).decorations = [];
    emitNet("ragemp:clearDecorations", this.id);
  }

  eval(code: string): void {
    emitNet("ragemp:eval", this.id, code);
  }

  invoke(hash: string, ...args: any[]): void {
    emitNet("ragemp:invoke", this.id, hash, ...args);
  }

  isStreamed(target: PlayerMp | number): boolean {
    if (!target) return false;
    const other: PlayerMp | undefined = typeof target === "number" ? globalThis.mp.players.at(target) : target;
    if (!other) return false;
    if (!PlayerInternals.get(this).ready || !PlayerInternals.get(other).ready) return false;
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

  callProc<T = any>(procName: string, ...args: any[]): Promise<T> {
    const rec = PlayerInternals.get(this);
    return new Promise<T>((resolve, reject) => {
      const reqId = ++rec.procCounter;
      const timer = setTimeout(() => {
        if (rec.pendingProcs.has(reqId)) {
          rec.pendingProcs.delete(reqId);
          reject(new Error(`callProc timeout (${procName})`));
        }
      }, 30000);
      rec.pendingProcs.set(reqId, { procName, resolve, reject, timer });
      emitNet("ragemp:callProc", this.id, procName, reqId, ...sanitizeArgsForNet(args));
    });
  }

  cancelPendingProc(procName?: string): void {
    const rec = PlayerInternals.get(this);
    for (const [reqId, entry] of rec.pendingProcs) {
      if (procName != null && entry.procName !== procName) continue;
      if (entry.timer) clearTimeout(entry.timer);
      entry.reject(new Error("Cancelled"));
      rec.pendingProcs.delete(reqId);
    }
  }

  hasPendingProc(procName?: string): boolean {
    const rec = PlayerInternals.get(this);
    if (rec.pendingProcs.size === 0) return false;
    if (procName == null) return true;
    for (const entry of rec.pendingProcs.values()) {
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
