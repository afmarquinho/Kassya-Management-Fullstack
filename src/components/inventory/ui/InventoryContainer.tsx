"use client";

import { useInventoryStore } from "@/store";
import { PurchaseContent } from "../purchase-orders.tsx/PurchaseContent";
import { CategoryContent } from "../category/CategoryContent";
import { InventoryContent } from "../inventory/InventoryContent";

export const InventoryContainer = () => {
  const { categoryModalOpen, purchaseModalOpen, inventoryModalOpen } =
    useInventoryStore();

  return (
    <>
      {categoryModalOpen && <CategoryContent />}
      {purchaseModalOpen && <PurchaseContent />}
      {inventoryModalOpen && <InventoryContent />}
    </>
  );
};
