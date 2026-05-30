import type { Vector3, Vector3Like, EntityMp, EntityMpPool, HashOrString } from "@ragemp-fivem-bridge/shared/types";

declare global {
  const mp: ServerMp;
}

export interface ServerMp {
  Vector3: typeof Vector3;
  enums: ServerEnums;

  Entity: { prototype: EntityMp };
  Player: { prototype: PlayerMp };
  Vehicle: { prototype: VehicleMp };
  Object: { prototype: ObjectMp };
  Blip: { prototype: BlipMp };
  Colshape: { prototype: ColshapeMp };
  Checkpoint: { prototype: CheckpointMp };
  Marker: { prototype: MarkerMp };
  TextLabel: { prototype: TextLabelMp };
  Ped: { prototype: PedMp };
  Pickup: { prototype: PickupMp };
  Dummy: { prototype: DummyMp };

  players: PlayerMpPool;
  vehicles: VehicleMpPool;
  objects: ObjectMpPool;
  peds: PedMpPool;
  pickups: PickupMpPool;
  dummies: DummyMpPool;
  blips: BlipMpPool;
  checkpoints: CheckpointMpPool;
  markers: MarkerMpPool;
  colshapes: ColshapeMpPool;
  labels: TextLabelMpPool;

  events: EventManagerMp;
  world: WorldMp;
  config: ConfigMp;
  network: NetworkMp;
  rpc: ServerRpc;
  storage: StorageMp;
  spawnmanager: { spawnPlayer(player: PlayerMp, info: { x: number; y: number; z: number; heading?: number; model?: HashOrString }): void };

  joaat(text: string): number;
}

export interface StorageMp {
  readonly data: Record<string, any>;
  sessionData: Record<string, any>;
  flush(): void;
}

export interface RpcCallOptions {
  timeout?: number;
  noRet?: boolean;
}

export interface ServerRpc {
  register(name: string, cb: (args: any, info: { player: PlayerMp; environment: string; id?: string }) => any): () => void;
  unregister(name: string): void;
  call<T = any>(name: string, args?: any, options?: RpcCallOptions): Promise<T>;
  callClient<T = any>(player: PlayerMp, name: string, args?: any, options?: RpcCallOptions): Promise<T>;
  callBrowsers<T = any>(player: PlayerMp, name: string, args?: any, options?: RpcCallOptions): Promise<T>;
  on(name: string, cb: (args: any, info: any) => void): () => void;
  off(name: string, cb: (args: any, info: any) => void): void;
  trigger(name: string, args?: any): void;
  triggerClient(player: PlayerMp, name: string, args?: any): void;
  triggerBrowsers(player: PlayerMp, name: string, args?: any): void;
  setDebugMode(state: boolean): void;
}

export interface PlayerMp extends EntityMp {
  readonly type: "player";
  readonly ip: string;
  readonly ping: number;
  readonly serial: string;
  readonly socialClub: string;
  readonly rgscId: string;
  readonly identifiers: Record<string, string>;
  getIdentifier(type: string): string | null;
  readonly vehicle: VehicleMp | null;
  readonly action: string;
  readonly aimTarget: PlayerMp | null;
  readonly allWeapons: number[];
  readonly weapons: number[];
  readonly isAiming: boolean;
  readonly isClimbing: boolean;
  readonly isEnteringVehicle: boolean;
  readonly isInCover: boolean;
  readonly isInMelee: boolean;
  readonly isJumping: boolean;
  readonly isLeavingVehicle: boolean;
  readonly isOnLadder: boolean;
  readonly isReloading: boolean;
  readonly seat: number;
  readonly streamedPlayers: PlayerMp[];
  readonly packetLoss: number;
  readonly rgscId: string;
  readonly serial: string;
  readonly socialClub: string;

  name: string;
  health: number;
  armour: number;
  heading: number;
  weapon: number;
  weaponAmmo: number;
  eyeColor: number;
  hairColor: number;
  hairHighlightColor: number;
  disableOutgoingSync: boolean;
  gameType: string;

  kick(reason?: string): void;
  ban(reason?: string): void;
  kickSilent(reason?: string): void;
  spawn(position: Vector3Like): void;

  call(eventName: string, ...args: any[]): void;
  callUnreliable(eventName: string, ...args: any[]): void;
  callToStreamed(includeSelf: boolean, eventName: string, args?: any[]): void;
  callProc<T = any>(procName: string, ...args: any[]): Promise<T>;
  cancelPendingProc(): void;
  hasPendingProc(): boolean;

  notify(message: string): void;
  outputChatBox(message: string): void;

  giveWeapon(weaponHash: HashOrString, ammo: number): void;
  giveWeapon(weapons: Array<[HashOrString, number]>): void;
  removeWeapon(weaponHash: HashOrString): void;
  removeAllWeapons(): void;
  getWeaponAmmo(weaponHash: HashOrString): number;
  setWeaponAmmo(weaponHash: HashOrString, ammo: number): void;

  setClothes(component: number, drawable: number, texture: number, palette?: number): void;
  getClothes(component: number): { drawable: number; texture: number; palette: number };
  setProp(prop: number, drawable: number, texture: number): void;
  getProp(prop: number): { drawable: number; texture: number };

  putIntoVehicle(vehicle: VehicleMp, seat: number): void;
  removeFromVehicle(): void;

  playAnimation(dict: string, name: string, speed: number, flag: number): void;
  stopAnimation(): void;
  playScenario(name: string): void;

  setHairColor(color: number, highlight: number): void;
  setHeadBlend(shapeFirst: number, shapeSecond: number, shapeThird: number, skinFirst: number, skinSecond: number, skinThird: number, shapeMix: number, skinMix: number, thirdMix: number): void;
  getHeadBlend(): { shapeFirst: number; shapeSecond: number; shapeThird: number; skinFirst: number; skinSecond: number; skinThird: number; shapeMix: number; skinMix: number; thirdMix: number };
  updateHeadBlend(shapeMix: number, skinMix: number, thirdMix: number): void;
  setFaceFeature(index: number, scale: number): void;
  getFaceFeature(index: number): number;
  setHeadOverlay(overlay: number, params: { index: number; opacity: number; color?: number; secondaryColor?: number }): void;
  getHeadOverlay(overlay: number): { index: number; opacity: number; color: number; secondaryColor: number };
  setCustomization(
    gender: boolean,
    shapeFirst: number,
    shapeSecond: number,
    shapeThird: number,
    skinFirst: number,
    skinSecond: number,
    skinThird: number,
    shapeMix: number,
    skinMix: number,
    thirdMix: number,
    eyeColor: number,
    hairColor: number,
    highlightColor: number,
    faceFeatures: number[]
  ): void;
  setDecoration(collection: HashOrString, overlay: HashOrString): void;
  getDecoration(collection: HashOrString, overlay: HashOrString): boolean;
  clearDecorations(): void;

  eval(code: string): void;
  invoke(hash: string, ...args: any[]): void;

  enableVoiceTo(target: PlayerMp): void;
  disableVoiceTo(target: PlayerMp): void;
  isStreamed(target: PlayerMp): boolean;
}

export interface PlayerMpPool extends EntityMpPool<PlayerMp> {
  broadcast(eventName: string, ...args: any[]): void;
  broadcastInRange(position: Vector3Like, range: number, eventName: string, ...args: any[]): void;
  broadcastInDimension(dimension: number, eventName: string, ...args: any[]): void;

  call(players: PlayerMp[], eventName: string, ...args: any[]): void;
  callInDimension(dimension: number, eventName: string, ...args: any[]): void;
  callInRange(position: Vector3Like, range: number, eventName: string, ...args: any[]): void;
  callUnreliable(players: PlayerMp[], eventName: string, ...args: any[]): void;
  callInDimensionUnreliable(dimension: number, eventName: string, ...args: any[]): void;
  callInRangeUnreliable(position: Vector3Like, range: number, eventName: string, ...args: any[]): void;
}

export interface VehicleMp extends EntityMp {
  readonly type: "vehicle";
  readonly driver: PlayerMp | null;
  readonly heading: number;
  readonly engineHealth: number;
  readonly velocity: Vector3;
  readonly quaternion: { x: number; y: number; z: number; w: number };
  readonly extras: boolean[];
  readonly mods: Record<number, number>;
  readonly brake: boolean;
  readonly highbeams: boolean;
  readonly horn: boolean;
  readonly rocketBoost: boolean;
  readonly siren: boolean;
  readonly steerAngle: number;
  readonly streamedPlayers: PlayerMp[];
  readonly trailer: VehicleMp | null;
  readonly traileredBy: VehicleMp | null;

  rotation: Vector3;
  bodyHealth: number;
  locked: boolean;
  numberPlate: string;
  customTires: boolean;
  engine: boolean;
  dead: boolean;
  livery: number;
  neonEnabled: boolean;
  numberPlateType: number;
  wheelType: number;
  windowTint: number;
  controller: PlayerMp | null;
  dashboardColor: number;
  movable: boolean;
  pearlescentColor: number;
  taxiLights: boolean;
  trimColor: number;
  wheelColor: number;

  explode(): void;
  repair(): void;
  spawn(position: Vector3Like, heading: number): void;

  getColor(): [number, number];
  setColor(primary: number, secondary: number): void;
  getColorRGB(): { primary: [number, number, number]; secondary: [number, number, number] };
  setColorRGB(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): void;
  getNeonColor(): [number, number, number];
  setNeonColor(r: number, g: number, b: number): void;
  getPaint(type: number): number;
  setPaint(primary: number, secondary: number): void;

  getExtra(id: number): boolean;
  setExtra(id: number, state: boolean): void;
  getMod(type: number): number;
  setMod(type: number, index: number): void;

  getOccupant(seat: number): PlayerMp | null;
  getOccupants(): PlayerMp[];
  setOccupant(seat: number, player: PlayerMp): void;

  isStreamed(player: PlayerMp): boolean;
}

export interface VehicleMpPool extends EntityMpPool<VehicleMp> {
  new(
    model: HashOrString,
    position: Vector3Like,
    options?: {
      alpha?: number;
      color?: [number, number];
      engine?: boolean;
      locked?: boolean;
      numberPlate?: string;
      dimension?: number;
      heading?: number;
    }
  ): VehicleMp;
  atHandle(handle: number): VehicleMp | null;
}

export interface ObjectMp extends EntityMp {
  readonly type: "object";
  rotation: Vector3;
}

export interface ObjectMpPool extends EntityMpPool<ObjectMp> {
  new(
    model: HashOrString,
    position: Vector3Like,
    options?: { alpha?: number; dimension?: number; rotation?: Vector3Like }
  ): ObjectMp;
  atHandle(handle: number): ObjectMp | null;
}

export interface PedMp extends EntityMp {
  readonly type: "ped";
  heading: number;
  health: number;
  armour: number;
  rotation: Vector3;
  controller: PlayerMp | null;
  frozen: boolean;
  invincible: boolean;
}

export interface PedMpPool extends EntityMpPool<PedMp> {
  new(
    modelHash: HashOrString,
    position: Vector3Like,
    options?: {
      frozen?: boolean;
      invincible?: boolean;
      heading?: number;
      dimension?: number;
      dynamic?: boolean;
      lockController?: boolean;
    }
  ): PedMp;
  atHandle(handle: number): PedMp | null;
}

export interface PickupMp extends EntityMp {
  readonly type: "pickup";
  readonly pickupHash: number;
  value: number;
}

export interface PickupMpPool extends EntityMpPool<PickupMp> {
  new(
    pickupHash: HashOrString,
    position: Vector3Like,
    options?: { value?: number; alpha?: number; dimension?: number }
  ): PickupMp;
}

export interface DummyMp extends EntityMp {
  readonly type: "dummy";
  readonly dummyType: number;
}

export interface DummyMpPool extends EntityMpPool<DummyMp> {
  new(dummyType: number, data?: any): DummyMp;
  forEachByType(type: number, fn: (entity: DummyMp) => void): void;
}

export interface BlipMp extends EntityMp {
  readonly type: "blip";
  sprite: number;
  color: number;
  scale: number;
  name: string;
  shortRange: boolean;
  drawDistance: number;
  rotation: number;
  routeFor(player: PlayerMp): void;
  unrouteFor(player: PlayerMp): void;
}

export interface BlipMpPool extends EntityMpPool<BlipMp> {
  new(
    sprite: number,
    position: Vector3Like,
    options?: {
      alpha?: number;
      color?: number;
      dimension?: number;
      drawDistance?: number;
      name?: string;
      scale?: number;
      shortRange?: boolean;
      rotation?: number;
    }
  ): BlipMp;
}

export interface CheckpointMp extends EntityMp {
  readonly type: "checkpoint";
  nextPosition: Vector3;
  radius: number;
  color: [number, number, number, number];
  visible: boolean;
  getColor(): [number, number, number, number];
  setColor(r: number, g: number, b: number, a: number): void;
  hideFor(player: PlayerMp): void;
  showFor(player: PlayerMp): void;
}

export interface CheckpointMpPool extends EntityMpPool<CheckpointMp> {
  new(
    type: number,
    position: Vector3Like,
    nextPosition: Vector3Like,
    radius: number,
    options?: {
      color?: [number, number, number, number];
      dimension?: number;
      visible?: boolean;
    }
  ): CheckpointMp;
}

export interface MarkerMp extends EntityMp {
  readonly type: "marker";
  direction: Vector3;
  scale: number;
  visible: boolean;
  rotation: Vector3;
  getColor(): [number, number, number, number];
  setColor(r: number, g: number, b: number, a: number): void;
  hideFor(player: PlayerMp): void;
  showFor(player: PlayerMp): void;
}

export interface MarkerMpPool extends EntityMpPool<MarkerMp> {
  new(
    type: number,
    position: Vector3Like,
    scale: number,
    options?: {
      color?: [number, number, number, number];
      dimension?: number;
      direction?: Vector3Like;
      rotation?: Vector3Like;
      visible?: boolean;
    }
  ): MarkerMp;
}

export interface ColshapeMp extends EntityMp {
  readonly type: "colshape";
  readonly shapeType: number;
  isPointWithin(point: Vector3Like): boolean;
}

export interface ColshapeMpPool extends EntityMpPool<ColshapeMp> {
  newSphere(x: number, y: number, z: number, range: number, dimension?: number): ColshapeMp;
  newTube(x: number, y: number, z: number, height: number, range: number, dimension?: number): ColshapeMp;
  newCircle(x: number, y: number, range: number, dimension?: number): ColshapeMp;
  newRectangle(x: number, y: number, width: number, height: number, dimension?: number): ColshapeMp;
  newCuboid(x: number, y: number, z: number, width: number, depth: number, height: number, dimension?: number): ColshapeMp;
}

export interface TextLabelMp extends EntityMp {
  readonly type: "label";
  text: string;
  color: [number, number, number, number];
  drawDistance: number;
  los: boolean;
  font: number;
}

export interface TextLabelMpPool extends EntityMpPool<TextLabelMp> {
  new(
    text: string,
    position: Vector3Like,
    options?: {
      color?: [number, number, number, number];
      dimension?: number;
      drawDistance?: number;
      font?: number;
      los?: boolean;
    }
  ): TextLabelMp;
}

export interface EventManagerMp {
  add(eventName: string, handler: (...args: any[]) => void): void;
  add(events: Record<string, (...args: any[]) => void>): void;
  addCommand(name: string, handler: (player: PlayerMp, rawCommand: string, ...args: string[]) => void): void;
  addProc<T = any>(procName: string, handler: (player: PlayerMp, ...args: any[]) => T | Promise<T>): void;

  call(eventName: string, ...args: any[]): void;
  callRemote(player: PlayerMp, eventName: string, ...args: any[]): void;

  remove(eventName: string, handler?: (...args: any[]) => void): void;
  reset(): void;
  getAllOf(eventName: string): Array<(...args: any[]) => void>;

  readonly binded: Record<string, boolean>;

  delayShutdown: boolean;
  delayTermination: boolean;
  delayInitialization: boolean;
}

export interface WorldMp {
  weather: string;
  time: {
    hour: number;
    minute: number;
    second: number;
    set(h: number, m: number, s: number): void;
  };
  trafficLights: {
    locked: boolean;
    state: number;
  };
  removeIpl(name: string): void;
  requestIpl(name: string): void;
  setWeatherTransition(weather: string, easeTime?: number): void;
}

export interface ConfigMp {
  announce: boolean;
  bind: string;
  gamemode: string;
  maxplayers: number;
  name: string;
  port: number;
  map: string;
  language: string;
}

export interface NetworkMp {
  startBatch(): void;
  endBatch(): void;
}

export interface ServerEnums {
  ClothesComponent: Record<string, number>;
  ColshapeType: Record<string, number>;
  EntityType: Record<string, number>;
  HeadOverlay: Record<string, number>;
  Marker: Record<string, number>;
  PlayerProp: Record<string, number>;
  VehicleNumberPlateType: Record<string, number>;
  VehicleSeat: Record<string, number>;
  Weather: Record<string, number>;
  Explosions: Record<string, number>;
}
