import { InventoryTable, Purchases } from "@/interfaces";
import { create } from "zustand";

type States = {
  processedPurchases: Purchases[] | null;
  categoryModalOpen: boolean;
  purchaseModalOpen: boolean;
  inventoryModalOpen: boolean;
  newCategoryModal: boolean;
  products: InventoryTable[] | null;
  productModalOpen: boolean;
  requestsModalOpen: boolean;
};

type Actions = {
  setProcessedPurchases: (purchases: Purchases[]) => void;
  togglePurchaseModal: (isOpen: boolean) => void;
  toggleCategoryModal: (isOpen: boolean) => void;
  toggleInventoryModal: (isOpen: boolean) => void;
  toggleRequestsModal: (isOpen: boolean) => void;
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

  newCategoryModal: false,
  products: null,
  productModalOpen: false,
  requestsModalOpen: false,

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
        requestsModalOpen: !isOpen,
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
        requestsModalOpen: !isOpen,
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
        requestsModalOpen: !isOpen,
      });
    }
    return;
  },

  toggleRequestsModal: (isOpen) => {
    if (isOpen) {
      set({
        purchaseModalOpen: !isOpen,
        categoryModalOpen: !isOpen,
        inventoryModalOpen: !isOpen,
        requestsModalOpen: isOpen,
      });
    }
    return;
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
