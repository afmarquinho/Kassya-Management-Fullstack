-- AlterTable
ALTER TABLE "PurchaseItem" ADD COLUMN     "Item_productId" INTEGER;

-- CreateTable
CREATE TABLE "Product" (
    "Product_id" SERIAL NOT NULL,
    "Product_name" TEXT NOT NULL,
    "Product_stockQty" INTEGER NOT NULL DEFAULT 0,
    "Product_reorderPoint" INTEGER NOT NULL DEFAULT 0,
    "Product_location" TEXT NOT NULL DEFAULT 'Bodega',
    "Product_lotNumber" TEXT NOT NULL,
    "Product_active" BOOLEAN NOT NULL DEFAULT true,
    "Product_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Product_expiryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("Product_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_Product_name_key" ON "Product"("Product_name");

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_Item_productId_fkey" FOREIGN KEY ("Item_productId") REFERENCES "Product"("Product_id") ON DELETE SET NULL ON UPDATE CASCADE;
