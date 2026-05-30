export function resolveNetEntity(type, id, netId) {
  const mp = globalThis.mp;
  if (!mp) return null;

  switch (type) {
    case "player":
      return mp.players?.at?.(id) ?? null;
    case "colshape":
      return mp.colshapes?.at?.(id) ?? null;
    case "checkpoint":
      return mp.checkpoints?.at?.(id) ?? null;
    case "blip":
      return mp.blips?.at?.(id) ?? null;
    case "marker":
      return mp.markers?.at?.(id) ?? null;
    case "textlabel":
    case "label":
      return mp.labels?.at?.(id) ?? null;
    case "pickup":
      return mp.pickups?.at?.(id) ?? null;
    case "dummy":
      return mp.dummies?.at?.(id) ?? null;
    case "vehicle":
      if (netId !== undefined && netId !== null && mp.vehicles?.atNetId) {
        const byNet = mp.vehicles.atNetId(netId);
        if (byNet) return byNet;
      }
      return mp.vehicles?.at?.(id) ?? null;
    case "object":
      if (netId !== undefined && netId !== null && mp.objects?.atNetId) {
        const byNet = mp.objects.atNetId(netId);
        if (byNet) return byNet;
      }
      return mp.objects?.at?.(id) ?? null;
    case "ped":
      return mp.peds?.at?.(id) ?? null;
    default:
      return null;
  }
}
