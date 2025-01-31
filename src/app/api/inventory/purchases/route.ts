import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  //* Get only processed and open purchases to register in the inventoryory

  try {
    const processedPurchases = await prisma.purchase.findMany({
      where: {
        Purchase_processed: true,
        Purchase_close: false,
      },
      orderBy: {
        Purchase_date: "asc",
      },
      include: {
        Supplier: {
          select: {
            Supplier_name: true,
          },
        },
      },
    });

     //* Format decimal type to currency (string)
     const formatPurchases = processedPurchases.map((purchase) => ({
        ...purchase,
        Purchase_totalAmount: purchase.Purchase_totalAmount
          ? purchase.Purchase_totalAmount.toNumber().toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          : "0.00", // Manejo seguro si el valor es null o undefined
      }));

    return NextResponse.json(
      {
        ok: true,
        data: formatPurchases,
        message: "Compras cargadas exitosamente",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("No se pudo mostrar las compras: ", error);
    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: error instanceof Error ? error.message :  "Error desconocido",
      },
      { status: 500 }
    );
  }
};
