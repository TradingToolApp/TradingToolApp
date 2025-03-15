/*
  Warnings:

  - The `status` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `url` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ProductTranslation` table. All the data in the column will be lost.
  - You are about to drop the column `registeredDevices` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Subscription` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `VerificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `identifier` on the `VerificationToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,token]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `allowedVersion` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forceUpdateCode` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latestVersion` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlDownload` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlPost` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionType` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `VerificationToken` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('INDICATOR', 'EA', 'INDI_PRO', 'EA_PRO', 'PLUS');

-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('MT5', 'MT4');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('PUBLIC', 'PRIVATE', 'PROTECTED', 'HIDDEN');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SubscriptionType" ADD VALUE 'LIFETIME';
ALTER TYPE "SubscriptionType" ADD VALUE 'TRIAL';

-- DropIndex
DROP INDEX "ProductTranslation_name_key";

-- DropIndex
DROP INDEX "Subscription_licenseKey_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "status",
ADD COLUMN     "status" "StatusType" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "url",
ADD COLUMN     "allowedVersion" TEXT NOT NULL,
ADD COLUMN     "forceUpdateCode" TEXT NOT NULL,
ADD COLUMN     "latestVersion" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "platform" "PlatformType" NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "status" "StatusType" NOT NULL DEFAULT 'PUBLIC',
ADD COLUMN     "type" "ProductType" NOT NULL,
ADD COLUMN     "urlDownload" TEXT NOT NULL,
ADD COLUMN     "urlPost" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductTranslation" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "registeredDevices",
DROP COLUMN "type",
ADD COLUMN     "packageId" TEXT,
ADD COLUMN     "productId" TEXT,
ADD COLUMN     "subscriptionType" "SubscriptionType" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "RoleType" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_pkey",
DROP COLUMN "identifier",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_PostToTag_AB_unique";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "type" "ProductType" NOT NULL,
    "platform" "PlatformType" NOT NULL,
    "urlDownload" TEXT NOT NULL,
    "urlPost" TEXT NOT NULL,
    "monthlyPrice" TEXT NOT NULL,
    "originalMonthlyPrice" TEXT NOT NULL,
    "yearlyPrice" TEXT NOT NULL,
    "originalYearlyPrice" TEXT NOT NULL,
    "monthlyPriceByYearlyPrice" TEXT NOT NULL,
    "status" "StatusType" NOT NULL DEFAULT 'PUBLIC',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageTranslation" (
    "id" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PackageTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionDevice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SubscriptionDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PackageToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PackageToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Package_id_key" ON "Package"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Package_name_key" ON "Package"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PackageTranslation_packageId_languageCode_key" ON "PackageTranslation"("packageId", "languageCode");

-- CreateIndex
CREATE INDEX "_PackageToProduct_B_index" ON "_PackageToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- AddForeignKey
ALTER TABLE "PackageTranslation" ADD CONSTRAINT "PackageTranslation_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageTranslation" ADD CONSTRAINT "PackageTranslation_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionDevice" ADD CONSTRAINT "SubscriptionDevice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PackageToProduct" ADD CONSTRAINT "_PackageToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PackageToProduct" ADD CONSTRAINT "_PackageToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
