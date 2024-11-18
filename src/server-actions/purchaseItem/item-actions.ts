"use server";

import { prisma } from "@/lib/db";

export const deleteItem = async (itemId: number, purchaseId: number) => {
  try {
    await prisma.purchaseItem.delete({
      where: {
        Item_id: itemId,
      },
    });
    
    const itemsTotal = await prisma.purchaseItem.findMany({
      where: {
        Item_purchaseId: purchaseId,
      },
      select: {
        Item_totalAmount: true,
      },
    });
    const totalAmount = itemsTotal.reduce((sum, item) => sum + item.Item_totalAmount.toNumber(), 0);

    await prisma.purchase.update({
      where: {
        Purchase_id: purchaseId,
      },
      data: {
        Purchase_totalAmount: totalAmount, // Actualiza el total
      },
    });

    return { ok: true, data: "Producto eliminado correctamente" };

  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};

export const updateItem = async (data) => {
  try {
    await prisma.purchaseItem.update({
      where: {
        Item_id: data.Item_id,
      },
      data: data,
    });
    return { ok: true, data: "Producto eliminado correctamente" };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};
