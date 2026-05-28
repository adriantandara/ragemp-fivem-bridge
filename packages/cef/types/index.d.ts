declare global {
  const mp: CefMp;
}

export interface CefMp {
  trigger(eventName: string, ...args: any[]): void;
  invoke(eventName: string, ...args: any[]): void;
  events: CefEventManager;
}

export interface CefEventManager {
  add(eventName: string, handler: (...args: any[]) => void): void;
  add(events: Record<string, (...args: any[]) => void>): void;
  call(eventName: string, ...args: any[]): void;
  remove(eventName: string, handler?: (...args: any[]) => void): void;
  addProc<T = any>(procName: string, handler: (...args: any[]) => T | Promise<T>): void;
  callProc<T = any>(procName: string, ...args: any[]): Promise<T>;
  binded(eventName: string): boolean;
  getAllOf(eventName: string): Array<(...args: any[]) => void>;
  reset(): void;
}
