"use client";

import { closePurchase } from "@/server-actions";
import { TriangleAlert, X } from "lucide-react";

import { useState } from "react";

import { usePurchaseStore } from "@/store";
import { LoadingSpinner } from "../UI/LoadingSpinner";

export const ClosePurchaseModal = () => {
  const { toggleClosePurchaseModal, purchaseId } = usePurchaseStore();

  const [loading, setLoading] = useState<boolean>(false);

  const handleClosePurchase = async () => {
    setLoading(true);

    if (!purchaseId) return;
    try {
      await closePurchase(purchaseId);
    } catch (error) {
      console.error("Error al cerrar la compra:", error);
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
              className={`absolute top-2 right-2 "bg-red-800 hover:bg-teal-800`}
              onClick={toggleClosePurchaseModal}
            >
              <X
                className={`  text-yellow-400 cursor-pointer`}
                strokeWidth={3}
              />
            </button>
            <h2
              className={`bg-gradient-to-b  text-center text-white uppercase font-bold py-3 from-teal-600 to-teal-700 dark:from-teal-700 dark:to-teal-800`}
            >
              Alerta
            </h2>
          </div>
          <div className={`p-4`}>
            <p>
              ¿Realmente deseas cerrar la compra? <br /> Recuerda que una vez
              cerrada ya no la podrás editar o actualizar{" "}
            </p>

            <button
              className={`flex gap-1 justify-center items-center  rounded-md px-4 py-2 text-white mx-auto mt-5 uppercase font-semibold shadow-md bg-gradient-to-b from-teal-600 to-teal-800 hover:from-teal-700 hover:to-teal-700 dark:from-teal-700 dark:to-teal-700 dark:hover:from-teal-600 dark:hover:to-teal-700 transition-all duration-700`}
              onClick={handleClosePurchase}
            >
              {loading ? <LoadingSpinner /> : "Cerrar Compra"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
