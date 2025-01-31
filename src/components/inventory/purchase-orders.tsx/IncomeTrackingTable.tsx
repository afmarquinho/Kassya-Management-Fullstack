"use client";

import { ProductData, StockEntry } from "@/interfaces";
import { useInventoryStore } from "@/store";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AddProductModal } from "../inventory/AddProductModal";

type Props = {
  data: StockEntry;
};

export const IncomeTrackingTable = ({ data }: Props) => {
  const { productModalOpen, toggleProductModal } = useInventoryStore();

  const [productData, setProductData] = useState<ProductData | null>(null);
  const [itemQtyRemaining, setItemQtyRemaining] = useState<number>(0);

  const handleStock = (productData: ProductData, item_qtyOrdered: number) => {
    setProductData(productData);
    setItemQtyRemaining(item_qtyOrdered - productData.Product_qtyReceive);
    toggleProductModal();
  };

  return (
    <>
      <table
        className={`w-full rounded-lg border-collapse text-left overflow-hidden shadow-md text-sm mb-5`}
      >
        <thead
          className={`bg-indigo-900 dark:bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800`}
        >
          <tr>
            <th className={`py-3 px-2`}>Item</th>
            <th className={`py-3 px-2`}>Ref</th>
            <th className={`py-3 px-2`}>Nombre</th>
            <th className={`py-3 px-2`}>Categoría</th>
            <th className={`py-3 px-1`}>Descripción</th>
            <th className={`py-3 px-1`}>Cant.</th>
            <th className={`py-3 px-1`}>Recibido</th>
            <th className={`py-3 px-1`}>Faltantes</th>
            <th className={`py-3 px-1`}>Ingresar</th>
          </tr>
        </thead>
        <tbody className={`px-10`}>
          {data?.PurchaseItem.map((item, i) => (
            <tr
              key={item.Item_id}
              className={`dark:border-slate-600 hover:bg-gray-300 dark:hover:bg-teal-900 py-5 ${
                i % 2 === 0 && "bg-slate-100 dark:bg-slate-800"
              }`}
            >
              <td className={`py-2 px-2`}>{i + 1}</td>
              <td className={`py-2 px-1`}>{item.Item_ref}</td>
              <td className={`py-2 px-1`}>{item.Item_name}</td>
              <td className={`py-2 px-1`}>{item.Category.Category_name}</td>
              <td className={`py-2 px-1`}>{item.Item_description}</td>
              <td className={`py-2 px-1`}>{item.Item_qtyOrdered}</td>
              <td className={`py-2 px-1`}>{item.Item_qtyReceived}</td>
              <td className={`py-2 px-1`}>
                {item.Item_qtyOrdered - item.Item_qtyReceived}
              </td>
              <td className={`py-2 px-1`}>
                {item.Item_qtyOrdered > item.Item_qtyReceived && (
                  <button
                    className={`w-8 h-full flex justify-center items-center shadow-md rounded bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600 transition-colors duration-300`}
                    onClick={() =>
                      handleStock(
                        {
                          Product_purchaseId: data.Purchase_id,
                          Product_name: item.Item_name,
                          Product_ref: item.Item_ref,
                          Product_qtyReceive: item.Item_qtyReceived,
                          Product_location: "Bodega",
                          Product_batchCode: "1",
                          Product_batchDate: "01/01/1990",
                          Product_categoryId: item.Category.Category_id,
                          Item_id: item.Item_id,
                          reason: "",
                        },
                        item.Item_qtyOrdered
                      )
                    }
                  >
                    <LogIn className={`text-white w-5`} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AnimatePresence>
        {productModalOpen && (
          <AddProductModal
          setProductData={setProductData} // Se pasa la acción para limpiar el estado al terminar o cancelar
            productData={productData}
            setItemQtyRemaining={setItemQtyRemaining} // Se pasa la acción para limpiar el estado al terminar o cancelar
            itemQtyRemaining={itemQtyRemaining}
            />
        )}
      </AnimatePresence>
    </>
  );
};
