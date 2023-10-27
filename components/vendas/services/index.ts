import { UseAxios } from "../../hooks/useAxios";
import { urlLocal, urlProd, currentUrl } from "../../constants/urlFetch";


export const VendasServices = {
    getVendasWithClientes: async () => {
      const { api } = UseAxios(currentUrl);
      const { data } = await api.get("/vendas?withClientes=true");
      return data;
    },
    getVendasWithClientesAndLimit: async (limit: number) => {
      const { api } = UseAxios(currentUrl);
      const { data } = await api.get(`/vendas?withClientes=true&limit=${limit}`);
      return data;
    },
    deleteVenda: async (id: string) => {
      const { api } = UseAxios(currentUrl);
      const { data } = await api.delete(`/vendas?id=${id}`);
      return data;
    }
}