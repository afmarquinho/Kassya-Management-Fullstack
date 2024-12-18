"use server";

import { prisma } from "@/lib/db";

export const getMovementsById = async (productId: number) => {
  try {
    const movements = await prisma.stockMovement.findMany({
      where: {
        Movement_productId: productId,
      },
      include: {
        User: {
          select: {
            User_name: true,
            User_surname: true,
          },
        },
      },
      orderBy: {
        Movement_date: "asc",
      },
    });
    if (!movements) {
      return {
        ok: false,
        data: null,
        message: "No se cargaron los movimietos del producto",
      };
    }

    return {
      ok: true,
      data: movements,
      message: "Movimientos cargados",
    };
  } catch (error) {
    console.error("Error al obtener los movimientos de inventario: ", error); // Mejor manejo del error
    return {
      ok: false,
      data: null,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
