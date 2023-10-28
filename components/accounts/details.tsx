import { Button, Col, Modal, Row, Text } from "@nextui-org/react";
import { Cliente } from "@prisma/client";
import { Flex } from "../styles/flex";
import { useRouter } from "next/router";

interface Props {
  cliente: Cliente;
  isShow: boolean;
  closeHandler: () => void;
}

export const DetailsCliente = ({ cliente, isShow, closeHandler }: Props) => {
  const router = useRouter();
  if (!cliente) return null;

  const irParaPaginaDeVendasFiltrandoPorId = () => {
    router.push(`/vendas?cliId=${cliente.id}`);
  }

  return (
    <Modal
      visible={isShow}
      open={isShow}
      onClose={closeHandler}
      aria-labelledby="modal-title"
      aria-label="modal-description"
      closeButton
      width="100%"
      css={{
        margin: "auto",
        maxHeight: "90vh",
        maxWidth: 720,
        "@smMax": {
          maxWidth: "90vw",
          margin: "auto",
        },
      }}
    >
      <Modal.Header>
        <Text h3>Detalhes do Cliente</Text>
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
                {cliente.rua}, {cliente.cidade}, {" "}
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
        </Flex>
      </Modal.Body>
      <Modal.Footer>

        <Button auto color="primary" onClick={irParaPaginaDeVendasFiltrandoPorId}>
          Ver compras
        </Button>
        <Button auto color="error" onClick={closeHandler}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
