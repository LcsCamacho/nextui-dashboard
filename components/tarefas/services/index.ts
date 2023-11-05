import { UseAxios } from "../../hooks/useAxios";
import { TarefaToBeCreated } from "../types";

export const TarefasService = {
  getTarefas: async () => {
    const { api } = UseAxios();
    const { data } = await api.get("/tarefas");
    return data;
  },
  createTarefa: async (tarefa: TarefaToBeCreated) => {
    const { api } = UseAxios();
    const { data } = await api.post<{success:boolean, id:string}>("/tarefas", tarefa);
    return data;
  },
  saveTime: async (tarefaId: string, tempo: number) => {
    const { api } = UseAxios();
    const { data } = await api.put<{success:boolean, id:string}>(`/tarefas?id=${tarefaId}`, { tempo });
    return data;
  },
  deleteTarefa: async (tarefaId: string) => {
    const { api } = UseAxios();
    const { data } = await api.delete<{success:boolean}>(`/tarefas?id=${tarefaId}`);
    return data;
  },
};