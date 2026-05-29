import { createUnkProxy } from "./_helpers.js";

export class GameObjectNs {
  unk = createUnkProxy();

  create(modelHash, x, y, z, dynamic, isNetwork, bScriptHostObj) {
    return CreateObject(modelHash, x, y, z, isNetwork ?? true, dynamic ?? true, bScriptHostObj ?? false);
  }
  delete(object) { DeleteObject(object); }
  doesExist(object) { return DoesObjectExist(object); }
  isAtCoords(object, x, y, z, dist) { return IsObjectAtCoords(object, x, y, z, dist ?? 0.1, false, false, false); }
  placeOnGroundProperly(object) { PlaceObjectOnGroundProperly(object); }
  slideToCoord(object, toX, toY, toZ, speedX, speedY, speedZ) {
    SlideObjectToCoords(object, toX, toY, toZ, speedX ?? 5, speedY ?? 5, speedZ ?? 5);
  }
  doorControl(doorHash, x, y, z, locked, xRotMult, yRotMult, zRotMult) {
    DoorControl(doorHash, x, y, z, !!locked, xRotMult ?? 0.0, yRotMult ?? 0.0, zRotMult ?? 0.0);
  }
}
