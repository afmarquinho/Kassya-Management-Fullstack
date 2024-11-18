"use server";

import { prisma } from "@/lib/db";

export const getPurchases = async () => {
  try {
    const purchases = await prisma.purchase.findMany({
      orderBy: {
        Purchase_date: "asc", // Si es necesario ordenar por fecha
      },

      include: {
        Supplier: {
          select: {
            Supplier_name: true, // Selección solo del nombre del proveedor
          },
        },
      },
    });
    //* Formatear el tipo decimal a moneda (string)
    const formatPurchases = purchases.map((purchase) => ({
      ...purchase,
      Purchase_totalAmount:
        purchase.Purchase_totalAmount.toNumber().toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    }));

    return { ok: true, data: formatPurchases };
  } catch (error) {
    console.error("Error al obtener las compras: ", error); // Mejor manejo del error
    return {
      ok: false,
      data: null,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

export const getPurchaseDetails = async (purchaseId: number) => {
  try {
    const purchaseDetails = await prisma.purchase.findUnique({
      where: {
        Purchase_id: purchaseId,
      },

      include: {
        Supplier: {
          select: {
            Supplier_nit: true,
            Supplier_contactInfo: true,
            Supplier_email: true,
            Supplier_phoneNumber: true,
            Supplier_name: true,
          },
        },
        User: {
          select: {
            User_name: true,
            User_surname: true,
          },
        },
        PurchaseItem: true,
      },
    });

    if (!purchaseDetails) {
      return {
        ok: false,
        data: null,
        message: "Compra no entontrada",
      };
    }

    //* Formatear `Purchase_totalAmount`, `Item_unitCost` y `Item_totalAmount`

    const formatPurchaseDetails = {
      ...purchaseDetails,
      Purchase_totalAmount:
        purchaseDetails.Purchase_totalAmount.toNumber().toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        ),
      PurchaseItem: purchaseDetails.PurchaseItem.map((item) => ({
        ...item,
        Item_unitCost: item.Item_unitCost.toNumber().toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
        Item_totalAmount: item.Item_totalAmount.toNumber().toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        ),
      })),
    };

    return { ok: true, data: formatPurchaseDetails };
  } catch (error) {
    console.error("Error al obtener la compra: ", error); // Mejor manejo del error
    return {
      ok: false,
      data: null,
      message: error instanceof Error ? error.message : "Error desconodico",
    };
  }
};

export const closePurchase = async (purchaseId: number) => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        Purchase_id: purchaseId,
      },
    });
    console.log(purchase);
  } catch (error) {
    console.error("Error al cerrar la compra: ", error);
    return {
      ok: false,
      data: null,
      message: error instanceof Error ? error.message : "Error desconodico",
    };
  }
};

export const deletePurchase = async (purchaseId: number) => {
  try {
    const items = await prisma.purchaseItem.findMany({
      where: { Item_purchaseId: purchaseId },
    });
    if (items.length > 0) {
      return {
        ok: false,
        data: null,
        message:
          "No se puede eliminar un compra si tines ítems asociados a ella.",
      };
    }
    await prisma.purchase.delete({
      where: {
        Purchase_id: purchaseId,
      },
    });

    return {
      ok: true,
      data: "Compra eliminada exitosamente",
    };
  } catch (error) {
    console.error("Error al eliminar la compra: ", error);
    return {
      ok: false,
      data: null,
      message: error instanceof Error ? error.message : "Error desconodico",
    };
  }
};
