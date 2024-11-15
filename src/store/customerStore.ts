import { Customer } from "@prisma/client";

import { create } from "zustand";

type States = {
  customers: Customer[] | null; //*Almacena todos los clientes que vienen que la bd para visulizar en la página principal.
  customer: Customer | null; //* Cliente para visualizar o llenar el formulario para editar.
  customerModalOpen: boolean; //* Activa el modal del formulario para crear y editar usuarios.
};

type Actions = {
  setCustomers: (customers: Customer[]) => void; //* Llena los clientes.
  setCustomer: (customer: Customer) => void; //* Llena l cliente.
  cleanCustomer: () => void; //* Vacía el cliente.
  toggleCustomerModal: () => void; //* Activa o desactiva el modal del formulario para crear o editar.
  updateCustomers: (action: string, customer: Customer) => void; //* Actualiza (crea o edita) el array de clientes.
};

export const useCustomerStore = create<States & Actions>((set, get) => ({
  customers: null,
  customer: null,
  customerModalOpen: false,

  setCustomers: (customers) => {
    set({ customers });
  },
  toggleCustomerModal: () => {
    const { customerModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ customerModalOpen: !customerModalOpen });
  },

  setCustomer: (customer) => {
    set({ customer });
  },
  
  cleanCustomer: () => {
    set({ customer: null });
  },

  updateCustomers: (action, customer) => {
    if (!customer) {
      console.error("Cliente no válido");
      return;
    }
    const { customers } = get();

    if (action === "add") {
      set(() => ({
        customers: !customers ? [customer] : [...customers, customer],
      }));
    } else if (action === "update") {
      if (typeof customer.Customer_id !== "number") {
        console.error("Id del Cliente inválido");
        return;
      }

      if (!customers) return;
      set(() => ({
        customers: customers.map((item) =>
          item.Customer_id === customer.Customer_id ? customer : item
        ),
      }));
    } else {
      console.error("Acción no reconocida");
    }
  },
}));
