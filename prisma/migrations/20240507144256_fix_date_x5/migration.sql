-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "subscriptionStartDate" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "subscriptionExpireDate" SET DATA TYPE TIMESTAMPTZ;
