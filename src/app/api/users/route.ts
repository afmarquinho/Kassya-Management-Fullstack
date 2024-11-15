import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { User_surname: "asc" },
    });
    return NextResponse.json( { ok: true, data: users }, { status: 201 },);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, data: null }, { status: 500 });
  }
}
