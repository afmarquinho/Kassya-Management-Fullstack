/*
  Warnings:

  - You are about to drop the column `Product_location` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Product_qtyDispatched` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Product_stockQty` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Movement_lotDate` on the `StockMovement` table. All the data in the column will be lost.
  - You are about to drop the column `Movement_lotNumber` on the `StockMovement` table. All the data in the column will be lost.
  - Added the required column `Movement_batchId` to the `StockMovement` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_Product_location_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Product_location",
DROP COLUMN "Product_qtyDispatched",
DROP COLUMN "Product_stockQty";

-- AlterTable
ALTER TABLE "StockMovement" DROP COLUMN "Movement_lotDate",
DROP COLUMN "Movement_lotNumber",
ADD COLUMN     "Movement_batchId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "BatchInventory" (
    "Batch_id" SERIAL NOT NULL,
    "Batch_code" TEXT NOT NULL,
    "Batch_stockQty" INTEGER NOT NULL DEFAULT 0,
    "Batch_location" TEXT NOT NULL DEFAULT 'Bodega',
    "Batch_userId" INTEGER NOT NULL,
    "Product_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BatchInventory_pkey" PRIMARY KEY ("Batch_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BatchInventory_Batch_code_key" ON "BatchInventory"("Batch_code");

-- AddForeignKey
ALTER TABLE "BatchInventory" ADD CONSTRAINT "BatchInventory_Product_id_fkey" FOREIGN KEY ("Product_id") REFERENCES "Product"("Product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_Movement_batchId_fkey" FOREIGN KEY ("Movement_batchId") REFERENCES "BatchInventory"("Batch_id") ON DELETE RESTRICT ON UPDATE CASCADE;
