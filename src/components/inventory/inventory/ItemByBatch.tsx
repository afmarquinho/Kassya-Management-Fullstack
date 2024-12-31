"use client";

import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { getBatchesByProduct } from "@/server-actions";
import { desformatearFecha } from "@/utils";
import { BatchInventory } from "@prisma/client";
import { ChevronRight, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export const ItemByBatch = () => {
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState<BatchInventory[]>([]);

  const [rotate, setRotate] = useState<boolean>(false); // Controla la rotación del ícono
  const [showMovs, setShowMovs] = useState<boolean>(true); // Controla la visibilidad del contenido

  //TODO INCLUIR EN LA CONSULTA DE LOS LOTES EL PROVEEDOR

  const getBatchs = async () => {
    setLoading(true);
    const { ok, data, message } = await getBatchesByProduct(1);
    if (ok && data) {
      setBatches(data);
    } else {
      toast.error(message);
    }
    setLoading(false);
  };

  const toggleItems = () => {
    setShowMovs((prev) => !prev); // Alterna la visibilidad del contenido
    setRotate((prev) => !prev); // Alterna la rotación del ícono
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-5">
        Consultar Inventario por Lotes
      </h2>
      <button
        className={`px-4 py-2 w-36 h-10 flex justify-center items-center shadow-md border-2 transition-all duration-300 rounded text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-gray-600 border-blue-500`}
        onClick={getBatchs}
        disabled={loading}
      >
        {loading ? (
          <LoadingSpinner />
        ) : batches.length > 0 ? (
          <div className={`flex items justify-center gap-1`}>
            <RefreshCcw className={`w-5`} /> Refrescar
          </div>
        ) : (
          "Ver Lotes"
        )}
      </button>
      <div>
        {batches.length > 0 ? (
          <>
            <button
              className={`flex gap-2 mt-5 items-center transition-all duration-300`}
              onClick={toggleItems}
            >
              {showMovs ? "Ocultar" : "Mostrar"}
              <ChevronRight
                className={`transition-transform duration-300 ${
                  rotate ? "rotate-90" : "rotate-0"
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-700 ease-out ${
                showMovs ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              <div className="overflow-auto mt-5 bg-white p-5 dark:bg-slate-900">
                <table className="min-w-full border-collapse border border-gray-200 dark:border-slate-700">
                  {/* Encabezados */}
                  <thead className="bg-gray-100 dark:bg-slate-700">
                    <tr>
                      <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                        Ítem
                      </th>
                      <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                        Lote
                      </th>
                      <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                        Localización
                      </th>
                      <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                        Cantidad
                      </th>
                      <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                        Creado
                      </th>
                      <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                        Actualizado
                      </th>
                    </tr>
                  </thead>
                  {/* Cuerpo de la tabla */}
                  <tbody>
                    {batches.map((batch, i) => (
                      <tr
                        key={batch.Batch_id}
                        className="hover:bg-blue-200 dark:hover:bg-slate-600"
                      >
                        <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                          {i + 1}
                        </td>
                        <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                          {batch.Batch_code}
                        </td>
                        <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                          {batch.Batch_location}
                        </td>
                        <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                          {batch.Batch_stockQty}
                        </td>
                        <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                          {desformatearFecha(batch.createdAt)}
                        </td>
                        <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                          {desformatearFecha(batch.updatedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <p className={`mt-5 italic font-medium`}>
            No hay datos para mostrar aún
          </p>
        )}
      </div>
    </>
  );
};
