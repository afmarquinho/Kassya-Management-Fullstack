"use client";

import { useInventoryStore } from "@/store";
import { PurchaseContent } from "../purchase-orders.tsx/PurchaseContent";
import { CategoryContent } from "../category/CategoryContent";

export const InventoryContainer = () => {
  const { categoryModalOpen } = useInventoryStore();

  return <>{categoryModalOpen ? <CategoryContent /> : <PurchaseContent />}</>;
};
