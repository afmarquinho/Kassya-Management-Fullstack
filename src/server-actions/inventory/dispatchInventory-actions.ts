"use server";
import { prisma } from "@/lib/db";

// export const getItemsToDispatch = async (productId: number) => {
//   try {
//     if (!productId) {
//       return {
//         ok: false,
//         message: "Faltan datos requeridos.",
//         data: null,
//       };
//     }
//     const items = await prisma.purchaseItem.findMany({
//       where: {
//         Item_productId: productId,
//       },
//     });

//     if (!items || items.length < 1) {
//       return {
//         ok: false,
//         message: "No hay productos asociados",
//         data: null,
//       };
//     }

//     // Filtrar los ítems disponibles (cantidad recibida > cantidad despachada)
//     const availableItems = items.filter(
//       (item) => item.Item_qtyReceived > item.Item_qtyDispatched
//     );
//     if (availableItems.length === 0) {
//       return {
//         ok: false,
//         message: "No hay ítems disponibles para despachar.",
//         data: null,
//       };
//     }
//     return {
//       ok: true,
//       message: "Ítems disponibles encontrados.",
//       data: availableItems,
//     };
//   } catch (error) {
//     console.error("Error al obtener los ítems disponibles:", error);
//     return {
//       ok: false,
//       message: "Ocurrió un error al procesar la solicitud.",
//       data: null,
//     };
//   }
// };

export const getDispatchReq = async () => {
  try {
    const disp = await prisma.inventoryRequests.findMany({
      include: {
        Department: {
          select: {
            Dep_name: true,
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

 export const dispatchProduct = async (productId: number, requestedQty: number, userId: number) => {

   const dispatchedLots: { batchCode: string; quantity: number }[] = [];  
  //  Para registrar los lotes y cantidades tomadas
   let remainingQty = requestedQty;  //Cantidad que aún necesita ser despachada

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
        createdAt: 'asc', // Ordenar por fecha de creación (FIFO)
      },
    });

   for (const batch of availableBatches) {
     if (remainingQty <= 0) break;  //Si ya se cumplió el despacho, salir del bucle

     const dispatchQty = Math.min(remainingQty, batch.Batch_stockQty); // Tomar la cantidad mínima entre lo necesario y lo disponible
     remainingQty -= dispatchQty;  //Reducir la cantidad restante por la cantidad tomada

      // Registrar el lote y la cantidad despachada
     dispatchedLots.push({
       batchCode: batch.Batch_code,
       quantity: dispatchQty,
     });

      // Actualizar el movimiento en la base de datos
     await prisma.batchInventory.update({
       where: {Batch_id: batch.Batch_id},
       data: {
         Batch_stockQty: batch.Batch_stockQty - dispatchQty,  //Reducir la cantidad en el lote
       },
     });

      // Registrar el movimiento de salida
   await prisma.stockMovement.create({
    data: {
      Movement_type: 'salida',
      Movement_qty: requestedQty,
      Movement_reason: 'despacho',
      Movement_date: new Date(),
      Movement_productId: productId,
      Movement_userId: userId,
      Movement_batchId: batch.Batch_id
    },
  });
   }

   // Verificar si se pudo cumplir el despacho completo
   if (remainingQty > 0) {
     throw new Error(
       `No hay suficiente inventario para cumplir con el despacho. Faltan ${remainingQty} unidades.`
     );
   }

   
    // Respuesta con los lotes utilizados
   return {
     message: 'Despacho realizado con éxito',
     dispatchedLots,  //Lotes y cantidades tomadas
   };
 }
