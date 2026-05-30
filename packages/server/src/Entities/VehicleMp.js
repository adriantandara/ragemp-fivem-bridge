import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { EntitySyncQueue } from "../utils/EntitySyncQueue";

export class VehicleMp extends Entity {
  _neonEnabled = false;
  _customTires = false;
  _engine = false;
  _colorRGB = null;
  _neonColor = [0, 0, 0];
  _alpha = 255;
  _mods = {};
  _extras = {};
  _brake = false;
  _highbeams = false;
  _horn = false;
  _rocketBoost = false;
  _siren = false;
  _steerAngle = 0;
  _dashboardColor = 0;
  _movable = true;
  _pearlescentColor = 0;
  _taxiLights = false;
  _trimColor = 0;
  _wheelColor = 0;
  _paint = { primary: null, secondary: null };
                                                                                   
  _livery = -1;
  _numberPlateType = 0;
  _windowTint = 0;
  _wheelType = 0;
  _engineHealth = 1000;

  constructor(id, handle) {
    super(id, "vehicle");
    this._handle = handle;
    this._sync = new EntitySyncQueue(() => this._handle, "ragemp:vehicle:batch");
  }

  get netId() {
    return NetworkGetNetworkIdFromEntity(this._handle);
  }

  _stateBag() {
    return globalThis.Entity(this._handle).state;
  }

  setDistanceCullingRadius(radius) {
    if (typeof SetEntityDistanceCullingRadius === "function") {
      SetEntityDistanceCullingRadius(this._handle, radius);
    }
  }

  _emit(event, ...args) {
    this._sync.emit(event, ...args);
  }

  get position() {
    const coords = GetEntityCoords(this._handle);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  set position(value) {
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

  get rotation() {
    const rot = GetEntityRotation(this._handle);
    return new Vector3(rot[0], rot[1], rot[2]);
  }

  set rotation(value) {
    SetEntityRotation(this._handle, value.x, value.y, value.z, 2, false);
  }

  get heading() {
    return GetEntityHeading(this._handle);
  }

  set heading(value) {
    SetEntityHeading(this._handle, value);
  }

  get model() {
    return GetEntityModel(this._handle);
  }

  get dimension() {
    return GetEntityRoutingBucket(this._handle);
  }

  set dimension(value) {
    SetEntityRoutingBucket(this._handle, value);
  }

  get locked() {
    return GetVehicleDoorLockStatus(this._handle) === 2;
  }

  set locked(value) {
    SetVehicleDoorsLocked(this._handle, value ? 2 : 1);
  }

  get numberPlate() {
    return this._numberPlate ?? GetVehicleNumberPlateText(this._handle);
  }

  set numberPlate(value) {
    this._numberPlate = value;
    SetVehicleNumberPlateText(this._handle, value);
  }

  get bodyHealth() {
    return GetVehicleBodyHealth(this._handle);
  }

  set bodyHealth(value) {
    SetVehicleBodyHealth(this._handle, value);
  }

  get engineHealth() {
    return GetVehicleEngineHealth(this._handle);
  }

  set engineHealth(value) {
    this._engineHealth = value;
    this._emit("ragemp:vehicleEngineHealth", value);
  }

  get engine() {
    return this._engine;
  }

  set engine(value) {
    this._engine = value;
    this._emit("ragemp:vehicleEngine", value);
  }

  get alpha() {
    return this._alpha;
  }

  set alpha(value) {
    this._alpha = value;
    this._emit("ragemp:vehicleAlpha", value);
  }

  get livery() {
    return GetVehicleLivery(this._handle);
  }

  set livery(value) {
    this._livery = value;
    this._emit("ragemp:vehicleLivery", value);
  }

  get numberPlateType() {
    return GetVehicleNumberPlateTextIndex(this._handle);
  }

  set numberPlateType(value) {
    this._numberPlateType = value;
    this._emit("ragemp:vehicleNumberPlateType", value);
  }

  get windowTint() {
    return GetVehicleWindowTint(this._handle);
  }

  set windowTint(value) {
    this._windowTint = value;
    this._emit("ragemp:vehicleWindowTint", value);
  }

  get neonEnabled() {
    return this._neonEnabled;
  }

  set neonEnabled(value) {
    this._neonEnabled = value;
    this._emit("ragemp:vehicleNeonEnabled", value);
  }

  get dead() {
    if (typeof IsEntityDead === "function") return !!IsEntityDead(this._handle);
    return GetEntityHealth(this._handle) <= 0;
  }

  get customTires() {
    return this._customTires;
  }

  set customTires(value) {
    this._customTires = value;
    this._emit("ragemp:vehicleCustomTires", value);
  }

  get wheelType() {
    return GetVehicleWheelType(this._handle);
  }

  set wheelType(value) {
    this._wheelType = value;
    this._emit("ragemp:vehicleWheelType", value);
  }

  get velocity() {
    if (!DoesEntityExist(this._handle)) return new Vector3(0, 0, 0);
    const v = GetEntityVelocity(this._handle);
    return new Vector3(v[0], v[1], v[2]);
  }

  get quaternion() {
    const rot = GetEntityRotation(this._handle, 2);
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

  get extras() {
    return { ...this._extras };
  }

  get mods() {
    return { ...this._mods };
  }

  get brake() {
    return this._brake;
  }

  get highbeams() {
    return this._highbeams;
  }

  get horn() {
    return this._horn;
  }

  get rocketBoost() {
    return this._rocketBoost;
  }

  get siren() {
    return this._siren;
  }

  get steerAngle() {
    return this._steerAngle;
  }

  get streamedPlayers() {
    const mp = globalThis.mp;
    if (!mp || !mp.players) return [];
    let pos;
    try {
      pos = this.position;
    } catch (e) {
      return mp.players.toArray();
    }
    if (!pos) return mp.players.toArray();
    const dim = this.dimension;
    const out = [];
    mp.players.forEach((player) => {
      if (player.dimension !== dim) return;
      let ppos;
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

  get trailer() {
    if (typeof GetVehicleTrailerVehicle !== "function") return null;
    const [hit, handle] = GetVehicleTrailerVehicle(this._handle);
    if (!hit || !handle) return null;
    return globalThis.mp.vehicles.atHandle(handle) ?? null;
  }

  get traileredBy() {
    if (typeof GetEntityAttachedTo !== "function") return null;
    const parent = GetEntityAttachedTo(this._handle);
    if (!parent || parent === 0) return null;
    return globalThis.mp.vehicles.atHandle(parent) ?? null;
  }

  get controller() {
    const ownerSource = NetworkGetEntityOwner(this._handle);
    if (!ownerSource || ownerSource === 0) return null;
    return globalThis.mp.players.at(ownerSource) ?? null;
  }

  set controller(value) {
    const targetId =
      value == null ? null : typeof value === "number" ? value : value.id;
    const netId = NetworkGetNetworkIdFromEntity(this._handle);
    emitNet("ragemp:requestVehicleControl", targetId ?? -1, netId);
  }

  get dashboardColor() {
    return this._dashboardColor;
  }

  set dashboardColor(value) {
    this._dashboardColor = value;
    this._emit("ragemp:vehicleDashboardColor", value);
  }

  get movable() {
    return this._movable;
  }

  set movable(value) {
    this._movable = value;
    FreezeEntityPosition(this._handle, !value);
  }

  get pearlescentColor() {
    return this._pearlescentColor;
  }

  set pearlescentColor(value) {
    this._pearlescentColor = value;
    this._emit("ragemp:vehiclePearlescentColor", value);
  }

  get taxiLights() {
    return this._taxiLights;
  }

  set taxiLights(value) {
    this._taxiLights = value;
    this._emit("ragemp:vehicleTaxiLights", value);
  }

  get trimColor() {
    return this._trimColor;
  }

  set trimColor(value) {
    this._trimColor = value;
    this._emit("ragemp:vehicleTrimColor", value);
  }

  get wheelColor() {
    return this._wheelColor;
  }

  set wheelColor(value) {
    this._wheelColor = value;
    this._emit("ragemp:vehicleWheelColor", value);
  }

  explode() {
    this._emit("ragemp:vehicleExplode");
  }

  repair() {
    this._emit("ragemp:vehicleRepair");
  }

  spawn(position, heading) {
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

  getColor() {
    const c = GetVehicleColours(this._handle);
    return { primary: c[0], secondary: c[1] };
  }

  setColor(primary, secondary) {
    SetVehicleColours(this._handle, primary, secondary);
  }

  getColorRGB() {
    return (
      this._colorRGB ?? [
        [0, 0, 0],
        [0, 0, 0],
      ]
    );
  }

  setColorRGB(r1, g1, b1, r2, g2, b2) {
    this._colorRGB = [
      [r1, g1, b1],
      [r2, g2, b2],
    ];
    SetVehicleCustomPrimaryColour(this._handle, r1, g1, b1);
    SetVehicleCustomSecondaryColour(this._handle, r2, g2, b2);
    this._emit("ragemp:vehicleColorRGB", this._colorRGB);
  }

  getExtra(extraId) {
    return IsVehicleExtraTurnedOn(this._handle, extraId);
  }

  setExtra(extraId, state) {
    this._extras[extraId] = !!state;
    this._emit("ragemp:vehicleExtra", extraId, !state);
  }

  getMod(modType) {
    return this._mods[modType] ?? -1;
  }

  setMod(modType, modIndex) {
    this._mods[modType] = modIndex;
    this._emit("ragemp:vehicleMod", modType, modIndex);
  }

  getNeonColor() {
    return this._neonColor;
  }

  setNeonColor(r, g, b) {
    this._neonColor = [r, g, b];
    this._emit("ragemp:vehicleNeonColor", r, g, b);
  }

  get driver() {
    const occupant = this.getOccupant(0);
    if (occupant) return occupant;
    const players = globalThis.mp?.players;
    if (players) {
      let found = null;
      players.forEach((p) => {
        if (found) return;
        if (p._vehicle === this && p.seat === 0) found = p;
      });
      if (found) return found;
    }
    return null;
  }

  getOccupant(seat) {
    const ped = GetPedInVehicleSeat(this._handle, seat - 1);
    if (!ped || ped === 0) return null;
    const owner = NetworkGetEntityOwner(ped);
    return owner ? globalThis.mp.players.at(owner) : null;
  }

  getOccupants() {
    const occupants = [];
    for (let seat = 0; seat <= 16; seat++) {
      const occupant = this.getOccupant(seat);
      if (occupant) {
        occupants.push(occupant);
      }
    }
    return occupants;
  }

  setOccupant(seat, player) {
    player.putIntoVehicle(this, seat);
  }

  getPaint(type) {
    if (type === 0) return this._paint.primary;
    if (type === 1) return this._paint.secondary;
    return null;
  }

  setPaint(primary, secondary) {
    this._paint = { primary, secondary };
    SetVehicleColours(this._handle, primary, secondary);
  }

  isStreamed() {
    return DoesEntityExist(this._handle);
  }

  destroy() {
    DeleteEntity(this._handle);
    globalThis.mp.vehicles._remove(this.id);
  }
}
