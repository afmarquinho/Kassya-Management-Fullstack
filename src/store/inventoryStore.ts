import { Purchases } from "@/interfaces";
import { create } from "zustand";

type States = {
  processedPurchases: Purchases[] | null;
  categoryModalOpen: boolean;
  purchaseModalOpen: boolean;
  deleteCategoryModal: {
    isOpen: boolean; // Controla si el modal está abierto o cerrado
    categoryId: number | null; // Almacena el ID de la categoría
  };
  newCategoryModal: boolean;
};

type Actions = {
  setProcessedPurchases: (purchases: Purchases[]) => void;
  togglePurchaseModal: (isOpen: boolean) => void;
  toggleCategoryModal: (isOpen: boolean) => void;
  setDeleteCategoryModal: (modalState: {
    isOpen: boolean;
    categoryId: number | null;
  }) => void;
  toggleNewCategoryModal: () => void;
};

// Crear el store
export const useInventoryStore = create<States & Actions>((set, get) => ({
  // Estados iniciales
  processedPurchases: null,
  purchaseModalOpen: true, // Inicia mostrando la tabla de compras en el módulo de inventarios.
  categoryModalOpen: false,
  deleteCategoryModal: {
    isOpen: false,
    categoryId: null,
  },
  newCategoryModal: false,

  // Acciones para actualizar el estado
  setProcessedPurchases: (purchases) => {
    set({ processedPurchases: purchases });
  },
  togglePurchaseModal: (isOpen) => {
    set({ purchaseModalOpen: isOpen });
  },
  toggleCategoryModal: (isOpen) => {
    set({ categoryModalOpen: isOpen });
  },
  setDeleteCategoryModal: (modalState) => {
    set({ deleteCategoryModal: modalState });
  },
  toggleNewCategoryModal: () => {
    const { newCategoryModal } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ newCategoryModal: !newCategoryModal });
  },
}));
