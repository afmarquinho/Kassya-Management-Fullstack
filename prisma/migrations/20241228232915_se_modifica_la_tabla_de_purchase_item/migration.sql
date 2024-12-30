/*
  Warnings:

  - Made the column `Item_productId` on table `PurchaseItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PurchaseItem" DROP CONSTRAINT "PurchaseItem_Item_productId_fkey";

-- AlterTable
ALTER TABLE "PurchaseItem" ALTER COLUMN "Item_productId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_Item_productId_fkey" FOREIGN KEY ("Item_productId") REFERENCES "Product"("Product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
