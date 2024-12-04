"use server";

import { prisma } from "@/lib/db";

type AddCommentsProps = {
  purchaseId: number;
  note: string;
};

export const addNote = async ({ purchaseId, note }: AddCommentsProps) => {
  if (!purchaseId || !note) {
    console.error("purchaseId o note son inválidos:", { purchaseId, note });
    return {
      ok: false,
      data: null,
      message: "Datos inválidos enviados al servidor",
    };
  }

  if (note.length > 100) {
    return {
      ok: false,
      data: null,
      message: "El comentario excede los 100 caracteres",
    };
  }

  console.log("----------------------------------");
  console.log("DESPUES DE LA VALIDACIÓN", { purchaseId, note });
  console.log("----------------------------------");
  try {
    const newNote = await prisma.purchaseNote.create({
      data: {
        Note_purchaseId: purchaseId,
        Note_content: note,
        Note_userId: 1,
      },
    });
    console.log("----------------------------------");
    console.log("DESPUES DE LA creación en bbdd", { newNote });
    console.log("----------------------------------");

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
