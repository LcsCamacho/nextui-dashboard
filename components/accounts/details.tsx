import { Modal, Text, Avatar, Button, Row, Col } from "@nextui-org/react";
import { Cliente } from "@prisma/client";
import { Flex } from "../styles/flex";

interface Props {
  cliente: Cliente;
  isShow: boolean;
  closeHandler: () => void;
}

export const DetailsCliente = ({ cliente, isShow, closeHandler }: Props) => {
  if (!cliente) return null;
  console.log({ cliente, isShow });
  return (
    <Modal
      visible={isShow}
      onClose={closeHandler}
      aria-labelledby="modal-title"
      closeButton
      open={isShow}
      width="640px"
      css={{ "@smMax": { maxWidth: "90%", margin: "auto" } }}
      animated
    >
      <Modal.Header>
        <Text h3>Detalhes do Cliente</Text>
      </Modal.Header>
      <Modal.Body>
        {/* <Avatar
          size="large"
          src={cliente.avatar}
          text={cliente.nome}
          css={{ mb: "$4" }}
        /> */}
        <Flex css={{ fd: "column", jc: "center", ai: "center", gap: "$6" }}>
          <Row css={{ gap: "$6", fw: "wrap" }}>
            <Col>
              <Text b size={16} css={{ tt: "capitalize", color: "$accents7" }}>
                Nome:{" "}
              </Text>
              <Text b size={14} css={{ tt: "capitalize", color: "$accents7" }}>
                {cliente.nome}
              </Text>
            </Col>
            <Col>
              <Text b size={16} css={{ tt: "capitalize", color: "$accents7" }}>
                CPF:{" "}
              </Text>
              <Text b size={14} css={{ tt: "capitalize", color: "$accents7" }}>
                {cliente.cpf}
              </Text>
            </Col>
          </Row>
          <Row css={{ gap: "$6" }}>
            <Col>
              <Text b size={16} css={{ tt: "capitalize", color: "$accents7" }}>
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
              <Text b size={16} css={{ tt: "capitalize", color: "$accents7" }}>
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
        <Button auto onClick={closeHandler}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
