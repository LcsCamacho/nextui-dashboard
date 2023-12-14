import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { currentUrl } from "../constants/urlFetch";
import Vendas from "../components/vendas";
import { VendaWithCliente } from "../components/vendas/types";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { cliId, vendaPorCliente } = ctx.query;
  const { data:vendas } = await axios.get(
    `${currentUrl}/vendas2`
  );
  return {
    props: {
      vendas,
    },
  };
};

const vendas: NextPage<{ vendas: VendaWithCliente[] }> = ({
  vendas,
}) => {
  return <Vendas vendas={vendas} />;
};

export default vendas;
