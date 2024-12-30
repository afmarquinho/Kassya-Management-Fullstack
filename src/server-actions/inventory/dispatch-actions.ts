" use server";

import { prisma } from "@/lib/db";

export const getItemsToDispatch = async (productId: number) => {
  try {
    if (!productId) {
      return {
        ok: false,
        message: "Faltan datos requeridos.",
        data: null,
      };
    }
    const items = await prisma.purchaseItem.findMany({
      where: {
        Item_productId: productId,
      },
    });
    if (!items || items.length < 1) {
      return {
        ok: false,
        message: "No hay productos asociados",
        data: null,
      };
    }

    // Filtrar los ítems disponibles (cantidad recibida > cantidad despachada)
    const availableItems = items.filter(
      (item) => item.Item_qtyReceived > item.Item_qtyDispatched
    );
    if (availableItems.length === 0) {
      return {
        ok: false,
        message: "No hay ítems disponibles para despachar.",
        data: null,
      };
    }
    return {
      ok: true,
      message: "Ítems disponibles encontrados.",
      data: availableItems,
    };
  } catch (error) {
    console.error("Error al obtener los ítems disponibles:", error);
    return {
      ok: false,
      message: "Ocurrió un error al procesar la solicitud.",
      data: null,
    };
  }
};


// export const dispatchProduct = async (productId: number, requestedQty: number, userId: number) => {
 
//   const dispatchedLots: { lotNumber: string; quantity: number }[] = []; // Para registrar los lotes y cantidades tomadas
//   let remainingQty = requestedQty; // Cantidad que aún necesita ser despachada

//   // Obtener los lotes disponibles en orden FIFO (los más antiguos primero)
//   const availableMovements = await prisma.stockMovement.findMany({
//     where: {
//       Movement_productId: productId,
//       Movement_qty: { gt: 0 }, // Solo lotes con cantidad disponible
//       Movement_type: 'entrada', // Solo entradas
//     },
//     orderBy: {
//       Movement_date: 'asc', // Ordenar por fecha (FIFO)
//     },
//   });

//   for (const movement of availableMovements) {
//     if (remainingQty <= 0) break; // Si ya se cumplió el despacho, salir del bucle

//     const dispatchQty = Math.min(remainingQty, movement.Movement_qty); // Tomar la cantidad mínima entre lo necesario y lo disponible
//     remainingQty -= dispatchQty; // Reducir la cantidad restante por la cantidad tomada

//     // Registrar el lote y la cantidad despachada
//     dispatchedLots.push({
//       lotNumber: movement.Movement_lotNumber,
//       quantity: dispatchQty,
//     });

//     // Actualizar el movimiento en la base de datos
//     await prisma.stockMovement.update({
//       where: { Movement_id: movement.Movement_id },
//       data: {
//         Movement_qty: movement.Movement_qty - dispatchQty, // Reducir la cantidad en el lote
//       },
//     });
//   }

//   // Verificar si se pudo cumplir el despacho completo
//   if (remainingQty > 0) {
//     throw new Error(
//       `No hay suficiente inventario para cumplir con el despacho. Faltan ${remainingQty} unidades.`
//     );
//   }

//   // Registrar el movimiento de salida
//   await prisma.stockMovement.create({
//     data: {
//       Movement_type: 'salida',
//       Movement_qty: requestedQty,
//       Movement_reason: 'despacho',
//       Movement_date: new Date(),
//       Movement_productId: productId,
//       Movement_userId: userId,
//     },
//   });

//   // Respuesta con los lotes utilizados
//   return {
//     message: 'Despacho realizado con éxito',
//     dispatchedLots, // Lotes y cantidades tomadas
//   };
// }


