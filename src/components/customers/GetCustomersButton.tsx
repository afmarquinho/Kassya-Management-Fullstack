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
        className={`w-44 h-10 flex justify-center items-center gap-1 rounded-md text-white transition-colors bg-teal-600 hover:bg-teal-500 dark:bg-teal-700 dark:hover:bg-teal-500 text-xs`}
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
            {customers ? "Refrescar" : "Mostrar Proveedores"}
          </>
        )}
      </button>
    </>
  );
};
