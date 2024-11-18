/*
  Warnings:

  - You are about to drop the column `Purchase_close` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_Product_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseDetail" DROP CONSTRAINT "PurchaseDetail_PurchDet_productId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseDetail" DROP CONSTRAINT "PurchaseDetail_PurchDet_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "SaleDetails" DROP CONSTRAINT "SaleDetails_SaleDetail_productId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "Purchase_close",
ADD COLUMN     "Purchase_status" TEXT NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "SaleDetails" ADD COLUMN     "purchaseItemItem_id" INTEGER;

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "PurchaseDetail";

-- CreateTable
CREATE TABLE "PurchaseItem" (
    "Item_id" SERIAL NOT NULL,
    "Item_ref" TEXT NOT NULL,
    "Item_name" TEXT NOT NULL,
    "Item_description" TEXT NOT NULL,
    "Item_unitCost" DECIMAL(65,30) NOT NULL,
    "Item_qtyOrdered" INTEGER NOT NULL,
    "Item_totalAmount" DECIMAL(65,30) NOT NULL,
    "Item_qtyReceived" INTEGER NOT NULL,
    "Item_qtyDispatched" INTEGER NOT NULL DEFAULT 0,
    "Item_location" TEXT NOT NULL DEFAULT 'UNRECEIVED',
    "Item_status" TEXT NOT NULL DEFAULT 'ORDERED',
    "Item_purchaseId" INTEGER NOT NULL,

    CONSTRAINT "PurchaseItem_pkey" PRIMARY KEY ("Item_id")
);

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_Item_purchaseId_fkey" FOREIGN KEY ("Item_purchaseId") REFERENCES "Purchase"("Purchase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetails" ADD CONSTRAINT "SaleDetails_purchaseItemItem_id_fkey" FOREIGN KEY ("purchaseItemItem_id") REFERENCES "PurchaseItem"("Item_id") ON DELETE SET NULL ON UPDATE CASCADE;
