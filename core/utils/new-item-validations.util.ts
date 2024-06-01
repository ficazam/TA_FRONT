import { Item } from "../types/item.type";

export const newItemValidations = (
  newItem: Item,
  setItemError: (error: string) => void
) => {
  if (
    !newItem.name ||
    !newItem.type ||
    newItem.type === "Choose an item type..." ||
    !newItem.inStock
  ) {
    setItemError("Please complete all fields!");
    return false;
  }
  return true;
};
