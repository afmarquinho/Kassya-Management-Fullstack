"use server";
import { prisma } from "@/lib/db";

export const getDispatchReq = async () => {
  try {
    const disp = await prisma.inventoryRequests.findMany({
      where: {
        Req_close: false,
      },
      include: {
        Department: {
          select: {
            Dep_name: true,
          },
        },
        Product: {
          select: {
            Product_name: true,
            Product_id:true,
          },
        },
      },
    });
    if (!disp || disp.length === 0) {
      return {
        ok: false,
        data: null,
        message: "No hay solicitudes aún.",
      };
    }
    return {
      ok: true,
      data: disp,
      message: "Solicitudes obtenidas con éxito.",
    };
  } catch (error) {
    console.error("Error al obtener las solicitudes: ", error);
    return {
      ok: false,
      message: "Ocurrió un error al procesar la solicitud.",
      data: null,
    };
  }
};

export const dispatchProduct = async (
  productId: number,
  requestedQty: number,
  userId: number,
  closeReq: boolean,
  reqId: number
) => {
  const dispatchedLots: { batchCode: string; quantity: number }[] = [];
  //  Para registrar los lotes y cantidades tomadas
  let remainingQty = requestedQty; //Cantidad que aún necesita ser despachada

  // Obtener los lotes disponibles en orden FIFO (los más antiguos primero)
  const availableBatches = await prisma.batchInventory.findMany({
    where: {
      AND: [
        { Batch_stockQty: { gt: 0 } }, // Solo lotes con cantidad disponible
        {
          PurchaseItem: {
            Item_productId: productId, // Filtrar por el producto dado
          },
        },
      ],
    },
    orderBy: {
      createdAt: "asc", // Ordenar por fecha de creación (FIFO)
    },
  });

  for (const batch of availableBatches) {
    if (remainingQty <= 0) break; //Si ya se cumplió el despacho, salir del bucle

    const dispatchQty = Math.min(remainingQty, batch.Batch_stockQty); // Tomar la cantidad mínima entre lo necesario y lo disponible
    remainingQty -= dispatchQty; //Reducir la cantidad restante por la cantidad tomada

    // Registrar el lote y la cantidad despachada
    dispatchedLots.push({
      batchCode: batch.Batch_code,
      quantity: dispatchQty,
    });

    // Actualizar el movimiento en la base de datos
    await prisma.batchInventory.update({
      where: { Batch_id: batch.Batch_id },
      data: {
        Batch_stockQty: batch.Batch_stockQty - dispatchQty, //Reducir la cantidad en el lote
      },
    });

    // Registrar el movimiento de salida
    await prisma.stockMovement.create({
      data: {
        Movement_type: "salida",
        Movement_qty: requestedQty,
        Movement_reason: "despacho",
        Movement_date: new Date(),
        Movement_productId: productId,
        Movement_userId: userId,
        Movement_batchId: batch.Batch_id,
      },
    });
  }

  // Verificar si se pudo cumplir el despacho completo
  if (remainingQty > 0) {
    throw new Error(
      `No hay suficiente inventario para cumplir con el despacho. Faltan ${remainingQty} unidades.`
    );
  }
  if (closeReq) {
    await prisma.inventoryRequests.update({
      where: {
        Req_id: reqId,
      },
      data: {
        Req_close: true,
      },
    });
  }

  // Respuesta con los lotes utilizados
  return {
    ok: true,
    message: "Despacho realizado con éxito",
    data: dispatchedLots, //Lotes y cantidades tomadas
  };
};
