/*
  Warnings:

  - You are about to drop the column `day` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,mealId,date]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `day` on the `meals` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `date` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Day" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- DropIndex
DROP INDEX "orders_userId_mealId_day_key";

-- AlterTable
ALTER TABLE "meals" DROP COLUMN "day",
ADD COLUMN     "day" "Day" NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "day",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orders_userId_mealId_date_key" ON "orders"("userId", "mealId", "date");
