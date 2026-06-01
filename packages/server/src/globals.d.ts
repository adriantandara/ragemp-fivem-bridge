// Ambient runtime globals referenced behind feature-detection guards.
export {};
declare global {
  // FiveM exposes a CommonJS-ish `global` and sometimes a Node-like `process`/`require`
  // depending on the runtime; code paths using them are guarded with `typeof x !== "undefined"`.
  var global: typeof globalThis & { exports: Record<string, any> };
  var process: { on?: (event: string, cb: (...args: any[]) => void) => void; [key: string]: any } | undefined;
  function require(id: string): any;
  var window: any;
  var mp: any;
}
