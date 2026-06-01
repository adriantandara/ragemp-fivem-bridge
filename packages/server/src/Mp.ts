import { Vector3, Entity } from "@ragemp-fivem-bridge/shared";
import { PlayerMpPool } from "./Pools/PlayerMpPool";
import { VehicleMpPool } from "./Pools/VehicleMpPool";
import { ObjectMpPool } from "./Pools/ObjectMpPool";
import { BlipMpPool } from "./Pools/BlipMpPool";
import { ColshapeMpPool } from "./Pools/ColshapeMpPool";
import { CheckpointMpPool } from "./Pools/CheckpointMpPool";
import { MarkerMpPool } from "./Pools/MarkerMpPool";
import { TextLabelMpPool } from "./Pools/TextLabelMpPool";
import { PedMpPool } from "./Pools/PedMpPool";
import { PickupMpPool } from "./Pools/PickupMpPool";
import { DummyMpPool } from "./Pools/DummyMpPool";
import { EventManager } from "./Events/EventManager";
import { WorldMp } from "./World";
import { ConfigMp } from "./Config";
import { NetworkMp } from "./Network";
import { StorageMp } from "./Storage";
import { PluginManager } from "./Plugins/PluginManager";
import { PlayerMp } from "./Entities/PlayerMp";
import { VehicleMp } from "./Entities/VehicleMp";
import { ObjectMp } from "./Entities/ObjectMp";
import { BlipMp } from "./Entities/BlipMp";
import { ColshapeMp } from "./Entities/ColshapeMp";
import { CheckpointMp } from "./Entities/CheckpointMp";
import { MarkerMp } from "./Entities/MarkerMp";
import { TextLabelMp } from "./Entities/TextLabelMp";
import { PedMp } from "./Entities/PedMp";
import { PickupMp } from "./Entities/PickupMp";
import { DummyMp } from "./Entities/DummyMp";
import * as Enums from "./Enums";

export class Mp {
  Vector3 = Vector3;
  enums = Enums;

  Entity = Entity;
  Player = PlayerMp;
  Vehicle = VehicleMp;
  Object = ObjectMp;
  Blip = BlipMp;
  Colshape = ColshapeMp;
  Checkpoint = CheckpointMp;
  Marker = MarkerMp;
  TextLabel = TextLabelMp;
  Ped = PedMp;
  Pickup = PickupMp;
  Dummy = DummyMp;

  players = new PlayerMpPool();
  vehicles = new VehicleMpPool();
  objects = new ObjectMpPool();
  blips = new BlipMpPool();
  colshapes = new ColshapeMpPool();
  checkpoints = new CheckpointMpPool();
  markers = new MarkerMpPool();
  labels = new TextLabelMpPool();
  peds = new PedMpPool();
  pickups = new PickupMpPool();
  dummies = new DummyMpPool();
  events = new EventManager();
  world = new WorldMp();
  config = new ConfigMp();
  network = new NetworkMp();
  storage = new StorageMp();
  plugins = new PluginManager();

  joaat(text: string): number {
    return GetHashKey(text);
  }
}
