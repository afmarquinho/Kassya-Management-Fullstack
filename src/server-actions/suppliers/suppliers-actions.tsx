"use server";

import { prisma } from "@/lib/db";
import { Supplier } from "@prisma/client";
import { Supplier as SupplierType } from "@/interfaces";

//TODO: ARREGLAR EL ID DEL USUARIO QUE CREA EL PROVEEDOR USADO AUTH

export const getSuppliers = async () => {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: {
        Supplier_name: "asc",
      },
    });
    return { ok: true, data: suppliers };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};

export const updateSupplier = async (supplier: Supplier) => {
  try {
    const UpdatedSupplier = await prisma.supplier.update({
      where: {
        Supplier_id: supplier.Supplier_id,
      },
      data: supplier,
    });
    return { ok: true, data: UpdatedSupplier };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};

export const createSupplier = async (supplier: SupplierType) => {
  try {
    const UpdatedSupplier = await prisma.supplier.create({
      data: { ...supplier, Supplier_userId: 1 },
    });
    return { ok: true, data: UpdatedSupplier };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};
