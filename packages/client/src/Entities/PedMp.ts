import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { PedMpBase } from "./PedMpBase";

export class PedMp extends PedMpBase {
  _invincible: boolean = false;
  _dynamic: boolean = false;
  spawnPosition: Vector3 | null = null;

  constructor(id: number, handle: number) {
    super(id, "ped");
    this._handle = handle;
  }

  _stateBag(): any {
    return globalThis.Entity(this._handle).state;
  }

  get isDynamic(): boolean {
    return this._dynamic;
  }
  set isDynamic(value: boolean) {
    this._dynamic = !!value;
  }
  get dynamic(): boolean {
    return this._dynamic;
  }
  set dynamic(value: boolean) {
    this._dynamic = !!value;
  }

  get invincible(): boolean {
    return this._invincible;
  }
  set invincible(value: boolean) {
    this._invincible = !!value;
    SetEntityInvincible(this._handle, !!value);
  }
  setInvincible(toggle: boolean): void {
    this._invincible = !!toggle;
    SetEntityInvincible(this._handle, !!toggle);
  }

  get frozen(): boolean {
    return IsEntityPositionFrozen(this._handle);
  }
  set frozen(value: boolean) {
    FreezeEntityPosition(this._handle, !!value);
  }
  get isPositionFrozen(): boolean {
    return IsEntityPositionFrozen(this._handle);
  }

  get controller(): any {
    const serverId = NetworkGetEntityOwner(this._handle);
    if (!serverId) return null;
    return (globalThis as any).mp?.players?.at?.(serverId) ?? null;
  }

  destroy(): void {
    if (this._handle && DoesEntityExist(this._handle)) {
      SetEntityAsMissionEntity(this._handle, false, true);
      DeleteEntity(this._handle);
    }
    (globalThis as any).mp.peds._remove(this.id);
  }
}
