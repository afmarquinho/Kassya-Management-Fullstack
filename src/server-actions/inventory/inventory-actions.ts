"use server";

import { prisma } from "@/lib/db";

export const getPurchaseInventory = async (purchaseId: number) => {
  try {
    const purchases = await prisma.purchase.findUnique({
      where: {
        Purchase_id: purchaseId,
      },

      select: {
        Purchase_id: true,
        Purchase_date: true,
        Purchase_description: true,
        Purchase_dueDate: true,
        Purchase_processed: true,
        Purchase_close: true,
        Supplier: {
          select: {
            Supplier_name: true,
            Supplier_city: true,
            Supplier_contactInfo: true,
            Supplier_email: true,
            Supplier_phoneNumber: true,
          },
        },
        PurchaseItem: {
          select: {
            Item_id: true,
            Item_description: true,
            Item_name: true,
            Item_qtyOrdered: true,
            Item_location: true,
            Item_qtyReceived: true,
            Item_ref: true,
            Item_status: true,
          },
        },
        PurchaseNote: {
          orderBy: {
            Note_createdAt: "desc",
          },
          select: {
            Note_id: true,
            Note_content: true,
            Note_createdAt: true,
            User: {
              select: {
                User_name: true,
                User_surname: true,
              },
            },
          },
        },
      },
    });

    return { ok: true, data: purchases };
  } catch (error) {
    console.error("Error al obtener las compras: ", error); // Mejor manejo del error
    return {
      ok: false,
      data: null,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        Category_name: "asc",
      },
    });

    if (!categories || categories.length === 0) {
      return { ok: false, data: null, message: "No se encontraron categorías" };
    }

    return {
      ok: true,
      data: categories,
      message: "Categorías cargadas exitosamente",
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      ok: false,
      data: null,
      message: "Ha ocurrido un error en la solicitud",
    };
  }
};

export const delteCategory = async (categoryId: number) => {
  try {
    await prisma.category.delete({
      where: {
        Category_id: categoryId,
      },
    });

    return {
      ok: true,
      data: null,
      message: "Categorías eliminada exitosamente",
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      ok: false,
      data: null,
      message: "Ha ocurrido un error en la solicitud",
    };
  }
};
