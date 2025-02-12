"use client";

import { useInventoryStore } from "@/store";
import { PurchaseContent } from "../purchase-orders.tsx/PurchaseContent";
import { CategoryContent } from "../category/CategoryContent";
import { InventoryContent } from "../inventory/InventoryContent";
import { DispatchRequests } from "../inventory/DispatchRequests";

export const InventoryContainer = () => {
  const {
    categoryModalOpen,
    purchaseModalOpen,
    inventoryModalOpen,
    requestsModalOpen,
  } = useInventoryStore();

  return (
    <>
      {purchaseModalOpen && <PurchaseContent />}
      {inventoryModalOpen && <InventoryContent />}
      {requestsModalOpen && <DispatchRequests />}
      {categoryModalOpen && <CategoryContent />}
    </>
  );
};
