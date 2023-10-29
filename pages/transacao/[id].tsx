import { GetServerSideProps, NextPage } from "next";
import { currentUrl } from "../../components/constants/urlFetch";
import axios from "axios";
import { Transacao } from "@prisma/client";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data: transacao } = await axios.get(
    `${currentUrl}/transacoes/${ctx.params?.id}`
  );
  return {
    props: {
      transacao,
    },
  };
};

const TransacaoPorId: NextPage<{
  transacao: Transacao;
}> = ({ transacao }) => {
  return <>{transacao.valor}</>;
};

export default TransacaoPorId;
