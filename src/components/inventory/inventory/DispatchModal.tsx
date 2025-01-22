"use client";

import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { InventoryRequestType } from "@/interfaces/invRequests.interface";
import { dispatchProduct } from "@/server-actions";
import { useInvRequestsStore } from "@/store/InvRequestsStore";
import { Ban, Check, CheckCircle } from "lucide-react";
import { useState } from "react";


type Props = {
  data: InventoryRequestType | null;
};

export const DispatchModal = ({ data }: Props) => {
  const { toggleDispatchModal } = useInvRequestsStore();
  const [dispatchQty, setDispatchQty] = useState<number>(0);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);

  const handleCancel = () => {
    toggleDispatchModal();
  };

  const handleDispatch = async (
    invReq: InventoryRequestType,
    closeReq: boolean
  ) => {
    if (dispatchQty <= 0 || dispatchQty > invReq.Req_qty) {
      alert(
        "La cantidad a despachar debe ser mayor a 0 y no puede exceder la cantidad solicitada."
      );
      return;
    }
    if (closeReq) {
      setLoading2(true);
    } else {
      setLoading1(true);
    }
    //TODO: CAMBIAR EL USER ID
    await dispatchProduct(
      invReq.Req_prodId,
      dispatchQty,
      2,
      closeReq,
      invReq.Req_id
    );
    setLoading1(false);
    setLoading2(false);
    toggleDispatchModal();
  };

  if (!data) {
    toggleDispatchModal();
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-20 flex justify-center items-center backdrop-blur-[1px]`}
    >
      <div className={`bg-white dark:bg-slate-800 p-10 w-11/12 max-w-[800px]`}>
        {/* <CustomerForm /> */}
        <h3 className={`text-center font-semibold text-base`}>
          Despachar Inventario
        </h3>

        <div className="space-y-4">
          {/* Display Data */}
          <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                ID de Solicitud:
              </span>{" "}
              {data.Req_id}
            </p>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Descripción:
              </span>{" "}
              {data.Req_desc}
            </p>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              <span className="font-bold ">Departamento:</span>{" "}
              {data.Department.Dep_name}
            </p>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Producto:
              </span>{" "}
              {data.Product.Product_name}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Cantidad:
                </span>{" "}
                {data.Req_qty}
              </p>
              <label>
                <span className={`font-bold`}>Confirmar Cantidad: </span>
                <input
                  type="number"
                  min="1"
                  max={data.Req_qty}
                  value={dispatchQty}
                  onChange={(e) => setDispatchQty(Number(e.target.value))}
                  className="w-20 p-1 text-sm border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                  placeholder="Despachar"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className={`flex justify-center items-center p-2 text-white gap-1 bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-500 rounded transition-colors duration-300 min-w-28`}
            onClick={handleCancel}
          >
            <Ban className={`w-5`} />
            Cancelar
          </button>
          <div className={`flex justify-end gap-5`}>
            <button
              className="flex justify-center items-center p-2 text-white gap-2 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 rounded transition-colors duration-300 min-w-28"
              onClick={() => handleDispatch(data, false)}
              disabled={loading1}
            >
              {loading1 ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Check className="w-5" />
                  Despachar
                </>
              )}
            </button>
            <button
              className="flex justify-center items-center p-2 text-white gap-2 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500 rounded transition-colors duration-300 min-w-28"
              onClick={() => handleDispatch(data, true)}
              disabled={loading2}
            >
              {loading2 ? (
                <LoadingSpinner />
              ) : (
                <>
                  <CheckCircle className="w-5" />
                  Despachar y Cerrar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
