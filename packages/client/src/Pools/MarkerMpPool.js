import { Pool } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { MarkerMp } from "../Entities/MarkerMp";
import { isVisibleHere } from "../utils/dimension";

let localMarkerIdCounter = 100000;

export class MarkerMpPool extends Pool {
  _hiddenSet = new Set();

  constructor() {
    super();
    this._setupServerSync();
    this._startRendering();
  }

  atRemoteId(remoteId) {
    return this.at(remoteId);
  }

  _createFromData(data) {
    const marker = new MarkerMp(data.id, data.type);
    marker._position = new Vector3(data.x, data.y, data.z);
    marker._direction = new Vector3(data.dirX, data.dirY, data.dirZ);
    marker._rotation = new Vector3(data.rotX, data.rotY, data.rotZ);
    marker._scale = data.scale;
    marker._r = data.r;
    marker._g = data.g;
    marker._b = data.b;
    marker._a = data.a;
    marker._visible = data.visible;
    marker._dimension = data.dimension ?? 0;
    this._add(marker);
    return marker;
  }

  _setupServerSync() {
    onNet("ragemp:markerCreate", (data) => {
      this._createFromData(data);
    });

    onNet("ragemp:markerSyncAll", (markers) => {
      for (const data of markers) {
        if (!this.exists(data.id)) {
          this._createFromData(data);
        }
      }
    });

    onNet("ragemp:markerUpdate", (id, data) => {
      const existing = this.at(id);
      if (existing) {
        existing._position = new Vector3(data.x, data.y, data.z);
        existing._direction = new Vector3(data.dirX, data.dirY, data.dirZ);
        existing._rotation = new Vector3(data.rotX, data.rotY, data.rotZ);
        existing._scale = data.scale;
        existing._r = data.r;
        existing._g = data.g;
        existing._b = data.b;
        existing._a = data.a;
        existing._visible = data.visible;
        existing._dimension = data.dimension ?? 0;
      }
    });

    onNet("ragemp:markerDestroy", (id) => {
      const existing = this.at(id);
      if (existing) {
        this._hiddenSet.delete(id);
        existing.destroy();
      }
    });

    onNet("ragemp:markerHide", (id) => {
      this._hiddenSet.add(id);
    });

    onNet("ragemp:markerShow", (id) => {
      this._hiddenSet.delete(id);
    });
  }

  _startRendering() {
    const MAX_DIST = 150.0;
    setTick(() => {
      if (this._entities.size === 0) return;

      const coords = GetEntityCoords(PlayerPedId(), true);
      const px = coords[0], py = coords[1], pz = coords[2];

      this.forEach((marker) => {
        if (!marker._visible) return;
        if (this._hiddenSet.has(marker.id)) return;
        if (!isVisibleHere(marker._dimension)) return;

        const pos = marker._position;
        const dx = px - pos.x, dy = py - pos.y, dz = pz - pos.z;
        const limit = marker._drawDistance || MAX_DIST;
        if (dx * dx + dy * dy + dz * dz > limit * limit) return;

        DrawMarker(
          marker._type,
          marker._position.x, marker._position.y, marker._position.z,
          marker._direction.x, marker._direction.y, marker._direction.z,
          marker._rotation.x, marker._rotation.y, marker._rotation.z,
          marker._scale, marker._scale, marker._scale,
          marker._r, marker._g, marker._b, marker._a,
          false, false, 2, false, null, null, false
        );
      });
    });
  }

  new(type, position, scale, options = {}) {
    const id = ++localMarkerIdCounter;
    const marker = new MarkerMp(id, type);
    marker._position = position instanceof Vector3 ? position : new Vector3(position.x, position.y, position.z);
    marker._scale = scale;

    if (options.color) {
      const c = options.color;
      const arr = Array.isArray(c);
      marker._r = (arr ? c[0] : c.r) ?? marker._r;
      marker._g = (arr ? c[1] : c.g) ?? marker._g;
      marker._b = (arr ? c[2] : c.b) ?? marker._b;
      marker._a = (arr ? c[3] : c.a) ?? marker._a;
    }
    if (options.direction !== undefined) {
      marker._direction = options.direction instanceof Vector3 ? options.direction : new Vector3(options.direction.x, options.direction.y, options.direction.z);
    }
    if (options.rotation !== undefined) {
      marker._rotation = options.rotation instanceof Vector3 ? options.rotation : new Vector3(options.rotation.x, options.rotation.y, options.rotation.z);
    }
    if (options.visible !== undefined) marker._visible = options.visible;
    if (options.dimension !== undefined) marker._dimension = options.dimension;

    this._add(marker);
    return marker;
  }
}
