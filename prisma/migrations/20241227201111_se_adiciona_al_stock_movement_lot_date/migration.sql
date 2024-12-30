-- DropIndex
DROP INDEX "StockMovement_Movement_productId_idx";

-- AlterTable
ALTER TABLE "StockMovement" ADD COLUMN     "Movement_destination" TEXT NOT NULL DEFAULT 'bodega',
ADD COLUMN     "Movement_lotDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "StockMovement_Movement_productId_Movement_destination_idx" ON "StockMovement"("Movement_productId", "Movement_destination");
