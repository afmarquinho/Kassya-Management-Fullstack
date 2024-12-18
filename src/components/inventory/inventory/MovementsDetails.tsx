"use client";

import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { getMovementsById } from "@/server-actions";
import { stockMovementsStore } from "@/store/stockMovementsStore";
import { ChevronRight } from "lucide-react";
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
    <>
      <h3 className={`py-4 font-medium text-lg`}>Movimientos de Stock</h3>
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
          className={`px-4 py-2 w-36 shadow-md bg-gradient-to-b flex items justify-center text-white from-violet-500 to-violet-700 hover:from-violet-700 hover:to-violet-700 dark:from-violet-800 dark:to-violet-900 hover:dark:from-violet-700 hover:dark:to-violet-700 transition-all duration-300 rounded`}
          onClick={getMovements}
          disabled={loading}
        >
          {loading ? (
            <LoadingSpinner />
          ) : movements.length > 0 ? (
            "Refrescar"
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
            <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900">
              <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-700">
                {/* Encabezados */}
                <thead className="bg-gray-200 dark:bg-gray-800">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-600 ps-4 py-2 w-16 text-left">
                      Ítem
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                      ID
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                      Tipo
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                      Cantidad
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                      Razón
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                      Fecha
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                      Número de Lote
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                      Usuario
                    </th>
                  </tr>
                </thead>
                {/* Cuerpo de la tabla */}
                <tbody>
                  {movements.map((movement, i) => (
                    <tr
                      key={movement.Movement_id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {i + 1}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {movement.Movement_id}
                      </td>
                      <td
                        className={`border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold ${
                          movement.Movement_type === "entrada"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {movement.Movement_type}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {movement.Movement_qty}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {movement.Movement_reason}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {new Date(movement.Movement_date).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {movement.Movement_lotNumber}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
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
    </>
  );
};
