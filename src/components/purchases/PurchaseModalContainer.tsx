"use client";

import { usePurchaseItemStore, usePurchaseStore } from "@/store";
import { DeleteItemModal } from "../purchaseItem/DeleteItemModal";
import { ProcessPurchaseModal } from "./ProcessPurchaseModal";
import DeletePurchaseModal from "./DeletePurchaseModal";

export const PurchaseModalContainer = () => {
  const { deleteItemModalOpen } = usePurchaseItemStore();
  const { processPurchaseModalOpen, deletePurchaseModalOpen } =
    usePurchaseStore();

  return (
    <>
      {deleteItemModalOpen && <DeleteItemModal />}
      {processPurchaseModalOpen && <ProcessPurchaseModal />}
      {deletePurchaseModalOpen && <DeletePurchaseModal />}
      {/* {isProductModalOpen && <AddProductModal />}
      {isClosePurchaseModalOpen && <ClosePurchaseModal total={total} />}
      {isDeleteProductModalOpen && <DeleteProductModal />} */}
    </>
  );
};
