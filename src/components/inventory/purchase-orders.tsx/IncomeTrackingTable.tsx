"use client";

import { ProductData, StockEntry } from "@/interfaces";
import { useInventoryStore } from "@/store";
import { LogIn } from "lucide-react";
import AddProductModal from "../inventory/AddProductModal";
import { useState } from "react";

type Props = {
  data: StockEntry;
};

export const IncomeTrackingTable = ({ data }: Props) => {
  const { productModalOpen, toggleProductModal } = useInventoryStore();
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [itemQtyRemaining, setItemQtyRemaining] = useState<number>(0);

  const handleStock = (
    productData: ProductData,
    Item_qtyOrdered: number,
    Item_qtyReceived: number
  ) => {
    setProductData(productData);
    setItemQtyRemaining(Item_qtyOrdered - Item_qtyReceived);
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
              className={` dark:border-slate-600 hover:bg-gray-300 dark:hover:bg-yellow-900 py-5 ${
                i % 2 === 0 && "bg-slate-300 dark:bg-slate-800"
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
                    className={`bg-gradient-to-b from-rose-600 to-rose-700 w-8 h-full flex justify-center items-center shadow-md rounded-sm`}
                    onClick={() =>
                      handleStock(
                        {
                          Product_name: item.Item_name,
                          Product_ref: item.Item_ref,
                          Product_location: "Bodega", //*En este momento los productos están ingresando a la bodega.
                          Product_categoryId: item.Category.Category_id,
                          Item_id: item.Item_id,
                        },
                        item.Item_qtyOrdered,
                        item.Item_qtyReceived
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
      {productModalOpen && (
        <AddProductModal
          productData={productData}
          itemQtyRemaining={itemQtyRemaining}
          setProductData={setProductData}
          setItemQtyRemaining={setItemQtyRemaining}
        />
      )}
    </>
  );
};
