// import { prisma } from "@/lib/db";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body =  await req.json();
//     console.log("Body recibido:", body);

//     // const newUser = await prisma.user.create({
//     //   data: body,
//     // });
//     // return NextResponse.json({ ok: false, data: newUser }, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ ok: false, data: null }, { status: 500 });
//   }
// }
