import { InventoryTable, Purchases } from "@/interfaces";
import { create } from "zustand";

type States = {
  processedPurchases: Purchases[] | null;
  categoryModalOpen: boolean;
  purchaseModalOpen: boolean;
  inventoryModalOpen: boolean;
  deleteCategoryModal: {
    isOpen: boolean; // Controla si el modal está abierto o cerrado
    categoryId: number | null; // Almacena el ID de la categoría
  };
  newCategoryModal: boolean;
  products: InventoryTable[] | null;
};

type Actions = {
  setProcessedPurchases: (purchases: Purchases[]) => void;
  togglePurchaseModal: (isOpen: boolean) => void;
  toggleCategoryModal: (isOpen: boolean) => void;
  toggleInventoryModal: (isOpen: boolean) => void;
  setDeleteCategoryModal: (modalState: {
    isOpen: boolean;
    categoryId: number | null;
  }) => void;
  toggleNewCategoryModal: () => void;
  setProducts: (products: InventoryTable[]) => void;
};

// Crear el store
export const useInventoryStore = create<States & Actions>((set, get) => ({
  // Estados iniciales
  processedPurchases: null,
  purchaseModalOpen: true, // Inicia mostrando la tabla de compras en el módulo de inventarios.
  categoryModalOpen: false,
  inventoryModalOpen: false,
  deleteCategoryModal: {
    isOpen: false,
    categoryId: null,
  },
  newCategoryModal: false,
  products: null,

  // Acciones para actualizar el estado
  setProcessedPurchases: (purchases) => {
    set({ processedPurchases: purchases });
  },
  togglePurchaseModal: (isOpen) => {
    if (isOpen) {
      set({
        purchaseModalOpen: true,
        categoryModalOpen: false,
        inventoryModalOpen: false,
      });
    }
    return;
  },
  toggleCategoryModal: (isOpen) => {
    if (isOpen) {
      set({
        purchaseModalOpen: false,
        categoryModalOpen: true,
        inventoryModalOpen: false,
      });
    }
    return;
  },
  toggleInventoryModal: (isOpen) => {
    if (isOpen) {
      set({
        purchaseModalOpen: false,
        categoryModalOpen: false,
        inventoryModalOpen: true,
      });
    }
    return;
  },

  setDeleteCategoryModal: (modalState) => {
    set({ deleteCategoryModal: modalState });
  },
  toggleNewCategoryModal: () => {
    const { newCategoryModal } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ newCategoryModal: !newCategoryModal });
  },
  setProducts: (products) => {
    set({ products });
  },
}));
