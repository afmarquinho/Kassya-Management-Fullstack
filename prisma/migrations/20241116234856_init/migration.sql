/*
  Warnings:

  - You are about to drop the column `Purchase_status` on the `Purchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "Purchase_status",
ADD COLUMN     "Purchase_close" BOOLEAN NOT NULL DEFAULT true;
