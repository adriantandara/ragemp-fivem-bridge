import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { BlipMp } from "../Entities/BlipMp";
import { applyBlipName } from "../utils/blipName";
import { isVisibleHere, onDimensionChange } from "../utils/dimension";

let localBlipIdCounter = 100000;

export class BlipMpPool extends Pool {
  _entities!: Map<number, BlipMp>;
  _add!: (entity: BlipMp) => void;
  _remove!: (id: number) => void;
  at!: (id: number) => BlipMp | null;
  exists!: (entity: number | { id: number }) => boolean;
  forEach!: (fn: (entity: BlipMp) => void) => void;
  toArray!: () => BlipMp[];

  constructor() {
    super();
    this._setupServerSync();
    onDimensionChange(() => this.forEach((blip: BlipMp) => this._applyVisibility(blip)));
  }

  atRemoteId(remoteId: number): BlipMp | null {
    return this.at(remoteId);
  }

  _applyVisibility(blip: BlipMp): void {
    if (!blip._handle || !DoesBlipExist(blip._handle)) return;
    const shown = isVisibleHere(blip._dimension);
    SetBlipAlpha(blip._handle, shown ? blip._alpha : 0);
  }

  _createFromData(data: any): BlipMp {
    const handle = AddBlipForCoord(data.x, data.y, data.z);
    SetBlipSprite(handle, data.sprite);
    SetBlipColour(handle, data.color);
    SetBlipScale(handle, data.scale);
    SetBlipAsShortRange(handle, data.shortRange);
    applyBlipName(handle, data.name);

    const blip = new BlipMp(data.id, handle);
    blip._name = data.name;
    blip._shortRange = data.shortRange;
    blip._scale = data.scale;
    blip._alpha = data.alpha ?? 255;
    blip._dimension = data.dimension ?? 0;
    this._applyVisibility(blip);
    this._add(blip);

    if (data.name) {
      setTimeout(() => {
        if (blip._handle && DoesBlipExist(blip._handle)) {
          applyBlipName(blip._handle, blip._name);
        }
      }, 1500);
    }

    return blip;
  }

  _setupServerSync(): void {
    onNet("ragemp:blipCreate", (data: any) => {
      this._createFromData(data);
    });

    onNet("ragemp:blipSyncAll", (blips: any[]) => {
      for (const data of blips) {
        if (!this.exists(data.id)) {
          this._createFromData(data);
        }
      }
    });

    onNet("ragemp:blipUpdate", (id: number, data: any) => {
      const existing = this.at(id);
      if (existing) {
        existing.position = new Vector3(data.x, data.y, data.z);
        existing.sprite = data.sprite;
        existing.color = data.color;
        existing.scale = data.scale;
        existing._alpha = data.alpha ?? 255;
        existing.shortRange = data.shortRange;
        existing.dimension = data.dimension ?? 0;
        if (data.name) existing.name = data.name;
      }
    });

    onNet("ragemp:blipDestroy", (id: number) => {
      const existing = this.at(id);
      if (existing) {
        existing.destroy();
      }
    });

    onNet("ragemp:blipRoute", (id: number, state: boolean, color: number | null | undefined, scale: number) => {
      const existing = this.at(id);
      if (existing) {
        SetBlipRoute(existing._handle, state);
        if (state && color !== undefined && color !== null) {
          SetBlipRouteColour(existing._handle, color);
        }
      }
    });
  }

  new(sprite: number, position: { x: number; y: number; z: number }, options: any = {}): BlipMp {
    const id = ++localBlipIdCounter;
    const handle = AddBlipForCoord(position.x, position.y, position.z);

    SetBlipSprite(handle, sprite);
    if (options.color !== undefined) SetBlipColour(handle, options.color);
    if (options.scale !== undefined) SetBlipScale(handle, options.scale);
    if (options.shortRange !== undefined) SetBlipAsShortRange(handle, options.shortRange);

    applyBlipName(handle, options.name);

    const blip = new BlipMp(id, handle);
    blip._name = options.name ?? "";
    blip._shortRange = options.shortRange ?? false;
    blip._scale = options.scale ?? 1.0;
    blip._alpha = options.alpha ?? 255;
    blip._dimension = options.dimension ?? 0;
    this._applyVisibility(blip);
    this._add(blip);

    return blip;
  }
}
