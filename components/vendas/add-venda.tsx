import {
  Button,
  Divider,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React from "react";
import { Flex } from "../styles/flex";
import { UseAxios } from "../hooks/useAxios";
import { Cliente } from "@prisma/client";

export const AddVenda = () => {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [clientes, setClientes] = React.useState<Cliente[]>([]);
  const cliente = React.useRef<HTMLSelectElement>(null);
  const valor = React.useRef<HTMLInputElement>(null);
  const handler = () => setVisible(true);
  const { api } = UseAxios();

  const getClientes = async () => {
    const response = await api.get("/clientes");
    setClientes(response.data);
  };
  React.useEffect(() => {
    getClientes();
  }, []);

  const submitVenda = async () => {
    let isValid = true;
    setLoading(true);
    const data = {
      clienteId: cliente.current?.value,
    };
    Object.keys(data).forEach((key) => {
      const keyTyped = key as keyof typeof data;
      if (!isValid) return;
      if (!data[keyTyped]) {
        isValid = false;
      }
    });
    if (!isValid) return alert("Preencha todos os campos");
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
      <Button onClick={handler}>Cadastrar Venda</Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        className="modal modal-primary w-[600px]"
        isOpen={visible}
        onClose={closeHandler}
      >
        <ModalHeader style={{ justifyContent: "start" }}>
          <h4 id="modal-title">Adicionar nova venda</h4>
        </ModalHeader>
        <Divider style={{ marginBlock: 5 }} />
        <ModalBody style={{ paddingTop: 10 }}>
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
              <Select
                items={clientes}
                ref={cliente}
                label="Cliente"
                fullWidth
                size="lg"
                placeholder="Cliente"
              >
                {(cliente: Cliente) => (
                  <SelectItem key={cliente.id}>{cliente.nome}</SelectItem>
                )}
              </Select>
            </Flex>
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                ref={valor}
                label="Valor"
                fullWidth
                size="lg"
                placeholder="Valor"
              />
            </Flex>
          </Flex>
        </ModalBody>
        <Divider style={{ marginBlock: 5 }} />
        <ModalFooter>
          <Button
            disabled={loading}
            onClick={async () => {
              await submitVenda();
              closeHandler();
            }}
          >
            Cadastrar venda
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
