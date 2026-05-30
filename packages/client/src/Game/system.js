import { createUnkProxy } from "./_helpers.js";

export class GameSystemNs {
  unk = createUnkProxy();

  wait(ms) { Wait(ms); }
  startNewScript(scriptName, stackSize) { return StartNewScript(scriptName, stackSize ?? 1000); }
  startNewScriptWithArgs(scriptName, args, argCount, stackSize) {
    return StartNewScriptWithArgs(scriptName, args, argCount, stackSize ?? 1000);
  }

  vdist(x1, y1, z1, x2, y2, z2) {
    const dx = x1 - x2, dy = y1 - y2, dz = z1 - z2;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  vdist2d(x1, y1, x2, y2) {
    const dx = x1 - x2, dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  vmag(x, y, z) {
    return Math.sqrt(x * x + y * y + z * z);
  }

  vmag2d(x, y) {
    return Math.sqrt(x * x + y * y);
  }
}
