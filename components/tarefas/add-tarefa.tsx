import {
  Button,
  Divider,
  Input,
  Modal,
  Text,
  Loading,
  Textarea,
} from "@nextui-org/react";
import React from "react";
import { Flex } from "../styles/flex";
import { TarefasService } from "./services";
import { TarefaToBeCreated } from "./types";
import { verificaSeTemDadoNullObjeto } from "../../utils/verificaSeTemNullObjeto";

export const AddTarefa = ({ refresh }: { refresh: () => void }) => {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const nome = React.useRef<HTMLInputElement>(null);
  const descricao = React.useRef<HTMLTextAreaElement>(null);

  const handler = () => setVisible(true);

  const submitUser = async () => {
    if (success) return;
    setLoading(true);
    const tarefaToBeCreated: TarefaToBeCreated = {
      nome: nome.current?.value!,
      descricao: descricao.current?.value!,
      tempo:0,
      projetoId: "cd98703d-7eb3-441a-8922-4793390b9cd7",
    };
    console.log(tarefaToBeCreated)
    try {
      if (!verificaSeTemDadoNullObjeto(tarefaToBeCreated))
        return alert("Preencha todos os campos");
      await TarefasService.createTarefa(tarefaToBeCreated);
      setSuccess(true);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      refresh();
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
        Cadastrar Tarefa
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
                fd:"column"
              }}
            >
              <Input
                ref={nome}
                label="Nome"
                bordered
                disabled={success || loading}
                clearable
                fullWidth
                size="lg"
                placeholder="Fazer cadastro de cliente"
              />

              <Textarea
                ref={descricao}
                label="Descrição"
                bordered
                disabled={success || loading}

                fullWidth
                size="lg"
                placeholder="Adicionar modal e chamar após clicar no botão"
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
            {!loading && success && "Nós cadastramos sua tarefa, ela deve estar amostra!"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
