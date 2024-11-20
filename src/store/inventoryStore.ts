import { Purchases } from "@/interfaces";
import { create } from "zustand";

type States = {
  processedPurchases: Purchases[] | null;
};

type Actions = {
  setProcessedPurchases: (purchases: Purchases[]) => void;
};

// Crear el store
export const useInventoryStore = create<States & Actions>((set, get) => ({
  processedPurchases: null,

  setProcessedPurchases: (purchases) => {
    set({ processedPurchases: purchases });
  },
}));
