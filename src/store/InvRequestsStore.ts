import { InventoryRequestType } from "@/interfaces/invRequests.interface";

import { create } from "zustand";

type States = {
  invRequests: InventoryRequestType[];
  dispatchModalOpen: boolean
};

type Actions = {
  setInvRequests: (invRequests: InventoryRequestType[]) => void;
  toggleDispatchModal : ()=> void,
};

// Crear el store
export const useInvRequestsStore = create<States & Actions>((set, get) => ({
  invRequests: [],
  dispatchModalOpen:false,

  setInvRequests: (invRequests) => {
    set({ invRequests });
  },

  toggleDispatchModal: () => {
    const { dispatchModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ dispatchModalOpen: !dispatchModalOpen });
  },
}));
