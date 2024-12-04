"use client";

import { getCustomers } from "@/server-actions";
import { useCustomerStore } from "@/store";
import { RefreshCcw, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../UI/LoadingSpinner";

export const GetCustomersButton = () => {
  const { setCustomers, customers } = useCustomerStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchSuppliers = async () => {
    setLoading(true);
    try {
      const { ok, data } = await getCustomers();
      if (ok && data) {
        setCustomers(data);
        toast.success("Clientes Cargados exitosamente");
      } else {
        toast.error("Error al obtener los Clientes");
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
        className={`w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-white transition-colors text-xs bg-gradient-to-b from-teal-500 to-teal-700 hover:from-teal-700 hover:to-teal-700 dark:from-teal-700 dark:to-teal-800 dark:hover:from-teal-600 dark:hover:to-teal-600`}
        onClick={handleFetchSuppliers}
        disabled={loading}
      >
        {loading ? (
          <LoadingSpinner/>
        ) : (
          <>
            {customers ? (
              <RefreshCcw className={`w-5`} />
            ) : (
              <ShoppingCart className={`w-5`} />
            )}
            {customers ? "Refrescar" : "Mostrar Clientes"}
          </>
        )}
      </button>
    </>
  );
};
