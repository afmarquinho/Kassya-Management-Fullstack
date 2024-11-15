import { Supplier } from "@prisma/client";
import { create } from "zustand";

type States = {
  suppliers: Supplier[] | null; //*Almacena todos los proveedores que vienen que la bd para visulizar en la página principal.
  supplier: Supplier | null; //* Proveedor para visualizar o llenar el formulario para editar.
  activeSupplierModal: boolean; //* Modal para activar o desactivar un proveedor.
  supplierModalOpen: boolean; //* Activa el modal del formulario para crear y editar usuarios.
};

type Actions = {
  setSuppliers: (suppliers: Supplier[]) => void; //* Llena los proveedores.
  setSupplier: (supplier: Supplier) => void; //* Llena el proveedor.
  cleanSupplier: () => void; //* Vacía el proveedor.
  toggleActiveSupplierModal: () => void;
  updateSuppliers: (action: string, supplier: Supplier) => void; //* Actualiza (crea o edita) el array de proveedores.
  toggleSupplierModal: () => void; //* Activa o desactiva el modal del formulario para crear o editar.
};

export const useSupplierStore = create<States & Actions>((set, get) => ({
  suppliers: null,
  supplier: null,
  activeSupplierModal: false,
  supplierModalOpen: false,

  setSuppliers: (suppliers) => {
    set({ suppliers });
  },

  setSupplier: (supplier) => {
    set({ supplier });
  },

  cleanSupplier: () => {
    set({ supplier: null });
  },

  toggleActiveSupplierModal: () => {
    const { activeSupplierModal } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ activeSupplierModal: !activeSupplierModal });
  },

  updateSuppliers: (action, supplier) => {
    if (!supplier) {
      console.error("Proveedor no válido");
      return;
    }

    const { suppliers } = get();
    

    if (action === "add") {
      set(() => ({
        suppliers: !suppliers ? [supplier]:[...suppliers, supplier],
      }));
    } else if (action === "update") {
      if (typeof supplier.Supplier_id !== "number") {
        console.error("Id del proveedor inválido");
        return;
      }
      if (!suppliers) return;
      set(() => ({
        suppliers: suppliers.map((item) =>
          item.Supplier_id === supplier.Supplier_id ? supplier : item
        ),
      }));
    } else {
      console.error("Acción no reconocida");
    }
  },
  toggleSupplierModal: () => {
    const { supplierModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ supplierModalOpen: !supplierModalOpen });
  },
}));
