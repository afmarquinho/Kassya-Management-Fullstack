"use client";

import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { purchaseItemsType } from "@/interfaces";
import { getProductPurchaseDetails } from "@/server-actions";
import { desformatearFecha } from "@/utils";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export const InventoryProductItems = () => {
  const { productId } = useParams();

  const [purchaseItems, setPurchaseItems] = useState<purchaseItemsType | []>(
    []
  );
  const [loading, setLoading] = useState(false);

  const productIdInt =
    productId && typeof productId === "string" ? parseInt(productId, 10) : null;

  const getPurchaseDetails = async () => {
    if (!productIdInt) {
      console.error("El ID del producto no es válido.");
      toast.error("ID del producto no válido.");
      return;
    }

    setLoading(true);
    const { ok, data, message } = await getProductPurchaseDetails(productIdInt);

    if (ok && data) {
      setPurchaseItems(data);
    } else {
      toast.error(message || "Error al cargar los datos de abastecimiento.");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className={`flex gap-5`}>
        <button
          className={`px-4 py-2 w-32 shadow-md bg-gradient-to-b flex items justify-center text-white from-rose-500 to-rose-700 hover:from-rose-700 hover:to-rose-700 dark:from-rose-800 dark:to-rose-900 hover:dark:from-rose-700 hover:dark:to-rose-700 transition-all duration-300 rounded`}
          onClick={getPurchaseDetails}
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Historial"}
        </button>
      </div>
      {purchaseItems.length > 0 && (
        <div className="mt-6">

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {purchaseItems.map((item) => (
              <div
                key={item.itemId}
                className="py-4 px-4 bg-white dark:bg-slate-800 rounded shadow-sm"
              >
                <p className={`italic text-right`}>
                  <strong>
                    Fecha de Compra: {desformatearFecha(item.purchase.date)}
                  </strong>
                </p>
                <div className="mt-2">
                  <h4 className="font-bold">Detalles de la Compra</h4>
                  <p>
                    <strong>Consecutivo:</strong> {item.purchase.id}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {item.purchase.description}
                  </p>
                  <p>
                    <strong>Proveedor:</strong> {item.purchase.supplier.name} (
                    {item.purchase.supplier.email})
                  </p>
                  <p>
                    <strong>Usuario:</strong> {item.purchase.user.name}
                  </p>
                </div>
                <br />
                <h3 className="font-bold">Artículo: {item.name}</h3>

                <p>
                  <strong>Cantidad Ordenada:</strong> {item.qtyOrdered}
                </p>
                <p>
                  <strong>Ubicación:</strong>{" "}
                  {item.location || "No especificada"}
                </p>
                <p>
                  <strong>Estado:</strong> {item.status}
                </p>

                {item.purchase.notes.length > 0 && (
                  <div className="mt-2">
                    <h4 className="font-semibold">Notas</h4>
                    <ul className="list-disc ml-5">
                      {item.purchase.notes.map((note, index) => (
                        <li key={index}>
                          {note.usser_name} {note.usser_surname}: {note.content}{" "}
                          <small className="text-gray-500">
                            {desformatearFecha(note.createdAt)}
                          </small>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
