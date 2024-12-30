/*
  Warnings:

  - You are about to drop the column `Product_id` on the `BatchInventory` table. All the data in the column will be lost.
  - You are about to drop the column `Item_qtyDispatched` on the `PurchaseItem` table. All the data in the column will be lost.
  - Added the required column `Batch_itemId` to the `BatchInventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Batch_productId` to the `BatchInventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BatchInventory" DROP CONSTRAINT "BatchInventory_Product_id_fkey";

-- AlterTable
ALTER TABLE "BatchInventory" DROP COLUMN "Product_id",
ADD COLUMN     "Batch_itemId" INTEGER NOT NULL,
ADD COLUMN     "Batch_productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseItem" DROP COLUMN "Item_qtyDispatched";

-- AddForeignKey
ALTER TABLE "BatchInventory" ADD CONSTRAINT "BatchInventory_Batch_productId_fkey" FOREIGN KEY ("Batch_productId") REFERENCES "Product"("Product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchInventory" ADD CONSTRAINT "BatchInventory_Batch_itemId_fkey" FOREIGN KEY ("Batch_itemId") REFERENCES "PurchaseItem"("Item_id") ON DELETE RESTRICT ON UPDATE CASCADE;
