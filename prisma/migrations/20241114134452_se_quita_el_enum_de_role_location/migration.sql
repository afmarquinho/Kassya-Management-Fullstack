/*
  Warnings:

  - The `Product_location` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Product_location",
ADD COLUMN     "Product_location" TEXT NOT NULL DEFAULT 'UNRECEIVED';

-- DropEnum
DROP TYPE "Location";

-- DropEnum
DROP TYPE "Role";
