/*
  Warnings:

  - You are about to drop the column `Note_comment` on the `PurchaseNote` table. All the data in the column will be lost.
  - Added the required column `Note_content` to the `PurchaseNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PurchaseNote" DROP COLUMN "Note_comment",
ADD COLUMN     "Note_content" TEXT NOT NULL,
ADD COLUMN     "Note_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
