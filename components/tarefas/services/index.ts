import { Tarefa } from "@prisma/client";
import { UseAxios } from "../../hooks/useAxios";
import { TarefaToBeCreated,TarefaWithProjeto } from "../types";

export const TarefasService = {
  getTarefas: async (baseUrl?:string) => {
    const { api } = UseAxios(baseUrl);
    const { data } = await api.get<TarefaWithProjeto[]>("/tarefas");
    return data;
  },
  createTarefa: async (tarefa: TarefaToBeCreated, baseUrl?:string) => {
    const { api } = UseAxios(baseUrl);
    const { data } = await api.post<{success:boolean, id:string}>("/tarefas", tarefa);
    return data;
  },
  saveTime: async (tarefaId: string, tempo: number, baseUrl?:string) => {
    const { api } = UseAxios(baseUrl);
    const { data } = await api.put<{success:boolean, id:string}>(`/tarefas?id=${tarefaId}`, { tempo });
    return data;
  },
  deleteTarefa: async (tarefaId: string, baseUrl?:string) => {
    const { api } = UseAxios(baseUrl);
    const { data } = await api.delete<{success:boolean}>(`/tarefas?id=${tarefaId}`);
    return data;
  },
};