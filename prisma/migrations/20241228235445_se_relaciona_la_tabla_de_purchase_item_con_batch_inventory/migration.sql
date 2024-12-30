/*
  Warnings:

  - A unique constraint covering the columns `[Batch_itemId]` on the table `BatchInventory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BatchInventory_Batch_itemId_key" ON "BatchInventory"("Batch_itemId");
