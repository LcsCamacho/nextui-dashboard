/*
  Warnings:

  - You are about to drop the column `modelo` on the `Venda2` table. All the data in the column will be lost.
  - Added the required column `produtoId` to the `Venda2` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Venda2" DROP COLUMN "modelo",
ADD COLUMN     "produtoId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Celular" (
    "id" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "memoria" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Celular_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Venda2" ADD CONSTRAINT "Venda2_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Celular"("id") ON DELETE CASCADE ON UPDATE CASCADE;
