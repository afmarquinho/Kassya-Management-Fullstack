"use client";

import { FilePenLine, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useCustomerStore } from "@/store";
import { Customer } from "@prisma/client";
import { CustomerModal } from "./CustomerModal";


export const CustomersTable = () => {
  const router = useRouter();
  const {
    customers,
    setCustomer,
    toggleCustomerModal,
    customerModalOpen,
    cleanCustomer,
  } = useCustomerStore();

  const handleEdit = (customer: Customer) => {
    setCustomer(customer);
    toggleCustomerModal();
  };

  const handleViewCustomer = (customer: Customer) => {
    setCustomer(customer);
    router.push(
      `/masters/customers/customer-details/${customer.Customer_name}`
    );
  };

  useEffect(() => {
    cleanCustomer();
  }, [cleanCustomer]);

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
            <th className={`py-3 px-2`}>Cédula</th>
            <th className={`py-3 px-1`}>Apellido</th>
            <th className={`py-3 px-1`}>Nombre</th>
            <th className={`py-3 px-1`}>Correo Electrónico</th>
            <th className={`py-3 px-1`}>Ver</th>
            <th className={`py-3 px-1`}>Editar</th>
          </tr>
        </thead>
        <tbody className={`px-10`}>
          {customers?.map((customer, i) => (
            <tr
              key={customer.Customer_id}
              className={` dark:border-slate-600 hover:bg-gray-300 dark:hover:bg-yellow-900 py-5 ${
                i % 2 === 0 && "bg-slate-100 dark:bg-slate-800"
              }`}
            >
              <td className={`py-2 px-2`}>{i + 1}</td>
              <td className={`py-2 px-1`}>{customer.Customer_dni}</td>
              <td className={`py-2 px-1`}>{customer.Customer_surname}</td>
              <td className={`py-2 px-1`}>{customer.Customer_name}</td>
              <td className={`py-2 px-1`}>{customer.Customer_email}</td>
              <td className={`py-2 px-1`}>
                {/* //*Watch button */}
                <button
                  className={`bg-gradient-to-b from-green-600 to-green-700 w-8 h-full flex justify-center items-center shadow-lg`}
                  onClick={() => handleViewCustomer(customer)}
                >
                  <Search className={`text-white w-5`} />
                </button>
              </td>
              <td className={`py-2 px-1`}>
                {/* //*Edit button */}
                <button
                  className={`bg-gradient-to-b from-indigo-600 to-indigo-700 w-8 h-full flex justify-center items-center shadow-md rounded-sm`}
                  onClick={() => handleEdit(customer)}
                >
                  <FilePenLine className={`text-white w-5`} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {customerModalOpen && <CustomerModal />}
    </div>
  );
};
