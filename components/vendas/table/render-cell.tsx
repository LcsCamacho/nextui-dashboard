import { Col, Row, User, Text, Tooltip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../../icons/table/delete-icon";
import { EditIcon } from "../../icons/table/edit-icon";
import { EyeIcon } from "../../icons/table/eye-icon";
import { users } from "./data";
import { IconButton, StyledBadge } from "./table.styled";
import { Venda, Cliente } from "@prisma/client";

export interface VendaWithActionsAndCliente extends Venda {
  actions?: string;
  cliente: Cliente
}

interface Props {
  venda: VendaWithActionsAndCliente;
  columnKey: string | React.Key;
}

export const RenderCell = ({ venda, columnKey }: Props) => {
  const cellValue = venda[columnKey as keyof VendaWithActionsAndCliente];
  const Cells = {
    nome: () => (
      <User
        squared
        src={users[Math.floor(Math.random() * users.length)].avatar}
        name={String(cellValue)}
        css={{ p: 0 }}
      >
        {venda.cliente.nome}
      </User>
    ),
    telefone: () => (
      <Col>
      <Row>
         <Text b size={14} css={{tt: 'capitalize'}}>
            {String(cellValue)}
         </Text>
      </Row>
   </Col>
    ),
    rua: () => (
      <Col>
        <Row>
          <Text b size={14} css={{ tt: "capitalize" }}>
            {String(cellValue)}
          </Text>
        </Row>
        <Row>
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {venda.cliente.bairro} - Nº {venda.cliente.numero}
          </Text>
        </Row>
      </Col>
    ),
    valorMovimentado: () => (
      // @ts-ignore
      <StyledBadge type={String(cliente.valorMovimentado)}>
        R$ {cellValue},00
      </StyledBadge>
    ),
    actions: () => (
      <Row
        justify="center"
        align="center"
        css={{ gap: "$8", "@md": { gap: 0 } }}
      >
        <Col css={{ d: "flex" }}>
          <Tooltip content="Details">
            <IconButton onClick={() => console.log("View Venda", venda.id)}>
              <EyeIcon size={20} fill="#979797" />
            </IconButton>
          </Tooltip>
        </Col>
        <Col css={{ d: "flex" }}>
          <Tooltip content="Edit Venda">
            <IconButton onClick={() => console.log("Edit Venda", venda.id)}>
              <EditIcon size={20} fill="#979797" />
            </IconButton>
          </Tooltip>
        </Col>
        <Col css={{ d: "flex" }}>
          <Tooltip
            content="Delete Venda"
            color="error"
            onClick={() => console.log("Delete Venda", venda.id)}
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
