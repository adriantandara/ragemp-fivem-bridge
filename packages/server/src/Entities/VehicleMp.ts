import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { EntitySyncQueue } from "../utils/EntitySyncQueue";
import { scheduleStateBagFlush } from "../utils/stateBagDefer";
import { safeGetNetworkId } from "../utils/netId";

type Quaternion = { x: number; y: number; z: number; w: number };

export class VehicleMp extends Entity {
  _neonEnabled: boolean = false;
  _customTires: boolean = false;
  _engine: boolean = false;
  _colorRGB: [[number, number, number], [number, number, number]] | null = null;
  _neonColor: [number, number, number] = [0, 0, 0];
  _alpha: number = 255;
  _mods: Record<number, number> = {};
  _extras: Record<number, boolean> = {};
  _brake: boolean = false;
  _highbeams: boolean = false;
  _horn: boolean = false;
  _rocketBoost: boolean = false;
  _siren: boolean = false;
  _steerAngle: number = 0;
  _dashboardColor: number = 0;
  _movable: boolean = true;
  _pearlescentColor: number = 0;
  _taxiLights: boolean = false;
  _trimColor: number = 0;
  _wheelColor: number = 0;
  _paint: { primary: number | null; secondary: number | null } = { primary: null, secondary: null };
  _livery: number = -1;
  _numberPlateType: number = 0;
  _windowTint: number = 0;
  _wheelType: number = 0;
  _engineHealth: number = 1000;
  _handle: number;
  _sync: EntitySyncQueue;
  _orphanMode?: number;
  _netIdReady?: boolean;
  _cachedNetId?: number;
  _numberPlate?: string;
  _varFlushScheduled: boolean = false;

  constructor(id: number, handle: number) {
    super(id, "vehicle");
    this._handle = handle;
	this._sync = new EntitySyncQueue(() => this._handle, "ragemp:vehicle:batch", {
	   range: 250, /* Streaming Distance */
	   useRoutingBucket: true,
	});
  }

  get netId(): number {
    return this._cachedNetId || safeGetNetworkId(this._handle);
  }

  _stateBag(): any {
    return globalThis.Entity(this._handle).state;
  }

  _stateBagReady(): boolean {
    return this._netIdReady === true;
  }

  _onVariableDeferred(): void {
    scheduleStateBagFlush(this as any);
  }

  setDistanceCullingRadius(radius: number): void {
    if (typeof SetEntityDistanceCullingRadius === "function") {
      SetEntityDistanceCullingRadius(this._handle, radius);
    }
  }

  _emit(event: string, ...args: any[]): void {
    this._sync.emit(event, ...args);
  }

  get position(): Vector3 {
    const coords = GetEntityCoords(this._handle);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  set position(value: Vector3) {
    SetEntityCoords(
      this._handle,
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
    const rot = GetEntityRotation(this._handle);
    return new Vector3(rot[0], rot[1], rot[2]);
  }

  set rotation(value: Vector3) {
    SetEntityRotation(this._handle, value.x, value.y, value.z, 2, false);
  }

  get heading(): number {
    return GetEntityHeading(this._handle);
  }

  set heading(value: number) {
    SetEntityHeading(this._handle, value);
  }

  get model(): number {
    return GetEntityModel(this._handle);
  }

  get dimension(): number {
    return GetEntityRoutingBucket(this._handle);
  }

  set dimension(value: number) {
    SetEntityRoutingBucket(this._handle, value);
  }

  get orphanMode(): number {
    return this._orphanMode ?? 0;
  }

  set orphanMode(value: number) {
    this._orphanMode = value;
    SetEntityOrphanMode(this._handle, value);
  }

  setOrphanMode(mode: number): void {
    this.orphanMode = mode;
  }

  get locked(): boolean {
    return GetVehicleDoorLockStatus(this._handle) === 2;
  }

  set locked(value: boolean) {
    SetVehicleDoorsLocked(this._handle, value ? 2 : 1);
  }

  get numberPlate(): string {
    return this._numberPlate ?? GetVehicleNumberPlateText(this._handle);
  }

  set numberPlate(value: string) {
    this._numberPlate = value;
    SetVehicleNumberPlateText(this._handle, value);
  }

  get bodyHealth(): number {
    return GetVehicleBodyHealth(this._handle);
  }

  set bodyHealth(value: number) {
    SetVehicleBodyHealth(this._handle, value);
  }

  get engineHealth(): number {
    return GetVehicleEngineHealth(this._handle);
  }

  set engineHealth(value: number) {
    this._engineHealth = value;
    this._emit("ragemp:vehicleEngineHealth", value);
  }

  get engine(): boolean {
    return this._engine;
  }

  set engine(value: boolean) {
    this._engine = value;
    this._emit("ragemp:vehicleEngine", value);
  }

  get alpha(): number {
    return this._alpha;
  }

  set alpha(value: number) {
    this._alpha = value;
    this._emit("ragemp:vehicleAlpha", value);
  }

  get livery(): number {
    return GetVehicleLivery(this._handle);
  }

  set livery(value: number) {
    this._livery = value;
    this._emit("ragemp:vehicleLivery", value);
  }

  get numberPlateType(): number {
    return GetVehicleNumberPlateTextIndex(this._handle);
  }

  set numberPlateType(value: number) {
    this._numberPlateType = value;
    this._emit("ragemp:vehicleNumberPlateType", value);
  }

  get windowTint(): number {
    return GetVehicleWindowTint(this._handle);
  }

  set windowTint(value: number) {
    this._windowTint = value;
    this._emit("ragemp:vehicleWindowTint", value);
  }

  get neonEnabled(): boolean {
    return this._neonEnabled;
  }

  set neonEnabled(value: boolean) {
    this._neonEnabled = value;
    this._emit("ragemp:vehicleNeonEnabled", value);
  }

  get dead(): boolean {
    if (typeof IsEntityDead === "function") return !!IsEntityDead(this._handle);
    return GetEntityHealth(this._handle) <= 0;
  }

  set dead(value: boolean) {
    // setter not in d.ts but property is read/write in some contexts; no-op setter
    void value;
  }

  get customTires(): boolean {
    return this._customTires;
  }

  set customTires(value: boolean) {
    this._customTires = value;
    this._emit("ragemp:vehicleCustomTires", value);
  }

  get wheelType(): number {
    return GetVehicleWheelType(this._handle);
  }

  set wheelType(value: number) {
    this._wheelType = value;
    this._emit("ragemp:vehicleWheelType", value);
  }

  get velocity(): Vector3 {
    if (!DoesEntityExist(this._handle)) return new Vector3(0, 0, 0);
    const v = GetEntityVelocity(this._handle);
    return new Vector3(v[0], v[1], v[2]);
  }

  get quaternion(): Quaternion {
    const rot = GetEntityRotation(this._handle);
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
    return { ...this._extras };
  }

  get mods(): Record<number, number> {
    return { ...this._mods };
  }

  get brake(): boolean {
    return this._brake;
  }

  get highbeams(): boolean {
    return this._highbeams;
  }

  get horn(): boolean {
    return this._horn;
  }

  get rocketBoost(): boolean {
    return this._rocketBoost;
  }

  get siren(): boolean {
    return this._siren;
  }

  get steerAngle(): number {
    return this._steerAngle;
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
    const [hit, handle] = GetVehicleTrailerVehicle(this._handle);
    if (!hit || !handle) return null;
    return globalThis.mp.vehicles.atHandle(handle) ?? null;
  }

  get traileredBy(): VehicleMp | null {
    if (typeof GetEntityAttachedTo !== "function") return null;
    const parent = GetEntityAttachedTo(this._handle);
    if (!parent || parent === 0) return null;
    return globalThis.mp.vehicles.atHandle(parent) ?? null;
  }

  get controller(): any {
    const ownerSource = NetworkGetEntityOwner(this._handle);
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
    return this._dashboardColor;
  }

  set dashboardColor(value: number) {
    this._dashboardColor = value;
    this._emit("ragemp:vehicleDashboardColor", value);
  }

  get movable(): boolean {
    return this._movable;
  }

  set movable(value: boolean) {
    this._movable = value;
    FreezeEntityPosition(this._handle, !value);
  }

  get pearlescentColor(): number {
    return this._pearlescentColor;
  }

  set pearlescentColor(value: number) {
    this._pearlescentColor = value;
    this._emit("ragemp:vehiclePearlescentColor", value);
  }

  get taxiLights(): boolean {
    return this._taxiLights;
  }

  set taxiLights(value: boolean) {
    this._taxiLights = value;
    this._emit("ragemp:vehicleTaxiLights", value);
  }

  get trimColor(): number {
    return this._trimColor;
  }

  set trimColor(value: number) {
    this._trimColor = value;
    this._emit("ragemp:vehicleTrimColor", value);
  }

  get wheelColor(): number {
    return this._wheelColor;
  }

  set wheelColor(value: number) {
    this._wheelColor = value;
    this._emit("ragemp:vehicleWheelColor", value);
  }

  explode(): void {
    this._emit("ragemp:vehicleExplode");
  }

  repair(): void {
    this._emit("ragemp:vehicleRepair");
  }

  spawn(position: Vector3, heading?: number): void {
    SetEntityCoords(
      this._handle,
      position.x,
      position.y,
      position.z,
      false,
      false,
      false,
      false,
    );
    SetEntityHeading(this._handle, heading ?? 0);
    this.repair();
  }

  getColor(id?: number): number {
    const c = GetVehicleColours(this._handle);
    return id === 1 ? c[1] : c[0];
  }

  setColor(primary: number, secondary: number): void {
    SetVehicleColours(this._handle, primary, secondary);
  }

  getColorRGB(id?: number): [[number, number, number], [number, number, number]] {
    return (
      this._colorRGB ?? [
        [0, 0, 0],
        [0, 0, 0],
      ]
    );
  }

  setColorRGB(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): void {
    this._colorRGB = [
      [r1, g1, b1],
      [r2, g2, b2],
    ];
    SetVehicleCustomPrimaryColour(this._handle, r1, g1, b1);
    SetVehicleCustomSecondaryColour(this._handle, r2, g2, b2);
    this._emit("ragemp:vehicleColorRGB", this._colorRGB);
  }

  getExtra(extraId: number): boolean {
    return IsVehicleExtraTurnedOn(this._handle, extraId);
  }

  setExtra(extraId: number, state: boolean): void {
    this._extras[extraId] = !!state;
    this._emit("ragemp:vehicleExtra", extraId, !state);
  }

  getMod(modType: number): number {
    return this._mods[modType] ?? -1;
  }

  setMod(modType: number, modIndex: number): void {
    this._mods[modType] = modIndex;
    this._emit("ragemp:vehicleMod", modType, modIndex);
  }

  getNeonColor(): number[] {
    return this._neonColor;
  }

  setNeonColor(r: number, g: number, b: number): void {
    this._neonColor = [r, g, b];
    this._emit("ragemp:vehicleNeonColor", r, g, b);
  }

  get driver(): any {
    const occupant = this.getOccupant(0);
    if (occupant) return occupant;
    const players = globalThis.mp?.players;
    if (players) {
      let found: any = null;
      players.forEach((p: any) => {
        if (found) return;
        if (p._vehicle === this && p.seat === 0) found = p;
      });
      if (found) return found;
    }
    return null;
  }

  getOccupant(seat: number): any {
    const ped = GetPedInVehicleSeat(this._handle, seat - 1);
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
    if (type === 0) return this._paint.primary;
    if (type === 1) return this._paint.secondary;
    return null;
  }

  setPaint(primary: number, secondary: number): void {
    this._paint = { primary, secondary };
    SetVehicleColours(this._handle, primary, secondary);
  }

  isStreamed(player?: any): boolean {
    return DoesEntityExist(this._handle);
  }

  destroy(): void {
    DeleteEntity(this._handle);
    globalThis.mp.vehicles._remove(this.id);
  }
}
