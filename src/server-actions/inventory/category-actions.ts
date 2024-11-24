"use server";

import { prisma } from "@/lib/db";
import { Category } from "@prisma/client";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        Category_name: "asc",
      },
    });

    if (!categories || categories.length === 0) {
      return { ok: false, data: null, message: "No se encontraron categorías" };
    }

    return {
      ok: true,
      data: categories,
      message: "Categorías cargadas exitosamente",
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      ok: false,
      data: null,
      message: "Ha ocurrido un error en la solicitud",
    };
  }
};

export const delteCategory = async (categoryId: number) => {
  try {
    await prisma.category.delete({
      where: {
        Category_id: categoryId,
      },
    });

    return {
      ok: true,
      data: null,
      message: "Categorías eliminada exitosamente",
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      ok: false,
      data: null,
      message: "Ha ocurrido un error en la solicitud",
    };
  }
};

export const updateCategory = async (data: Category) => {
  try {
    const category = await prisma.category.update({
      where: {
        Category_id: data.Category_id,
      },
      data,
    });

    if (!category) {
      return {
        ok: false,
        data: null,
        message: "Categroría no encontrada",
      };
    }
    return {
      ok: true,
      data: category,
      message: null,
    };
  } catch (error) {
    console.error("Error al editar la categoría:", error);
    return {
      ok: false,
      message: "Error interno del servidor. Inténtalo nuevamente.",
      data: null,
    };
  }
};

type CreateCategoryParams = {
  name: string;
};

export const createCategory = async ({ name }: CreateCategoryParams) => {
  if (!name || typeof name !== "string") {
    return {
      ok: false,
      data: null,
      message: "El nombre de la categoría es obligatorio y debe ser un texto.",
    };
  }

  try {
    // Validar si el nombre ya existe.
    const existingCategory = await prisma.category.findUnique({
      where: {
        Category_name: name,
      },
    });

    if (existingCategory) {
      return {
        ok: false,
        data: null,
        message: "La categoría ya existe.",
      };
    }
   
    const newCategory = await prisma.category.create({
      data: {
        Category_name: name,
      },
    });
   

    return {
      ok: true,
      data: newCategory,
      message: null,
    };
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    return {
      ok: false,
      message: "Error interno del servidor. Inténtalo nuevamente.",
      data: null,
    };
  }
};
