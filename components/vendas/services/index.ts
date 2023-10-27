import { UseAxios } from "../../hooks/useAxios";


export const VendasServices = {
    getVendasWithClientes: async () => {
      const { api } = UseAxios("http://localhost:3000/api");
      const { data } = await api.get("/vendas?withClientes=true");
      return data;
    },
    getVendasWithClientesAndLimit: async (limit: number) => {
      const { api } = UseAxios("http://localhost:3000/api");
      const { data } = await api.get(`/vendas?withClientes=true&limit=${limit}`);
      return data;
    },
    deleteVenda: async (id: string) => {
      const { api } = UseAxios("http://localhost:3000/api");
      const { data } = await api.delete(`/vendas?id=${id}`);
      return data;
    }
}