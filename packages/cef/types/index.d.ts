declare global {
  const mp: CefMp;
}

export interface CefMp {
  trigger(eventName: string, ...args: any[]): void;
  invoke(eventName: string, ...args: any[]): void;
  events: CefEventManager;
  rpc: CefRpc;
  cef: {
    setDebugMode(state: boolean): void;
    readonly debug: boolean;
    readonly id: string | number;
  };
}

export interface RpcCallOptions {
  timeout?: number;
  noRet?: boolean;
}

export interface CefRpc {
  register(name: string, cb: (args: any, info: any) => any): () => void;
  unregister(name: string): void;
  call<T = any>(name: string, args?: any, options?: RpcCallOptions): Promise<T>;
  callServer<T = any>(name: string, args?: any, options?: RpcCallOptions): Promise<T>;
  callClient<T = any>(name: string, args?: any, options?: RpcCallOptions): Promise<T>;
  callBrowsers<T = any>(name: string, args?: any, options?: RpcCallOptions): Promise<T>;
  on(name: string, cb: (args: any, info: any) => void): () => void;
  off(name: string, cb: (args: any, info: any) => void): void;
  trigger(name: string, args?: any): void;
  triggerServer(name: string, args?: any): void;
  triggerClient(name: string, args?: any): void;
  triggerBrowsers(name: string, args?: any): void;
  setDebugMode(state: boolean): void;
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
