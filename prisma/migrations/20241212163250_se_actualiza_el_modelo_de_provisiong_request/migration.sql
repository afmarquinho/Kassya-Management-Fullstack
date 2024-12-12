/*
  Warnings:

  - Added the required column `Prov_requestedBy` to the `ProvisionRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProvisionRequest" ADD COLUMN     "Prov_requestedBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ProvisionRequest" ADD CONSTRAINT "ProvisionRequest_Prov_requestedBy_fkey" FOREIGN KEY ("Prov_requestedBy") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;
