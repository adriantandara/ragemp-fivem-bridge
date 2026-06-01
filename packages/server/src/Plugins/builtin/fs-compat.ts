export const name = "fs-compat";

export default function setup(): void {
  const fs = require("fs");
  const path = require("path");

  const origCwd = process.cwd.bind(process);
  process.cwd = function (): string {
    try {
      const resPath = GetResourcePath(GetCurrentResourceName());
      if (resPath) return resPath;
    } catch {}
    return origCwd();
  };

  try {
    const logsDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
  } catch {}

  const originalExistsSync = fs.existsSync;
  fs.existsSync = function (p: string): boolean {
    try {
      return originalExistsSync.call(fs, p);
    } catch {
      return false;
    }
  };

  const originalMkdirSync = fs.mkdirSync;
  fs.mkdirSync = function (p: string, opts?: any): void {
    try {
      return originalMkdirSync.call(fs, p, opts);
    } catch {
      return undefined;
    }
  };

  const originalWriteFileSync = fs.writeFileSync;
  fs.writeFileSync = function (p: string, data: any, opts?: any): void {
    try {
      return originalWriteFileSync.call(fs, p, data, opts);
    } catch {
      return undefined;
    }
  };

  const originalAppendFileSync = fs.appendFileSync;
  fs.appendFileSync = function (p: string, data: any, opts?: any): void {
    try {
      return originalAppendFileSync.call(fs, p, data, opts);
    } catch {
      return undefined;
    }
  };

  const originalWriteFile = fs.writeFile;
  fs.writeFile = function (p: string, data: any, optsOrCb: any, cb?: (err: any) => void): void {
    const callback = typeof optsOrCb === "function" ? optsOrCb : cb;
    try {
      return originalWriteFile.call(fs, p, data, optsOrCb, cb);
    } catch (err) {
      if (callback) callback(err);
    }
  };

  const originalMkdir = fs.mkdir;
  fs.mkdir = function (p: string, optsOrCb: any, cb?: (err: any) => void): void {
    const callback = typeof optsOrCb === "function" ? optsOrCb : cb;
    try {
      return originalMkdir.call(fs, p, optsOrCb, cb);
    } catch (err) {
      if (callback) callback(err);
    }
  };

  if (fs.promises) {
    const origMkdir = fs.promises.mkdir;
    fs.promises.mkdir = async function (p: string, opts?: any): Promise<void> {
      try {
        return await origMkdir.call(fs.promises, p, opts);
      } catch {
        return undefined;
      }
    };

    const origWriteFile = fs.promises.writeFile;
    fs.promises.writeFile = async function (p: string, data: any, opts?: any): Promise<void> {
      try {
        return await origWriteFile.call(fs.promises, p, data, opts);
      } catch {
        return undefined;
      }
    };

    const origAppendFile = fs.promises.appendFile;
    fs.promises.appendFile = async function (p: string, data: any, opts?: any): Promise<void> {
      try {
        return await origAppendFile.call(fs.promises, p, data, opts);
      } catch {
        return undefined;
      }
    };
  }
}
