/**
 * Thrown when a bridge method maps to a FiveM native that the current runtime
 * does not expose (e.g. a client-only native called on the server, or a native
 * absent from this FiveM build). Surfaces an explicit, catchable failure instead
 * of a cryptic "undefined is not a function".
 */
export class NotImplementedError extends Error {
  nativeName;

  constructor(nativeName: string) {
    super(`Native "${nativeName}" is not implemented by this FiveM runtime.`);
    this.name = "NotImplementedError";
    this.nativeName = nativeName;
  }
}
