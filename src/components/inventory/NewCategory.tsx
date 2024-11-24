"use client";

import { useInventoryStore } from "@/store";
import { Ban } from "lucide-react";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { Category } from "@prisma/client";
import { useState } from "react";
import { createCategory } from "@/server-actions";
import { toast } from "react-toastify";

type Props = {
  category: Category | null;
  setCategory: React.Dispatch<React.SetStateAction<Category | null>>;
};

export const NewCategory = ({ category, setCategory }: Props) => {
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
    setLoading(true);
    try {
      
      const { ok, data, message } = await createCategory({ name });
      if (ok && data) {
        return;
      } else {
        toast.error(message);
        toggleNewCategoryModal();
        setCategory(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-20 flex justify-center items-center`}
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
            {/* {errors.Purchase_description && (
            <div className="text-xs text-red-600 my-0 font-medium">
              {errors.Purchase_description.message}
            </div>
          )} */}
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
