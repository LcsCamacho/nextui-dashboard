import { TransacaoWithVendaAndCliente } from "./types";
import { Text, Col, Row, Button } from "@nextui-org/react";
import { Flex } from "../styles/flex";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { ComprovanteContainer } from "./comprovante.styled";
import { FaShare, FaFilePdf } from "react-icons/fa";
import { makeComprovantePdf } from "../../features/pdf/comprovantePdf";

export const Comprovante = ({
  transacao,
}: {
  transacao: TransacaoWithVendaAndCliente;
}) => {
  const handleClickShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Comprovante de pagamento",
          text: `Olá ${transacao.cliente.nome}, tudo bem? Aqui é da Pri Modas e estamos entrando em contato para confirmar o pagamento de R$${transacao.valor},00. Obrigado!`,
          url: `${window.location.href}`,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Seu navegador não suporta compartilhamento de arquivos");
    }
  };

  const handleClickSharePdf = () => {
    makeComprovantePdf(transacao, true);
  }

  return (
    <ComprovanteContainer>
      <Flex justify="center" align="center" direction="column">
        <Text h1>Comprovante</Text>
        <AiOutlineCheckCircle
          color={"var(--nextui-colors-green700)"}
          size={"150"}
        />
        <Text h3>Pagamento feito com sucesso!</Text>
        <Col
          css={{
            jc: "center",
            ai: "center",
            gap: "$4",
            mt: "$6",
            display: "flex",
            fd: "column",
          }}
        >
          <Row
            css={{
              ai: "center",
            jc: "center",
            gap: "$2",
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Data:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              {new Date(transacao.createdAt).toLocaleString()}
            </Text>
          </Row>
          <Row
            css={{
              ai: "center",
              jc: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Valor total da compra:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              R${transacao.venda.valorTotal},00
            </Text>
          </Row>
          <Row
            css={{
              ai: "center",
              jc: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Valor pago:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              R${transacao.valor},00
            </Text>
          </Row>
          <Row
            css={{
              ai: "center",
              jc: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Valor restante:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              R${transacao.valorRestante},00
            </Text>
          </Row>
          <Row
            css={{
              ai: "center",
              jc: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Produto:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              {transacao.venda.produto}
            </Text>
          </Row>

          <Row
            css={{
              ai: "center",
              jc: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Cliente:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              {transacao.cliente.nome}
            </Text>
          </Row>
          <Row
            css={{
              ai: "center",
              jc: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Telefone:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              {transacao.cliente.telefone}
            </Text>
          </Row>
          <Row
            css={{
              ai: "center",
              jc: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Endereço:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              {transacao.cliente.rua} {transacao.cliente.numero},{" "}
              {transacao.cliente.bairro}, {transacao.cliente.cidade}
            </Text>
          </Row>
        </Col>
        <Row css={{ gap: "$6", mt: "$12",  jc: "center", }}>
          {/* <Button onClick={handleClickShare}>
            <Text b size={18} css={{ color: "$white", mr: "$5" }}>
              Compartilhar
            </Text>{" "}
            <FaShare />
          </Button> */}
          <Button css={{
            backgroundColor: "$error",
          }} onClick={handleClickSharePdf}>
            <Text b size={18} css={{ color: "$white", mr: "$5" }}>
              Gerar PDF
            </Text>{" "}
            <FaFilePdf />
          </Button>
        </Row>
      </Flex>
    </ComprovanteContainer>
  );
};
