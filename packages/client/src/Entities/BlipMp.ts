import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { toVec3 } from "../utils/vec";
import { applyBlipName } from "../utils/blipName";

export class BlipMp extends Entity {
  id: number;
  _handle: number;
  _dimension: number = 0;
  _alpha: number = 255;
  _scale: number | undefined;
  _name: string | undefined;
  _shortRange: boolean | undefined;

  constructor(id: number, handle: number) {
    super(id, "blip");
    this._handle = handle;
  }

  get handle(): number {
    return this._handle;
  }

  get position(): Vector3 {
    return toVec3(GetBlipCoords(this._handle));
  }
  set position(value: Vector3) {
    SetBlipCoords(this._handle, value.x, value.y, value.z);
  }

  get sprite(): number { return GetBlipSprite(this._handle); }
  set sprite(value: number) { SetBlipSprite(this._handle, value); }

  get color(): number { return GetBlipColour(this._handle); }
  set color(value: number) { SetBlipColour(this._handle, value); }

  get scale(): number { return this._scale ?? 1.0; }
  set scale(value: number) { this._scale = value; SetBlipScale(this._handle, value); }

  get name(): string { return this._name ?? ""; }
  set name(value: string) { this._name = value; applyBlipName(this._handle, value); }

  get shortRange(): boolean { return this._shortRange ?? false; }
  set shortRange(value: boolean) { this._shortRange = value; SetBlipAsShortRange(this._handle, value); }

  get alpha(): number { return this._alpha; }
  set alpha(value: number) { this._alpha = value; globalThis.mp?.blips?._applyVisibility(this); }

  get dimension(): number { return this._dimension; }
  set dimension(value: number) { this._dimension = value; globalThis.mp?.blips?._applyVisibility(this); }

  doesExist(): boolean { return DoesBlipExist(this._handle); }
  getAlpha(): number { return GetBlipAlpha(this._handle); }
  getColour(): number { return GetBlipColour(this._handle); }
  getCoords(): Vector3 { return toVec3(GetBlipCoords(this._handle)); }
  getHudColour(): number { return GetBlipHudColour(this._handle); }
  getInfoIdDisplay(): number { return GetBlipInfoIdDisplay(this._handle); }
  getInfoIdEntityIndex(): number { return GetBlipInfoIdEntityIndex(this._handle); }
  getInfoIdPickupIndex(): number { return GetBlipInfoIdPickupIndex(this._handle); }
  getInfoIdType(): number { return GetBlipInfoIdType(this._handle); }
  getSprite(): number { return GetBlipSprite(this._handle); }
  getFirstInfoId(): number { return GetFirstBlipInfoId(this._handle); }
  getNextInfoId(): number { return GetNextBlipInfoId(this._handle); }
  isFlashing(): boolean { return IsBlipFlashing(this._handle); }
  isMissionCreator(): boolean { return IsMissionCreatorBlip(this._handle); }
  isOnMinimap(): boolean { return IsBlipOnMinimap(this._handle); }
  isShortRange(): boolean { return IsBlipShortRange(this._handle); }

  setAlpha(alpha: number): void { SetBlipAlpha(this._handle, alpha); }
  setAsFriendly(toggle: boolean): void { SetBlipAsFriendly(this._handle, !!toggle); }
  setAsMissionCreator(toggle: boolean): void { SetBlipAsMissionCreator(this._handle, !!toggle); }
  setAsShortRange(toggle: boolean): void { SetBlipAsShortRange(this._handle, !!toggle); }
  setBright(toggle: boolean): void { SetBlipBright(this._handle, !!toggle); }
  setCategory(index: number): void { SetBlipCategory(this._handle, index); }
  setColour(color: number): void { SetBlipColour(this._handle, color); }
  setCoords(position: Vector3): void { SetBlipCoords(this._handle, position.x, position.y, position.z); }
  setDisplay(displayId: number): void { SetBlipDisplay(this._handle, displayId); }
  setFade(opacity: number, duration: number): void { SetBlipFade(this._handle, opacity, duration); }
  setFlashes(toggle: boolean): void { SetBlipFlashes(this._handle, !!toggle); }
  setFlashesAlternate(toggle: boolean): void { SetBlipFlashesAlternate(this._handle, !!toggle); }
  setFlashInterval(p1: any): void { SetBlipFlashInterval(this._handle, p1); }
  setFlashTimer(duration: number): void { SetBlipFlashTimer(this._handle, duration); }
  setHighDetail(toggle: boolean): void { SetBlipHighDetail(this._handle, !!toggle); }
  setNameFromTextFile(gxtEntry: string): void { SetBlipNameFromTextFile(this._handle, gxtEntry); }
  // Note: d.ts declares setNameToPlayerName(player: PlayerMp) but the implementation uses _playerIndex,
  // typed as any to avoid circular import with PlayerMp.
  setNameToPlayerName(player: any): void { SetBlipNameToPlayerName(this._handle, player?._playerIndex ?? player); }
  setPosition(posX: number, posY: number, posZ: number): void { SetBlipCoords(this._handle, posX, posY, posZ ?? 0); }
  setPriority(priority: number): void { SetBlipPriority(this._handle, priority); }
  setRotation(rotation: number): void { SetBlipRotation(this._handle, rotation); }
  setRoute(enabled: boolean): void { SetBlipRoute(this._handle, !!enabled); }
  setRouteColour(colour: number): void { SetBlipRouteColour(this._handle, colour); }
  setScale(scale: number): void { SetBlipScale(this._handle, scale); }
  setSecondaryColour(r: number, g: number, b: number): void { SetBlipSecondaryColour(this._handle, r, g, b); }
  setShowCone(toggle: boolean): void { (SetBlipShowCone as (...args: any[]) => void)(this._handle, !!toggle, 6); }
  setShowHeadingIndicator(toggle: boolean): void { ShowHeadingIndicatorOnBlip(this._handle, !!toggle); }
  setSprite(spriteId: number): void { SetBlipSprite(this._handle, spriteId); }

  addTextComponentSubstringName(text: string): void { AddTextComponentSubstringPlayerName(text); }
  endTextCommandSetName(): void { EndTextCommandSetBlipName(this._handle); }

  pulse(): void { PulseBlip(this._handle); }
  showNumberOn(number: number): void { ShowNumberOnBlip(this._handle, number); }
  hideNumberOn(): void { HideNumberOnBlip(this._handle); }

  destroy(): void {
    RemoveBlip(this._handle);
    globalThis.mp.blips._remove(this.id);
  }
}
