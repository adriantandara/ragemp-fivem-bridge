export class ConsoleMp {
  _verbosity: number = 0;

  get verbosity(): number {
    return this._verbosity;
  }

  set verbosity(v: number) {
    this._verbosity = v;
  }

  logInfo(...args: unknown[]): void {
    if (this._verbosity >= 0) console.log("[INFO]", ...args);
  }

  logWarning(...args: unknown[]): void {
    if (this._verbosity >= 0) console.warn("[WARNING]", ...args);
  }

  logError(...args: unknown[]): void {
    console.error("[ERROR]", ...args);
  }

  logFatal(...args: unknown[]): void {
    console.error("[FATAL]", ...args);
  }

  clear(): void {
  }
}
