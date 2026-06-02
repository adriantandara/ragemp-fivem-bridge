export const Weather = Object.freeze({
  ExtraSunny: 0, Clear: 1, Clouds: 2, Smog: 3, Foggy: 4,
  Overcast: 5, Rain: 6, Thunder: 7, Clearing: 8, Neutral: 9,
  Snow: 10, Blizzard: 11, Snowlight: 12, Xmas: 13, Halloween: 14
});

export const Marker = Object.freeze({
  UpsideDownCone: 0, VerticalCylinder: 1, ThickChevronUp: 2, ThinChevronUp: 3,
  CheckeredFlagRect: 4, CheckeredFlagCircle: 5, VerticleCircle: 6, PlaneModel: 7,
  LostMCDark: 8, LostMCLight: 9, Number0: 10, Number1: 11, Number2: 12,
  Number3: 13, Number4: 14, Number5: 15, Number6: 16, Number7: 17,
  Number8: 18, Number9: 19, ChevronUpx1: 20, ChevronUpx2: 21, ChevronUpx3: 22,
  HorizontalCircleFat: 23, ReplayIcon: 24, HorizontalCircleSkinny: 25,
  HorizontalCircleSkinnyArrow: 26, HorizontalSplitArrowCircle: 27,
  DebugSphere: 28, DollarSign: 29, HorizontalBars: 30, WolfHead: 31,
  QuestionMark: 32, PlaneSymbol: 33, HelicopterSymbol: 34,
  BoatSymbol: 35, CarSymbol: 36, MotorcycleSymbol: 37,
  BikeSymbol: 38, TruckSymbol: 39, ParachuteSymbol: 40,
  SawbladeSymbol: 41, RampSymbol: 42, Ring: 43
});

export const Alarms = Object.freeze({
  POLICE_STATION_ALARMS: "POLICE_STATION_ALARMS",
  PRISON_ALARMS: "PRISON_ALARMS",
  PORT_OF_LS_ALARMS: "PORT_OF_LS_ALARMS",
  JEWEL_STORE_HEIST_ALARMS: "JEWEL_STORE_HEIST_ALARMS",
  FIB_FLOOR_49_ALARMS: "FIB_FLOOR_49_ALARMS",
  FIB_FLOOR_53_ALARMS: "FIB_FLOOR_53_ALARMS",
  AGENCY_HEIST_FIB_TOWER_ALARMS: "AGENCY_HEIST_FIB_TOWER_ALARMS",
  PALETO_BAY_SHERIFF_BUILDING_ALARMS: "PALETO_BAY_SHERIFF_BUILDING_ALARMS",
  PORT_OF_LS_HEIST_SHIP_ALARMS: "PORT_OF_LS_HEIST_SHIP_ALARMS",
  PORT_OF_LS_HEIST_TRUCK_ALARMS: "PORT_OF_LS_HEIST_TRUCK_ALARMS",
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
