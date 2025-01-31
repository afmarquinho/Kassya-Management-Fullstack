import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  const body = await req.json();
  
if (!body || !body.productData || !body.userId) {
  throw new Error("Datos inválidos: productData o userId no fueron proporcionados.");
}
const { productData, userId } = body;

  try {
    // console.log("Datos recibidos:", productData);
    // Validar existencia del ítem de compra antes de iniciar la transacción
    const purchaseItem = await prisma.purchaseItem.findUnique({
      where: { Item_id: productData.Item_id },
    });
    if (!purchaseItem) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "El ítem de compra no existe.",
        },
        { status: 404 }
      );
    }

    console.log("-------------------")
    console.log("product data: ", productData)
    console.log("-------------------")
    console.log("user id: ", userId)
    
    const result = await prisma.$transaction(async (tx) => {
      // Buscar o crear el producto
      const product = await tx.product.upsert({
        where: { Product_ref: productData.Product_ref },
        update: {
          Product_stockQty: {
            increment: productData.Product_qtyReceive || 0,
          },
        },
        create: {
          Product_name: productData.Product_name,
          Product_ref: productData.Product_ref,
          Product_categoryId: productData.Product_categoryId,
          Product_stockQty: productData.Product_qtyReceive,
        },
      });

      // Gestionar el lote
      const batch = await tx.batchInventory.upsert({
        where: { Batch_code: productData.Product_batchCode },
        update: {
          Batch_stockQty: {
            increment: productData.Product_qtyReceive,
          },
        },
        create: {
          Batch_code: productData.Product_batchCode,
          Batch_stockQty: productData.Product_qtyReceive,
          Batch_userId: userId,
          Batch_itemId: productData.Item_id,
          createdAt: productData.Product_batchDate,
        },
      });

      // Registrar movimiento de inventario
      await tx.stockMovement.create({
        data: {
          Movement_type: "entrada",
          Movement_qty: productData.Product_qtyReceive || 0,
          Movement_reason: productData.reason || "compra",
          Movement_productId: product.Product_id,
          Movement_userId: userId,
          Movement_relatedId: productData.Product_purchaseId,
          Movement_batchId: batch.Batch_id,
        },
      });

      // Actualizar el ítem de compra
      await tx.purchaseItem.update({
        where: { Item_id: productData.Item_id },
        data: {
          Item_qtyReceived: {
            increment: productData.Product_qtyReceive || 0,
          },
        },
      });

      return NextResponse.json(
        {
          ok: true,
          data: product,
          message: `Producto ${product.Product_name} procesado exitosamente.`,
        },
        { status: 201 }
      );
    });

    return result;
  } catch (error) {
    console.error("Error al registrar producto con movimiento:", error);
    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
};
