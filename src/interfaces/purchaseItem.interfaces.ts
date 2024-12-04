import { PurchaseItem } from "@prisma/client";

export type PurchaseItems = Omit<
  PurchaseItem,
  "Item_unitCost" | "Item_totalAmount"
> & {
  Item_unitCost: string;
  Item_totalAmount: string;
  Category: {
    Category_name: string;
  };
};
