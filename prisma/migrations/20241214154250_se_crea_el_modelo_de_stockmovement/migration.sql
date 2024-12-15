-- CreateTable
CREATE TABLE "StockMovement" (
    "Movement_id" SERIAL NOT NULL,
    "Movement_type" TEXT NOT NULL,
    "Movement_qty" INTEGER NOT NULL,
    "Movement_reason" TEXT NOT NULL,
    "Movement_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Movement_productId" INTEGER NOT NULL,
    "Movement_userId" INTEGER NOT NULL,
    "Movement_relatedId" INTEGER,

    CONSTRAINT "StockMovement_pkey" PRIMARY KEY ("Movement_id")
);

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_Movement_productId_fkey" FOREIGN KEY ("Movement_productId") REFERENCES "Product"("Product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_Movement_userId_fkey" FOREIGN KEY ("Movement_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;
