"use client";

import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { ProvisionRequest as ProvisionType } from "@/interfaces";
import { createProvisionRequest, getPendingRequests } from "@/server-actions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  productId: number;
};

export const ProvisionRequest = ({ productId }: Props) => {
  const [pendingRequests, setPendingRequests] = useState<ProvisionType[]>([]); // Inicializado como arreglo vacío
  const [loadingRequest, setLoadingRequest] = useState(true);
  const [loading, setLoading] = useState(false);
  const [requestQuantity, setRequestQuantity] = useState(0);
  const [requestDesc, setRequestDesc] = useState("");

  const fetchPendingRequests = async () => {
    const { ok, data, message } = await getPendingRequests(productId);
    if (ok) {
      setPendingRequests(data || []); // Asegurarse de que siempre sea un arreglo
      setLoadingRequest(false);
    } else {
      toast.error(message || "Error al cargar las solicitudes pendientes.");
      setLoadingRequest(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleCreateRequest = async () => {
    if (requestQuantity <= 0) {
      toast.error("La cantidad solicitada debe ser mayor a 0.");
      return;
    }

    setLoading(true);
    const { ok, message } = await createProvisionRequest(
      productId,
      1, // TODO: CAMBIAR EL CREATEDBY EN LA FUNCIÓN
      requestQuantity,
      requestDesc
    );
    if (ok) {
      toast.success(message);
      setRequestQuantity(0);
      setRequestDesc("");
      fetchPendingRequests(); // Actualizar solicitudes
    } else {
      toast.error(message || "Error al crear la solicitud.");
    }
    setLoading(false);
  };

  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-5">
        Solicitudes de Aprovisionamiento
      </h3>
      <div className="">
        {loadingRequest ? (
          <span className={`italic`}>Cargando solicitudes ...</span>
        ) : pendingRequests.length > 0 ? ( // Si hay datos
          <ul className="list-disc ml-5">
            {pendingRequests.map((req) => (
              <li key={req.Prov_id}>
                {req.Prov_quantity} unidades solicitadas -{" "}
                {new Date(req.createdAt).toLocaleDateString()}
                <span className={`italic`}>
                  {" "}
                  Por: {req.User.User_name} {req.User.User_surname}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay solicitudes pendientes.</p> // Si no hay datos
        )}
      </div>

      <div className="mt-6 flex gap-5">
        <div className={`flex gap-2`}>
          <input
            type="number"
            value={requestQuantity}
            onChange={(e) => setRequestQuantity(Number(e.target.value))}
            placeholder="Cant."
            className="border p-2 rounded h-10 w-16 outline-none text-center dark:bg-slate-800"
          />
          <textarea
            value={requestDesc}
            onChange={(e) => setRequestDesc(e.target.value)}
            placeholder="Nota opcional..."
            className="border p-2 rounded h-10 w-44 outline-none resize-none dark:bg-slate-800"
          />
        </div>

        <button
          className={`px-4 py-2 w-36 h-10 flex justify-center items-center shadow-md border-2 transition-all duration-300 rounded text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-gray-600 border-blue-500`}
          onClick={handleCreateRequest}
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Hacer Solicitud"}
        </button>
      </div>
    </div>
  );
};
