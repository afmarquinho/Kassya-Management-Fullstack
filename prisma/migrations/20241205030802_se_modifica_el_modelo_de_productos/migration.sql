/*
  Warnings:

  - A unique constraint covering the columns `[Product_ref]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Product_ref` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "Product_ref" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_Product_ref_key" ON "Product"("Product_ref");
