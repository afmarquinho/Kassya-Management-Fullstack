"use client";

import { usePurchaseStore, useSupplierStore } from "@/store";
import { desformatearFecha } from "@/utils";
import { FilePenLine, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { toast } from "react-toastify";
import { Purchases } from "@/interfaces";
import { getSuppliersForm } from "@/server-actions";

//TODO: Poner la lógica en todas las tablas principales de cada módulo, que si el,array que viene la bd es vacía coloque la leyenda que no hay datos para mostrar

const PurchasesTable = () => {
  const router = useRouter();
  const {
    purchases,
    cleanPurchaseId,
    setPurchaseId,
    setPurchase,
    togglePurchaseModal,
  } = usePurchaseStore();
  const { setSupplierList } = useSupplierStore();

  const [loading, setLoading] = useState<boolean>(false);

  const handleView = async (purchaseId: number) => {
    setLoading(true);
    setPurchaseId(purchaseId);
    router.push(`/purchase/management/purchase-details/${purchaseId}`);

    try {
    } catch (error) {
      toast.error("No se pudo cargar la compra");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (purchase: Purchases) => {
    togglePurchaseModal();
    setPurchase(purchase);
    try {
      const { ok, data } = await getSuppliersForm();
      if (ok && data) {
        setSupplierList(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cleanPurchaseId();
  }, [cleanPurchaseId]);

  if (!purchases || purchases.length === 0) {
    return (
      <div className={`italic font-medium text-base`}>
        No hay compras para mostrar
      </div>
    );
  }
  return (
    <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900">
      <table className="w-full rounded-lg text-left shadow-md border-collapse">
        <thead className="bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600">
          <tr>
            <th className="py-3 px-1">Item</th>
            <th className="py-3 px-1 w-96">Descripción</th>
            <th className="py-3 px-1">Proveedor</th>
            <th className="py-3 px-1">Fecha de Compra</th>
            <th className="py-3 px-1">Fecha de Vencimiento</th>
            <th className="py-3 px-1">Forma de pago</th>
            <th className="py-3 px-1">Monto</th>
            <th className="py-3 px-1">Ver</th>
            <th className="py-3 px-1">Editar</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, i) => (
            <tr
              key={purchase.Purchase_id}
              className={`hover:bg-gray-300 dark:hover:bg-yellow-900 py-5 ${
                i % 2 === 0 ? "bg-slate-100 dark:bg-slate-800" : ""
              }`}
            >
              <td className="py-2 px-2">{i + 1}</td>
              <td className="py-2 ps-1 pe-5">
                {purchase.Purchase_description}
              </td>
              <td className="py-2 px-1">{purchase.Supplier.Supplier_name}</td>
              <td className="py-2 px-1">
                {desformatearFecha(purchase.Purchase_date)}
              </td>
              <td className="py-2 px-1">
                {desformatearFecha(purchase.Purchase_dueDate)}
              </td>
              <td className="py-2 px-1">{purchase.Purchase_paymentMethod}</td>
              <td className="py-2 px-1">{purchase.Purchase_totalAmount}</td>

              <td className="py-2 px-1">
                <button
                  className="bg-gradient-to-b from-green-600 to-green-700 w-8 h-full flex justify-center items-center shadow-lg"
                  onClick={() => handleView(purchase.Purchase_id)}
                >
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <Search className="text-white w-5" />
                  )}
                </button>
              </td>
              <td className="py-2 px-1">
                {!purchase.Purchase_processed && (
                  <button
                    className="bg-gradient-to-b from-indigo-600 to-indigo-700 w-8 h-full flex justify-center items-center shadow-md rounded-sm"
                    onClick={() => handleEdit(purchase)}
                  >
                    <FilePenLine className="text-white w-5" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};
export default PurchasesTable;
