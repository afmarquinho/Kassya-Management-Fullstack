-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "Purchase_processed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "PurchaseNote" (
    "Note_id" SERIAL NOT NULL,
    "Note_comment" TEXT NOT NULL,
    "Note_userId" INTEGER NOT NULL,
    "Note_purchaseId" INTEGER NOT NULL,

    CONSTRAINT "PurchaseNote_pkey" PRIMARY KEY ("Note_id")
);

-- AddForeignKey
ALTER TABLE "PurchaseNote" ADD CONSTRAINT "PurchaseNote_Note_userId_fkey" FOREIGN KEY ("Note_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseNote" ADD CONSTRAINT "PurchaseNote_Note_purchaseId_fkey" FOREIGN KEY ("Note_purchaseId") REFERENCES "Purchase"("Purchase_id") ON DELETE RESTRICT ON UPDATE CASCADE;
