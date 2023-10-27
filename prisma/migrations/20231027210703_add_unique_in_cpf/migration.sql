/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "cpf" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
