"use server";

import { prisma } from "@/lib/db";

export const getPurchases = async () => {
  try {
    const purchases = await prisma.purchase.findMany({
      orderBy: {
        Purchase_date: "asc",
      },
    });
    return { ok: true, data: purchases };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};
