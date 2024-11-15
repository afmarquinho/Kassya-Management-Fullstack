/*
  Warnings:

  - Changed the type of `User_role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "User_role",
ADD COLUMN     "User_role" TEXT NOT NULL;
