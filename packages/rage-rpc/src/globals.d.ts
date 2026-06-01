// Minimal ambient declarations for globals used across RAGE environments (server/client/cef).
declare function setTimeout(handler: (...args: any[]) => void, timeout?: number, ...args: any[]): any;
declare function clearTimeout(id?: any): void;
declare const console: {
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  [key: string]: any;
};
declare const window: { name?: string; [key: string]: any } | undefined;
