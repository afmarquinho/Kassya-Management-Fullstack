"use client";

import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  productId: number;
};

export const ProvisioningRequestForm = ({ productId }: Props) => {
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProvisioningRequest = async () => {
    if (quantity <= 0 || !description.trim()) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    const response = await fetch(`/api/provisioning-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity, description }),
    });

    if (response.ok) {
      toast.success("Solicitud de aprovisionamiento enviada con éxito.");
      setQuantity(0);
      setDescription("");
    } else {
      toast.error("Error al enviar la solicitud.");
    }
    setLoading(false);
  };

  return (
    <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded shadow-md w-full max-w-96">
      <h4 className="font-semibold mb-2">
        Nueva Solicitud de Aprovisionamiento
      </h4>
      <div className="flex flex-col gap-4">
        <label className="block font-medium mb-1">
          Cantidad:
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block font-medium mb-1">
          Descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded resize-none"
          />
        </label>
        <button
          onClick={handleProvisioningRequest}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-all"
        >
          {loading ? "Enviando..." : "Solicitar Aprovisionamiento"}
        </button>
      </div>
    </div>
  );
};
