-- DropForeignKey
ALTER TABLE "Venda" DROP CONSTRAINT "Venda_clienteId_fkey";

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
