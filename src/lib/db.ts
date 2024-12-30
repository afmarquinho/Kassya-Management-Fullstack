
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Usa una instancia global para evitar múltiples conexiones en desarrollo
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}


