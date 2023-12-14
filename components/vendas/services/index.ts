import { Venda } from "@prisma/client";
import { UseAxios } from "../../hooks/useAxios";
import { VendaToBeCreated, VendaWithCliente } from "../types";


export const VendasServices = {
    getVendasWithClientes: async (urlBase?:string) => {
      const { api } = UseAxios(urlBase);
      const { data } = await api.get<VendaWithCliente[]>("/vendas?withClientes=1");
      return data;
    },
    getVendasWithIncludes: async ({includeCliente, includeTransactions,urlBase}: {
      includeCliente?: boolean;
      includeTransactions?: boolean;
      urlBase?: string;
    }) => {
      const { api } = UseAxios(urlBase);
      const { data } = await api.get<VendaWithCliente[]>(`/vendas?withClientes=${includeCliente ? 1 : 0}&withTransacoes=${includeTransactions ? 1 : 0}`);
      return data;
    },
    getVendasWithClientesAndLimit: async (limit: number,urlBase?:string) => {
      const { api } = UseAxios(urlBase);
      const { data } = await api.get<VendaWithCliente[]>(`/vendas?withClientes=1&limit=${limit}`);
      return data;
    },
    getVendas: async (urlBase?:string) => {
      const { api } = UseAxios(urlBase);
      const { data } = await api.get<Venda[]>("/vendas");
      return data;
    },
    deleteVenda: async (id: string,urlBase?:string) => {
      const { api } = UseAxios(urlBase);
      const { data } = await api.delete(`/vendas?id=${id}`);
      return data;
    },
    createVenda: async (venda: VendaToBeCreated,urlBase?:string) => {
      const { api } = UseAxios(urlBase);
      const { data } = await api.post("/vendas", venda);
      return data;
    },
    updateVenda: async (venda: Venda,urlBase?:string) => {
      const { api } = UseAxios(urlBase);
      const { data } = await api.put(`/vendas?id=${venda.id}`, venda);
      return data;
    },
}


export const VendasServices2 = {
  getVendas: async (urlBase?:string) => {
    const { api } = UseAxios(urlBase);
    const { data } = await api.get<Venda[]>("/vendas2");
    return data;
  },
  createVenda: async (venda: VendaToBeCreated,urlBase?:string) => {
    const { api } = UseAxios(urlBase);
    const { data } = await api.post("/vendas2", venda);
    return data;
  },

}