import { createUnkProxy } from "./_helpers.js";

export class GameItemsetNs {
  unk = createUnkProxy();

  createItemset(p0: boolean): number { return CreateItemset(p0); }
  destroyItemset(p0: number): void { DestroyItemset(p0); }
  isItemsetValid(p0: number): boolean { return IsItemsetValid(p0); }
  addToItemset(p0: number, p1: number): boolean { return AddToItemset(p0, p1); }
  removeFromItemset(p0: number, p1: number): void { RemoveFromItemset(p0, p1); }
  getItemsetSize(x: number): number { return GetItemsetSize(x); }
  getIndexedItemInItemset(p0: number, p1: number): number { return GetIndexedItemInItemset(p0, p1); }
  isInItemset(p0: number, p1: number): boolean { return IsInItemset(p0, p1); }
  cleanItemset(p0: number): void { CleanItemset(p0); }
  create(p0: boolean): number { return CreateItemset(p0); }
  destroy(p0: number): void { DestroyItemset(p0); }
  isValid(p0: number): boolean { return IsItemsetValid(p0); }
  addTo(p0: number, p1: number): boolean { return AddToItemset(p0, p1); }
  removeFrom(p0: number, p1: number): void { RemoveFromItemset(p0, p1); }
  getSize(x: number): number { return GetItemsetSize(x); }
  getIndexedItemIn(p0: number, p1: number): number { return GetIndexedItemInItemset(p0, p1); }
  isIn(p0: number, p1: number): boolean { return IsInItemset(p0, p1); }
  clean(p0: number): void { CleanItemset(p0); }
}
