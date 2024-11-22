"use client";

import { getCategories } from "@/server-actions/inventory/inventory-actions";
import { useInventoryStore } from "@/store";
import { Category } from "@prisma/client";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DeleteCategoryModal } from "./DeleteCategoryModal";

export const CategoryContent = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { setDeleteCategoryModal, deleteCategoryModal } = useInventoryStore();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      const { ok, data, message } = await getCategories();

      if (ok && data) {
        setCategories(data);
      } else {
        toast.error(message);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return loading ? (
    <div>Cargando...</div>
  ) : (
    <>
      {categories.length < 1 ? (
        <div className={`italic font-medium text-base`}>
          No hay categprías para mostrar
        </div>
      ) : (
        <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 shadow-lg">
          <table className="w-full rounded-lg text-left shadow-md border-collapse">
            <thead className="bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600">
              <tr>
                <th className="py-3 px-1">Item</th>
                <th className="py-3 px-1 w-96">Categoría</th>
                <th className="py-3 px-1">Editar</th>
                <th className="py-3 px-1">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, i) => (
                <tr
                  key={category.Category_id}
                  className="hover:bg-blue-100 dark:hover:bg-slate-800"
                >
                  <td className="py-2 px-1">{i + 1}</td>
                  <td className="py-2 px-1">{category.Category_name}</td>
                  <td className="py-2 px-1">
                    <button className="text-white rounded-full bg-blue-800 dark:bg-blue-900 w-8 h-8 p-1 flex items-center justify-center">
                      <Pencil className={`w-5`} />
                    </button>
                  </td>
                  <td className="py-2 px-1">
                    <button
                      className="text-white rounded-full bg-rose-600 dark:bg-rose-900 w-8 h-8 p-1 flex items-center justify-center"
                      onClick={() =>
                        setDeleteCategoryModal({
                          isOpen: true,
                          categoryId: category.Category_id,
                        })
                      }
                    >
                      <Trash className={`w-5`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteCategoryModal.isOpen && (
        <DeleteCategoryModal setCategories={setCategories} />
      )}
    </>
  );
};
