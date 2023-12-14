-- CreateTable
CREATE TABLE "Venda2" (
    "id" TEXT NOT NULL,
    "formaPagto" TEXT NOT NULL,
    "valorEntrada" DOUBLE PRECISION NOT NULL,
    "modelo" TEXT NOT NULL,
    "memoria" TEXT NOT NULL,
    "memoriaRam" TEXT NOT NULL,
    "valorLiq" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venda2_pkey" PRIMARY KEY ("id")
);
