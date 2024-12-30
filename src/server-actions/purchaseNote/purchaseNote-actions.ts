"use server";

import { prisma } from "@/lib/db";

type AddCommentsProps = {
  purchaseId: number;
  text: string;
};

export const addNote = async ({ purchaseId, text }: AddCommentsProps) => {
  if (!purchaseId || !text) {
    console.error("El ID de la compra o el texto son inválidos:", {
      purchaseId,
      text,
    });
    return {
      ok: false,
      data: null,
      message: "Datos inválidos",
    };
  }

  if (text.length > 100) {
    return {
      ok: false,
      data: null,
      message: "El comentario excede los 100 caracteres",
    };
  }

  try {
    const newNote = await prisma.purchaseNote.create({
      data: {
        Note_content: text,
        Note_userId: 1,
        Note_purchaseId: purchaseId,
      },
    });

    if (newNote) {
      return {
        ok: true,
        data: newNote,
        message: "Comentario agregado exitosamente",
      };
    } else {
      return {
        ok: false,
        data: null,
        message: "No se pudo agregar el comentario",
      };
    }
  } catch (error) {
    console.error("Error al agregar el comentario: ", error);
    return {
      ok: false,
      data: null,
      message: "Error desconocido",
    };
  }
};
