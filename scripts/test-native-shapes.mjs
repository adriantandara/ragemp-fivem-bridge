import { NATIVE_SHAPES } from "../packages/client/src/utils/nativeShapes.js";

class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

function toVec(v) {
  if (v && typeof v === "object") {
    return new Vector3(v.x ?? v[0] ?? 0, v.y ?? v[1] ?? 0, v.z ?? v[2] ?? 0);
  }
  return v;
}
function reshape(shape, r) {
  if (shape.vec) return toVec(r);
  const out = shape.out;
  const obj = {};
  if (Array.isArray(r)) {
    let i = shape.ret ? 1 : 0;
    for (const p of out) {
      obj[p.n] = p.v ? toVec(r[i]) : r[i];
      i++;
    }
    if (shape.ret) obj.result = r[0];
  } else if (out.length === 1) {
    obj[out[0].n] = out[0].v ? toVec(r) : r;
  } else {
    return r;
  }
  return obj;
}

let pass = 0;
let fail = 0;
function check(label, cond) {
  if (cond) {
    pass++;
  } else {
    fail++;
    console.log("  FAIL:", label);
  }
}
function eq(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

// 1. Vector return mapped
check("GetEntityCoords is vec", eq(NATIVE_SHAPES.GetEntityCoords, { vec: 1 }));
check(
  "reshape vec from array",
  eq(reshape({ vec: 1 }, [10, 20, 30]), new Vector3(10, 20, 30)),
);
check(
  "reshape vec from object",
  eq(reshape({ vec: 1 }, { x: 1, y: 2, z: 3 }), new Vector3(1, 2, 3)),
);

// 2. Multi-output with non-void return (GetShapeTestResult)
const sts = NATIVE_SHAPES.GetShapeTestResult;
check("GetShapeTestResult exists", !!sts);
check("GetShapeTestResult ret=1", sts && sts.ret === 1);
check(
  "GetShapeTestResult out names",
  sts && eq(sts.out.map((o) => o.n), ["hit", "endCoords", "surfaceNormal", "entityHit"]),
);
check("GetShapeTestResult endCoords is vector", sts && sts.out[1].v === 1);
const stsResult = reshape(sts, [2, true, { x: 1, y: 2, z: 3 }, { x: 0, y: 0, z: 1 }, 42]);
check("STS result.hit", stsResult.hit === true);
check("STS result.endCoords vec", eq(stsResult.endCoords, new Vector3(1, 2, 3)));
check("STS result.surfaceNormal vec", eq(stsResult.surfaceNormal, new Vector3(0, 0, 1)));
check("STS result.entityHit", stsResult.entityHit === 42);
check("STS result.result (native return)", stsResult.result === 2);

// 3. Single-output void native returns value directly -> wrapped into object
const singleVoid = { out: [{ n: "value", v: 0 }] };
check("single-output direct value", eq(reshape(singleVoid, 99), { value: 99 }));
check(
  "single-output as array",
  eq(reshape({ out: [{ n: "value", v: 0 }], ret: 1 }, [1, 99]), { value: 99, result: 1 }),
);

// 4. Scalar native (no shape) passes through untouched at call site (no entry)
check("scalar native has no shape entry", NATIVE_SHAPES.GetEntityHealth === undefined);

// 5. Sanity: map size + a few known vector returns
check("map has >900 entries", Object.keys(NATIVE_SHAPES).length > 900);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
