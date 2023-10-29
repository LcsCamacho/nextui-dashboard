import { Transacao, Venda, Cliente } from "@prisma/client";

export interface TransacaoWithVendaAndCliente extends Transacao {
  venda: Venda;
  cliente: Cliente;
}
