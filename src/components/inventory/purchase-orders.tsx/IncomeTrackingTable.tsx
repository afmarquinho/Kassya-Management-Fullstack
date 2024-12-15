"use client";

import { ProductData, StockEntry } from "@/interfaces";
import { registerProductWithMovement } from "@/server-actions";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  data: StockEntry;
};

export const IncomeTrackingTable = ({ data }: Props) => {
  const router = useRouter();
  const [qtyReceive, setQtyReceive] = useState<number>(0);
  const [lotNumber, setLotNumber] = useState<string>("");

  const handleStock = async (
    itemQtyRemaining: number,
    productData: ProductData
  ) => {
    // Recibimos la cantidad faltante como parámetro
    // Verificar si el valor es negativo
    if (qtyReceive < 0) {
      toast.error("La cantidad no puede ser negativa.");
      return;
    }
    // Verificar si el valor no es un número entero
    else if (!Number.isInteger(qtyReceive)) {
      toast.error("La cantidad debe ser un número entero.");
      return;
    }
    // Verificar si el valor es mayor que los faltantes
    else if (qtyReceive > itemQtyRemaining) {
      toast.error("La cantidad no puede ser mayor que los faltantes.");
      return;
    } else {
      //* Actualizamos o creamos la bbdd del inventario con la cantidad recibida.

      const { ok, data, message } = await registerProductWithMovement(
        productData,
        4,
        "nota"
      ); //TODO: ACTUALIZAR EL USERID
      if (ok && data) {
        toast.success(message);
        router.refresh();
        
      } else {
        toast.error(message);
      }
    }
  };

  return (
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
          <th className={`py-3 px-1`}>Faltantes</th>
          <th className={`py-3 px-1`}>Recibido</th>
          <th className={`py-3 px-1`}>Lote</th>
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
            <td className={`py-2 px-1`}>
              {item.Item_qtyOrdered - item.Item_qtyReceived}
            </td>
            <td className={`py-2 px-1`}>
              {item.Item_qtyOrdered > item.Item_qtyReceived && (
                <input
                  type="number"
                  className={`w-10 text-center outline-none`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQtyReceive(parseFloat(e.target.value))
                  }
                  placeholder="0"
                />
              )}
            </td>
            <td className={`py-2 px-1`}>
              <input
                className={`w-20 text-center outline-none`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLotNumber(e.target.value)
                }
                placeholder="0"
              />
            </td>
            <td className={`py-2 px-1`}>
              {item.Item_qtyOrdered > item.Item_qtyReceived && (
                <button
                  className={`bg-gradient-to-b from-rose-600 to-rose-700 w-8 h-full flex justify-center items-center shadow-md rounded-sm`}
                  onClick={() =>
                    handleStock(item.Item_qtyOrdered - item.Item_qtyReceived, {
                      Product_ref: item.Item_ref,
                      Product_name: item.Item_name,
                      Product_lotNumber: lotNumber,
                      Product_qtyReceive: qtyReceive,
                      Product_categoryId: item.Category.Category_id,
                    })
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
  );
};
