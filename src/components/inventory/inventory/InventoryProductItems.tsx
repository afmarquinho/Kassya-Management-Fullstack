"use client";

import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { purchaseItemsType } from "@/interfaces";
import { getProductPurchaseDetails } from "@/server-actions";
import { desformatearFecha } from "@/utils";
import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export const InventoryProductItems = () => {
  const { productId } = useParams();

  const [purchaseItems, setPurchaseItems] = useState<purchaseItemsType | []>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [rotate, setRotate] = useState<boolean>(false); // Controla la rotación del ícono
  const [showItems, setShowItems] = useState<boolean>(true); // Controla la visibilidad del contenido

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

  const toggleItems = () => {
    setShowItems((prev) => !prev); // Alterna la visibilidad del contenido
    setRotate((prev) => !prev); // Alterna la rotación del ícono
  };

  return (
    <div className={`mt-8`}>
      <h3 className={`py-4 font-medium text-lg`}>Historial de Provisión</h3>
      <button
        className={`px-4 py-2 w-32 shadow-md bg-gradient-to-b flex items justify-center text-white from-rose-500 to-rose-700 hover:from-rose-700 hover:to-rose-700 dark:from-rose-800 dark:to-rose-900 hover:dark:from-rose-700 hover:dark:to-rose-700 transition-all duration-300 rounded`}
        onClick={getPurchaseDetails}
        disabled={loading}
      >
        {loading ? <LoadingSpinner /> : "Historial"}
      </button>

      {purchaseItems.length > 0 && (
        <button
          className={`flex gap-2 my-5 items-center transition-all duration-300`}
          onClick={toggleItems}
        >
          {showItems ? "Ocultar" : "Mostrar"}
          <ChevronRight
            className={`transition-transform duration-300 ${
              rotate ? "rotate-90" : "rotate-0"
            }`}
          />
        </button>
      )}

      {showItems && purchaseItems.length > 0 && (
        <div
          className={`mt-6 overflow-hidden transition-all duration-500 transform ${
            showItems ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
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
