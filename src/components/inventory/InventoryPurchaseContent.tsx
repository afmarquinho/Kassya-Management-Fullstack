"use client";

import { useInventoryStore } from "@/store";
import { CategoryContent } from "./CategoryContent";
import { PurchaseContent } from "./PurchaseContent";

export const InventoryContainer = () => {
  const { categoryModalOpen } = useInventoryStore();

  return <>{categoryModalOpen ? <CategoryContent /> : <PurchaseContent />}</>;
};
