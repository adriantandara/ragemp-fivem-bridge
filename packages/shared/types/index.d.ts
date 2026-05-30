export type HashOrString = number | string;

export const GLOBAL_DIMENSION: 4294967295;
export function normalizeDimension(value: number | null | undefined): number;
export function isGlobalDimension(value: number | null | undefined): boolean;
export function dimensionsMatch(entityDimension: number, observerDimension: number): boolean;

export type Vector3Like =
  | Vector3
  | { x: number; y: number; z: number }
  | [number, number, number];

export interface IVector3 {
  x: number;
  y: number;
  z: number;
}

export class Vector3 implements IVector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number);
  constructor(arr: [number, number, number]);
  constructor(v: IVector3);

  readonly length: number;

  add(v: Vector3Like): Vector3;
  subtract(v: Vector3Like): Vector3;
  multiply(scalar: number): Vector3;
  divide(scalar: number): Vector3;

  dot(v: Vector3Like): number;
  cross(v: Vector3Like): Vector3;

  distance(v: Vector3Like): number;
  distanceSqr(v: Vector3Like): number;

  normalize(): Vector3;
  unit(): Vector3;
  negate(): Vector3;
  negative(): Vector3;
  clone(): Vector3;

  equals(v: Vector3Like): boolean;
  max(v: Vector3Like): Vector3;
  min(v: Vector3Like): Vector3;
  angleTo(v: Vector3Like): number;
  toAngles(): { theta: number; phi: number };

  toArray(): [number, number, number];
}

export interface EntityMp {
  readonly id: number;
  readonly type: string;
  readonly remoteId: number;

  alpha: number;
  dimension: number;
  model: number;
  position: Vector3;
  data: Record<string, any>;

  getVariable<T = any>(key: string): T | undefined;
  setVariable(key: string, value: any): void;
  hasVariable(key: string): boolean;
  setVariables(vars: Record<string, any>): void;

  setOwnVariable(key: string, value: any): void;
  setOwnVariables(vars: Record<string, any>): void;
  getOwnVariable<T = any>(key: string): T | undefined;

  dist(other: EntityMp): number;
  distSquared(other: EntityMp): number;

  destroy(): void;
}

export interface EntityMpPool<T extends EntityMp> extends Iterable<T> {
  readonly length: number;
  readonly size: number;

  at(id: number): T | null;
  exists(entityOrId: T | number): boolean;
  forEach(fn: (entity: T) => void): void;
  forEachFast(fn: (entity: T) => void): void;
  apply(fn: (entity: T) => void): void;
  toArray(): T[];
  toArrayFast(): T[];

  forEachInRange(position: Vector3Like, range: number, fn: (entity: T) => void): void;
  forEachInDimension(position: Vector3Like, dimension: number, range: number, fn: (entity: T) => void): void;
  getClosest(position: Vector3Like): T | null;
  getClosestInDimension(position: Vector3Like, dimension: number): T | null;
}
