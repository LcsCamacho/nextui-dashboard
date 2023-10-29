import { Venda, Cliente, Transacao } from "@prisma/client";

export interface VendaToBeCreated {
  clienteId: string | undefined;
  valor: number | string | undefined;
  produto: string | undefined;
}

export interface VendaWithCliente extends Venda { 
  cliente: Cliente;
  transacao: Transacao[];
}