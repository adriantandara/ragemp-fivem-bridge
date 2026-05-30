export const COLSHAPE_TYPES = ["sphere", "circle", "tube", "rectangle", "cuboid"];

export function colshapeContains(shapeType, position, params, point, margin = 0) {
  if (!position || !params || !point) return false;
  const m = margin > 0 ? margin : 0;

  switch (shapeType) {
    case "sphere": {
      const dx = point.x - position.x;
      const dy = point.y - position.y;
      const dz = point.z - position.z;
      const r = (params.radius ?? 0) + m;
      return dx * dx + dy * dy + dz * dz <= r * r;
    }

    case "circle": {
      const dx = point.x - position.x;
      const dy = point.y - position.y;
      const r = (params.radius ?? 0) + m;
      return dx * dx + dy * dy <= r * r;
    }

    case "tube": {
      const dx = point.x - position.x;
      const dy = point.y - position.y;
      const r = (params.radius ?? 0) + m;
      if (dx * dx + dy * dy > r * r) return false;
      const dz = point.z - position.z;
      return dz >= -m && dz <= (params.height ?? 0) + m;
    }

    case "rectangle": {
      const w = params.width ?? 0;
      const h = params.height ?? 0;
      return (
        point.x >= position.x - m &&
        point.x <= position.x + w + m &&
        point.y >= position.y - m &&
        point.y <= position.y + h + m
      );
    }

    case "cuboid": {
      const w = params.width ?? 0;
      const d = params.depth ?? 0;
      const h = params.height ?? 0;
      return (
        point.x >= position.x - m &&
        point.x <= position.x + w + m &&
        point.y >= position.y - m &&
        point.y <= position.y + d + m &&
        point.z >= position.z - m &&
        point.z <= position.z + h + m
      );
    }

    default:
      return false;
  }
}

export function colshapeCenter(shapeType, position, params) {
  switch (shapeType) {
    case "rectangle":
      return {
        x: position.x + (params.width ?? 0) / 2,
        y: position.y + (params.height ?? 0) / 2,
        z: position.z,
      };
    case "cuboid":
      return {
        x: position.x + (params.width ?? 0) / 2,
        y: position.y + (params.depth ?? 0) / 2,
        z: position.z + (params.height ?? 0) / 2,
      };
    default:
      return { x: position.x, y: position.y, z: position.z };
  }
}
