/*
  Warnings:

  - You are about to drop the column `Product_createdAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Movement_date` on the `StockMovement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Product_createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "StockMovement" DROP COLUMN "Movement_date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
