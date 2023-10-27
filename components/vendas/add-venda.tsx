import { Button, Divider, Input, Modal } from "@nextui-org/react";
import React from "react";
import { Flex } from "../styles/flex";
import { UseAxios } from "../hooks/useAxios";
import { Cliente } from "@prisma/client";

export const AddVenda = ({refetch}: {
  refetch: () => void
}) => {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [clientes, setClientes] = React.useState<Cliente[]>([]);
  const cliente = React.useRef<HTMLSelectElement>(null);
  const valor = React.useRef<HTMLInputElement>(null);
  const handler = () => setVisible(true);
  const { api } = UseAxios();

  const fetchClientes = React.useCallback(async () => {
    const response = await api.get("/clientes");
    setClientes(response.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  const submitVenda = async () => {
    let isValid = true;
    setLoading(true);
    const data = {
      clienteId: cliente.current?.value,
      valor: valor.current?.value,
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
      const response = await api.post("/vendas", data);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      refetch();
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
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header style={{ justifyContent: "start" }}>
          <h4 id="modal-title">Adicionar nova venda</h4>
        </Modal.Header>
        <Divider style={{ marginBlock: 5 }} />
        <Modal.Body style={{ paddingTop: 10 }}>
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
                gap: "$2",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
                flexDirection: "column",
              }}
            >
              <label
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  width: "100%",
                }}
              >
                Cliente
              </label>
              <select className="select" placeholder="Cliente" ref={cliente}>
                {clientes.map((cliente: Cliente) => (
                  <option
                    className="option"
                    key={cliente.id}
                    value={cliente.id}
                  >
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </Flex>
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                labelLeft="R$"
                ref={valor}
                type="number"
                onChange={() => {
                  if (valor.current?.value) {
                    valor.current.value = valor.current.value.replace(
                      /\D/g,
                      ""
                    );
                  }
                }}
                label="Valor"
                fullWidth
                size="lg"
                placeholder="Valor"
              />
            </Flex>
          </Flex>
        </Modal.Body>
        <Divider style={{ marginBlock: 5 }} />
        <Modal.Footer>
          <Button
            disabled={loading}
            onClick={async () => {
              await submitVenda();
              closeHandler();
            }}
          >
            Cadastrar venda
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
