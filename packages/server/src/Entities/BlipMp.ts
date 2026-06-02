import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { BlipInternals, initBlipInternals } from "../internal/blipInternals";
import { removeFromPool, EntityInternals } from "@ragemp-fivem-bridge/shared/internal";

export class BlipMp extends Entity {
  constructor(id: number, sprite: number, position: Vector3, options: {
    color?: number;
    scale?: number;
    name?: string;
    shortRange?: boolean;
    alpha?: number;
    dimension?: number;
    drawDistance?: number;
    rotation?: number;
  } = {}) {
    super(id, "blip");
    const rec = EntityInternals.get(this);
    rec.position = position;
    rec.alpha = options.alpha ?? 255;
    rec.dimension = options.dimension ?? 0;
    initBlipInternals(this, {
      sprite,
      color: options.color ?? 0,
      scale: options.scale ?? 1.0,
      name: options.name ?? "",
      shortRange: options.shortRange ?? false,
      drawDistance: options.drawDistance ?? 0,
      rotation: options.rotation ?? 0,
    });
  }

  _sync(): void {
    emitNet("ragemp:blipUpdate", -1, this.id, this.toData());
  }

  toData(): Record<string, any> {
    const rec = BlipInternals.get(this);
    const ent = EntityInternals.get(this);
    return {
      id: this.id,
      sprite: rec.sprite,
      x: ent.position!.x,
      y: ent.position!.y,
      z: ent.position!.z,
      color: rec.color,
      scale: rec.scale,
      name: rec.name,
      shortRange: rec.shortRange,
      alpha: ent.alpha,
      dimension: ent.dimension,
      drawDistance: rec.drawDistance,
      rotation: rec.rotation,
    };
  }

  get position(): Vector3 {
    return EntityInternals.get(this).position!;
  }

  set position(value: Vector3) {
    EntityInternals.get(this).position = value;
    this._sync();
  }

  get sprite(): number {
    return BlipInternals.get(this).sprite;
  }

  set sprite(value: number) {
    BlipInternals.get(this).sprite = value;
    this._sync();
  }

  get color(): number {
    return BlipInternals.get(this).color;
  }

  set color(value: number) {
    BlipInternals.get(this).color = value;
    this._sync();
  }

  get scale(): number {
    return BlipInternals.get(this).scale;
  }

  set scale(value: number) {
    BlipInternals.get(this).scale = value;
    this._sync();
  }

  get name(): string {
    return BlipInternals.get(this).name;
  }

  set name(value: string) {
    BlipInternals.get(this).name = value;
    this._sync();
  }

  get shortRange(): boolean {
    return BlipInternals.get(this).shortRange;
  }

  set shortRange(value: boolean) {
    BlipInternals.get(this).shortRange = value;
    this._sync();
  }

  get alpha(): number {
    return EntityInternals.get(this).alpha;
  }

  set alpha(value: number) {
    EntityInternals.get(this).alpha = value;
    this._sync();
  }

  get dimension(): number {
    return EntityInternals.get(this).dimension;
  }

  set dimension(value: number) {
    EntityInternals.get(this).dimension = value;
    this._sync();
  }

  get drawDistance(): number {
    return BlipInternals.get(this).drawDistance;
  }

  set drawDistance(value: number) {
    BlipInternals.get(this).drawDistance = value;
    this._sync();
  }

  get rotation(): number {
    return BlipInternals.get(this).rotation;
  }

  set rotation(value: number) {
    BlipInternals.get(this).rotation = value;
    this._sync();
  }

  routeFor(player: any | any[] | undefined, color: number, scale: number): void {
    const target = player?.id ?? player;
    emitNet("ragemp:blipRoute", target, this.id, true, color, scale);
  }

  unrouteFor(player: any | any[]): void {
    const target = player?.id ?? player;
    emitNet("ragemp:blipRoute", target, this.id, false);
  }

  destroy(): void {
    emitNet("ragemp:blipDestroy", -1, this.id);
    removeFromPool(globalThis.mp.blips, this.id);
  }
}
