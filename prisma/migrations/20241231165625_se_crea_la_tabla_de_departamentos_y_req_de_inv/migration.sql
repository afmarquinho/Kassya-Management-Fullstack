/*
  Warnings:

  - Added the required column `Req_desc` to the `InventoryRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Req_qty` to the `InventoryRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryRequests" ADD COLUMN     "Req_desc" TEXT NOT NULL,
ADD COLUMN     "Req_qty" INTEGER NOT NULL;
