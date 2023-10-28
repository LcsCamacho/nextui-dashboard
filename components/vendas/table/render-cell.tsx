import { Col, Row, User, Text, Tooltip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../../icons/table/delete-icon";
import { EditIcon } from "../../icons/table/edit-icon";
import { EyeIcon } from "../../icons/table/eye-icon";
import { users } from "./data";
import { IconButton, StyledBadge } from "./table.styled";
import { Venda, Cliente } from "@prisma/client";
import { VendasServices } from "../services";
import { VendaWithCliente } from "../types";

export interface VendaWithActionsAndCliente extends VendaWithCliente {
  actions?: string;
}

interface Props {
  venda: VendaWithActionsAndCliente;
  columnKey: string | React.Key;
  handleClickDetails?: (venda: VendaWithActionsAndCliente) => void;
  handleClickEdit?: (venda: VendaWithActionsAndCliente) => void;
}

export const RenderCell = ({
  venda,
  columnKey,
  handleClickDetails,
  handleClickEdit,
}: Props) => {
  if (!venda) return <></>;

  const Cells = {
    nome: () => (
      <User
        squared
        src={users[Math.floor(Math.random() * users.length)].avatar}
        name={String(venda.cliente.nome)}
        css={{ p: 0 }}
      >
        {venda.cliente.telefone}
      </User>
    ),
    rua: () => (
      <Col>
        <Row>
          <Text b size={14} css={{ tt: "capitalize" }}>
            {venda.cliente.rua}
          </Text>
        </Row>
        <Row>
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {venda.cliente.bairro} - Nº {venda.cliente.numero}
          </Text>
        </Row>
      </Col>
    ),
    valorTotal: () => (
      // @ts-ignore
      <StyledBadge color={"$accents7"} type={"active"}>
        R$ {venda.valorTotal},00
      </StyledBadge>
    ),
    createdAt: () => (
      // @ts-ignore
      <Col>
        <Row>
          <Text b size={14} css={{ tt: "capitalize" }}>
            {new Date(venda.createdAt).toLocaleDateString()}
          </Text>
        </Row>
        <Row>
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {new Date(venda.createdAt).toLocaleTimeString()}
          </Text>
        </Row>
      </Col>
    ),
    pago: () => (
      // @ts-ignore
      <StyledBadge color={"$accents7"} type={venda.pago ? "active" : "warning"}>
        {venda.pago ? "PAGO" : "PENDENTE"}
      </StyledBadge>
    ),
    actions: () => (
      <Row
        justify="center"
        align="center"
        css={{ gap: "$8", "@md": { gap: 0 } }}
      >
        <Col css={{ d: "flex" }}>
          <Tooltip content="Detalhes">
            <IconButton
              onClick={() => {
                if (handleClickDetails) handleClickDetails(venda);
              }}
            >
              <EyeIcon size={20} fill="#979797" />
            </IconButton>
          </Tooltip>
        </Col>
        <Col css={{ d: "flex" }}>
          <Tooltip content="Editar venda">
            <IconButton onClick={() => {
              if (handleClickEdit) handleClickEdit(venda);
            }}>
              <EditIcon size={20} fill="#979797" />
            </IconButton>
          </Tooltip>
        </Col>
        <Col css={{ d: "flex" }}>
          <Tooltip
            content="Deletar venda"
            color="error"
            onClick={() => {
              console.log("Delete Venda", venda.id);
              VendasServices.deleteVenda(venda.id);
            }}
          >
            <IconButton>
              <DeleteIcon size={20} fill="#FF0080" />
            </IconButton>
          </Tooltip>
        </Col>
      </Row>
    ),
  };
  const Cell = Cells[columnKey as keyof typeof Cells];
  if (!Cell) return <></>;
  return <Cell />;
};
