"use server";

import { prisma } from "@/lib/db";

export const getMovementsById = async (productId: number) => {
  try {
    const movements = await prisma.stockMovement.findMany({
      where: {
        Movement_productId: productId,
      },
      select: {
        Movement_id: true,
        Movement_type: true,
        Movement_qty: true,
        Movement_reason: true,
        Movement_date: true,
        Movement_productId: true,
        Movement_destination: true,
        Movement_relatedId: true,

        User: {
          select: {
            User_name: true,
            User_surname: true,
          },
        },
        BatchInventory: {
          select: {
            Batch_id: true,
            Batch_code: true,
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
    console.error("Error al obtener los movimientos de inventario: ", error); //* Mejor manejo del error
    return {
      ok: false,
      data: null,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
