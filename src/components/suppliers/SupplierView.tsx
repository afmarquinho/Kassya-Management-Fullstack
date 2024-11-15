"use client";

import { useSupplierStore } from "@/store";
import { Power, PowerOff } from "lucide-react";
import { ActiveSupplierModal } from "./ActiveSupplierModal";


export const SupplierView = () => {
  const { supplier, activeSupplierModal, toggleActiveSupplierModal } = useSupplierStore();
  if (!supplier) {
    return (
      <div className={`text-base italic font-semibold`}>
        No has seleccionado un proveedor para visualizar
      </div>
    );
  }
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-lg flex-1 shadow-lg p-5 border-t-8 ${
        supplier.Supplier_active ? "border-green-500" : "border-red-500"
      }`}
    >
      <table border={1}>
        <tbody className={`text-left`}>
          <tr>
            <th className={`italic`}>Nit</th>
            <td className={`p-3`}>{supplier?.Supplier_nit}</td>
          </tr>
          <tr>
            <th className={`italic`}>Razon Social</th>
            <td className={`p-3`}>{supplier?.Supplier_name}</td>
          </tr>
          <tr>
            <th className={`italic`}>Nombre de Contacto</th>
            <td className={`p-3`}>{supplier?.Supplier_contactInfo}</td>
          </tr>
          <tr>
            <th className={`italic`}>Correo Electrónico</th>
            <td className={`p-3`}>{supplier?.Supplier_email}</td>
          </tr>
          <tr>
            <th className={`italic`}>Teléfono</th>
            <td className={`p-3`}>{supplier?.Supplier_phoneNumber}</td>
          </tr>
          <tr>
            <th className={`italic`}>Ciudad</th>
            <td className={`p-3`}>{supplier?.Supplier_city}</td>
          </tr>
          <tr>
            <th className={`italic`}>Dirección</th>
            <td className={`p-3`}>{supplier?.Supplier_address}</td>
          </tr>

          <tr>
            <th className={`italic`}>Estado</th>
            <td className={`p-3`}>
              <div className={`flex gap-1 items-center`}>
                <div
                  className={`w-2 h-2 rounded-full ${
                    supplier.Supplier_active ? "bg-green-500" : "bg-red-600"
                  }`}
                ></div>{" "}
                {supplier.Supplier_active === true ? "Activo" : "No Activo"}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={`flex gap-5`}>
        <button
          className={`bg-gradient-to-b flex justify-center items-center gap-2 shadow-md text-white py-1 px-3 rounded-lg mt-5 ${
            supplier.Supplier_active
              ? "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              : "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          }`}
          onClick={toggleActiveSupplierModal}
        >
          {supplier.Supplier_active ? <PowerOff /> : <Power />}
          {supplier.Supplier_active ? "Desactivar" : "Activar"}
        </button>
      </div>
      {activeSupplierModal && <ActiveSupplierModal />}
    </div>
  );
};
