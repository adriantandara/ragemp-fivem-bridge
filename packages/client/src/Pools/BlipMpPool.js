import { Pool } from "@ragemp-fivem-bridge/shared";
import { BlipMp } from "../Entities/BlipMp";
import { applyBlipName } from "../utils/blipName";

let localBlipIdCounter = 100000;

export class BlipMpPool extends Pool {
  constructor() {
    super();
    this._setupServerSync();
  }

  atRemoteId(remoteId) {
    return this.at(remoteId);
  }

  _createFromData(data) {
    const handle = AddBlipForCoord(data.x, data.y, data.z);
    SetBlipSprite(handle, data.sprite);
    SetBlipColour(handle, data.color);
    SetBlipScale(handle, data.scale);
    SetBlipAlpha(handle, data.alpha);
    SetBlipAsShortRange(handle, data.shortRange);
    applyBlipName(handle, data.name);

    const blip = new BlipMp(data.id, handle);
    blip._name = data.name;
    blip._shortRange = data.shortRange;
    blip._scale = data.scale;
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

  _setupServerSync() {
    onNet("ragemp:blipCreate", (data) => {
      this._createFromData(data);
    });

    onNet("ragemp:blipSyncAll", (blips) => {
      for (const data of blips) {
        if (!this.exists(data.id)) {
          this._createFromData(data);
        }
      }
    });

    onNet("ragemp:blipUpdate", (id, data) => {
      const existing = this.at(id);
      if (existing) {
        existing.position = { x: data.x, y: data.y, z: data.z };
        existing.sprite = data.sprite;
        existing.color = data.color;
        existing.scale = data.scale;
        existing.alpha = data.alpha;
        existing.shortRange = data.shortRange;
        if (data.name) existing.name = data.name;
      }
    });

    onNet("ragemp:blipDestroy", (id) => {
      const existing = this.at(id);
      if (existing) {
        existing.destroy();
      }
    });

    onNet("ragemp:blipRoute", (id, state) => {
      const existing = this.at(id);
      if (existing) {
        SetBlipRoute(existing._handle, state);
      }
    });
  }

  new(sprite, position, options = {}) {
    const id = ++localBlipIdCounter;
    const handle = AddBlipForCoord(position.x, position.y, position.z);

    SetBlipSprite(handle, sprite);
    if (options.color !== undefined) SetBlipColour(handle, options.color);
    if (options.scale !== undefined) SetBlipScale(handle, options.scale);
    if (options.alpha !== undefined) SetBlipAlpha(handle, options.alpha);
    if (options.shortRange !== undefined) SetBlipAsShortRange(handle, options.shortRange);

    applyBlipName(handle, options.name);

    const blip = new BlipMp(id, handle);
    blip._name = options.name ?? "";
    blip._shortRange = options.shortRange ?? false;
    blip._scale = options.scale ?? 1.0;
    this._add(blip);

    return blip;
  }
}
