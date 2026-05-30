import { createUnkProxy } from "./_helpers.js";

export class GameInteriorNs {
  unk = createUnkProxy();

  getInteriorFromEntity(entity) { return GetInteriorFromEntity(entity); }
  getInteriorAtCoords(x, y, z) { return GetInteriorAtCoords(x, y, z); }
  getInteriorAtCoordsWithType(x, y, z, interiorType) { return GetInteriorAtCoordsWithType(x, y, z, interiorType); }
  enableInteriorProp(interiorId, propName) { EnableInteriorProp(interiorId, propName); }
  disableInteriorProp(interiorId, propName) { DisableInteriorProp(interiorId, propName); }
  isInteriorPropEnabled(interiorId, propName) { return IsInteriorPropEnabled(interiorId, propName); }
  refreshInterior(interiorId) { RefreshInterior(interiorId); }
  isValidInterior(interiorId) { return IsValidInterior(interiorId); }
  isInteriorScene() { return IsInteriorScene(); }
  getEntityInteriorLocation(entity) { return GetEntityInteriorLocation(entity); }
}
