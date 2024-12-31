import { Category } from "@prisma/client";
import { create } from "zustand";

type States = {
  categories: Category[]; // Alamcena todas las categorías
  deleteCategoryModal: {
    isOpen: boolean; // Controla si el modal está abierto o cerrado
    categoryId: number | null; // Almacena el ID de la categoría
  };
};

type Actions = {
  setDeleteCategoryModal: (modalState: {
    isOpen: boolean;
    categoryId: number | null;
  }) => void;
  setCategories: (categories: Category[]) => void;
};

export const useCategoryStore = create<States & Actions>((set) => ({
  categories: [],
  deleteCategoryModal: {
    isOpen: false,
    categoryId: null,
  },

  setDeleteCategoryModal: (modalState) => {
    set({ deleteCategoryModal: modalState });
  },
  setCategories: (categories) => {
    set({ categories });
  },
}));
