import { UseAxios } from "../../hooks/useAxios"
import { Transacao } from "@prisma/client"

export const TransacoesService = {
  getTransacoes: async () => {
    const { api } = UseAxios()
    const { data } = await api.get<Transacao[]>("/transacoes")
    return data
  }
}