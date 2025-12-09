import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

// Only initialize Prisma if DATABASE_URL is present
let prisma: PrismaClient;

if (process.env.DATABASE_URL) {
  try {
    if (process.env.NODE_ENV !== "production") {
      if (!global.prismaGlobal) {
        global.prismaGlobal = new PrismaClient({
          log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
        });
      }
      prisma = global.prismaGlobal;
    } else {
      prisma = new PrismaClient({
        log: ["error"],
      });
    }
  } catch (error) {
    console.error("Failed to initialize Prisma client:", error);
    // Create a mock Prisma client to prevent crashes
    prisma = {} as PrismaClient;
  }
} else {
  // Create a mock Prisma client for environments without database
  prisma = {} as PrismaClient;
  console.log("DATABASE_URL not found - Prisma client not initialized");
}

export default prisma;
