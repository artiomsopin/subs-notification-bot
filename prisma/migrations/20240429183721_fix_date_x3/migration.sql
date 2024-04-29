/*
  Warnings:

  - Changed the type of `subscriptionStartDate` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `subscriptionExpireDate` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "subscriptionStartDate",
ADD COLUMN     "subscriptionStartDate" DATE NOT NULL,
DROP COLUMN "subscriptionExpireDate",
ADD COLUMN     "subscriptionExpireDate" DATE NOT NULL;
