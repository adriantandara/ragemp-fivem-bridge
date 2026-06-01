import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { gtaPedHealthToRage, rageHealthToGtaPed } from "@ragemp-fivem-bridge/shared";
import { scheduleStateBagFlush } from "../utils/stateBagDefer";

export class PedMp extends Entity {
  _handle: number;
  _frozen: boolean;
  _invincible: boolean;
  _netIdReady?: boolean;
  _cachedNetId?: number;
  _dynamic?: boolean;
  _lockController?: boolean;
  _varFlushScheduled: boolean = false;

  constructor(id: number, handle: number) {
    super(id, "ped");
    this._handle = handle;
    this._frozen = false;
    this._invincible = false;
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

  get position(): Vector3 {
    const coords = GetEntityCoords(this._handle);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  set position(value: Vector3) {
    SetEntityCoords(this._handle, value.x, value.y, value.z, false, false, false, false);
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

  get dimension(): number {
    return GetEntityRoutingBucket(this._handle);
  }

  set dimension(value: number) {
    SetEntityRoutingBucket(this._handle, value);
  }

  get model(): number {
    return GetEntityModel(this._handle);
  }

  get controller(): any {
    const source = NetworkGetEntityOwner(this._handle);
    if (!source) return null;
    return globalThis.mp.players.at(source) ?? null;
  }

  get health(): number {
    return gtaPedHealthToRage(GetEntityHealth(this._handle));
  }

  set health(value: number) {
    SetEntityHealth(this._handle, rageHealthToGtaPed(value));
  }

  getHealth(): number {
    return gtaPedHealthToRage(GetEntityHealth(this._handle));
  }

  setHealth(value: number): void {
    SetEntityHealth(this._handle, rageHealthToGtaPed(value));
  }

  get armour(): number {
    return GetPedArmour(this._handle);
  }

  set armour(value: number) {
    SetPedArmour(this._handle, value);
  }

  get frozen(): boolean {
    return this._frozen;
  }

  set frozen(value: boolean) {
    this._frozen = value;
    FreezeEntityPosition(this._handle, value);
  }

  get invincible(): boolean {
    return this._invincible;
  }

  set invincible(value: boolean) {
    this._invincible = value;
    emitNet("ragemp:pedInvincible", -1, NetworkGetNetworkIdFromEntity(this._handle), value);
  }

  destroy(): void {
    DeleteEntity(this._handle);
    globalThis.mp.peds._remove(this.id);
  }
}
