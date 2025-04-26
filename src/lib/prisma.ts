// src/lib/prisma.ts
import { PrismaClient } from '@/generated/prisma';

// Declare a global variable to hold the Prisma Client instance.
// We use 'globalThis' which works in different environments (Node, browser, edge).
// We add '_prisma' to avoid potential naming conflicts.
declare global {
  // eslint-disable-next-line no-var
  var _prisma: PrismaClient | undefined;
}

// Check if we already have an instance in the global scope.
// If not, create a new one. In development, due to Next.js hot reloading,
// 'global._prisma' might already exist, so we reuse it to avoid creating too many connections.
const prisma = globalThis._prisma ?? new PrismaClient();

// In non-production environments, assign the instance to the global scope.
if (process.env.NODE_ENV !== 'production') {
  globalThis._prisma = prisma;
}

// Export the single instance.
export default prisma;