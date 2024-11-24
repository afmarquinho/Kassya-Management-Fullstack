"use client";

import { TriangleAlert, X } from "lucide-react";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { useState } from "react";
import { useInventoryStore } from "@/store";
import { toast } from "react-toastify";
import { Category } from "@prisma/client";
import { delteCategory } from "@/server-actions";

type DeleteCategoryModalProps = {
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

export const DeleteCategoryModal = ({
  setCategories,
}: DeleteCategoryModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setDeleteCategoryModal, deleteCategoryModal } = useInventoryStore();

  const handleDelete = async () => {
    setLoading(true);
    if (!deleteCategoryModal.categoryId) return;

    const { ok } = await delteCategory(deleteCategoryModal.categoryId);

    if (ok) {
      //* Filtrar categorías eliminando la seleccionada
      setCategories((prevCategories) =>
        prevCategories.filter(
          (category) => category.Category_id !== deleteCategoryModal.categoryId
        )
      );

      //* Cerrar el modal
      setDeleteCategoryModal({
        isOpen: false,
        categoryId: null,
      });

      toast.success("Categoría eliminada con éxito.");
    } else {
      toast.error("Error desconocido");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-20 flex justify-center items-center">
      <div className="w-full max-w-96 bg-white dark:bg-slate-700">
        <div className="relative">
          <TriangleAlert
            className="absolute top-2 left-2 text-yellow-400"
            strokeWidth={3}
          />
          <button
            className="absolute top-2 right-2 bg-red-800 hover:bg-red-950"
            onClick={() =>
              setDeleteCategoryModal({
                isOpen: false,
                categoryId: null,
              })
            }
          >
            <X className="text-yellow-400 cursor-pointer" strokeWidth={3} />
          </button>
          <h2 className="bg-gradient-to-b text-center text-white uppercase font-bold py-3 from-red-600 to-red-700 dark:from-red-800 dark:to-red-900">
            Alerta
          </h2>
        </div>
        <div className="p-4">
          <p className="text-center">
            ¿Realmente deseas eliminar esta categoría?
          </p>

          <button
            className="flex gap-1 justify-center items-center rounded-md px-4 py-2 text-white mx-auto mt-5 uppercase font-semibold shadow-md bg-gradient-to-b from-gray-800 to-gray-950 hover:from-black hover:to-black dark:from-red-700 dark:to-red-800 dark:hover:from-red-800 dark:hover:to-red-900 transition-all duration-700"
            onClick={handleDelete}
          >
            {loading ? <LoadingSpinner /> : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
};
