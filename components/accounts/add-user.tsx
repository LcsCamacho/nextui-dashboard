import {
  Button,
  Divider,
  Input,
  Modal,
  Text,
  Loading,
} from "@nextui-org/react";
import React from "react";
import { Flex } from "../styles/flex";
import { ClientesServices } from "./services";
import { ClienteToBeCreated } from "./types";
import { verificaSeTemDadoNullObjeto } from "../../utils/verificaSeTemNullObjeto";

export const AddUser = ({ refetch }: { refetch: () => void }) => {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const nome = React.useRef<HTMLInputElement>(null);
  const telefone = React.useRef<HTMLInputElement>(null);
  const rua = React.useRef<HTMLInputElement>(null);
  const bairro = React.useRef<HTMLInputElement>(null);
  const numero = React.useRef<HTMLInputElement>(null);
  const cpf = React.useRef<HTMLInputElement>(null);
  const handler = () => setVisible(true);

  const submitUser = async () => {
    if(success) return
    setLoading(true);
    const clienteToBeCreated: ClienteToBeCreated = {
      nome: nome.current?.value,
      telefone: telefone.current?.value,
      rua: rua.current?.value,
      bairro: bairro.current?.value,
      numero: numero.current?.value,
      cpf: cpf.current?.value,
    };
    try {
      if (!verificaSeTemDadoNullObjeto(clienteToBeCreated)) return alert("Preencha todos os campos");
      const response = await ClientesServices.createCliente(clienteToBeCreated);
      setSuccess(true);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      refetch();
      setLoading(false);
    }
  };

  const closeHandler = () => {
    setVisible(false);
    setLoading(false);
    setError(false);
    setSuccess(false);
  };

  return (
    <div>
      <Button auto onClick={handler}>
        Cadastrar Cliente
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        scroll
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
              "@smMin": { flexWrap: "nowrap", gap: "$12" },
            }}
          >
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@smMin": { flexWrap: "nowrap", gap: "$12" },
                "@smMax": { flexWrap: "wrap", gap: "$6" },
              }}
            >
              <Input
                ref={nome}
                label="Nome"
                bordered
                clearable
                fullWidth
                size="lg"
                placeholder="Carla Dias"
              />
              
            </Flex>

            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@smMin": { flexWrap: "nowrap", gap: "$12" },
                "@smMax": { flexWrap: "wrap", gap: "$6" },
              }}
            >
              <Input
                ref={telefone}
                label="Telefone"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Telefone"
              />
              <Input
                ref={cpf}
                label="Cpf"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="000.000.000-00"
              />
            </Flex>
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@smMin": { flexWrap: "nowrap", gap: "$12" },
                "@smMax": { flexWrap: "wrap", gap: "$6" },
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
            css={{ minWidth: 130, width: success ? "100%" : "auto" }}
            color={success ? "success" : error ? "error" : "primary"}
            disabled={loading || error}
            onClick={async () => {
              await submitUser();
            }}
          >
            {!loading && !success && !error && "Pronto"}
            {!loading && error && "Erro"}
            {loading && <Loading type="spinner" />}
            {!loading && success && "Nós cadastramos seu cliente!"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
