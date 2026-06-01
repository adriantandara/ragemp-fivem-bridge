import { Pool } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { TextLabelMp } from "../Entities/TextLabelMp";
import { isVisibleHere } from "../utils/dimension";

let localLabelIdCounter = 100000;

export class TextLabelMpPool extends Pool {
  _entities!: Map<number, TextLabelMp>;
  _add!: (entity: TextLabelMp) => void;
  _remove!: (id: number) => void;
  at!: (id: number) => TextLabelMp | null;
  exists!: (entity: number | { id: number }) => boolean;
  forEach!: (fn: (entity: TextLabelMp) => void) => void;
  toArray!: () => TextLabelMp[];
  _renderTick: number | null = null;

  constructor() {
    super();
    this._setupServerSync();
    this._startRendering();
  }

  atRemoteId(remoteId: number): TextLabelMp | null {
    return this.at(remoteId);
  }

  _createFromData(data: any): TextLabelMp {
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

  _setupServerSync(): void {
    onNet("ragemp:labelCreate", (data: any) => {
      this._createFromData(data);
    });

    onNet("ragemp:labelSyncAll", (labels: any[]) => {
      for (const data of labels) {
        if (!this.exists(data.id)) {
          this._createFromData(data);
        }
      }
    });

    onNet("ragemp:labelUpdate", (id: number, data: any) => {
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

    onNet("ragemp:labelDestroy", (id: number) => {
      const existing = this.at(id);
      if (existing) {
        existing.destroy();
      }
    });
  }

  _startRendering(): void {
    this._renderTick = setTick(() => {
      if (this._entities.size === 0) return;
      const playerPed = PlayerPedId();
      const playerCoords = GetEntityCoords(playerPed, true);
      const playerX = playerCoords[0];
      const playerY = playerCoords[1];
      const playerZ = playerCoords[2];

      this.forEach((label: TextLabelMp) => {
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

    if (typeof on === "function") {
      on("onResourceStop", (name: string) => {
        if (typeof GetCurrentResourceName === "function" && name !== GetCurrentResourceName()) return;
        if (this._renderTick != null) {
          clearTick(this._renderTick);
          this._renderTick = null;
        }
      });
    }
  }

  new(text: string, position: Vector3 | { x: number; y: number; z: number }, options: any = {}): TextLabelMp {
    const id = ++localLabelIdCounter;
    const label = new TextLabelMp(id);

    label._text = text;
    label._position = position instanceof Vector3 ? position : new Vector3(position.x, position.y, position.z);

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
