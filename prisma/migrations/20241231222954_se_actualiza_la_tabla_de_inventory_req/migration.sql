/*
  Warnings:

  - You are about to drop the column `Req_destDestId` on the `InventoryRequests` table. All the data in the column will be lost.
  - Added the required column `Req_depId` to the `InventoryRequests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InventoryRequests" DROP CONSTRAINT "InventoryRequests_Req_destDestId_fkey";

-- AlterTable
ALTER TABLE "InventoryRequests" DROP COLUMN "Req_destDestId",
ADD COLUMN     "Req_depId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "InventoryRequests" ADD CONSTRAINT "InventoryRequests_Req_depId_fkey" FOREIGN KEY ("Req_depId") REFERENCES "Departments"("Dep_id") ON DELETE RESTRICT ON UPDATE CASCADE;
