import { createUnkProxy } from "./_helpers.js";

export class GamePhysicsNs {
  unk = createUnkProxy();

  addRope(x, y, z, rotX, rotY, rotZ, length, ropeType, maxLength, minLength, windingSpeed, p11, rigid, breakable, p14) {
    return AddRope(x, y, z, rotX, rotY, rotZ, length, ropeType, maxLength, minLength, windingSpeed, p11 ?? false, rigid ?? false, breakable ?? true, p14 ?? 0);
  }
  deleteRope(rope) { DeleteRope(rope); }
  doesRopeExist(rope) { return DoesRopeExist(rope); }
  attachEntitiesToRope(rope, ent1, ent2, ent1X, ent1Y, ent1Z, ent2X, ent2Y, ent2Z, length, p10, p11, p12, p13) {
    AttachEntitiesToRope(rope, ent1, ent2, ent1X, ent1Y, ent1Z, ent2X, ent2Y, ent2Z, length, p10 ?? false, p11 ?? false, p12 ?? 0, p13 ?? 0);
  }
  detachRopeFromEntity(rope, entity) { DetachRopeFromEntity(rope, entity); }
  pinRopeVertex(rope, vertex, x, y, z) { PinRopeVertex(rope, vertex, x, y, z); }
  unpinRopeVertex(rope, vertex) { UnpinRopeVertex(rope, vertex); }
  getRopeVertexCount(rope) { return GetRopeVertexCount(rope); }
}
