"use client";

import { PurchaseDetails } from "@/interfaces";
import { usePurchaseStore } from "@/store";

type Props = {
  purchaseDetails: PurchaseDetails;
};
export const ClosePurchaseButton = ({ purchaseDetails }: Props) => {
  const { toggleClosePurchaseModal } = usePurchaseStore();

  const handleClosePurchase = () => {
    toggleClosePurchaseModal();
  };
  
  return (
    <button
      className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-colors  ${
        purchaseDetails.PurchaseItem.length < 1
          ? "bg-gray-500"
          : "bg-red-600 hover:bg-red-800"
      }
                `}
      disabled={purchaseDetails.PurchaseItem.length < 1}
      onClick={handleClosePurchase}
    >
      {/* <Lock className={`w-5`} /> */}
      Cerrar Compra
    </button>
  );
};
