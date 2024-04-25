import { PrismaClient } from "@prisma/client";

export default async function startPrisma() {
  return new PrismaClient().$connect();
}
