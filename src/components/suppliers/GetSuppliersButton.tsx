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
      className={`w-44 h-10 flex justify-center items-center gap-1 rounded-md text-white transition-colors bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-700 dark:hover:bg-blue-500`}
      onClick={handleGetSuppliers}
      disabled={loading}
      >
      {loading ? (
        <LoadingSpinner h={20} b={4} color="green"/>
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
