"use client";

import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { getDispatchReq } from "@/server-actions";
import { useInvRequestsStore } from "@/store/InvRequestsStore";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { DispatchModal } from "./DispatchModal";

export const DispatchRequests = () => {
  const { invRequests, setInvRequests, toggleDispatchModal, dispatchModalOpen } = useInvRequestsStore();
  const [loading, setLoading] = useState<boolean>(false);

  const getDispatchRequests = async () => {
    setLoading(true);
    try {
      const { ok, data, message } = await getDispatchReq();
      if (ok && data) {
        setInvRequests(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onDispatch = () => {
    toggleDispatchModal()
  };
  


  return (
    <>
      <div className={`flex gap-2`}>
        <button
          className={`w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-white transition-colors duration-300 text-xs bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 shadow-md rounded`}
          onClick={getDispatchRequests}
        >
          {loading ? (
            <LoadingSpinner />
          ) : invRequests.length > 0 ? (
            <div className={`flex items-center justify-center gap-1`}>
              <RefreshCcw className={`w-5`} /> Refrescar
            </div>
          ) : (
            "Ver Solicitudes"
          )}
        </button>
        <button
          className={`w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-white transition-colors duration-300 text-xs bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 shadow-md rounded`}
          // onClick={onNew}
        >
          Nueva Solicitud
        </button>
      </div>
      {invRequests.length > 0 ? (
        <div className={`p-5 bg-white dark:bg-slate-900 my-5`}>
          <h3 className={`italic font-medium text-base mb-5 text-center`}>
            Solicitudes de Compras
          </h3>
          <table
            className={`w-full border-collapse text-left overflow-hidden shadow-md text-sm`}
          >
            <thead
              className={`bg-indigo-900 dark:bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800`}
            >
              <tr>
                <th className={`py-3`}>Item</th>
                <th className={`py-3`}>ID</th>
                <th className={`py-3`}>Descipción</th>
                <th className={`py-3`}>Cantidad</th>
                <th className={`py-3`}>Departamento</th>
                <th className={`py-3`}></th>
              </tr>
            </thead>
            <tbody className={`px-10`}>
              {invRequests.map((request, i) => (
                <tr
                  key={request.Req_id}
                  className={`hover:bg-gray-300 dark:hover:bg-teal-950 py-5 ${
                    i % 2 === 0 ? "bg-slate-100 dark:bg-slate-800" : ""
                  }`}
                >
                  <td className={`py-2 px-2`}>{i + 1}</td>
                  <td className={`py-2 px-1`}>{request.Req_id}</td>
                  <td className={`py-2 px-1`}>{request.Req_desc}</td>
                  <td className={`py-2 px-1`}>{request.Req_qty}</td>
                  <td className={`py-2 px-1`}>{request.Department.Dep_name}</td>
                  <td className={`py-2 px-1`}>
                    <button
                      className={`transition-colors duration-300 h-full flex justify-center items-center text-blue-700 font-semibold`}
                      onClick={onDispatch}
                    >
                      Depachar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={`italic font-semibold text-base`}>
          No hay solicitudes de despacho
        </div>
      )}
      {dispatchModalOpen && <DispatchModal/>}
    </>
  );
};
