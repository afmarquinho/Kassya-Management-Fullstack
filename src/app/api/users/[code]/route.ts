import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const code = pathname.split("/").pop();

  if (!code) {
    return NextResponse.json(
      { error: "Parámetro 'code' no proporcionado", ok: false },
      { status: 400 }
    );
  }
  try {
    const user = await prisma.user.findUnique({
      where: { User_code: code },
    });
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, data: user }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener el usuario", ok: false },
      { status: 500 }
    );
  }
}
