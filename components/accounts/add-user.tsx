import { Button, Divider, Input, Modal, Text } from "@nextui-org/react";
import React from "react";
import { Flex } from "../styles/flex";
import { UseAxios } from "../hooks/useAxios";

export const AddUser = () => {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handler = () => setVisible(true);
  const { api } = UseAxios();
  const primeiroNome = React.useRef<HTMLInputElement>(null);
  const segundoNome = React.useRef<HTMLInputElement>(null);
  const email = React.useRef<HTMLInputElement>(null);
  const telefone = React.useRef<HTMLInputElement>(null);
  const rua = React.useRef<HTMLInputElement>(null);
  const bairro = React.useRef<HTMLInputElement>(null);
  const numero = React.useRef<HTMLInputElement>(null);

  const submitUser = async () => {
    let isValid = true;
    setLoading(true);
    const data = {
      primeiroNome: primeiroNome.current?.value,
      segundoNome: segundoNome.current?.value,
      email: email.current?.value,
      telefone: telefone.current?.value,
      rua: rua.current?.value,
      bairro: bairro.current?.value,
      numero: numero.current?.value,
    };
    Object.keys(data).forEach((key) => {
      const keyTyped = key as keyof typeof data;
      if (!isValid) return;
      if (!data[keyTyped]) {
        isValid = false;
      }
    });
    if(!isValid) return alert("Preencha todos os campos");
    try {
      const response = await api.post("/clientes", data);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const closeHandler = () => {
    setVisible(false);
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
                ref={primeiroNome}
                label="Primeiro nome"
                bordered
                clearable
                fullWidth
                size="lg"
                placeholder="Primeiro nome"
              />
              <Input
                ref={segundoNome}
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
                ref={email}
                label="Email"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Email"
              />
              <Input
                ref={telefone}
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
                ref={rua}
                label="Rua"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Rua"
              />
              <Input
                ref={bairro}
                label="Bairro"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Bairro"
              />
              <Input
                ref={numero}
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
          <Button
            disabled={loading}
            auto
            onClick={async () => {
              await submitUser();
              closeHandler();
            }}
          >
            Cadastrar cliente
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
