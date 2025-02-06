import { PrismaClient } from '@prisma/client';
import { env } from './env';
export * from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? [] : ['error'],
  });

export type PrismaExtends = Parameters<typeof prisma.$extends>[0];

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
