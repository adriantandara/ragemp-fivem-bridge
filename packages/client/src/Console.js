export class ConsoleMp {
  _verbosity = 0;

  get verbosity() {
    return this._verbosity;
  }

  set verbosity(v) {
    this._verbosity = v;
  }

  logInfo(...args) {
    if (this._verbosity >= 0) console.log("[INFO]", ...args);
  }

  logWarning(...args) {
    if (this._verbosity >= 0) console.warn("[WARNING]", ...args);
  }

  logError(...args) {
    console.error("[ERROR]", ...args);
  }

  logFatal(...args) {
    console.error("[FATAL]", ...args);
  }

  clear() {
  }
}
