/*
  Warnings:

  - Added the required column `Product_categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "Product_categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_Product_categoryId_fkey" FOREIGN KEY ("Product_categoryId") REFERENCES "Category"("Category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
