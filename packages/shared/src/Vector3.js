export class Vector3 {
  constructor(x, y, z) {
    if (Array.isArray(x)) {
      this.x = x[0];
      this.y = x[1];
      this.z = x[2];
    } else if (typeof x === "object" && x !== null) {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  add(v) {
    if (typeof v === "number") {
      return new Vector3(this.x + v, this.y + v, this.z + v);
    }
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  subtract(v) {
    if (typeof v === "number") {
      return new Vector3(this.x - v, this.y - v, this.z - v);
    }
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  multiply(v) {
    if (typeof v === "number") {
      return new Vector3(this.x * v, this.y * v, this.z * v);
    }
    return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
  }

  divide(v) {
    if (typeof v === "number") {
      return new Vector3(this.x / v, this.y / v, this.z / v);
    }
    return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v) {
    return new Vector3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  distance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  distanceSqr(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  }

  normalize() {
    const len = this.length();
    if (len === 0) return new Vector3(0, 0, 0);
    return this.divide(len);
  }

  negate() {
    return new Vector3(-this.x, -this.y, -this.z);
  }

  equals(v) {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  }

  toArray() {
    return [this.x, this.y, this.z];
  }

  angleTo(v) {
    return Math.acos(this.dot(v) / (this.length() * v.length()));
  }

  clone() {
    return new Vector3(this.x, this.y, this.z);
  }

  max() {
    return Math.max(this.x, this.y, this.z);
  }

  min() {
    return Math.min(this.x, this.y, this.z);
  }

  toAngles() {
    return [Math.atan2(this.x, this.y), Math.asin(this.z / this.length())];
  }

  unit() {
    return this.normalize();
  }

  negative() {
    return this.negate();
  }
}
