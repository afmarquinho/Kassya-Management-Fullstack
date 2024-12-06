/*
  Warnings:

  - You are about to drop the column `Item_qtyDispatched` on the `PurchaseItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "Product_qtyDispatched" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PurchaseItem" DROP COLUMN "Item_qtyDispatched";

-- CreateIndex
CREATE INDEX "Product_Product_location_idx" ON "Product"("Product_location");
