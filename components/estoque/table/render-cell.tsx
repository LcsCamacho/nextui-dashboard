import { Col, Row, Text, Tooltip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../../icons/table/delete-icon";
import { EditIcon } from "../../icons/table/edit-icon";
import { EyeIcon } from "../../icons/table/eye-icon";
import { IProduto } from "../types";
import { IconButton, StyledBadge } from "./table.styled";

export interface IProdutoWithActions extends IProduto {
  actions?: string;
}

interface Props {
  produto: IProdutoWithActions;
  columnKey: string | React.Key;

}

export const RenderCell = ({
  produto,
  columnKey,

}: Props) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 768);
    });
  }, []);
  const Cells = {
    modelo: () => (
      <Col>
        <Row>
          <Text b size={14} css={{ tt: "capitalize" }}>
            {produto.modelo}
          </Text>
        </Row>
      </Col>
    ),
    memoria: () => (
      <Col>
        <Row>
          <Text b size={14} css={{ tt: "capitalize" }}>
            {produto.memoria} GB/ {produto.ram} GB
          </Text>
        </Row>
      </Col>
    ),
    valor: () => (
      // @ts-ignore
      <StyledBadge color={"$accents7"} type={"active"}>
        R$ {produto.valor},00
      </StyledBadge>
    ),
    createdAt: () => (
      // @ts-ignore
      <Col>
        <Row>
          <Text b size={14} css={{ tt: "capitalize" }}>
            {new Date(produto.createdAt).toLocaleDateString()}
          </Text>
        </Row>
        <Row>
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {new Date(produto.createdAt).toLocaleTimeString()}
          </Text>
        </Row>
      </Col>
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
             
            >
              <EyeIcon size={isMobile ? 30 : 20} fill="#979797" />
            </IconButton>
          </Tooltip>
        </Col>
        <Col css={{ d: "flex" }}>
          <Tooltip content="Editar venda">
            <IconButton>
              <EditIcon size={isMobile ? 30 : 20} fill="#979797" />
            </IconButton>
          </Tooltip>
        </Col>
        <Col css={{ d: "flex" }}>
          <Tooltip
            content="Deletar produto"
            color="error"
          >
            <IconButton>
              <DeleteIcon size={isMobile ? 30 : 20} fill="#FF0080" />
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
