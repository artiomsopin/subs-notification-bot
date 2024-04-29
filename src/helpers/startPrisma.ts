import { PrismaClient } from "@prisma/client";

export const prisma: PrismaClient = new PrismaClient();

export default async function startPrisma() {
  return prisma.$connect;
}
