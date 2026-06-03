import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { EntityInternals } from "@ragemp-fivem-bridge/shared/internal";
import { scheduleStateBagFlush } from "../utils/stateBagDefer";
import { safeGetNetworkId } from "../utils/netId";
import { VehicleInternals, initVehicleInternals , emitVehicle } from "../internal/vehicleInternals";
import { PlayerInternals } from "../internal/playerInternals";
import { removeFromVehiclePool } from "../internal/pools/vehiclePoolService";

type Quaternion = { x: number; y: number; z: number; w: number };

export class VehicleMp extends Entity {
  constructor(token: symbol, id: number, handle: number | null) {
    super(token, id, "vehicle", handle);
    initVehicleInternals(this);
    const rec = EntityInternals.get(this);
    rec.stateBag = () => globalThis.Entity(this.handle).state;
    rec.stateBagReady = () => VehicleInternals.get(this).netIdReady === true;
    rec.onVariableDeferred = () => scheduleStateBagFlush(this as any);
  }

  get netId(): number {
    return VehicleInternals.get(this).cachedNetId || safeGetNetworkId(this.handle);
  }

  setDistanceCullingRadius(radius: number): void {
    if (typeof SetEntityDistanceCullingRadius === "function") {
      SetEntityDistanceCullingRadius(this.handle, radius);
    }
  }


  override get position(): Vector3 {
    const coords = GetEntityCoords(this.handle);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  override set position(value: Vector3) {
    SetEntityCoords(
      this.handle,
      value.x,
      value.y,
      value.z,
      false,
      false,
      false,
      false,
    );
  }

  get rotation(): Vector3 {
    const rot = GetEntityRotation(this.handle);
    return new Vector3(rot[0], rot[1], rot[2]);
  }

  set rotation(value: Vector3) {
    SetEntityRotation(this.handle, value.x, value.y, value.z, 2, false);
  }

  get heading(): number {
    return GetEntityHeading(this.handle);
  }

  set heading(value: number) {
    SetEntityHeading(this.handle, value);
  }

  override get model(): number {
    return GetEntityModel(this.handle);
  }

  override get dimension(): number {
    return GetEntityRoutingBucket(this.handle);
  }

  override set dimension(value: number) {
    SetEntityRoutingBucket(this.handle, value);
  }

  get orphanMode(): number {
    return VehicleInternals.get(this).orphanMode ?? 0;
  }

  set orphanMode(value: number) {
    VehicleInternals.get(this).orphanMode = value;
    SetEntityOrphanMode(this.handle, value);
  }

  setOrphanMode(mode: number): void {
    this.orphanMode = mode;
  }

  get locked(): boolean {
    return GetVehicleDoorLockStatus(this.handle) === 2;
  }

  set locked(value: boolean) {
    SetVehicleDoorsLocked(this.handle, value ? 2 : 1);
  }

  get numberPlate(): string {
    return VehicleInternals.get(this).numberPlate ?? GetVehicleNumberPlateText(this.handle);
  }

  set numberPlate(value: string) {
    VehicleInternals.get(this).numberPlate = value;
    SetVehicleNumberPlateText(this.handle, value);
  }

  get bodyHealth(): number {
    return GetVehicleBodyHealth(this.handle);
  }

  set bodyHealth(value: number) {
    SetVehicleBodyHealth(this.handle, value);
  }

  get engineHealth(): number {
    return GetVehicleEngineHealth(this.handle);
  }

  set engineHealth(value: number) {
    VehicleInternals.get(this).engineHealth = value;
    emitVehicle(this, "ragemp:vehicleEngineHealth", value);
  }

  get engine(): boolean {
    return VehicleInternals.get(this).engine;
  }

  set engine(value: boolean) {
    VehicleInternals.get(this).engine = value;
    emitVehicle(this, "ragemp:vehicleEngine", value);
  }

  override get alpha(): number {
    return EntityInternals.get(this).alpha;
  }

  override set alpha(value: number) {
    EntityInternals.get(this).alpha = value;
    emitVehicle(this, "ragemp:vehicleAlpha", value);
  }

  get livery(): number {
    return GetVehicleLivery(this.handle);
  }

  set livery(value: number) {
    VehicleInternals.get(this).livery = value;
    emitVehicle(this, "ragemp:vehicleLivery", value);
  }

  get numberPlateType(): number {
    return GetVehicleNumberPlateTextIndex(this.handle);
  }

  set numberPlateType(value: number) {
    VehicleInternals.get(this).numberPlateType = value;
    emitVehicle(this, "ragemp:vehicleNumberPlateType", value);
  }

  get windowTint(): number {
    return GetVehicleWindowTint(this.handle);
  }

  set windowTint(value: number) {
    VehicleInternals.get(this).windowTint = value;
    emitVehicle(this, "ragemp:vehicleWindowTint", value);
  }

  get neonEnabled(): boolean {
    return VehicleInternals.get(this).neonEnabled;
  }

  set neonEnabled(value: boolean) {
    VehicleInternals.get(this).neonEnabled = value;
    emitVehicle(this, "ragemp:vehicleNeonEnabled", value);
  }

  get dead(): boolean {
    if (typeof IsEntityDead === "function") return !!IsEntityDead(this.handle);
    return GetEntityHealth(this.handle) <= 0;
  }

  set dead(value: boolean) {
    // setter not in d.ts but property is read/write in some contexts; no-op setter
    void value;
  }

  get customTires(): boolean {
    return VehicleInternals.get(this).customTires;
  }

  set customTires(value: boolean) {
    VehicleInternals.get(this).customTires = value;
    emitVehicle(this, "ragemp:vehicleCustomTires", value);
  }

  get wheelType(): number {
    return GetVehicleWheelType(this.handle);
  }

  set wheelType(value: number) {
    VehicleInternals.get(this).wheelType = value;
    emitVehicle(this, "ragemp:vehicleWheelType", value);
  }

  get velocity(): Vector3 {
    if (!DoesEntityExist(this.handle)) return new Vector3(0, 0, 0);
    const v = GetEntityVelocity(this.handle);
    return new Vector3(v[0], v[1], v[2]);
  }

  get quaternion(): Quaternion {
    const rot = GetEntityRotation(this.handle);
    const rad = Math.PI / 180;
    const rx = (rot[0] * rad) / 2,
      ry = (rot[1] * rad) / 2,
      rz = (rot[2] * rad) / 2;
    const cx = Math.cos(rx),
      sx = Math.sin(rx);
    const cy = Math.cos(ry),
      sy = Math.sin(ry);
    const cz = Math.cos(rz),
      sz = Math.sin(rz);
    return {
      x: sx * cy * cz - cx * sy * sz,
      y: cx * sy * cz + sx * cy * sz,
      z: cx * cy * sz - sx * sy * cz,
      w: cx * cy * cz + sx * sy * sz,
    };
  }

  get extras(): Record<number, boolean> {
    return { ...VehicleInternals.get(this).extras };
  }

  get mods(): Record<number, number> {
    return { ...VehicleInternals.get(this).mods };
  }

  get brake(): boolean {
    return VehicleInternals.get(this).brake;
  }

  get highbeams(): boolean {
    return VehicleInternals.get(this).highbeams;
  }

  get horn(): boolean {
    return VehicleInternals.get(this).horn;
  }

  get rocketBoost(): boolean {
    return VehicleInternals.get(this).rocketBoost;
  }

  get siren(): boolean {
    return VehicleInternals.get(this).siren;
  }

  get steerAngle(): number {
    return VehicleInternals.get(this).steerAngle;
  }

  get streamedPlayers(): any[] {
    const mp = globalThis.mp;
    if (!mp || !mp.players) return [];
    let pos: Vector3;
    try {
      pos = this.position;
    } catch (e) {
      return mp.players.toArray();
    }
    if (!pos) return mp.players.toArray();
    const dim = this.dimension;
    const out: any[] = [];
    mp.players.forEach((player: any) => {
      if (player.dimension !== dim) return;
      let ppos: Vector3 | null;
      try {
        ppos = player.position;
      } catch (e) {
        return;
      }
      if (!ppos) return;
      const dx = ppos.x - pos.x;
      const dy = ppos.y - pos.y;
      const dz = ppos.z - pos.z;
      if (dx * dx + dy * dy + dz * dz <= 300 * 300) out.push(player);
    });
    return out;
  }

  get trailer(): VehicleMp | null {
    if (typeof GetVehicleTrailerVehicle !== "function") return null;
    const [hit, handle] = GetVehicleTrailerVehicle(this.handle);
    if (!hit || !handle) return null;
    return globalThis.mp.vehicles.atHandle(handle) ?? null;
  }

  get traileredBy(): VehicleMp | null {
    if (typeof GetEntityAttachedTo !== "function") return null;
    const parent = GetEntityAttachedTo(this.handle);
    if (!parent || parent === 0) return null;
    return globalThis.mp.vehicles.atHandle(parent) ?? null;
  }

  get controller(): any {
    const ownerSource = NetworkGetEntityOwner(this.handle);
    if (!ownerSource || ownerSource === 0) return null;
    return globalThis.mp.players.at(ownerSource) ?? null;
  }

  set controller(value: any) {
    const targetId: number | null =
      value == null ? null : typeof value === "number" ? value : value.id;
    const netId = this.netId;
    emitNet("ragemp:requestVehicleControl", targetId ?? -1, netId);
  }

  get dashboardColor(): number {
    return VehicleInternals.get(this).dashboardColor;
  }

  set dashboardColor(value: number) {
    VehicleInternals.get(this).dashboardColor = value;
    emitVehicle(this, "ragemp:vehicleDashboardColor", value);
  }

  get movable(): boolean {
    return VehicleInternals.get(this).movable;
  }

  set movable(value: boolean) {
    VehicleInternals.get(this).movable = value;
    FreezeEntityPosition(this.handle, !value);
  }

  get pearlescentColor(): number {
    return VehicleInternals.get(this).pearlescentColor;
  }

  set pearlescentColor(value: number) {
    VehicleInternals.get(this).pearlescentColor = value;
    emitVehicle(this, "ragemp:vehiclePearlescentColor", value);
  }

  get taxiLights(): boolean {
    return VehicleInternals.get(this).taxiLights;
  }

  set taxiLights(value: boolean) {
    VehicleInternals.get(this).taxiLights = value;
    emitVehicle(this, "ragemp:vehicleTaxiLights", value);
  }

  get trimColor(): number {
    return VehicleInternals.get(this).trimColor;
  }

  set trimColor(value: number) {
    VehicleInternals.get(this).trimColor = value;
    emitVehicle(this, "ragemp:vehicleTrimColor", value);
  }

  get wheelColor(): number {
    return VehicleInternals.get(this).wheelColor;
  }

  set wheelColor(value: number) {
    VehicleInternals.get(this).wheelColor = value;
    emitVehicle(this, "ragemp:vehicleWheelColor", value);
  }

  explode(): void {
    emitVehicle(this, "ragemp:vehicleExplode");
  }

  repair(): void {
    emitVehicle(this, "ragemp:vehicleRepair");
  }

  spawn(position: Vector3, heading?: number): void {
    SetEntityCoords(
      this.handle,
      position.x,
      position.y,
      position.z,
      false,
      false,
      false,
      false,
    );
    SetEntityHeading(this.handle, heading ?? 0);
    this.repair();
  }

  getColor(id?: number): number {
    const c = GetVehicleColours(this.handle);
    return id === 1 ? c[1] : c[0];
  }

  setColor(primary: number, secondary: number): void {
    SetVehicleColours(this.handle, primary, secondary);
  }

  getColorRGB(id?: number): [[number, number, number], [number, number, number]] {
    return (
      VehicleInternals.get(this).colorRGB ?? [
        [0, 0, 0],
        [0, 0, 0],
      ]
    );
  }

  setColorRGB(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): void {
    const rec = VehicleInternals.get(this);
    rec.colorRGB = [
      [r1, g1, b1],
      [r2, g2, b2],
    ];
    SetVehicleCustomPrimaryColour(this.handle, r1, g1, b1);
    SetVehicleCustomSecondaryColour(this.handle, r2, g2, b2);
    emitVehicle(this, "ragemp:vehicleColorRGB", rec.colorRGB);
  }

  getExtra(extraId: number): boolean {
    return IsVehicleExtraTurnedOn(this.handle, extraId);
  }

  setExtra(extraId: number, state: boolean): void {
    VehicleInternals.get(this).extras[extraId] = !!state;
    emitVehicle(this, "ragemp:vehicleExtra", extraId, !state);
  }

  getMod(modType: number): number {
    return VehicleInternals.get(this).mods[modType] ?? -1;
  }

  setMod(modType: number, modIndex: number): void {
    VehicleInternals.get(this).mods[modType] = modIndex;
    emitVehicle(this, "ragemp:vehicleMod", modType, modIndex);
  }

  getNeonColor(): number[] {
    return VehicleInternals.get(this).neonColor;
  }

  setNeonColor(r: number, g: number, b: number): void {
    VehicleInternals.get(this).neonColor = [r, g, b];
    emitVehicle(this, "ragemp:vehicleNeonColor", r, g, b);
  }

  get driver(): any {
    const occupant = this.getOccupant(0);
    if (occupant) return occupant;
    const players = globalThis.mp?.players;
    if (players) {
      let found: any = null;
      players.forEach((p: any) => {
        if (found) return;
        if (PlayerInternals.get(p).vehicle === this && p.seat === 0) found = p;
      });
      if (found) return found;
    }
    return null;
  }

  getOccupant(seat: number): any {
    const ped = GetPedInVehicleSeat(this.handle, seat - 1);
    if (!ped || ped === 0) return null;
    const owner = NetworkGetEntityOwner(ped);
    if (owner) {
      const player = globalThis.mp.players.at(owner);
      if (player && player.ped === ped) return player;
    }
    return globalThis.mp.peds?.atHandle?.(ped) ?? null;
  }

  getOccupants(): any[] {
    const occupants: any[] = [];
    for (let seat = 0; seat <= 16; seat++) {
      const occupant = this.getOccupant(seat);
      if (occupant) {
        occupants.push(occupant);
      }
    }
    return occupants;
  }

  setOccupant(seat: number, player: any): void {
    player.putIntoVehicle(this, seat);
  }

  getPaint(type: number): number | null {
    const paint = VehicleInternals.get(this).paint;
    if (type === 0) return paint.primary;
    if (type === 1) return paint.secondary;
    return null;
  }

  setPaint(primary: number, secondary: number): void {
    VehicleInternals.get(this).paint = { primary, secondary };
    SetVehicleColours(this.handle, primary, secondary);
  }

  isStreamed(player?: any): boolean {
    return DoesEntityExist(this.handle);
  }

  override destroy(): void {
    DeleteEntity(this.handle);
    removeFromVehiclePool(globalThis.mp.vehicles, this.id);
  }
}
