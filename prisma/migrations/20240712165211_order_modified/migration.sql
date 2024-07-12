/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "orders_userId_mealId_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "orders_userId_date_key" ON "orders"("userId", "date");
