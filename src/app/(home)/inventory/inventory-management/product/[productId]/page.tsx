"use client";

import { InventoryProductGrid, InventoryProductItems } from "@/components";
import { createProvisionRequest, getPendingRequests } from "@/server-actions";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";



const InventoryProductPage = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;
  const productIdInt = parseInt(productId, 10);

  const [pendingRequests, setPendingRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [requestQuantity, setRequestQuantity] = useState<number>(0);
  const [requestDesc, setRequestDesc] = useState<String>("");
  const [loadingCreate, setLoadingCreate] = useState(false);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    setLoadingRequests(true);
    const { ok, data, message } = await getPendingRequests(productIdInt)s
    if (ok) {
      setPendingRequests(data);
    } else {
      toast.error(message || "Error al cargar las solicitudes pendientes.");
    }
    setLoadingRequests(false);
  };

  const handleCreateRequest = async () => {
    if (requestQuantity <= 0) {
      toast.error("La cantidad solicitada debe ser mayor a 0.");
      return;
    }

    setLoadingCreate(true);
    const { ok, message } = await createProvisionRequest(productIdInt, requestQuantity);
    if (ok) {
      toast.success("Solicitud creada exitosamente.");
      setRequestQuantity(0);
      fetchPendingRequests();
    } else {
      toast.error(message || "Error al crear la solicitud.");
    }
    setLoadingCreate(false);
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5 bg-white dark:bg-slate-800 p-4 rounded shadow-md">
        Detalle del Producto
      </h2>
      <InventoryProductGrid data={{ id: productIdInt }} />
      <h3 className="py-4 font-medium">Historial de Provisión</h3>
      <InventoryProductItems />

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Solicitudes de Aprovisionamiento</h3>
        <div className="mt-4">
          {loadingRequests ? (
            <p>Cargando solicitudes...</p>
          ) : pendingRequests.length > 0 ? (
            <ul className="list-disc ml-5">
              {pendingRequests.map((req) => (
                <li key={req.id}>
                  {req.quantity} unidades solicitadas el {req.createdAt}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay solicitudes pendientes.</p>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <input
            type="number"
            value={requestQuantity}
            onChange={(e) => setRequestQuantity(Number(e.target.value))}
            placeholder="Cantidad a solicitar"
            className="p-2 rounded outline-none h-10 dark:bg-slate-800"
          />
          <textarea
            onChange={(e) => setRequestDesc(e.target.value)}
            placeholder="Nota opcional..."
            className="p-2 rounded resize-none outline-none h-10 w-52 dark:bg-slate-800"
          />
          <button
            onClick={handleCreateRequest}
            disabled={loadingCreate}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-indigo-800 dark:hover:bg-indigo-700  text-white px-4 py-2 rounded shadow"
          >
            {loadingCreate ? "Creando..." : "Hacer Solicitud"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryProductPage;
