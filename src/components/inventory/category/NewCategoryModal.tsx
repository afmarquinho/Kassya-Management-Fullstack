"use client";

import { useInventoryStore } from "@/store";
import { Ban } from "lucide-react";

import { Category } from "@prisma/client";
import { useState } from "react";
import { createCategory, updateCategory } from "@/server-actions";
import { toast } from "react-toastify";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";

type Props = {
  category: Category | null;
  setCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

export const NewCategoryModal = ({
  category,
  setCategory,
  setCategories,
}: Props) => {
  const { toggleNewCategoryModal } = useInventoryStore();
  const [name, setName] = useState<string>(
    category ? category.Category_name : ""
  );
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga

  const handleCancel = () => {
    toggleNewCategoryModal();
    setCategory(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("El nombre de la categoría es obligatorio.");
      return;
    }
    setLoading(true);

    if (category) {
      const { ok, data, message } = await updateCategory({
        Category_id: category.Category_id,
        Category_name: name,
      });

      if (ok && data) {
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.Category_id === data.Category_id ? data : cat
          )
        );

        toggleNewCategoryModal();
        setCategory(null);
      } else {
        toast.error(message || "No se pudo actualizar la categoría.");
      }
    } else {
      const { ok, data, message } = await createCategory({ name });
      if (ok && data) {
        setCategories((prevCategories) =>
          prevCategories ? [...prevCategories, data] : [data]
        );
        toggleNewCategoryModal();
      } else {
        toast.error(message || "No se pudo crear la categoría.");
      }
    }
    setLoading(false);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-20 flex justify-center items-center backdrop-blur-[1px]`}
    >
      <div className={`bg-white dark:bg-slate-800 p-10 w-11/12 max-w-[800px]`}>
        <h2
          className={`text-base font-semibold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2`}
        >
          {false ? "Editar Usuario" : "Crear Nueva Categoría"}
        </h2>
        <form
          action=""
          className={`w-full max-w-[600px] mx-auto py-2 space-y-4`}
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col">
            Nombre
            <input
              type="text"
              className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md"
              defaultValue={category ? category.Category_name : ""}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <div className={`w-full flex justify-center`}>
            <button
              type="submit"
              className={`bg-indigo-700 hover:bg-indigo-600 text-slate-200 font-semibold text-base p-2 focus:outline-none rounded-md cursor-pointer w-full mt-4 max-w-96 transition-colors flex justify-center items-center`}
              disabled={false}
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>{false ? <LoadingSpinner /> : false ? "Editar" : "Crear"}</>
              )}
            </button>
          </div>
        </form>
        <button
          className={`flex justify-center items-center p-2 text-white gap-1 my-1 bg-gradient-to-b from-red-600 to-red-700 rounded-md`}
          onClick={handleCancel}
        >
          <Ban className={`w-5`} />
          Cancelar
        </button>
      </div>
    </div>
  );
};
