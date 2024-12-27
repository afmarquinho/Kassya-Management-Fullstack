-- AlterTable
ALTER TABLE "PurchaseItem" ADD COLUMN     "Item_qtyDispatched" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "StockMovement_Movement_productId_idx" ON "StockMovement"("Movement_productId");
