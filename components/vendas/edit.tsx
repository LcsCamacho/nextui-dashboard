import {
  Button,
  Checkbox,
  Input,
  Loading,
  Modal,
  Row,
  Text,
} from "@nextui-org/react";
import { Venda } from "@prisma/client";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Flex } from "../styles/flex";
import { VendasServices } from "./services";
import { StyledBadge } from "./table/table.styled";
import { VendaWithCliente } from "./types";

interface Props {
  venda: VendaWithCliente;
  isShow: boolean;
  closeHandler: () => void;
  refreshVendas: () => void;
}

export const EditarVenda = ({ venda, isShow, closeHandler, refreshVendas }: Props) => {
  const [loading, setLoading] = useState(false);
  const [valorPago, setValorPago] = useState(venda.valorPago || 0) ;
  const [pago, setPago] = useState(valorPago === venda.valorTotal || false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const valorRestante = venda.valorTotal - venda.valorPago;

  const saveChanges = async () => {
    setLoading(true);
    try {
      const data = {
        valorTotal: Number(venda.valorTotal),
        valorPago: Number(valorPago),
        pago,
        id: venda.id,
      };
      const response = await VendasServices.updateVenda(data as Venda);
      console.log(response);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      refreshVendas()
      setLoading(false);
      closeHandler();
      resetState();
    }
  };

  const resetState = () => {
    setSuccess(false);
    setError(false);
    setValorPago(0);
    setPago(false);
    setLoading(false);
  }

  return (
    <Modal
      visible={isShow}
      open={isShow}
      onClose={closeHandler}
      aria-labelledby="modal-title"
      closeButton
      width="100%"
      css={{
        margin: "auto",
        maxHeight: "90vh",
        maxWidth: 400,
        "@smMax": {
          maxWidth: "90vw",
          margin: "auto",
        },
      }}
      animated
    >
      <Modal.Header>
        <Text h3>Editar venda</Text>
      </Modal.Header>
      <Modal.Body>
        <Flex css={{ fd: "column", jc: "center", ai: "start", gap: "$6" }}>
          <Row align="center">
            <Text b size={16} css={{ color: "$accents9" }}>
              Valor Restante
            </Text>
            <StyledBadge type={"active"}>R$ {valorRestante},00</StyledBadge>
          </Row>
          <Input
            type="number"
            labelLeft="R$"
            value={valorPago}
            max={valorRestante}
            disabled={pago}
            onChange={(e) => {
              const value = Number(e.target.value.replace(/\D/g, ""));
              if (value === valorRestante) {
                setPago(true);
                setValorPago(value);
                return;
              };
              if (value >= valorRestante) {
                setValorPago(valorRestante);
                setPago(true);
                return;
              }
              Number(value) === Number(valorRestante) && setPago(true);
              setValorPago(value);
            }}
            fullWidth
          />
          <Checkbox
            label="Pagar tudo"
            value="pago"
            isSelected={pago}
            onChange={(e) => {
              setPago(e);
              setValorPago(valorRestante);
            }}
          />
        </Flex>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={loading}
          auto
          color={success ? "success" : error ? "error" : "primary"}
          onClick={saveChanges}
        >
          {loading ? (
            <Loading type="spinner" />
          ) : (
            <Text size={16} css={{ color: "$white" }}>
              Salvar pagamento
            </Text>
          )}
          {success && !loading && (
            <>
              <FaCheckCircle
                size={16}
                color="green"
                style={{ marginLeft: 8 }}
              />
              <Text size={16} css={{ color: "$white" }}>
                Pagamento salvo com sucesso!
              </Text>
            </>
          )}

          {error && !loading && (
            <Text size={16} css={{ color: "$white" }}>
              Erro ao salvar pagamento!
            </Text>
          )}
        </Button>
        <Button disabled={loading} auto color="error" onClick={closeHandler}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
