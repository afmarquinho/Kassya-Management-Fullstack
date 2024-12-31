"use client";

import { useInventoryStore } from "@/store";
import { PurchaseContent } from "../purchase-orders.tsx/PurchaseContent";
import { CategoryContent } from "../category/CategoryContent";
import { InventoryContent } from "../inventory/InventoryContent";
import { DispatchRequirement } from "../inventory/DispatchRequirement";

export const InventoryContainer = () => {
  const { categoryModalOpen, purchaseModalOpen, inventoryModalOpen, requirementModalOpen} =
    useInventoryStore();

  return (
    <>
      {purchaseModalOpen && <PurchaseContent />}
      {inventoryModalOpen && <InventoryContent />}
      {requirementModalOpen && <DispatchRequirement />}
      {categoryModalOpen && <CategoryContent />}
    </>
  );
};
