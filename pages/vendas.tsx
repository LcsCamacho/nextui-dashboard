import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { currentUrl } from "../components/constants/urlFetch";
import Vendas from "../components/vendas";
import { VendaWithActionsAndCliente } from "../components/vendas/table/render-cell";

export const getServerSideProps: GetServerSideProps = async () => {
  const {
    data,
  } = await axios.get(currentUrl+"/vendas?withClientes=true");
  return {
    props: {
      vendas: data
    },
  };
}; 

const vendas: NextPage<{vendas:VendaWithActionsAndCliente[]}> = ({vendas}) => {
  return (
    <Vendas vendas={vendas}/>
  );
};

export default vendas;
