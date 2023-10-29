import { Venda } from "@prisma/client";
import { currentUrl } from "../../../constants/urlFetch";
import { UseAxios } from "../../hooks/useAxios";
import { VendaToBeCreated, VendaWithCliente } from "../types";


export const VendasServices = {
    getVendasWithClientes: async () => {
      const { api } = UseAxios(currentUrl);
      const { data } = await api.get<VendaWithCliente[]>("/vendas?withClientes=1");
      return data;
    },
    getVendasWithClientesAndLimit: async (limit: number) => {
      const { api } = UseAxios(currentUrl);
      const { data } = await api.get<VendaWithCliente[]>(`/vendas?withClientes=1&limit=${limit}`);
      return data;
    },
    getVendas: async () => {
      const { api } = UseAxios(currentUrl);
      const { data } = await api.get<Venda[]>("/vendas");
      return data;
    },
    deleteVenda: async (id: string) => {
      const { api } = UseAxios(currentUrl);
      const { data } = await api.delete(`/vendas?id=${id}`);
      return data;
    },
    createVenda: async (venda: VendaToBeCreated) => {
      const { api } = UseAxios(currentUrl);
      const { data } = await api.post("/vendas", venda);
      return data;
    },
    updateVenda: async (venda: Venda) => {
      const { api } = UseAxios(currentUrl);
      const { data } = await api.put(`/vendas?id=${venda.id}`, venda);
      return data;
    },
}