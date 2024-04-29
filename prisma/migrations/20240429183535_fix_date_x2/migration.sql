-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "subscriptionStartDate" SET DATA TYPE TIMETZ(6),
ALTER COLUMN "subscriptionExpireDate" SET DATA TYPE TIMETZ(6);
