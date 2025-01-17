
import { currentUrl } from "../../../constants/urlFetch";
import { UseAxios } from "../../hooks/useAxios";
import { ClienteToBeCreated } from "../types";

export const ClientesServices = {
    getClientes: async () => {
      const { api } = UseAxios(currentUrl);
      const { data } = await api.get("/clientes");
      return data;
    },
    createCliente: async (data: ClienteToBeCreated) => {
      const { api } = UseAxios(currentUrl);
      const response = await api.post("/clientes", data);
      return response;
    }
}