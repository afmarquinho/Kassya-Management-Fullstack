"use client";

import { getSuppliers } from "@/server-actions";
import { useSupplierStore } from "@/store/supplierStore";
import { RefreshCcw, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../UI/LoadingSpinner";

export const GetSuppliersButton = () => {
  const { setSuppliers, suppliers } = useSupplierStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetSuppliers = async () => {
    setLoading(true);
    try {
      const { ok, data } = await getSuppliers();
      if (ok && data) {
        setSuppliers(data);
        toast.success("Proveedores Cargados exitosamente");
      } else {
        toast.error("Error al obtener los Proveedores");
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
      className={`w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-white transition-colors text-xs bg-gradient-to-b from-fuchsia-500 to-fuchsia-700 hover:from-fuchsia-700 hover:to-fuchsia-700 dark:from-fuchsia-700 dark:to-fuchsia-800 dark:hover:from-fuchsia-600 dark:hover:to-fuchsia-600`}
      onClick={handleGetSuppliers}
      disabled={loading}
      >
      {loading ? (
        <LoadingSpinner/>
      ) : (
        <>
          {suppliers ? (
        <RefreshCcw className={`w-5`} />
      ) : (
        <Truck className={`w-5`} />
      )}
         
          {suppliers ? "Refrescar" : "Mostrar Proveedores"}
        </>
      )}
    </button>
      </>
  );
};
