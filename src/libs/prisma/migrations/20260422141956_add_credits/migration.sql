-- CreateEnum
CREATE TYPE "CodeType" AS ENUM ('GIFT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "credit" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "Code" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "CodeType" NOT NULL,
    "code" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);
