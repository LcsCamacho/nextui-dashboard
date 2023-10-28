import { Venda, Cliente } from "@prisma/client";

export interface VendaToBeCreated {
  clienteId: string | undefined;
  valor: number | string | undefined;
}

export interface VendaWithCliente extends Venda { 
  cliente: Cliente;
}