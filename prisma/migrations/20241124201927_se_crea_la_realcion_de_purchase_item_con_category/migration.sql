/*
  Warnings:

  - Added the required column `Item_categoryId` to the `PurchaseItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PurchaseItem" ADD COLUMN     "Item_categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_Item_categoryId_fkey" FOREIGN KEY ("Item_categoryId") REFERENCES "Category"("Category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
