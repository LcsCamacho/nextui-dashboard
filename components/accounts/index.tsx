import { Button, Input, Text } from "@nextui-org/react";
import { Cliente } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { ExportIcon } from "../icons/accounts/export-icon";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { Flex } from "../styles/flex";
import { TableWrapper } from "./table/table";
import { AddUser } from "./add-user";

export interface User {
  id: number;
  name: string;
  role: string;
  team: string;
  status: string;
  age: string;
  avatar: string;
  email: string;
  date?: string;
}

export const Accounts = ({ clientes }: { clientes: Cliente[] }) => {
  const [clientesState, setClientesState] = useState(clientes);
  return (
    <Flex
      css={{
        mt: "$5",
        px: "$6",
        "@sm": {
          mt: "$10",
          px: "$16",
        },
      }}
      justify={"center"}
      direction={"column"}
    >
      <Breadcrumbs>
        <Crumb>
          <HouseIcon />
          <Link href={"/"}>
            <CrumbLink href="#">Home</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>

        <Crumb>
          <UsersIcon />
          <CrumbLink href="#">Clientes</CrumbLink>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">Lista</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>Todas os clientes</Text>
      <Flex
        css={{ gap: "$8" }}
        align={"center"}
        justify={"between"}
        wrap={"wrap"}
      >
        <Flex
          css={{
            gap: "$6",
            flexWrap: "wrap",
            "@sm": { flexWrap: "nowrap" },
          }}
          align={"center"}
        >
          <Input
            css={{ width: "100%", maxW: "410px" }}
            placeholder="Buscar clientes"
            onChange={(e) => {
              const value = e.target.value;
              const filteredClientes = clientes.filter((user) => {
                const name = user.nome.toLowerCase();
                const email = user.email.toLowerCase();
                const search = value.toLowerCase();
                return name.includes(search) || email.includes(search);
              });
              setClientesState(filteredClientes);
            }}
          />
        </Flex>
        <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
          <AddUser />
          <Button auto iconRight={<ExportIcon />}>
            Exportar para Excel
          </Button>
        </Flex>
      </Flex>

      <TableWrapper clientes={clientesState} />
    </Flex>
  );
};
