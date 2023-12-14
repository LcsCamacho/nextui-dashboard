/*
  Warnings:

  - You are about to drop the column `memoria` on the `Venda2` table. All the data in the column will be lost.
  - You are about to drop the column `memoriaRam` on the `Venda2` table. All the data in the column will be lost.
  - Added the required column `detalhes` to the `Venda2` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Venda2" DROP COLUMN "memoria",
DROP COLUMN "memoriaRam",
ADD COLUMN     "detalhes" TEXT NOT NULL;
