import { Purchases } from "@/interfaces";
import { Purchase } from "@prisma/client";
import { create } from "zustand";

type States = {
  purchases: Purchases[] | null; //*Almacena todas las compras que vienen que la bd para visulizar en la página principal.
  purchase: Purchase | null; //* Compra para visualizar o llenar el formulario para editar.
  purchaseModalOpen: boolean; //* Activa el modal del formulario para crear y editar una compra.
  closePurchaseModalOpen: boolean; //* Activa el modal para cerrar la compra
  purchaseId: number | null; //* almacena el id para cerrar la compra
  deletePurchaseModalOpen: boolean; //*Activa el modal para eliminar un compra.
};

type Actions = {
  setPurchases: (purchases: Purchases[]) => void; //* Llena el estado de las compras.
  setPurchase: (purchase: Purchase) => void; //* Llena el estado de la compra
  cleanPurchase: () => void; //* Vacía la compra.
  togglePurchaseModal: () => void; //* Maneja el estado que activa el modal del formulario para crear o editar.
  updatePurchases: (action: string, purchase: Purchase) => void; //* Actualiza (crea o edita) el array de compras.
  toggleClosePurchaseModal: () => void; //* Maneja estado que activa el modal de cerrar compra.
  setPurchaseId: (purchaseId: number) => void; //* Llena el estado que almacena el purchase_id.
  cleanPurchaseId: () => void; //* Limpia el estado que almacena el purchase_id.
  toggleDeletePurchaseModal: () => void;
};

export const usePurchaseStore = create<States & Actions>((set, get) => ({
  purchases: null,
  purchase: null,
  purchaseModalOpen: false,
  closePurchaseModalOpen: false,
  purchaseId: null,
  deletePurchaseModalOpen: false,

  setPurchases: (purchases) => {
    set({ purchases: purchases });
  },
  setPurchase: (purchase) => {
    set({ purchase });
  },
  cleanPurchase: () => {
    set({ purchase: null });
  },
  updatePurchases: (action, purchase) => {},

  // updatePurchases: (action, purchase) => {
  //   if (!purchase) {
  //     console.error("Compra no válida");
  //     return;
  //   }

  //   const { purchases } = get();

  //   if (action === "add") {
  //     set(() => ({
  //       purchases: !purchases ? [purchase]:[...purchases, purchase],
  //     }));
  //   } else if (action === "update") {
  //     if (typeof purchase.Purchase_id !== "number") {
  //       console.error("Id del la compra inválida");
  //       return;
  //     }
  //     if (!purchases) return;
  //     set(() => ({
  //       purchases: purchases.map((item) =>
  //         item.Purchase_id === purchase.Purchase_id ? purchase : item
  //       ),
  //     }));
  //   } else {
  //     console.error("Acción no reconocida");
  //   }
  // },
  togglePurchaseModal: () => {
    const { purchaseModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ purchaseModalOpen: !purchaseModalOpen });
  },

  toggleClosePurchaseModal: () => {
    const { closePurchaseModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ closePurchaseModalOpen: !closePurchaseModalOpen });
  },
  setPurchaseId: (purchaseId) => {
    set({ purchaseId });
  },
  cleanPurchaseId: () => {
    set({ purchaseId: null });
  },
  toggleDeletePurchaseModal: ()=>{
    const { deletePurchaseModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ deletePurchaseModalOpen: !deletePurchaseModalOpen });
  }
}));
