import { StockMovement } from "@/interfaces/stockMovements.interface";
import { create } from "zustand";

type States = {
  movements: StockMovement[];
};

type Actions = {
  setmovements: (movements: StockMovement[]) => void;
};

// Crear el store
export const stockMovementsStore = create<States & Actions>((set) => ({
  movements: [],

  setmovements: (movements) => {
    set({
      movements,
    });
  },
}));
