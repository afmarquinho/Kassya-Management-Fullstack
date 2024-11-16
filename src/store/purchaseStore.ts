import { Purchase } from '@prisma/client';
import { create } from 'zustand';

type States = {
  purchases: Purchase[] | null //*Almacena todas las compras que vienen que la bd para visulizar en la página principal.
  purchase: Purchase | null; //* Compra para visualizar o llenar el formulario para editar.
  purchaseModalOpen: boolean; //* Activa el modal del formulario para crear y editar una compra.
};

type Actions = {
  setPurchases: (purchases: Purchase[]) => void; //* Llena el estado de las compras.
  setPurchase: (purchase: Purchase) => void; //* Llena el estado de la compra
  cleanPurchase: () => void; //* Vacía la compra.
  togglePurchaseModal: () => void; //* Activa o desactiva el modal del formulario para crear o editar.
  updatePurchases: (action: string, purchase: Purchase) => void; //* Actualiza (crea o edita) el array de compras.
};


export const usePurchaseStore = create< States & Actions>((set, get) => ({
  purchases: null,
  purchase: null,
  purchaseModalOpen: false,

  setPurchases: (purchases) => {
    set({purchases: purchases})
    
 },
 setPurchase: (purchase) => {
    set({ purchase });
  },
  cleanPurchase: () => {
    set({ purchase: null });
  },
  updatePurchases: (action, purchase) => {
    if (!purchase) {
      console.error("Compra no válida");
      return;
    }

    const { purchases } = get();
    

    if (action === "add") {
      set(() => ({
        purchases: !purchases ? [purchase]:[...purchases, purchase],
      }));
    } else if (action === "update") {
      if (typeof purchase.Purchase_id !== "number") {
        console.error("Id del la compra inválida");
        return;
      }
      if (!purchases) return;
      set(() => ({
        purchases: purchases.map((item) =>
          item.Purchase_id === purchase.Purchase_id ? purchase : item
        ),
      }));
    } else {
      console.error("Acción no reconocida");
    }
  },
  togglePurchaseModal: () => {
    const { purchaseModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ purchaseModalOpen: !purchaseModalOpen });
  },

}));