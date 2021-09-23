/*
  Warnings:

  - You are about to drop the column `category` on the `donee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "donee" DROP COLUMN "category";

-- DropEnum
DROP TYPE "Category";
