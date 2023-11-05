import { Tarefa } from '@prisma/client';
export interface TarefaToBeCreated extends Omit<Tarefa, "id" | "createdAt" | "updatedAt"> {
  id?: string;
}