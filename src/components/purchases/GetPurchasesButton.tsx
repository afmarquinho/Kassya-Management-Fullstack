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
        className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-colors ${
          loading
            ? "bg-gray-400"
            : "bg-indigo-600 hover:bg-blue-500 dark:bg-indigo-700 dark:hover:bg-blue-500"
        }`}
        onClick={handlePurchases}
        disabled={loading}
      >
        {loading ? (
          <LoadingSpinner h={20} b={4} color="green" />
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
