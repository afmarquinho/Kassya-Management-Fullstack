-- CreateTable
CREATE TABLE "User" (
    "User_id" SERIAL NOT NULL,
    "User_code" TEXT NOT NULL,
    "User_dni" INTEGER NOT NULL,
    "User_role" TEXT NOT NULL,
    "User_name" TEXT NOT NULL,
    "User_surname" TEXT NOT NULL,
    "User_email" TEXT NOT NULL,
    "User_password" TEXT NOT NULL,
    "User_phoneNumber" TEXT NOT NULL,
    "User_address" TEXT NOT NULL,
    "User_active" BOOLEAN NOT NULL DEFAULT true,
    "User_registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("User_id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "Customer_id" SERIAL NOT NULL,
    "Customer_dni" INTEGER NOT NULL,
    "Customer_name" TEXT NOT NULL,
    "Customer_surname" TEXT NOT NULL,
    "Customer_email" TEXT NOT NULL,
    "Customer_phoneNumber" TEXT NOT NULL,
    "Customer_address" TEXT NOT NULL,
    "Customer_habeasData" BOOLEAN NOT NULL DEFAULT false,
    "Customer_registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Customer_userId" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("Customer_id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "Supplier_id" SERIAL NOT NULL,
    "Supplier_nit" INTEGER NOT NULL,
    "Supplier_name" TEXT NOT NULL,
    "Supplier_contactInfo" TEXT NOT NULL,
    "Supplier_email" TEXT NOT NULL,
    "Supplier_phoneNumber" TEXT NOT NULL,
    "Supplier_city" TEXT NOT NULL,
    "Supplier_address" TEXT NOT NULL,
    "Supplier_active" BOOLEAN NOT NULL DEFAULT true,
    "Supplier_registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Supplier_userId" INTEGER NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("Supplier_id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "Purchase_id" SERIAL NOT NULL,
    "Purchase_description" TEXT NOT NULL,
    "Purchase_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Purchase_totalAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "Purchase_userId" INTEGER NOT NULL,
    "Purchase_supplierId" INTEGER NOT NULL,
    "Purchase_paymentMethod" TEXT NOT NULL,
    "Purchase_dueDate" TIMESTAMP(3) NOT NULL,
    "Purchase_close" BOOLEAN NOT NULL DEFAULT false,
    "Purchase_processed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("Purchase_id")
);

-- CreateTable
CREATE TABLE "PurchaseItem" (
    "Item_id" SERIAL NOT NULL,
    "Item_ref" TEXT NOT NULL,
    "Item_name" TEXT NOT NULL,
    "Item_description" TEXT NOT NULL,
    "Item_unitCost" DECIMAL(65,30) NOT NULL,
    "Item_qtyOrdered" INTEGER NOT NULL,
    "Item_totalAmount" DECIMAL(65,30) NOT NULL,
    "Item_qtyReceived" INTEGER NOT NULL,
    "Item_qtyDispatched" INTEGER NOT NULL DEFAULT 0,
    "Item_location" TEXT NOT NULL DEFAULT 'UNRECEIVED',
    "Item_status" TEXT NOT NULL DEFAULT 'ORDERED',
    "Item_purchaseId" INTEGER NOT NULL,

    CONSTRAINT "PurchaseItem_pkey" PRIMARY KEY ("Item_id")
);

-- CreateTable
CREATE TABLE "PurchaseNote" (
    "Note_id" SERIAL NOT NULL,
    "Note_content" TEXT NOT NULL,
    "Note_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Note_userId" INTEGER NOT NULL,
    "Note_purchaseId" INTEGER NOT NULL,

    CONSTRAINT "PurchaseNote_pkey" PRIMARY KEY ("Note_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "Category_id" SERIAL NOT NULL,
    "Category_name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("Category_id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "Sale_id" SERIAL NOT NULL,
    "Sale_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Sale_code" TEXT,
    "Sale_customer_id" INTEGER NOT NULL,
    "Sale_totalAmount" DECIMAL(65,30) NOT NULL,
    "Sale_userId" INTEGER NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("Sale_id")
);

-- CreateTable
CREATE TABLE "SaleDetails" (
    "SaleDetail_id" SERIAL NOT NULL,
    "SaleDetail_saleId" INTEGER NOT NULL,
    "SaleDetail_productId" INTEGER NOT NULL,
    "SaleDetail_quantity" INTEGER NOT NULL,
    "SaleDetail_unitPrice" DECIMAL(65,30) NOT NULL,
    "SaleDetail_total" DECIMAL(65,30) NOT NULL,
    "purchaseItemItem_id" INTEGER,

    CONSTRAINT "SaleDetails_pkey" PRIMARY KEY ("SaleDetail_id")
);

-- CreateTable
CREATE TABLE "Warranty" (
    "Warranty_id" SERIAL NOT NULL,
    "Warranty_description" TEXT NOT NULL,
    "Warranty_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Warranty_saleDetailId" INTEGER NOT NULL,

    CONSTRAINT "Warranty_pkey" PRIMARY KEY ("Warranty_id")
);

-- CreateTable
CREATE TABLE "SalesSummary" (
    "SalesSumm_id" SERIAL NOT NULL,
    "SalesSumm_saleId" INTEGER NOT NULL,
    "SalesSumm_totalAmount" DECIMAL(65,30) NOT NULL,
    "SalesSumm_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesSummary_pkey" PRIMARY KEY ("SalesSumm_id")
);

-- CreateTable
CREATE TABLE "ExpenseSummary" (
    "ExpSumm_id" SERIAL NOT NULL,
    "ExpSumm_purchaseId" INTEGER NOT NULL,
    "ExpSumm_totalExpenses" DECIMAL(65,30) NOT NULL,
    "ExpSumm_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseSummary_pkey" PRIMARY KEY ("ExpSumm_id")
);

-- CreateTable
CREATE TABLE "Devolution" (
    "Dev_id" SERIAL NOT NULL,
    "Dev_description" TEXT NOT NULL,
    "Dev_saleDetailsId" INTEGER NOT NULL,
    "Dev_quantity" INTEGER NOT NULL,
    "Dev_unitPrice" DECIMAL(65,30) NOT NULL,
    "Dev_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Devolution_pkey" PRIMARY KEY ("Dev_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_User_code_key" ON "User"("User_code");

-- CreateIndex
CREATE UNIQUE INDEX "User_User_dni_key" ON "User"("User_dni");

-- CreateIndex
CREATE UNIQUE INDEX "User_User_email_key" ON "User"("User_email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Customer_dni_key" ON "Customer"("Customer_dni");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Customer_email_key" ON "Customer"("Customer_email");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_Supplier_nit_key" ON "Supplier"("Supplier_nit");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_Supplier_email_key" ON "Supplier"("Supplier_email");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_Sale_code_key" ON "Sale"("Sale_code");

-- CreateIndex
CREATE UNIQUE INDEX "SalesSummary_SalesSumm_saleId_key" ON "SalesSummary"("SalesSumm_saleId");

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseSummary_ExpSumm_purchaseId_key" ON "ExpenseSummary"("ExpSumm_purchaseId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_Customer_userId_fkey" FOREIGN KEY ("Customer_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_Supplier_userId_fkey" FOREIGN KEY ("Supplier_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_Purchase_userId_fkey" FOREIGN KEY ("Purchase_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_Purchase_supplierId_fkey" FOREIGN KEY ("Purchase_supplierId") REFERENCES "Supplier"("Supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_Item_purchaseId_fkey" FOREIGN KEY ("Item_purchaseId") REFERENCES "Purchase"("Purchase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseNote" ADD CONSTRAINT "PurchaseNote_Note_userId_fkey" FOREIGN KEY ("Note_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseNote" ADD CONSTRAINT "PurchaseNote_Note_purchaseId_fkey" FOREIGN KEY ("Note_purchaseId") REFERENCES "Purchase"("Purchase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_Sale_customer_id_fkey" FOREIGN KEY ("Sale_customer_id") REFERENCES "Customer"("Customer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_Sale_userId_fkey" FOREIGN KEY ("Sale_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetails" ADD CONSTRAINT "SaleDetails_SaleDetail_saleId_fkey" FOREIGN KEY ("SaleDetail_saleId") REFERENCES "Sale"("Sale_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetails" ADD CONSTRAINT "SaleDetails_purchaseItemItem_id_fkey" FOREIGN KEY ("purchaseItemItem_id") REFERENCES "PurchaseItem"("Item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_Warranty_saleDetailId_fkey" FOREIGN KEY ("Warranty_saleDetailId") REFERENCES "SaleDetails"("SaleDetail_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesSummary" ADD CONSTRAINT "SalesSummary_SalesSumm_saleId_fkey" FOREIGN KEY ("SalesSumm_saleId") REFERENCES "Sale"("Sale_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseSummary" ADD CONSTRAINT "ExpenseSummary_ExpSumm_purchaseId_fkey" FOREIGN KEY ("ExpSumm_purchaseId") REFERENCES "Purchase"("Purchase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devolution" ADD CONSTRAINT "Devolution_Dev_saleDetailsId_fkey" FOREIGN KEY ("Dev_saleDetailsId") REFERENCES "SaleDetails"("SaleDetail_id") ON DELETE RESTRICT ON UPDATE CASCADE;
