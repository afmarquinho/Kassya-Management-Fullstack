import { PurchaseItems } from "@/interfaces";
import { create } from "zustand";

type States = {
  item: PurchaseItems | null; //* Item para editar, o eliminar
  deleteItemModalOpen: boolean; //* Modal para eliminar item
  itemModalOpen: boolean; //* Modal para editar o crear item
};

type Actions = {
  setItem: (item: PurchaseItems) => void; //*llenar el item
  cleanItem: () => void; //* limpiar el estado de item
  toggleDeleteItemModal: () => void; //* activar o desactivar el modal de eliminar
  toggleItemModal: () => void; //* activiar el formulario para editar o crear
};

// Crear el store
export const usePurchaseItemStore = create<States & Actions>((set, get) => ({
  item: null,
  deleteItemModalOpen: false,
  itemModalOpen: false,

  setItem: (item) => {
    set({ item });
  },
  cleanItem: () => {
    set({ item: null });
  },
  toggleDeleteItemModal: () => {
    const { deleteItemModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ deleteItemModalOpen: !deleteItemModalOpen });
  },
  toggleItemModal: () => {
    const { itemModalOpen} = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ itemModalOpen: !itemModalOpen });
  },
}));
