import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// type AddCommentsProps = {
//     purchaseId: number;
//     text: string;
//   };

export const POST = async (req: Request) => {
  const body = await req.json();
  console.log("Body recibido:", body);


  if (!body.purchaseId || !body.text) {
    console.error("El ID de la compra o el texto son inválidos.");
    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: "Datos inválidos",
      },
      { status: 404 }
    );
  }

  const { purchaseId, text } = body;

  if (text.length > 100) {
    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: "El comentario excede los 100 caracteres",
      },
      { status: 400 }
    );
  }

  console.log("-----------------")
  console.log("DESPUES DE LA VALIDACIÓN")
  console.log("Purchase id: ", purchaseId)
  console.log("-----------------")
  console.log("texto: ", text)

  try {
    const newNote = await prisma.purchaseNote.create({
      data: {
        Note_content: text,
        Note_userId: 1,
        Note_purchaseId: purchaseId,
      },
    });

    if (!newNote) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "No se pudo agregar el comentario",
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        ok: true,
        data: newNote,
        message: "Comentario agregado",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al agregar el comentario: ", error);
    return NextResponse.json({
      ok: false,
      data: null,
      message: "Error desconocido",
    }, 
    { status: 500 }

);
  }
};
