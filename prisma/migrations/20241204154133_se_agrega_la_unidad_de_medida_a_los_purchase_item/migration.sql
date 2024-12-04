/*
  Warnings:

  - Added the required column `Item_unitMeasure` to the `PurchaseItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PurchaseItem" ADD COLUMN     "Item_unitMeasure" TEXT NOT NULL;
