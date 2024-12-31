"use client";

import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { getMovementsById } from "@/server-actions";
import { stockMovementsStore } from "@/store/stockMovementsStore";
import { ChevronRight, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  productId: number;
};

export const MovementsDetails = ({ productId }: Props) => {
  const [loading, setLoading] = useState(false);
  const { movements, setmovements } = stockMovementsStore();

  const [rotate, setRotate] = useState<boolean>(false); // Controla la rotación del ícono
  const [showMovs, setShowMovs] = useState<boolean>(true); // Controla la visibilidad del contenido

  const getMovements = async () => {
    setLoading(true);
    try {
      const { ok, data, message } = await getMovementsById(productId);
      if (ok && data) {
        setmovements(data);
        console.log(movements);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItems = () => {
    setShowMovs((prev) => !prev); // Alterna la visibilidad del contenido
    setRotate((prev) => !prev); // Alterna la rotación del ícono
  };

  return (
    <div className={``}>
      <h3 className={`font-medium text-lg mb-5`}>Movimientos de Stock</h3>
      <div className={`flex justify-start items-center gap-5`}>
        <label className={`flex justify-start items-center gap-3`}>
          Ver
          <select
            className={`p-2 bg-white dark:bg-slate-800 rounded outline-none`}
          >
            <option value="5">Ultimos 5</option>
            <option value="10">Ultimos 10</option>
            <option value="20">Ultimos 20</option>
            <option value="100">Ultimos 100</option>
            <option value="all">Todos</option>
          </select>
        </label>
        <button
          className={`px-4 py-2 w-36 h-10 flex justify-center items-center shadow-md border-2 transition-all duration-300 rounded text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-gray-600 border-blue-500`}
          onClick={getMovements}
          disabled={loading}
        >
          {loading ? (
            <LoadingSpinner />
          ) : movements.length > 0 ? (
            <div className={`flex items justify-center gap-1`}>
            <RefreshCcw className={`w-5`}/> Refrescar
          </div>
          ) : (
            "Ver Movimientos"
          )}
        </button>
      </div>

      {movements.length > 0 ? (
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
                      ID
                    </th>
                    <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tipo
                    </th>
                    <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                      Razón
                    </th>
                    <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                      Órden ralcionada                    </th>
                    <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                      Cantidad
                    </th>
                    <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                      Fecha
                    </th>
                    <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                      Número de Lote
                    </th>
                    <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                      Usuario
                    </th>
                  </tr>
                </thead>
                {/* Cuerpo de la tabla */}
                <tbody>
                  {movements.map((movement, i) => (
                    <tr
                      key={movement.Movement_id}
                      className="hover:bg-blue-200 dark:hover:bg-slate-600"
                    >
                      <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                        {i + 1}
                      </td>
                      <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                        {movement.Movement_id}
                      </td>
                      <td
                        className={`border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm font-semibold ${
                          movement.Movement_type === "entrada"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {movement.Movement_type}
                      </td>
                      <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                        {movement.Movement_reason}
                      </td>
                      <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                        {movement.Movement_relatedId}
                      </td>
                      <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                        {movement.Movement_qty}
                      </td>
                      <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                        {new Date(movement.Movement_date).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                        {movement.BatchInventory.Batch_code}
                      </td>
                      <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                        {movement.User.User_name} {movement.User.User_surname}
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
  );
};
