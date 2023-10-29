import { GetServerSideProps, NextPage } from "next";
import { currentUrl } from "../../constants/urlFetch";
import axios from "axios";
import { Comprovante } from "../../components/transacoes/comprovante";
import { TransacaoWithVendaAndCliente } from "../../components/transacoes/types";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data: transacao } = await axios.get<TransacaoWithVendaAndCliente>(
    `${currentUrl}/transacoes?id=${ctx.params?.id}&withVenda=1&withCliente=1`
  );
  return {
    props: {
      transacao,
    },
  };
};

const TransacaoPorId: NextPage<{
  transacao: TransacaoWithVendaAndCliente;
}> = ({ transacao }) => {
  return <Comprovante transacao={transacao} />;
};

export default TransacaoPorId;
