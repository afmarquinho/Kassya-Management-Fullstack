import { usePurchaseStore, useSupplierStore } from "@/store";
import { Ban } from "lucide-react";
// import { PurchaseForm } from "./PurchaseForm";

export const NewPurchaseModal = () => {
  const { cleanPurchase, togglePurchaseModal } = usePurchaseStore();
  const { cleanSupplierList } = useSupplierStore();

  const handleCancel = () => {
    togglePurchaseModal();
    cleanPurchase();
    cleanSupplierList();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-20 flex justify-center items-center">
      <div className="bg-white dark:bg-slate-800 p-10 w-11/12 max-w-[800px] rounded-lg shadow-lg">
        {/* <PurchaseForm /> */}
        <button
          aria-label="Cancelar edición de compra"
          className="flex justify-center items-center p-2 text-white gap-1 my-2 bg-gradient-to-b from-red-600 to-red-700 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={handleCancel}
        >
          <Ban className="w-5" />
          Cancelar
        </button>
      </div>
    </div>
  );
};
