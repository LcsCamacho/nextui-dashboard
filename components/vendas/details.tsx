import { Button, Col, Modal, Row, Text } from "@nextui-org/react";
import { Flex } from "../styles/flex";
import { VendaWithCliente } from "./types";
import { StyledBadge } from "./table/table.styled";
import { FaWhatsapp as WhatsAppIcon } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { CardPagamento } from "./components/CardPagamento";

interface Props {
  venda: VendaWithCliente;
  isShow: boolean;
  closeHandler: () => void;
}

export const DetailsVenda = ({ venda, isShow, closeHandler }: Props) => {
  const { cliente, transacao } = venda;
  const [showPagamentos, setShowPagamentos] = useState(true);

  const sendWhatsApp = () => {
    const message = `Olá ${
      cliente.nome
    }, tudo bem? Aqui é da Pri Modas e estamos entrando em contato para lembrar que você tem uma dívida de R$99,00. Por favor, entre em contato conosco para que possamos negociar o pagamento. Obrigado!`;
    const url = `https://api.whatsapp.com/send?phone=55${
      cliente.telefone
    }&text=${encodeURI(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Modal
      visible={isShow}
      open={isShow}
      onClose={closeHandler}
      aria-labelledby="modal-title"
      closeButton
      width="100%"
      css={{
        backgroundColor: "$successLight" ,
        margin: "auto",
        maxHeight: "90vh",
        maxWidth: 720,
        "@smMax": {
          maxWidth: "90vw",
          margin: "auto",
        },
      }}
      animated
    >
      <Modal.Header>
        <Text h3>Detalhes da venda</Text>
      </Modal.Header>
      <Modal.Body>
        <Flex css={{ fd: "column", jc: "center", ai: "center", gap: "$6" }}>
          <Row css={{ gap: "$6", fw: "wrap" }}>
            <Col>
              <Text b size={16} css={{ tt: "capitalize", color: "$accents9" }}>
                Nome:{" "}
              </Text>
              <Text b size={14} css={{ tt: "capitalize", color: "$accents7" }}>
                {cliente.nome}
              </Text>
            </Col>
            <Col>
              <Text b size={16} css={{ tt: "capitalize", color: "$accents9" }}>
                CPF:{" "}
              </Text>
              <Text b size={14} css={{ tt: "capitalize", color: "$accents7" }}>
                {cliente.cpf}
              </Text>
            </Col>
          </Row>
          <Row css={{ gap: "$6" }}>
            <Col>
              <Text b size={16} css={{ tt: "capitalize", color: "$accents9" }}>
                Endereço:{" "}
              </Text>
              <Text b size={14} css={{ tt: "capitalize", color: "$accents7" }}>
                {cliente.rua}, {cliente.cidade},{" "}
                {cliente.complemento && `(${cliente.complemento})`}
              </Text>
              <Text b size={14} css={{ tt: "capitalize", color: "$accents7" }}>
                {cliente.bairro}, Nº {cliente.numero}
              </Text>
            </Col>
          </Row>

          <Row css={{ gap: "$6" }}>
            <Col>
              <Text b size={16} css={{ tt: "capitalize", color: "$accents9" }}>
                Telefone:{" "}
              </Text>
              <Text b size={14} css={{ tt: "capitalize", color: "$accents7" }}>
                {cliente.telefone}
              </Text>
            </Col>
          </Row>
          <Row css={{ gap: "$6" }}>
            <Col
              css={{
                width: "max-content",
              }}
            >
              <Text b size={16} css={{ tt: "capitalize", color: "$accents9" }}>
                Entrada:{" "}
              </Text>
              <Text b size={14} css={{ color: "$accents7" }}>
                R${venda.valorEntrada},00
              </Text>
            </Col>
            <Col
              css={{
                width: "max-content",
              }}
            >
              <Text b size={16} css={{ tt: "capitalize", color: "$accents9" }}>
                Valor Liquido:{" "}
              </Text>
              <StyledBadge color={"$accents7"} type={"active"}>
                R${venda.valorLiq},00
              </StyledBadge>
            </Col>
            
          </Row>
          <Row css={{ gap: "$6" }}>
            <Col
              css={{
                width: "max-content",
              }}
            >
              <Text b size={16} css={{ tt: "capitalize", color: "$accents9" }}>
                Data:{" "}
              </Text>
              <Text b size={14} css={{ tt: "capitalize", color: "$accents7" }}>
                {new Date(venda.createdAt).toLocaleString()}
              </Text>
            </Col>
            <Col
              css={{
                width: "max-content",
              }}
            >
              <Text b size={16} css={{ tt: "capitalize", color: "$accents9" }}>
                Ultima vez pago:{" "}
              </Text>
              <Text b size={14} css={{ tt: "capitalize", color: "$accents7" }}>
                {new Date(venda.updatedAt).toLocaleString()}
              </Text>
            </Col>
          </Row>
          {transacao.length > 0 && (
            <Col>
              <Text
                onClick={() => setShowPagamentos((st) => !st)}
                b
                size={16}
                css={{
                  display: "flex",
                  jc: "space-between",
                  tt: "capitalize",
                  color: "$accents9",
                  width: "100%",
                  mt: "$12",
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "$accents2",
                    borderRadius: 5,
                  },
                }}
              >
                {showPagamentos ? "Ocultar pagamentos" : "Mostrar pagamentos"}
                <Text size={14} css={{ color: "$accents7" }}>
                  {showPagamentos ? <IoIosArrowDown /> : <IoIosArrowBack />}
                </Text>
              </Text>
              {showPagamentos && (
                <Flex
                  css={{  jc: "start", ai: "center", gap: "$6" }}
                >
                  {transacao.map((t) => {
                    return (
                      <CardPagamento transacao={t} key={t.id} />
                    );
                  })}
                </Flex>
              )}
            </Col>
          )}
        </Flex>
      </Modal.Body>
      <Modal.Footer>
        <Button auto color="success" onClick={sendWhatsApp}>
          <WhatsAppIcon
            size={30}
            style={{
              marginRight: 10,
            }}
          />
          Enviar mensagem
        </Button>
        <Button auto color="error" onClick={closeHandler}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
