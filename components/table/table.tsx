import { Table } from "@nextui-org/react";
import React from "react";
import { Box } from "../styles/box";
import { columns } from "./data";
import { RenderCell } from "./render-cell";
import { ClienteWithActions } from "./render-cell";
import { Cliente } from "@prisma/client";

export const TableWrapper = ({ clientes }: { clientes: Cliente[] }) => {
  return (
    <Box
      css={{
        "& .nextui-table-container": {
          boxShadow: "none",
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
        <Table.Body items={clientes}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>
                  <RenderCell cliente={item} columnKey={columnKey} />
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
