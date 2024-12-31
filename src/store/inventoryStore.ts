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
  productModalOpen: boolean;
  requirementModalOpen: boolean;
};

type Actions = {
  setProcessedPurchases: (purchases: Purchases[]) => void;
  togglePurchaseModal: (isOpen: boolean) => void;
  toggleCategoryModal: (isOpen: boolean) => void;
  toggleInventoryModal: (isOpen: boolean) => void;
  toggleRequirementModal: (isOpen: boolean) => void;
  setDeleteCategoryModal: (modalState: {
    isOpen: boolean;
    categoryId: number | null;
  }) => void;
  toggleNewCategoryModal: () => void;
  toggleProductModal: () => void;
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
  productModalOpen: false,
  requirementModalOpen: false,

  // Acciones para actualizar el estado
  setProcessedPurchases: (purchases) => {
    set({ processedPurchases: purchases });
  },
  togglePurchaseModal: (isOpen) => {
    if (isOpen) {
      set({
        purchaseModalOpen: isOpen,
        categoryModalOpen: !isOpen,
        inventoryModalOpen: !isOpen,
        requirementModalOpen: !isOpen,
      });
    }
    return;
  },
  toggleCategoryModal: (isOpen) => {
    if (isOpen) {
      set({
        purchaseModalOpen: !isOpen,
        categoryModalOpen: isOpen,
        inventoryModalOpen: !isOpen,
        requirementModalOpen: !isOpen,
      });
    }
    return;
  },
  toggleInventoryModal: (isOpen) => {
    if (isOpen) {
      set({
        purchaseModalOpen: !isOpen,
        categoryModalOpen: !isOpen,
        inventoryModalOpen: isOpen,
        requirementModalOpen: !isOpen,
      });
    }
    return;
  },
  
  toggleRequirementModal: (isOpen) => {
    if (isOpen) {
      set({
        purchaseModalOpen: !isOpen,
        categoryModalOpen: !isOpen,
        inventoryModalOpen: !isOpen,
        requirementModalOpen: isOpen,
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

  toggleProductModal: () => {
    const { productModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ productModalOpen: !productModalOpen });
  },

  setProducts: (products) => {
    set({ products });
  },
}));
