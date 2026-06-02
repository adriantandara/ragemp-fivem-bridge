import { Vector3 } from "@ragemp-fivem-bridge/shared";

type Vec3Like = number[] | { x?: number | null; y?: number | null; z?: number | null; [0]?: number; [1]?: number; [2]?: number } | null | undefined;

export function toVec3(v: Vec3Like): Vector3 {
  if (!v) return new Vector3(0, 0, 0);
  const o = v as any;
  return new Vector3(o.x ?? o[0] ?? 0, o.y ?? o[1] ?? 0, o.z ?? o[2] ?? 0);
}
