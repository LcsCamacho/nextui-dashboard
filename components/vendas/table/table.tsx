import { Table } from "@nextui-org/react";
import React from "react";
import { Box } from "../../styles/box";
import { columns } from "./data";
import { RenderCell } from "./render-cell";
import { VendaWithActionsAndCliente } from "./render-cell";

export const TableWrapperVendas = ({
  vendas,
}: {
  vendas: VendaWithActionsAndCliente[];
}) => {
  return (
    <Box
      css={{
        "& .nextui-table-container": {
          boxShadow: "none",
          minWidth: "100%",
          boxShadow: "none",
          width: "100%",
        },
      }}
    >
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
          boxShadow: "none",
          width: "100%",
          px: 0,
        }}
        selectionMode="multiple"
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
        <Table.Body items={vendas}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>
                  <RenderCell venda={item} columnKey={columnKey} />
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
