/*
  Warnings:

  - You are about to drop the column `sizes` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sizes",
DROP COLUMN "stock";

-- CreateTable
CREATE TABLE "SizeStock" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SizeStock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SizeStock_productId_idx" ON "SizeStock"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "SizeStock_productId_size_key" ON "SizeStock"("productId", "size");

-- AddForeignKey
ALTER TABLE "SizeStock" ADD CONSTRAINT "SizeStock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
