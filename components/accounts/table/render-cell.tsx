import { Col, Row, User, Text, Tooltip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../../icons/table/delete-icon";
import { EditIcon } from "../../icons/table/edit-icon";
import { EyeIcon } from "../../icons/table/eye-icon";
import { users } from "./data";
import { IconButton, StyledBadge } from "./table.styled";
import { Cliente } from "@prisma/client";

export interface ClienteWithActions extends Cliente {
  actions?: string;
}
interface Props {
  cliente: ClienteWithActions;
  columnKey: string | React.Key;
  handleClickDetails?: (cliente: Cliente) => void;
}

export const RenderCell = ({ cliente, columnKey, handleClickDetails }: Props) => {
  const cellValue = cliente[columnKey as keyof ClienteWithActions];
  const Cells = {
    nome: () => (
      <User
        squared
        src={users[Math.floor(Math.random() * users.length)].avatar}
        name={String(cellValue)}
        css={{ p: 0 }}
      >
        {cliente.email}
      </User>
    ),
    telefone: () => (
      // @ts-ignore
      <StyledBadge css={{color: "$accents7"}} type={"info"}>{cliente.telefone}</StyledBadge>
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
            {cliente.bairro} - Nº {cliente.numero}
          </Text>
        </Row>
      </Col>
    ),
    cpf: () => (
      // @ts-ignore
      <StyledBadge css={{color: "$accents7"}} type={"info"}>
        {cliente.cpf}
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
            <IconButton onClick={() => {
              if (handleClickDetails) handleClickDetails(cliente)
            }}>
              <EyeIcon size={20} fill="#979797" />
            </IconButton>
          </Tooltip>
        </Col>
        <Col css={{ d: "flex" }}>
          <Tooltip content="Edit user">
            <IconButton onClick={() => console.log("Edit user", cliente.id)}>
              <EditIcon size={20} fill="#979797" />
            </IconButton>
          </Tooltip>
        </Col>
        <Col css={{ d: "flex" }}>
          <Tooltip
            content="Delete user"
            color="error"
            onClick={() => console.log("Delete user", cliente.id)}
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
