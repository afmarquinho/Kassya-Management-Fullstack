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

// export const dispatchItem = async (
//   lotId: number,
//   qtyToDispatch: number,
//   userId: number
// ) => {
//   try {
//     // Validar que los datos necesarios estén presentes
//     if (!lotId || !qtyToDispatch || !userId) {
//       throw new Error("Faltan datos requeridos.");
//     }

//     // Buscar el item correspondiente
//     const item = await prisma.purchaseItem.findUnique({
//       where: { Item_id: lotId },
//     });

//     if (!item) {
//       throw new Error("El item no existe.");
//     }

//     // Calcular la cantidad disponible para despachar
//     const availableToDispatch = item.Item_qtyDispatched - item.Item_qtyReceived;

//     if (qtyToDispatch > availableToDispatch) {
//       throw new Error("La cantidad a despachar excede la cantidad disponible.");
//     }

//     // Actualizar la cantidad despachada
//     const updatedItem = await prisma.purchaseItem.update({
//       where: { Item_id: lotId },
//       data: {
//         Item_qtyDispatched: {
//           increment: qtyToDispatch,
//         },
//       },
//     });

//     // Registrar el movimiento en StockMovement
//     await prisma.stockMovement.create({
//       data: {
//         Movement_type: "salida",
//         Movement_qty: qtyToDispatch,
//         Movement_reason: "despacho",
//         Movement_date: new Date(),
//         Movement_lotNumber: item.Item_ref,
//         Movement_productId: item.Item_productId,
//         Movement_userId: userId,
//       },
//     });

//     // Retornar el item actualizado
//     return {
//       success: true,
//       message: "Item despachado correctamente.",
//       updatedItem,
//     };
//   } catch (error) {
//     console.error("Error al despachar el item:", error);
//     return {
//       success: false,
//       error: error.message || "Error interno del servidor.",
//     };
//   }
// };
