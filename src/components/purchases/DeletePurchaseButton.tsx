"use client";

import { PurchaseDetails } from "@/interfaces";
import { usePurchaseStore } from "@/store";

type Props = {
  purchaseDetails: PurchaseDetails | null; //*Viene del componente padre PurchaseView y su valor puede ser nulo tambiem, si es nulo, el componente no retorn nada
};

export const DeletePurchaseButton = ({ purchaseDetails }: Props) => {
  const { toggleDeletePurchaseModal } = usePurchaseStore();

  if (!purchaseDetails) {
    return <></>;
  }
  return (
    <button
      className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-colors ${
        purchaseDetails.PurchaseItem.length > 0 ? "bg-gray-500" : "bg-black"
      }
              `}
      disabled={purchaseDetails.PurchaseItem.length > 0}
      onClick={toggleDeletePurchaseModal}
    >
      {/* <Lock className={`w-5`} /> */}
      Eliminar Compra
    </button>
  );
};

