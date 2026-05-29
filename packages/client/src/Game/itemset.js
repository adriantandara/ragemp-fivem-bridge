import { createUnkProxy } from "./_helpers.js";

export class GameItemsetNs {
  unk = createUnkProxy();

  createItemset(size) { return CreateItemset(size); }
  deleteItemset(handle) { DeleteItemset(handle); }
  isItemsetValid(handle) { return IsItemsetValid(handle); }
  addToItemset(handle, item) { AddToItemset(handle, item); }
  removeFromItemset(handle, item) { RemoveFromItemset(handle, item); }
  isInItemset(handle, item) { return IsInItemset(handle, item); }
  getItemInItemset(handle, index) { return GetItemInItemset(handle, index); }
  sizeOfItemset(handle) { return SizeOfItemset(handle); }
}
