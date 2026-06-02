export class NotImplementedError extends Error {
  nativeName;

  constructor(nativeName: string) {
    super(`Native "${nativeName}" is not implemented by this FiveM runtime.`);
    this.name = "NotImplementedError";
    this.nativeName = nativeName;
  }
}
