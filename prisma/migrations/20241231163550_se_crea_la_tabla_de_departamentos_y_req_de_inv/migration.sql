/*
  Warnings:

  - Added the required column `User_depId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "User_depId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Departments" (
    "Dep_id" SERIAL NOT NULL,
    "Dep_name" TEXT NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("Dep_id")
);

-- CreateTable
CREATE TABLE "InventoryRequests" (
    "Req_id" SERIAL NOT NULL,
    "Req_prodId" INTEGER NOT NULL,
    "Req_destDestId" INTEGER NOT NULL,

    CONSTRAINT "InventoryRequests_pkey" PRIMARY KEY ("Req_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Departments_Dep_name_key" ON "Departments"("Dep_name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_User_depId_fkey" FOREIGN KEY ("User_depId") REFERENCES "Departments"("Dep_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryRequests" ADD CONSTRAINT "InventoryRequests_Req_prodId_fkey" FOREIGN KEY ("Req_prodId") REFERENCES "Product"("Product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryRequests" ADD CONSTRAINT "InventoryRequests_Req_destDestId_fkey" FOREIGN KEY ("Req_destDestId") REFERENCES "Departments"("Dep_id") ON DELETE RESTRICT ON UPDATE CASCADE;
