import { EntityMpBase } from "./EntityMpBase";

export class ObjectMp extends EntityMpBase {
  _isWeak: boolean = false;
  _notifyStreaming: boolean = false;
  _streamingRange: number = 0;

  constructor(id: number, handle: number) {
    super(id, "object", handle);
  }

  _stateBag() {
    return globalThis.Entity(this._handle).state;
  }

  get hidden(): boolean {
    return !IsEntityVisible(this.handle);
  }
  set hidden(value: boolean) {
    SetEntityVisible(this.handle, !value, false);
  }

  get isWeak(): boolean {
    return this._isWeak;
  }

  get notifyStreaming(): boolean {
    return this._notifyStreaming;
  }
  set notifyStreaming(value: boolean) {
    this._notifyStreaming = value;
  }

  get streamingRange(): number {
    return this._streamingRange;
  }
  set streamingRange(value: number) {
    this._streamingRange = value;
  }

  hasBeenBroken(): boolean {
    return HasObjectBeenBroken(this.handle);
  }

  placeOnGroundProperly(): boolean {
    return PlaceObjectOnGroundProperly(this.handle);
  }

  setTargettable(targettable: boolean): void {
    (SetObjectTargettable as (...args: any[]) => void)(this.handle, !!targettable, 0);
  }

  setActivatePhysicsAsSoonAsItIsUnfrozen(toggle: boolean): void {
    SetActivatePhysicsAsSoonAsItIsUnfrozen(this.handle, !!toggle);
  }

  slide(toX: number, toY: number, toZ: number, speedX: number, speedY: number, speedZ: number, collision: boolean): boolean {
    return SlideObject(this.handle, toX, toY, toZ, speedX, speedY, speedZ, !!collision);
  }

  getAllByHash(_hash: number): void { return; }
  setPhysicsParams(): void {}

  markForDeletion(): void {
    SetEntityAsMissionEntity(this.handle, false, true);
  }

  destroy(): void {
    if (this.handle && DoesEntityExist(this.handle)) {
      SetEntityAsMissionEntity(this.handle, false, true);
      DeleteEntity(this.handle);
    }
    globalThis.mp.objects._remove(this.id);
  }
}
