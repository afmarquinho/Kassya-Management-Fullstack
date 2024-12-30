/*
  Warnings:

  - You are about to drop the column `Batch_productId` on the `BatchInventory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BatchInventory" DROP CONSTRAINT "BatchInventory_Batch_productId_fkey";

-- AlterTable
ALTER TABLE "BatchInventory" DROP COLUMN "Batch_productId";
