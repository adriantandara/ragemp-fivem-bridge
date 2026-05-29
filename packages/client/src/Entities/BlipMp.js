import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { withEntityNatives } from "../utils/native";

export class BlipMp extends Entity {
  _handle;
  _dimension = 0;

  constructor(id, handle) {
    super(id, "blip");
    this._handle = handle;
    return withEntityNatives(this, (t) => t._handle, ["Blip"]);
  }

  get handle() {
    return this._handle;
  }

  get position() {
    const coords = GetBlipCoords(this._handle);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  set position(value) {
    SetBlipCoords(this._handle, value.x, value.y, value.z);
  }

  get sprite() {
    return GetBlipSprite(this._handle);
  }

  set sprite(value) {
    SetBlipSprite(this._handle, value);
  }

  get color() {
    return GetBlipColour(this._handle);
  }

  set color(value) {
    SetBlipColour(this._handle, value);
  }

  get scale() {
    return this._scale ?? 1.0;
  }

  set scale(value) {
    this._scale = value;
    SetBlipScale(this._handle, value);
  }

  get name() {
    return this._name ?? "";
  }

  set name(value) {
    this._name = value;
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentSubstringPlayerName(value);
    EndTextCommandSetBlipName(this._handle);
  }

  get shortRange() {
    return this._shortRange ?? false;
  }

  set shortRange(value) {
    this._shortRange = value;
    SetBlipAsShortRange(this._handle, value);
  }

  get alpha() {
    return GetBlipAlpha(this._handle);
  }

  set alpha(value) {
    SetBlipAlpha(this._handle, value);
  }

  get dimension() {
    return this._dimension;
  }

  set dimension(value) {
    this._dimension = value;
  }

  doesExist() {
    return DoesBlipExist(this._handle);
  }

  getColour() {
    return GetBlipColour(this._handle);
  }

  getCoords() {
    const c = GetBlipInfoIdCoord(this._handle);
    return new Vector3(c[0], c[1], c[2]);
  }

  getSprite() {
    return GetBlipSprite(this._handle);
  }

  getAlpha() {
    return GetBlipAlpha(this._handle);
  }

  getHudColour() {
    return GetHudColour(GetBlipHudColour(this._handle));
  }

  isFlashing() {
    return IsBlipFlashing(this._handle);
  }

  isShortRange() {
    return IsBlipShortRange(this._handle);
  }

  isOnMinimap() {
    return IsBlipOnMinimap(this._handle);
  }

  isMissionCreator() {
    return IsBlipAsMissionCreator(this._handle);
  }

  setFlashes(state) {
    SetBlipFlashes(this._handle, state);
  }

  setFlashesAlternate(state) {
    SetBlipFlashesAlternate(this._handle, state);
  }

  setFlashInterval(interval) {
    SetBlipFlashInterval(this._handle, interval);
  }

  setFlashTimer(duration) {
    SetBlipFlashTimer(this._handle, duration);
  }

  setAsFriendly(toggle) {
    SetBlipAsFriendly(this._handle, !!toggle);
  }

  setAsMissionCreator(toggle) {
    SetBlipAsMissionCreator(this._handle, !!toggle);
  }

  setAsShortRange(toggle) {
    SetBlipAsShortRange(this._handle, !!toggle);
  }

  setBright(toggle) {
    SetBlipBright(this._handle, !!toggle);
  }

  setCategory(category) {
    SetBlipCategory(this._handle, category);
  }

  setDisplay(display) {
    SetBlipDisplay(this._handle, display);
  }

  setHighDetail(toggle) {
    SetBlipHighDetail(this._handle, !!toggle);
  }

  setNameFromTextFile(gxt) {
    SetBlipNameFromTextFile(this._handle, gxt);
  }

  setNameToPlayerName(player) {
    SetBlipNameToPlayerName(this._handle, player._playerIndex ?? player);
  }

  setPosition(x, y, z) {
    SetBlipCoords(this._handle, x, y, z ?? 0);
  }

  setPriority(priority) {
    SetBlipPriority(this._handle, priority);
  }

  setRotation(rotation) {
    SetBlipRotation(this._handle, rotation);
  }

  setSecondaryColour(r, g, b) {
    SetBlipSecondaryColour(this._handle, r, g, b);
  }

  setShowCone(toggle) {
    SetBlipShowCone(this._handle, !!toggle);
  }

  setShowHeadingIndicator(toggle) {
    ShowHeadingIndicatorOnBlip(this._handle, !!toggle);
  }

  pulse() {
    PulseBlip(this._handle);
  }

  showNumberOn(number) {
    ShowNumberOnBlip(this._handle, number);
  }

  hideNumberOn() {
    HideNumberOnBlip(this._handle);
  }

  addTextComponentSubstringName(text) {
    AddTextComponentSubstringPlayerName(text);
  }

  setRoute(state) {
    SetBlipRoute(this._handle, state);
  }

  setRouteColour(colour) {
    SetBlipRouteColour(this._handle, colour);
  }

  destroy() {
    RemoveBlip(this._handle);
    globalThis.mp.blips._remove(this.id);
  }
}
