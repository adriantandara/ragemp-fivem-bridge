export interface Vector3Like {
  x: number;
  y: number;
  z: number;
}

export class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number | number[] | Vector3Like, y?: number, z?: number) {
    if (Array.isArray(x)) {
      this.x = x[0];
      this.y = x[1];
      this.z = x[2];
    } else if (typeof x === "object" && x !== null) {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      this.x = x as number;
      this.y = y!;
      this.z = z!;
    }
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  add(v: number | Vector3Like): Vector3 {
    if (typeof v === "number") {
      return new Vector3(this.x + v, this.y + v, this.z + v);
    }
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  subtract(v: number | Vector3Like): Vector3 {
    if (typeof v === "number") {
      return new Vector3(this.x - v, this.y - v, this.z - v);
    }
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  multiply(v: number | Vector3Like): Vector3 {
    if (typeof v === "number") {
      return new Vector3(this.x * v, this.y * v, this.z * v);
    }
    return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
  }

  divide(v: number | Vector3Like): Vector3 {
    if (typeof v === "number") {
      return new Vector3(this.x / v, this.y / v, this.z / v);
    }
    return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z);
  }

  dot(v: Vector3Like): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v: Vector3Like): Vector3 {
    return new Vector3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  distance(v: Vector3Like): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  distanceSqr(v: Vector3Like): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  }

  normalize(): Vector3 {
    const len = this.length();
    if (len === 0) return new Vector3(0, 0, 0);
    return this.divide(len);
  }

  negate(): Vector3 {
    return new Vector3(-this.x, -this.y, -this.z);
  }

  equals(v: Vector3Like): boolean {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  }

  toArray(): [number, number, number] {
    return [this.x, this.y, this.z];
  }

  angleTo(v: Vector3): number {
    return Math.acos(this.dot(v) / (this.length() * v.length()));
  }

  clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  max(): number {
    return Math.max(this.x, this.y, this.z);
  }

  min(): number {
    return Math.min(this.x, this.y, this.z);
  }

  toAngles(): [number, number] {
    return [Math.atan2(this.x, this.y), Math.asin(this.z / this.length())];
  }

  unit(): Vector3 {
    return this.normalize();
  }

  negative(): Vector3 {
    return this.negate();
  }
}
