import { User } from "@prisma/client";
import { create } from "zustand";

type States = {
  users: User[] | null;
  usersModal: boolean;
};

type Actions = {
  setUsers: (users: User[] | null) => void;
  toggleUsersModal: () => void;
};

// Crear el store
export const useUserStore = create<States & Actions>((set, get) => ({
  users: null,
  usersModal: false,

  setUsers: (users) => {
    set({ users });
  },

  toggleUsersModal: () => {
    const { usersModal } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ usersModal: !usersModal });
  },
}));
