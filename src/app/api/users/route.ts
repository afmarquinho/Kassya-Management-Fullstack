
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { User_surname: 'asc' },
    });
    return NextResponse.json({ ok: true, data: users });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, data: null });
  }
}
