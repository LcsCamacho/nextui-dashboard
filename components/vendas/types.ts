import { Venda2, Cliente, Transacao } from "@prisma/client";

export interface VendaToBeCreated {
  id?: string;
  clienteId?: string;
  valor?: number | string;
  produto?: string;
}

export interface VendaWithCliente extends Venda2 { 
  cliente: Cliente;
  transacao: Transacao[];
}