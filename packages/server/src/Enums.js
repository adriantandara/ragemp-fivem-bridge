export const ClothesComponent = Object.freeze({
  Head: 0, Beard: 1, Hair: 2, Torso: 3, Legs: 4, Hands: 5,
  Foot: 6, Eyes: 7, Accessories: 8, Tasks: 9, Decals: 10, Tops: 11
});

export const ColshapeType = Object.freeze({
  Sphere: "sphere", Tube: "tube", Circle: "circle",
  Rectangle: "rectangle", Cuboid: "cuboid", Polygon: "polygon"
});

export const EntityType = Object.freeze({
  Player: "player", Vehicle: "vehicle", Object: "object", Pickup: "pickup",
  Blip: "blip", Checkpoint: "checkpoint", Marker: "marker", Colshape: "colshape",
  TextLabel: "textlabel", Ped: "ped", Dummy: "dummy"
});

export const HeadOverlay = Object.freeze({
  Blemishes: 0, FacialHair: 1, Eyebrows: 2, Ageing: 3, Makeup: 4,
  Blush: 5, Complexion: 6, SunDamage: 7, Lipstick: 8, MolesFreckles: 9,
  ChestHair: 10, BodyBlemishes: 11, AddBodyBlemishes: 12
});

export const Marker = Object.freeze({
  UpsideDownCone: 0, VerticalCylinder: 1, ThickChevronUp: 2, ThinChevronUp: 3,
  CheckeredFlagRect: 4, CheckeredFlagCircle: 5, VerticleCircle: 6, PlaneModel: 7,
  LostMCDark: 8, LostMCLight: 9, Number0: 10, Number1: 11, Number2: 12,
  Number3: 13, Number4: 14, Number5: 15, Number6: 16, Number7: 17,
  Number8: 18, Number9: 19, ChevronUpx1: 20, ChevronUpx2: 21, ChevronUpx3: 22,
  HorizontalCircleFat: 23, ReplayIcon: 24, HorizontalCircleSkinny: 25,
  HorizontalCircleSkinnyArrow: 26, HorizontalSplitArrowCircle: 27,
  DebugSphere: 28, DollarSign: 29, HorizontalBars: 30, WolfHead: 31
});

export const PlayerProp = Object.freeze({ Helmet: 0, Glasses: 1, EarPiece: 2 });

export const VehicleNumberPlateType = Object.freeze({
  BlueOnWhite1: 0, YellowOnBlack: 1, YellowOnBlue: 2,
  BlueOnWhite2: 3, BlueOnWhite3: 4, Yankton: 5
});

export const EntityOrphanMode = Object.freeze({
  DeleteWhenNotRelevant: 0,
  DeleteOnOwnerDisconnect: 1,
  KeepEntity: 2
});

export const VehicleSeat = Object.freeze({
  Driver: 0, Passenger1: 1, Passenger2: 2, Passenger3: 3,
  Passenger4: 4, Passenger5: 5, Passenger6: 6, Passenger7: 7,
  Passenger8: 8, Passenger9: 9, Passenger10: 10, Passenger11: 11,
  Passenger12: 12, Passenger13: 13, Passenger14: 14, Passenger15: 15,
  Passenger16: 16
});

export const Weather = Object.freeze({
  Clear: "CLEAR", ExtraSunny: "EXTRASUNNY", Clouds: "CLOUDS",
  Overcast: "OVERCAST", Rain: "RAIN", Clearing: "CLEARING",
  Thunder: "THUNDER", Smog: "SMOG", Foggy: "FOGGY",
  Xmas: "XMAS", Snowlight: "SNOWLIGHT", Blizzard: "BLIZZARD"
});

export const Explosions = Object.freeze({
  Grenade: 0, GrenadeLauncher: 1, StickyBomb: 2, Molotov: 3, Rocket: 4,
  TankShell: 5, HiOctane: 6, Car: 7, Plane: 8, PetrolPump: 9,
  Bike: 10, DirSteam: 11, DirFlame: 12, DirWaterHydrant: 13, DirGasCanister: 14,
  Boat: 15, ShipDestroy: 16, Truck: 17, Bullet: 18, SmokeGGrenade: 19,
  Bzgas: 20, Flare: 21, GasCanister: 22, Extinguisher: 23, ProgrammableAr: 24,
  Train: 25, Barrel: 26, Propane: 27, Blimp: 28, DirFlameExplode: 29,
  Tanker: 30, PlaneRocket: 31, VehicleBullet: 32, GasTank: 33, Firework: 34,
  Snowball: 35, ProxMine: 36, ValkyrieCannon: 37, AirDefence: 38, PipeBomb: 39,
  VehicleMine: 40, ExplosiveAmmo: 41, ApcShell: 42, BombCluster: 43, BombGas: 44,
  BombIncendiary: 45, BombStandard: 46, Torpedo: 47, TorpedoUnderwater: 48,
  BombushkaCannon: 49, BombushkaBomb: 50, BombClusterSecondary: 51,
  HunterBarrage: 52, HunterCannon: 53, RogueCannon: 54, MineUnderwater: 55,
  OrbitalCannon: 56, BombStandardWide: 57, ExplosiveAmmoShotgun: 58,
  Oppressor2Cannon: 59, MortarKinetic: 60, VehicleMineKinetic: 61,
  VehicleMineEmp: 62, VehicleMineSpike: 63, VehicleMineSlick: 64,
  VehicleMineTar: 65, ScriptDrone: 66, Raygun: 67, BuriedMine: 68,
  ScriptMissile: 69, RcTankRocket: 70, BombWater: 71, BombWaterSecondary: 72,
});
