export {};
declare global {
  var global: typeof globalThis & { exports: Record<string, any> };
  var process: { on?: (event: string, cb: (...args: any[]) => void) => void; [key: string]: any } | undefined;
  function require(id: string): any;
  var window: any;
  var mp: any;
}
