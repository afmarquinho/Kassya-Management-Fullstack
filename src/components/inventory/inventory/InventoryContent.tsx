"use client";

import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { getProducts } from "@/server-actions";
import { stockMovementsStore, useInventoryStore } from "@/store";
import { desformatearFecha } from "@/utils";
import {
  ArrowDown10,
  ArrowDownAz,
  FilePenLine,
  RefreshCw,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export const InventoryContent = () => {
  const router = useRouter();
  const { setProducts, products } = useInventoryStore();
  const { setmovements } = stockMovementsStore();

  const [loading, setLoading] = useState<boolean>(false);

  const getProductsApi = async () => {
    setLoading(true);
    const { ok, data, message } = await getProducts();
    if (ok && data) {
      setProducts(data);

      toast.success(message);
    } else {
      toast.error(message);
    }
    setLoading(false);
  };

  const onRedirect = (id: number) => {
    setmovements([]);
    router.push(`/inventory/inventory-management/product/${id}`);
  };

  return (
    <>
      <button
        onClick={getProductsApi}
        className={`w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-white transition-colors shadow-md text-xs bg-gradient-to-b from-rose-500 to-rose-700 hover:from-rose-700 hover:to-rose-700 dark:from-rose-700 dark:to-rose-900 dark:hover:from-rose-700 dark:hover:to-rose-700`}
        disabled={loading}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {products ? (
              <RefreshCw className={`w-5`} size={20} strokeWidth={1.25} />
            ) : (
              <FilePenLine className={`w-5`} size={20} strokeWidth={1.25} />
            )}

            {products ? "Refrescar" : "Ver Inventario"}
          </>
        )}
      </button>
      {products ? (
        <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900">
          <table className="w-full rounded-lg text-left shadow-md border-collapse">
            <thead className="bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600">
              <tr>
                <th className="py-3 px-1">
                  <span className={`flex items-center`}>Item</span>
                </th>
                <th className="py-3 px-1">
                  <button className={`flex items-center gap-1`}>
                    Ref
                    <ArrowDownAz className={`w-4`} />
                  </button>
                </th>
                <th className="py-3 px-1 flex">
                  <button className={`flex items-center gap-1`}>
                    Nombre <ArrowDownAz className={`w-4`} />
                  </button>
                </th>
                <th className="py-3 px-1">
                  <button className={`flex items-center gap-1`}>
                    Categoría <ArrowDownAz className={`w-4`} />
                  </button>
                </th>
                <th className="py-3 px-1">
                  <button className={`flex items-center gap-1`}>
                    Estado <ArrowDownAz className={`w-4`} />
                  </button>
                </th>
                <th className="py-3 px-1">
                  <button className={`flex items-center gap-1`}>
                    Fecha <ArrowDown10 className={`w-4`} />
                  </button>
                </th>
                <th className="py-3 px-1">
                  <button className={`flex items-center gap-1`}>
                    Edad
                    <ArrowDown10 className={`w-4`} />
                  </button>
                </th>
                <th className="py-3 px-1">
                  <button className={`flex items-center gap-1`}>
                    Localización
                    <ArrowDownAz className={`w-4`} />
                  </button>
                </th>
                <th className="py-3 px-1">
                  <button className={`flex items-center gap-1`}>
                    Reorden
                    <ArrowDown10 className={`w-4`} />
                  </button>
                </th>
                <th className="py-3 px-1">
                  <button className={`flex items-center gap-1`}>
                    Stock
                    <ArrowDown10 className={`w-4`} />
                  </button>
                </th>
                <th className="py-3 px-1"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i: number) => (
                <tr
                  key={product.Product_id}
                  className={`hover:bg-gray-300 dark:hover:bg-yellow-900 py-5 ${
                    i % 2 === 0 ? "bg-slate-100 dark:bg-slate-800" : ""
                  }`}
                >
                  <td className="py-2 px-1">{i + 1}</td>
                  <td className="py-2 px-1">{product.Product_ref}</td>
                  <td className="py-2 px-1">{product.Product_name}</td>
                  <td className="py-2 px-1">
                    {product.Category.Category_name}
                  </td>
                  <td className="py-2 px-1">
                    {product.Product_active ? (
                      <div className={`flex gap-1 items-center justify-center`}>
                        <div
                          className={`w-2 h-2 bg-green-400 rounded-full`}
                        ></div>{" "}
                      </div>
                    ) : (
                      <div className={`flex gap-1 items-center justify-center`}>
                        <div
                          className={`w-2 h-2 bg-red-500 rounded-full`}
                        ></div>{" "}
                      </div>
                    )}{" "}
                  </td>
                  <td className="py-2 px-1">
                    {desformatearFecha(product.Product_createdAt)}
                  </td>
                  <td className="py-2 px-1">{28}</td>
                  <td className="py-2 px-1">{product.Product_location}</td>
                  <td className="py-2 px-1">{product.Product_reorderPoint}</td>
                  <td className="py-2 px-1">{product.Product_stockQty}</td>
                  <td className="py-2 px-1">
                    <button
                      className={`flex items-center gap-1 font-semibold`}
                      onClick={() => onRedirect(product.Product_id)}
                    >
                      <Wrench size={16} strokeWidth={1} />
                      <span className={`text-blue-700`}>Gestiona</span>
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={`italic font-medium text-base`}>No hay inventarios</div>
      )}
    </>
  );
};
