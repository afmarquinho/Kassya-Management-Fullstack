import { User } from "@prisma/client";
import { create } from "zustand";

type States = {
  users: User[] | null; //*Almacena todos los usuarios que vienen que la bd para visulizar en la página principal.
  userModalOpen: boolean; //* Activa el modal del formulario para crear y editar usuarios.
  user: User | null; //* Usuario para visualizar o llenar el formulario para editar.
  activeUserModal: boolean; //* Modal para activar o desactivar usuario.
};

type Actions = {
  setUsers: (users: User[] | null) => void; //* Llena los usuarios.
  updateUsers: (action: string, user: User) => void; //* Actualiza (crea o edita) el array de usuarios.
  toggleUsersModal: () => void; //* Activa o desactiva el modal del formulario para crear o editar.
  setUser: (user: User) => void; //* Llena el usuario.
  cleanUser: () => void; //* Vacía el usuario.
  toggleActiveUserModal: () => void;
};

// Crear el store
export const useUserStore = create<States & Actions>((set, get) => ({
  users: null,
  userModalOpen: false,
  user: null,
  activeUserModal: false,

  setUsers: (users) => {
    set({ users });
  },

  updateUsers: (action, user) => {
    if (!user) {
      console.error("Usuario no válido");
      return;
    }

    const { users } = get();

    if (action === "add") {
      set(() => ({
        users: !users ? [user] : [...users, user],
      }));
    } else if (action === "update") {
      if (typeof user.User_id !== "number") {
        console.error("Id del usuario inválido");
        return;
      }
      if (!users) return;
      set(() => ({
        users: users.map((item) =>
          item.User_id === user.User_id ? user : item
        ),
      }));
    } else {
      console.error("Acción no reconocida");
    }
  },

  toggleUsersModal: () => {
    const { userModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ userModalOpen: !userModalOpen });
  },

  setUser: (user) => {
    set({ user });
  },

  cleanUser: () => {
    set({ user: null });
  },

  toggleActiveUserModal: () => {
    const { activeUserModal } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ activeUserModal: !activeUserModal });
  },
}));
