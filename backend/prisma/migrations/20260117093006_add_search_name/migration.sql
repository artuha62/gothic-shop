-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "searchName" TEXT;

-- CreateIndex
CREATE INDEX "Product_searchName_idx" ON "Product"("searchName");
