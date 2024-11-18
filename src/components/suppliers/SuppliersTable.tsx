"use client";
import { FilePenLine, Search } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupplierStore } from "@/store/supplierStore";
import { Supplier } from "@prisma/client";
import { SupplierModal } from "./SupplierModal";

export const SuppliersTable = () => {
  const router = useRouter();
  const { suppliers, setSupplier, cleanSupplier, toggleSupplierModal, supplierModalOpen } =
    useSupplierStore();

  const handleEdit = (supplier: Supplier) => {
    setSupplier(supplier);
    toggleSupplierModal();
  };

  const handleViewSupplier = (supplier: Supplier) => {
    setSupplier(supplier);
    router.push(
      `/masters/suppliers/supplier-details/${supplier.Supplier_name}`
    );
  };

  useEffect(() => {
    cleanSupplier();
  }, [cleanSupplier]);

  
  return (
    <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900">
      <table
        className={`w-full rounded-lg border-collapse text-left overflow-hidden shadow-md`}
      >
        <thead
          className={`bg-indigo-900 dark:bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800`}
        >
          <tr>
            <th className={`py-3 px-2`}>Item</th>
            <th className={`py-3 px-1`}>Nit</th>
            <th className={`py-3 px-1`}>Razon Social</th>
            <th className={`py-3 px-1`}>Contato</th>
            <th className={`py-3 px-1`}>Estado</th>
            <th className={`py-3 px-1`}>Ver</th>
            <th className={`py-3 px-1`}>Editar</th>
          </tr>
        </thead>
        <tbody className={`px-10`}>
          {suppliers?.map((supplier, i) => (
            <tr
              key={supplier.Supplier_id}
              className={` dark:border-slate-600 hover:bg-gray-300 dark:hover:bg-yellow-900 py-5 ${
                i % 2 === 0 && "bg-slate-100 dark:bg-slate-800"
              }`}
            >
              <td className={`py-2 px-2`}>{i + 1}</td>
              <td className={`py-2 px-1`}>{supplier.Supplier_nit}</td>
              <td className={`py-2 px-1`}>{supplier.Supplier_name}</td>
              <td className={`py-2 px-1`}>{supplier.Supplier_contactInfo}</td>
              <td className={`py-2 px-1`}>
                <div className={`flex gap-1 items-center`}>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      supplier.Supplier_active ? "bg-green-500" : "bg-red-600"
                    }`}
                  ></div>{" "}
                  {supplier.Supplier_active ? "Activo" : "No Activo"}
                </div>
              </td>
              <td className={`py-2 px-1`}>
                {/* //*Watch button */}
                <button
                  className={`bg-gradient-to-b from-green-600 to-green-700 w-8 h-full flex justify-center items-center shadow-lg`}
                  onClick={() => handleViewSupplier(supplier)}
                >
                  <Search className={`text-white w-5`} />
                </button>
              </td>
              <td className={`py-2 px-1`}>
                {/* //*Edit button */}
                <button
                  className={`bg-gradient-to-b from-indigo-600 to-indigo-700 w-8 h-full flex justify-center items-center shadow-md rounded-sm`}
                  onClick={() => handleEdit(supplier)}
                >
                  <FilePenLine className={`text-white w-5`} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {supplierModalOpen && <SupplierModal />} 
    </div>
  );
};
