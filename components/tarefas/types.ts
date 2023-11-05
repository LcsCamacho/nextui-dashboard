import { Tarefa,Projeto } from '@prisma/client';
export interface TarefaToBeCreated extends Omit<Tarefa, "id" | "createdAt" | "updatedAt"> {
  id?: string;
}

export interface TarefaWithProjeto extends Tarefa {
  projeto: Projeto;
}