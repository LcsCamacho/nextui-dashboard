import { Row,Text } from "@nextui-org/react";
import { StyledBadge } from "../table/table.styled";
import { TransacaoWithVendaAndCliente } from "../../transacoes/types";
import { Transacao } from "@prisma/client";
import { useRouter } from "next/router";
import { routes } from "../../../constants/routes";

export const CardPagamento = ({
  transacao,
}: {
  transacao: Transacao;
}) => {
  const router = useRouter();
  const handleClick = () => {
    if(confirm("Deseja ver o comprovante?")){
      router.push(`${routes.transacoes}/${transacao.id}`)
    }
  };
  return (
    <Row key={transacao.id} onClick={handleClick} css={{
      gap: "$2",
      jc: "center",
      ai: "center",
      padding: "$5",
      borderRadius: 5,
      cursor: "pointer",
      fd: "column",
      width: "max-content",
      border: "1px solid $accents2",
      "&:hover": {
        backgroundColor: "$accents2",
      },
    }} align="center">
        <Text b size={16} css={{ color: "$accents9" }}>
          {new Date(transacao.createdAt).toLocaleString()}
        </Text>
      <Row>
        <Text b size={16} css={{ color: "$accents9" }}>
          Valor:
        </Text>
      <StyledBadge type={"active"}>R${transacao.valor},00</StyledBadge>
      </Row>

    </Row>

  );
};
