/*
  Warnings:

  - A unique constraint covering the columns `[Category_name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category_Category_name_key" ON "Category"("Category_name");
