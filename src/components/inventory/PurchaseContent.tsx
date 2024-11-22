"use client";

import { PencilLineIcon, RefreshCw, ShoppingCart } from "lucide-react";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { useInventoryStore } from "@/store";
import { useState } from "react";
import { getProcessedPurchases } from "@/server-actions";
import { toast } from "react-toastify";
import { desformatearFecha } from "@/utils";
import Link from "next/link";

export const PurchaseContent = () => {
  const { processedPurchases, setProcessedPurchases } = useInventoryStore();
  const [loading, setLoading] = useState<boolean>(false);

  const getProcessed = async () => {
    setLoading(true);
    const { ok, data } = await getProcessedPurchases();
    if (ok && data) {
      setProcessedPurchases(data);
    } else {
      toast.error("Error al cargar las compras");
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={getProcessed}
        className={`mb-2 flex justify-center items-center gap-1 bg-rose-700 shadow-lg p-1 rounded-md text-white min-w-32 text-xs`}
        disabled={loading}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {processedPurchases ? (
              <RefreshCw className={`w-5`} size={20} strokeWidth={1.25} />
            ) : (
              <ShoppingCart className={`w-5`} size={20} strokeWidth={1.25} />
            )}

            {processedPurchases ? "Refrescar" : "Ver Compras"}
          </>
        )}
      </button>
      {processedPurchases ? (
        //* Si no hay compras procesadas voy a ver un mensaje
        <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900">
          <table className="w-full rounded-lg text-left shadow-md border-collapse">
            <thead className="bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600">
              <tr>
                <th className="py-3 px-1">Item</th>
                <th className="py-3 px-1">Id</th>
                <th className="py-3 px-1 w-96">Descripción</th>
                <th className="py-3 px-1">Proveedor</th>
                <th className="py-3 px-1">Fecha de Compra</th>
                <th className="py-3 px-1">Fecha de Vencimiento</th>
                <th className="py-3 px-1">Monto</th>
                <th className="py-3 px-1">Gestionar</th>
              </tr>
            </thead>
            <tbody>
              {processedPurchases?.map((purchase, i) => (
                <tr
                  key={purchase.Purchase_id}
                  className={`hover:bg-gray-300 dark:hover:bg-yellow-900 py-5 ${
                    i % 2 === 0 ? "bg-slate-100 dark:bg-slate-800" : ""
                  }`}
                >
                  <td className="py-2 px-2">{i + 1}</td>
                  <td className="py-2 px-2 text-left">
                    {purchase.Purchase_id}
                  </td>
                  <td className="py-2 ps-1 pe-5">
                    {purchase.Purchase_description}
                  </td>
                  <td className="py-2 px-1">
                    {purchase.Supplier.Supplier_name}
                  </td>
                  <td className="py-2 px-1">
                    {desformatearFecha(purchase.Purchase_date)}
                  </td>
                  <td className="py-2 px-1">
                    {desformatearFecha(purchase.Purchase_dueDate)}
                  </td>
                  <td className="py-2 px-1">{purchase.Purchase_totalAmount}</td>
                  <td className="py-2 px-1">
                    <Link
                      href={`/inventory/inventory-management/${purchase.Purchase_id}`}
                      className="bg-rose-600 w-8 h-8 flex justify-center items-center shadow-md rounded-sm"

                      //   onClick={() => handleEdit(purchase)}
                    >
                      <PencilLineIcon
                        size={20}
                        strokeWidth={1.5}
                        className="text-white w-5"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={`italic font-medium text-base`}>
          No hay compras pendientes en el panel
        </div>
      )}
    </>
  );
};
