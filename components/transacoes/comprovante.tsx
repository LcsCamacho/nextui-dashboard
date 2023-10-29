import { TransacaoWithVendaAndCliente } from "./types";
import { Text, Col, Row, Button } from "@nextui-org/react";
import { Flex } from "../styles/flex";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { ComprovanteContainer } from "./comprovante.styled";
import { FaShare } from "react-icons/fa";

export const Comprovante = ({
  transacao,
}: {
  transacao: TransacaoWithVendaAndCliente;
}) => {
  console.log(transacao);

  const handleClickShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Comprovante de pagamento",
          text: `Olá ${
            transacao.cliente.nome
          }, tudo bem? Aqui é da Pri Modas e estamos entrando em contato para confirmar o pagamento de R$${transacao.valor},00. Obrigado!`,
          url: `${window.location.href}`,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Seu navegador não suporta compartilhamento de arquivos");
    }
  }
  return (
    <ComprovanteContainer>
      <Flex  justify="center" align="center" direction="column">
        <Text h1>Comprovante</Text>
        <AiOutlineCheckCircle
          color={"var(--nextui-colors-green700)"}
          size={"150"}
        />
        <Text h3>Pagamento feito com sucesso!</Text>
        <Col css={{ jc:"center", ai:"center", gap: "$2", mt: "$6", display: "flex", fd: "column" }}>
          <Row
            css={{
              alignItems: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ tt: "capitalize", color: "$accents9" }}>
              Data:
            </Text>
            <Text b size={16} css={{ tt: "capitalize", color: "$accents7" }}>
              {new Date(transacao.createdAt).toLocaleString()}
            </Text>
          </Row>
          <Row
            css={{
              alignItems: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ tt: "capitalize", color: "$accents9" }}>
              Valor:
            </Text>
            <Text b size={16} css={{ tt: "capitalize", color: "$accents7" }}>
              R${transacao.valor},00
            </Text>
          </Row>
          <Row
            css={{
              alignItems: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ tt: "capitalize", color: "$accents9" }}>
              Cliente:
            </Text>
            <Text b size={16} css={{ tt: "capitalize", color: "$accents7" }}>
              {transacao.cliente.nome}
            </Text>
          </Row>
          <Row
            css={{
              alignItems: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ tt: "capitalize", color: "$accents9" }}>
              Telefone:
            </Text>
            <Text b size={16} css={{ tt: "capitalize", color: "$accents7" }}>
              {transacao.cliente.telefone}
            </Text>
          </Row>
          <Row
            css={{
              alignItems: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ tt: "capitalize", color: "$accents9" }}>
              Endereço:
            </Text>
            <Text b size={16} css={{ tt: "capitalize", color: "$accents7" }}>
              {transacao.cliente.rua} {transacao.cliente.numero},{" "} {transacao.cliente.bairro},{" "} {transacao.cliente.cidade} 
            </Text>
          </Row>
        </Col>
        <Row css={{ gap: "$6", mt: "$6" }}>
          <Button onClick={handleClickShare}>
            <Text b size={18} css={{color:"$white", mr:"$5"}}>Compartilhar</Text> <FaShare />
          </Button>
        </Row>
      </Flex>
    </ComprovanteContainer>
  );
};
