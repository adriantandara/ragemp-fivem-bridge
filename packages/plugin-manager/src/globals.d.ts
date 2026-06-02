// Minimal ambient declarations for FiveM server-side globals and console.
declare const console: {
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  [key: string]: any;
};

declare function GetCurrentResourceName(): string;
declare function GetNumResourceMetadata(resource: string, key: string): number;
declare function GetResourceMetadata(resource: string, key: string, index: number): string;
declare function GetNumResources(): number;
declare function GetResourceByFindIndex(index: number): string;
declare function GetResourceState(resource: string): string;
declare function LoadResourceFile(resource: string, path: string): string | null;
declare function on(eventName: string, handler: (...args: any[]) => void): void;
