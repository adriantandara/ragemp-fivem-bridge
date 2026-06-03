import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { PlayerMp } from "../Entities/PlayerMp";

export interface ProcEntry {
  procName: string;
  resolve: (value: any) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
}

export interface HeadBlend {
  shapeFirst: number; shapeSecond: number; shapeThird: number;
  skinFirst: number; skinSecond: number; skinThird: number;
  shapeMix: number; skinMix: number; thirdMix: number;
}

export interface PlayerInternalsRec {
  source: number;
  ready: boolean;
  autoRespawnAfterDeath: boolean;
  autoSpawn: boolean;
  spawnIssued: boolean;
  weapon: number;
  isAiming: boolean;
  isJumping: boolean;
  isClimbing: boolean;
  isInCover: boolean;
  isInMelee: boolean;
  isReloading: boolean;
  isEnteringVehicle: boolean;
  isLeavingVehicle: boolean;
  isOnLadder: boolean;
  action: string;
  weapons: any[];
  hairColor: number;
  hairHighlightColor: number;
  clothes: Record<number, { drawable: number; texture: number; palette: number }>;
  props: Record<number, { drawable: number; texture: number }>;
  weaponAmmo: Record<number, number>;
  eyeColor: number;
  faceFeatures: Record<number, number>;
  headBlend: HeadBlend | null;
  headOverlays: Record<number, [number, number, number, number]>;
  decorations: Array<{ collection: number; overlay: number }>;
  disableOutgoingSync: boolean;
  gameType: string;
  name?: string;
  vehicle?: any;
  customization?: any;
  pendingProcs: Map<number, ProcEntry>;
  procCounter: number;
}

export const PlayerInternals = defineInternals<PlayerInternalsRec>();

export function getPlayerSource(player: PlayerMp): number {
  return PlayerInternals.get(player).source;
}

export function initPlayerInternals(player: PlayerMp, source: number): PlayerInternalsRec {
  return PlayerInternals.init(player, {
    source,
    ready: true,
    autoRespawnAfterDeath: true,
    autoSpawn: true,
    spawnIssued: false,
    weapon: 0,
    isAiming: false,
    isJumping: false,
    isClimbing: false,
    isInCover: false,
    isInMelee: false,
    isReloading: false,
    isEnteringVehicle: false,
    isLeavingVehicle: false,
    isOnLadder: false,
    action: "",
    weapons: [],
    hairColor: 0,
    hairHighlightColor: 0,
    clothes: {},
    props: {},
    weaponAmmo: {},
    eyeColor: 0,
    faceFeatures: {},
    headBlend: null,
    headOverlays: {},
    decorations: [],
    disableOutgoingSync: false,
    gameType: "",
    pendingProcs: new Map(),
    procCounter: 0,
  });
}

export function resetWeaponState(rec: PlayerInternalsRec): void {
  rec.weapons = [];
  rec.weapon = 0;
  rec.weaponAmmo = {};
}

export function resolvePlayerProc(player: PlayerMp, reqId: number, error: string | null, result: any): void {
  const rec = PlayerInternals.get(player);
  const entry = rec.pendingProcs.get(reqId);
  if (!entry) return;
  if (entry.timer) clearTimeout(entry.timer);
  rec.pendingProcs.delete(reqId);
  if (error) entry.reject(new Error(error));
  else entry.resolve(result);
}
