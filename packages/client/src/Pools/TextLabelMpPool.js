import { Pool } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { TextLabelMp } from "../Entities/TextLabelMp";
import { isVisibleHere } from "../utils/dimension";

let localLabelIdCounter = 100000;

export class TextLabelMpPool extends Pool {
  constructor() {
    super();
    this._setupServerSync();
    this._startRendering();
  }

  atRemoteId(remoteId) {
    return this.at(remoteId);
  }

  _createFromData(data) {
    const label = new TextLabelMp(data.id);
    label._text = data.text;
    label._position = new Vector3(data.x, data.y, data.z);
    label._r = data.r;
    label._g = data.g;
    label._b = data.b;
    label._a = data.a;
    label._drawDistance = data.drawDistance;
    label._los = data.los;
    label._font = data.font;
    label._dimension = data.dimension ?? 0;
    label._visible = true;
    this._add(label);
    return label;
  }

  _setupServerSync() {
    onNet("ragemp:labelCreate", (data) => {
      this._createFromData(data);
    });

    onNet("ragemp:labelSyncAll", (labels) => {
      for (const data of labels) {
        if (!this.exists(data.id)) {
          this._createFromData(data);
        }
      }
    });

    onNet("ragemp:labelUpdate", (id, data) => {
      const existing = this.at(id);
      if (existing) {
        existing._text = data.text;
        existing._position = new Vector3(data.x, data.y, data.z);
        existing._r = data.r;
        existing._g = data.g;
        existing._b = data.b;
        existing._a = data.a;
        existing._drawDistance = data.drawDistance;
        existing._los = data.los;
        existing._font = data.font;
        existing._dimension = data.dimension ?? 0;
      }
    });

    onNet("ragemp:labelDestroy", (id) => {
      const existing = this.at(id);
      if (existing) {
        existing.destroy();
      }
    });
  }

  _startRendering() {
    setTick(() => {
      if (this._entities.size === 0) return;
      const playerPed = PlayerPedId();
      const playerCoords = GetEntityCoords(playerPed, true);
      const playerX = playerCoords[0];
      const playerY = playerCoords[1];
      const playerZ = playerCoords[2];

      this.forEach((label) => {
        if (!label._visible) return;
        if (!isVisibleHere(label._dimension)) return;

        const pos = label._position;
        if (!pos) return;

        const dx = playerX - pos.x;
        const dy = playerY - pos.y;
        const dz = playerZ - pos.z;
        const distSq = dx * dx + dy * dy + dz * dz;
        const drawDist = label._drawDistance;

        if (distSq > drawDist * drawDist) return;

        SetDrawOrigin(pos.x, pos.y, pos.z, 0);
        SetTextFont(label._font);
        SetTextScale(0.0, 0.35);
        SetTextColour(label._r, label._g, label._b, label._a);
        SetTextOutline();
        SetTextCentre(true);
        BeginTextCommandDisplayText("STRING");
        AddTextComponentSubstringPlayerName(label._text);
        EndTextCommandDisplayText(0.0, 0.0);
        ClearDrawOrigin();
      });
    });
  }

  new(text, position, options = {}) {
    const id = ++localLabelIdCounter;
    const label = new TextLabelMp(id);

    label._text = text;
    label._position = position;

    if (options.color !== undefined) {
      label._r = options.color.r ?? 255;
      label._g = options.color.g ?? 255;
      label._b = options.color.b ?? 255;
      label._a = options.color.a ?? 255;
    }
    if (options.drawDistance !== undefined) label._drawDistance = options.drawDistance;
    if (options.font !== undefined) label._font = options.font;
    if (options.los !== undefined) label._los = options.los;
    if (options.dimension !== undefined) label._dimension = options.dimension;

    this._add(label);

    return label;
  }
}
