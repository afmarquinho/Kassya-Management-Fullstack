import { InventoryRequestType } from "@/interfaces/invRequests.interface";

import { create } from "zustand";

type States = {
  invRequests: InventoryRequestType[];
};

type Actions = {
  setInvRequests: (invRequests: InventoryRequestType[]) => void;
};

// Crear el store
export const useInvRequestsStore = create<States & Actions>((set) => ({
  invRequests: [],

  setInvRequests: (invRequests) => {
    set({ invRequests });
  },
}));
