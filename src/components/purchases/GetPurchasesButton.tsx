"use client";

import { RefreshCcw, ShoppingCart } from "lucide-react";
import { useState } from "react";

import { usePurchaseStore } from "@/store";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { getPurchases } from "@/server-actions";
import { toast } from "react-toastify";

export const GetPurchasesButton = () => {
  const { setPurchases, purchases } = usePurchaseStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handlePurchases = async () => {
    setLoading(true);
    try {
        const { ok, data } = await getPurchases();
        if (ok && data) {
          setPurchases(data);
          toast.success("Compras cargadas exitosamente");
        } else {
          toast.error("No hay compras para mostrar");
        }
      } catch (error) {
        toast.error("Hubo un problema al procesar la solicitud");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <button
        className={`w-44 h-10 flex justify-center items-center gap-1 rounded-md text-white transition-colors bg-purple-600 hover:bg-purple-500 dark:bg-purple-800 dark:hover:bg-purple-500`}
        onClick={handlePurchases}
        disabled={loading}
      >
        {loading ? (
        <LoadingSpinner/>
        ) : (
          <>
            {purchases ? (
              <RefreshCcw className={`w-5`} />
            ) : (
              <ShoppingCart className={`w-5`} />
            )}
            {purchases ? "Refrescar" : "Mostrar Compras"}
          </>
        )}
      </button>
    </>
  );
};
