/*
  Warnings:

  - You are about to drop the column `Product_lotNumber` on the `Product` table. All the data in the column will be lost.
  - Added the required column `Movement_lotNumber` to the `StockMovement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Product_lotNumber";

-- AlterTable
ALTER TABLE "StockMovement" ADD COLUMN     "Movement_lotNumber" TEXT NOT NULL;
