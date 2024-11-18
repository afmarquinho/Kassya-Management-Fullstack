"use client";

import { useState } from "react";

import { TriangleAlert, X } from "lucide-react";
import { usePurchaseItemStore, usePurchaseStore } from "@/store";
import { deleteItem, getPurchases } from "@/server-actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../UI/LoadingSpinner";

export const DeleteItemModal = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { toggleDeleteItemModal, item } = usePurchaseItemStore();
  const { purchaseId, setPurchases } = usePurchaseStore();

  const handleCancel = () => {
    toggleDeleteItemModal();
  };

  const handleDelete = async () => {
    setLoading(true);
    if (!item || !purchaseId) return;
    try {
      const { ok } = await deleteItem(item?.Item_id, purchaseId);
      if (ok) {
        toggleDeleteItemModal();
        toast.success("Item eliminado correctamente");
        router.refresh();
        const {ok, data} = await getPurchases()
        if(ok && data) {
          setPurchases(data)
        }
      } else {
        toast.error("No se pudo eliminar el item de la orden");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-20 flex justify-center items-center`}
      >
        <div className={`w-full max-w-96 bg-white dark:bg-slate-700`}>
          <div className={`relative`}>
            <TriangleAlert
              className={`absolute top-2 left-2 text-yellow-400`}
              strokeWidth={3}
            />
            <button
              className={`absolute top-2 right-2 bg-red-800 hover:bg-red-950`}
              onClick={handleCancel}
            >
              <X
                className={`  text-yellow-400 cursor-pointer`}
                strokeWidth={3}
              />
            </button>
            <h2
              className={`bg-gradient-to-b  text-center text-white uppercase font-bold py-3 from-red-500 to-red-600`}
            >
              Alerta
            </h2>
          </div>

          <div className={`p-4`}>
            <p className={`text-center`}>
              ¿Realmente deseas eliminar este producto:{" "}
              <span className={`font-medium`}>
                {/* {productEdit?.Product_name} */}
              </span>
              ?
            </p>

            <button
              className={`flex gap-1 justify-center items-center  rounded-md px-4 py-2 text-white transition-all mx-auto mt-5 uppercase font-semibold shadow-md bg-gradient-to-b from-red-600 to-red-700 hover:from-red-700 hover:to-red-800`}
              onClick={handleDelete}
            >
              {loading ? <LoadingSpinner /> : "Eliminar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
