import { Button, Input, Text } from "@nextui-org/react";
import { Cliente } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { ExportIcon } from "../icons/accounts/export-icon";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { Flex } from "../styles/flex";
import { TableWrapper } from "./table/table";
import { AddUser } from "./add-user";
import { ClientesServices } from "./services";
import { DetailsCliente } from "./details";

export const Accounts = ({ clientes }: { clientes: Cliente[] }) => {
  const [clientesState, setClientesState] = useState<Cliente[]>(clientes);
  const [clienteSelected, setClienteSelected] = useState<Cliente | null>(null);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const showDetails = (cliente: Cliente) => {
    setClienteSelected(cliente);
    setShowModalDetails(true);
  };
  
  const fetchClientes = async () => {
    setLoading(true);
    const clientes = await ClientesServices.getClientes();
    setClientesState(clientes);
    setLoading(false);
  };

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
                const search = value.toLowerCase();
                return name.includes(search);
              });
              setClientesState(filteredClientes);
            }}
          />
        </Flex>
        <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
          <AddUser
            refetch={() => {
              fetchClientes();
            }}
          />
          {/* <Button auto iconRight={<ExportIcon />}>
            Exportar para Excel
          </Button> */}
        </Flex>
      </Flex>
      <DetailsCliente
        cliente={clienteSelected!}
        isShow={showModalDetails}
        closeHandler={() => setShowModalDetails(false)}
      />
      <TableWrapper handleClickDetails={showDetails} clientes={clientesState} />
    </Flex>
  );
};
