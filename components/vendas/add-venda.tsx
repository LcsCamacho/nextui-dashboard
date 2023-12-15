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
import { Cliente } from "@prisma/client";
import { VendaToBeCreated } from "./types";
import { ClientesServices } from "../accounts/services";
import { VendasServices } from "./services";
import { verificaSeTemDadoNullObjeto } from "../../utils/verificaSeTemNullObjeto";

export const AddVenda = ({ refreshVendas }: { refreshVendas: () => void }) => {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [clientes, setClientes] = React.useState<Cliente[]>([]);
  const produto = React.useRef<HTMLInputElement>(null);
  const cliente = React.useRef<HTMLInputElement>(null);
  const valor = React.useRef<HTMLInputElement>(null);
  const modelo = React.useRef<HTMLSelectElement>(null);
  const gbRam = React.useRef<HTMLInputElement>(null);
  const handler = () => setVisible(true);

  React.useEffect(() => {
    (async () => {
      setClientes(await ClientesServices.getClientes());
    })();
  }, []);

  const submitVenda = async () => {
    if (success) return;
    setLoading(true);
    const data: VendaToBeCreated = {
      clienteId: cliente.current?.value,
      valor: valor.current?.value,
      produto: produto.current?.value,
    };
    try {
      if (!verificaSeTemDadoNullObjeto(data)) return;
      const response = await VendasServices.createVenda(data);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
      refreshVendas();
    }
  };

  const closeHandler = () => {
    setVisible(false);
    setLoading(false);
    setError(false);
    setSuccess(false);
  };

  return (
    <Flex css={{
      width: "100%",
      maxWidth: "200px",
      ml: "auto",
      "@smMax": {
        maxWidth: "100%",
      },
    }}>
      <Button
        css={{
          width: "100%",
        }}
        onClick={handler}
      >
        Inserir nova venda aqui
      </Button>
      <Modal
        scroll
        closeButton
        aria-labelledby="modal-title"
        css={{
          maxHeight: "90vh",
          maxWidth: 640,
          "@smMax": {
            maxWidth: "90vw",
            margin: "auto",
          },
        }}
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header style={{ justifyContent: "start" }}>
          <Text h4 id="modal-title">
            Adicionar nova venda
          </Text>
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
                Modelo
              </label>
              <select className="select" placeholder="Modelo" ref={modelo}>
                <option className="option" value="Xiaomi 12S">Xiaomi 12S</option>
                <option className="option"  value="Xiaomi Redmi 12">Xiaomi Redmi 12</option>
                <option className="option"  value="Xiaomi Redmi 12S">Xiaomi Redmi 12S</option>
                <option className="option"  value="Xiaomi Redmi 12 Pro">Xiaomi Redmi 12 Pro</option>
                <option className="option"  value="Xiaomi Redmi 12 Pro Max">
                  Xiaomi Redmi 12 Pro Max
                </option>

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
                label="Valor Líquido"
                fullWidth
                size="lg"
                placeholder="1239,79"
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
                label="Valor Entrada"
                fullWidth
                size="lg"
                placeholder="324,99"
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
                ref={gbRam}
                label="GB\RAM"
                fullWidth
                size="lg"
                placeholder="128GB\8GB"
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
                ref={cliente}
                label="Nome do cliente"
                fullWidth
                size="lg"
                placeholder="Joana Paula"
              />
            </Flex>
          </Flex>
        </Modal.Body>
        <Divider style={{ marginBlock: 5 }} />
        <Modal.Footer>
          <Button
            css={{ minWidth: 130, width: success ? "100%" : "auto" }}
            color={success ? "success" : error ? "error" : "primary"}
            disabled={loading || error}
            onClick={async () => {
              await submitVenda();
            }}
          >
            {!loading && !success && !error && "Pronto"}
            {!loading && error && "Erro"}
            {loading && <Loading type="spinner" />}
            {!loading && success && "Nós cadastramos sua venda!"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Flex>
  );
};
