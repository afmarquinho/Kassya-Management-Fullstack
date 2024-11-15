"use client";
import { useState } from "react";
import { Supplier } from "@prisma/client";
import { updateSupplier } from "@/server-actions";
import { useSupplierStore } from "@/store";
import { TriangleAlert, X, CirclePower } from "lucide-react";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../UI/LoadingSpinner";

export const ActiveSupplierModal = () => {
  const { supplier, setSupplier, updateSuppliers, toggleActiveSupplierModal } =
    useSupplierStore();

  const [loading, setLoading] = useState<boolean>(false);

  const handleActiveSupplier = async () => {
    setLoading(true);

    const supp: Supplier | null = supplier
      ? {
          ...supplier,
          Supplier_active: !supplier?.Supplier_active,
        }
      : null;
    try {
      if (!supp) return;
      const { ok, data } = await updateSupplier(supp);
      if (ok && data) {
        setSupplier(supp);
        updateSuppliers("update", supp);
        toast.success("Estado actualizado correctamente");
        toggleActiveSupplierModal();
      } else {
        toast.error("Error al actualizar el proveedor");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
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
            className={`absolute top-2 right-2 ${
              supplier?.Supplier_active
                ? "bg-red-800 hover:bg-red-950"
                : "bg-green-800 hover:bg-green-950"
            }`}
            onClick={toggleActiveSupplierModal}
          >
            <X className={`  text-yellow-400 cursor-pointer`} strokeWidth={3} />
          </button>
          <h2
            className={`bg-gradient-to-b  text-center text-white uppercase font-bold py-3 ${
              supplier?.Supplier_active
                ? "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                : "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            }`}
          >
            Alerta
          </h2>
        </div>
        <div className={`p-4`}>
          <p>
            ¿Realmente deseas{" "}
            {supplier?.Supplier_active ? "Desactivar" : "Activar"} al proveedor{" "}
            <span className={`font-bold`}>{supplier?.Supplier_name}</span>
          </p>

          <button
            className={`w-32 h-8 flex gap-1 justify-center items-center  rounded-md text-white transition-all mx-auto mt-5 uppercase font-semibold shadow-md bg-gradient-to-b ${
              supplier?.Supplier_active
                ? "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                : "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            }`}
            onClick={handleActiveSupplier}
            disabled={loading}
          >
            {loading ? (
              <LoadingSpinner h={20} b={4} color="blue" />
            ) : (
              <>
                <CirclePower className={`w-5`} />

                {supplier?.Supplier_active ? "Desactivar" : "Activar"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
