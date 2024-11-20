"use client";
import { usePurchaseStore } from "@/store";
import { NewPurchaseModal } from "./NewPurchaseModal";

export const FormContainer = () => {
  const { purchaseModalOpen } = usePurchaseStore();
  if (!purchaseModalOpen) {
    return <></>;
  }

  return <NewPurchaseModal />;
};
