import { Button, Divider, Input, Modal, Text } from "@nextui-org/react";
import React from "react";
import { Flex } from "../styles/flex";

export const AddUser = () => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <div>
      <Button auto onClick={handler}>
        Cadastrar Cliente
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        width="600px"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header css={{ justifyContent: "start" }}>
          <Text id="modal-title" h4>
            Adicionar novo cliente
          </Text>
        </Modal.Header>
        <Divider css={{ my: "$5" }} />
        <Modal.Body css={{ py: "$10" }}>
          <Flex
            direction={"column"}
            css={{
              flexWrap: "wrap",
              gap: "$8",
              "@lg": { flexWrap: "nowrap", gap: "$12" },
            }}
          >
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                label="Primeiro nome"
                bordered
                clearable
                fullWidth
                size="lg"
                placeholder="Primeiro nome"
              />
              <Input
                label="Segundo nome"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Segundo nome"
              />
            </Flex>

            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                label="Email"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Email"
              />
              <Input
                label="Telefone"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Telefone"
              />
            </Flex>
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                label="Rua"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Rua"
              />
              <Input
                label="Bairro"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Bairro"
              />
              <Input
                label="Número"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Número"
              />
            </Flex>
          </Flex>
        </Modal.Body>
        <Divider css={{ my: "$5" }} />
        <Modal.Footer>
          <Button auto onClick={closeHandler}>
            Cadastrar cliente
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
