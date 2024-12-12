/*
  Warnings:

  - You are about to drop the column `Sale_customer_id` on the `Sale` table. All the data in the column will be lost.
  - Added the required column `Sale_customerId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_Sale_customer_id_fkey";

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "Sale_customer_id",
ADD COLUMN     "Sale_customerId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ProvisionRequest" (
    "Prov_id" SERIAL NOT NULL,
    "Prov_productId" INTEGER NOT NULL,
    "Prov_quantity" INTEGER NOT NULL,
    "Prov_status" TEXT NOT NULL DEFAULT 'pending',
    "Prov_desc" TEXT NOT NULL,

    CONSTRAINT "ProvisionRequest_pkey" PRIMARY KEY ("Prov_id")
);

-- AddForeignKey
ALTER TABLE "ProvisionRequest" ADD CONSTRAINT "ProvisionRequest_Prov_productId_fkey" FOREIGN KEY ("Prov_productId") REFERENCES "Product"("Product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_Sale_customerId_fkey" FOREIGN KEY ("Sale_customerId") REFERENCES "Customer"("Customer_id") ON DELETE CASCADE ON UPDATE CASCADE;
