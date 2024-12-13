"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createProvisionRequest(
  Prov_productId: number,
  Prov_requestedBy: number,
  Prov_quantity: number,
  Prov_desc: string
) {
  const provisionRequest = await prisma.provisionRequest.create({
    data: {
      Prov_productId,
      Prov_quantity,
      Prov_requestedBy,
      Prov_desc,
    },
  });
  if (provisionRequest) {
    revalidatePath(`/inventory/inventory-management/product/${Prov_productId}`)
    return {
      ok: true,
      data: provisionRequest,
      message: "Solicitud creada exitosamente",
    };
  } else {
    return {
      ok: false,
      data: null,
      message: "Error al crear el requerimiento",
    };
  }
}

export async function getPendingRequests(productId: number) {
  const pendingRequests = await prisma.provisionRequest.findMany({
    where: {
      Prov_productId: productId,
      Prov_status: "pending", // Filtrar solo las solicitudes pendientes
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
      Prov_id: "desc", // Ordenar por fecha de creación
    },
  });

  if (pendingRequests) {
    return {
      ok: true,
      data: pendingRequests,
      message: "Cargado",
    };
  } else {
    return {
      ok: false,
      data: null,
      message: "Error al cargar el requerimiento",
    };
  }
}

export async function updateProvisionRequestStatus(
  Prov_id: number,
  Prov_status: string
) {
  const updatedRequest = await prisma.provisionRequest.update({
    where: {
      Prov_id,
    },
    data: {
      Prov_status, // El nuevo estado puede ser 'completed', 'rejected', etc.
    },
  });

  if (updatedRequest) {
    return {
      ok: true,
      data: updatedRequest,
      message: "Actualizado",
    };
  } else {
    return {
      ok: false,
      data: null,
      message: "Error al actualizar el requerimiento",
    };
  }
}
