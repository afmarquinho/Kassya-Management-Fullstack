"use client";

import { usePurchaseStore } from "@/store";
import { TriangleAlert, X } from "lucide-react";
import { useState } from "react";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { toast } from "react-toastify";
import { deletePurchase, getPurchases } from "@/server-actions";
import { useRouter } from "next/navigation";

const DeletePurchaseModal = () => {
  const router = useRouter();
  const {
    toggleDeletePurchaseModal,
    purchaseId,
    cleanPurchaseId,
    setPurchases,
  } = usePurchaseStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    if (!purchaseId) return;
    try {
      const { ok, data } = await deletePurchase(purchaseId);
      toggleDeletePurchaseModal()
      router.back();
      cleanPurchaseId();

      const { ok: success, data: purchases } = await getPurchases();
      if (success && purchases) {
        setPurchases(purchases);
      }

      if (ok && data) {
        toast.success(data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error desconocido");
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
              className={`absolute top-2 right-2 "bg-red-800 hover:bg-red-950`}
              onClick={toggleDeletePurchaseModal}
            >
              <X className={`text-yellow-400 cursor-pointer`} strokeWidth={3} />
            </button>
            <h2
              className={`bg-gradient-to-b  text-center text-white uppercase font-bold py-3 from-red-600 to-red-700 dark:from-red-800 dark:to-red-900`}
            >
              Alerta
            </h2>
          </div>
          <div className={`p-4`}>
            <p className={`text-center`}>
              <span className={`font-bold text-base`}>
                ¿Realmente deseas eliminar esta compra?
              </span>
              <br /> Recuerda que una vez eliminada todos los datos se borrarán
              y no podrás recuperarlos.
            </p>

            <button
              className={`flex gap-1 justify-center items-center  rounded-md px-4 py-2 text-white mx-auto mt-5 uppercase font-semibold shadow-md bg-gradient-to-b from-gray-800 to-gray-950 hover:from-black hover:to-black dark:from-red-700 dark:to-red-800 dark:hover:from-red-800 dark:hover:to-red-900 transition-all duration-700`}
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
export default DeletePurchaseModal;
