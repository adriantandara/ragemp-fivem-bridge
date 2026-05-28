import { Vector3 } from "@ragemp-fivem-bridge/shared";
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
import { PluginManager } from "./Plugins/PluginManager";
import * as Enums from "./Enums";

export class Mp {
  Vector3 = Vector3;
  enums = Enums;
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
  plugins = new PluginManager();

  joaat(text) {
    return GetHashKey(text);
  }
}
