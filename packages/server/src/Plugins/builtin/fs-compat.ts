export const name = "fs-compat";

type FsError = Error & {
  code?: string;
  errno?: number;
  syscall?: string;
  path?: string;
};

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

  const enoent = (p: string): FsError => {
    const err = new Error(
      `ENOENT: no such file or directory, open '${p}'`,
    ) as FsError;
    err.code = "ENOENT";
    err.errno = -2;
    err.syscall = "open";
    err.path = p;
    return err;
  };

  const originalExistsSync = fs.existsSync;
  fs.existsSync = function (p: string): boolean {
    try {
      return originalExistsSync.call(fs, p);
    } catch {
      return false;
    }
  };

  const originalReadFileSync = fs.readFileSync;
  fs.readFileSync = function (p: string, opts?: any): any {
    try {
      return originalReadFileSync.call(fs, p, opts);
    } catch (err) {
      if ((err as FsError)?.code === "ENOENT") throw err;
      throw enoent(p);
    }
  };

  const originalReadFile = fs.readFile;
  fs.readFile = function (
    p: string,
    optsOrCb: any,
    cb?: (err: any, data?: any) => void,
  ): void {
    const callback = typeof optsOrCb === "function" ? optsOrCb : cb;
    try {
      return originalReadFile.call(fs, p, optsOrCb, cb);
    } catch (err) {
      if (callback)
        callback((err as FsError)?.code === "ENOENT" ? err : enoent(p));
    }
  };

  const originalOpenSync = fs.openSync;
  fs.openSync = function (p: string, ...rest: any[]): number {
    try {
      return originalOpenSync.call(fs, p, ...rest);
    } catch (err) {
      if ((err as FsError)?.code === "ENOENT") throw err;
      throw enoent(p);
    }
  };

  const originalOpen = fs.open;
  fs.open = function (p: string, ...rest: any[]): void {
    const callback = rest.find((a) => typeof a === "function") as
      | ((err: any, fd?: number) => void)
      | undefined;
    try {
      return originalOpen.call(fs, p, ...rest);
    } catch (err) {
      if (callback)
        callback((err as FsError)?.code === "ENOENT" ? err : enoent(p));
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
  fs.writeFile = function (
    p: string,
    data: any,
    optsOrCb: any,
    cb?: (err: any) => void,
  ): void {
    const callback = typeof optsOrCb === "function" ? optsOrCb : cb;
    try {
      return originalWriteFile.call(fs, p, data, optsOrCb, cb);
    } catch (err) {
      if (callback) callback(err);
    }
  };

  const originalMkdir = fs.mkdir;
  fs.mkdir = function (
    p: string,
    optsOrCb: any,
    cb?: (err: any) => void,
  ): void {
    const callback = typeof optsOrCb === "function" ? optsOrCb : cb;
    try {
      return originalMkdir.call(fs, p, optsOrCb, cb);
    } catch (err) {
      if (callback) callback(err);
    }
  };

  if (fs.promises) {
    const origReadFile = fs.promises.readFile;
    fs.promises.readFile = async function (
      p: string,
      opts?: any,
    ): Promise<any> {
      try {
        return await origReadFile.call(fs.promises, p, opts);
      } catch (err) {
        throw (err as FsError)?.code === "ENOENT" ? err : enoent(p);
      }
    };

    const origOpen = fs.promises.open;
    fs.promises.open = async function (
      p: string,
      ...rest: any[]
    ): Promise<any> {
      try {
        return await origOpen.call(fs.promises, p, ...rest);
      } catch (err) {
        throw (err as FsError)?.code === "ENOENT" ? err : enoent(p);
      }
    };

    const origMkdir = fs.promises.mkdir;
    fs.promises.mkdir = async function (p: string, opts?: any): Promise<void> {
      try {
        return await origMkdir.call(fs.promises, p, opts);
      } catch {
        return undefined;
      }
    };

    const origWriteFile = fs.promises.writeFile;
    fs.promises.writeFile = async function (
      p: string,
      data: any,
      opts?: any,
    ): Promise<void> {
      try {
        return await origWriteFile.call(fs.promises, p, data, opts);
      } catch {
        return undefined;
      }
    };

    const origAppendFile = fs.promises.appendFile;
    fs.promises.appendFile = async function (
      p: string,
      data: any,
      opts?: any,
    ): Promise<void> {
      try {
        return await origAppendFile.call(fs.promises, p, data, opts);
      } catch {
        return undefined;
      }
    };
  }
}
