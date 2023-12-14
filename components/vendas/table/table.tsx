import { Table } from "@nextui-org/react";
import React from "react";
import { Box } from "../../styles/box";
import { columns } from "./data";
import { RenderCell } from "./render-cell";
import { VendaWithActionsAndCliente } from "./render-cell";
import { VendaWithCliente } from "../types";
export const TableWrapperVendas = ({
  vendas,
  loading,
  handleClickDetails,
  handleClickEdit,
}: {
  vendas: VendaWithCliente[];
  loading?: boolean;
  handleClickDetails: (venda: VendaWithCliente) => void;
  handleClickEdit: (venda: VendaWithCliente) => void;
}) => {
  return (
    <Box
    suppressHydrationWarning
      css={{
        "& .nextui-table-container": {
          boxShadow: "none",
          minWidth: "100%",
          width: "100%",
        },
        overflowX: "auto",
        width: "100%",
      }}
    >
      <Table
        aria-label="Table of vendas"
        css={{
          height: "auto",
          minWidth: "100%",
          boxShadow: "none",
          width: "100%",
          px: 0,
        }}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={vendas as VendaWithActionsAndCliente[]}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>
                  {!loading && (
                    <RenderCell
                      handleClickEdit={handleClickEdit}
                      handleClickDetails={handleClickDetails}
                      venda={item}
                      columnKey={columnKey}
                    />
                  )}
                  {loading && <p>Carregando...</p>}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={8}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
    </Box>
  );
};
