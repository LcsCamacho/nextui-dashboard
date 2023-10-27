import Link from "next/link";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { Flex } from "../styles/flex";
import { Button, Input } from "@nextui-org/react";
import { ExportIcon } from "../icons/accounts/export-icon";
import { VendaWithActionsAndCliente } from "./table/render-cell";
import { AddVenda } from "./add-venda";
import { TableWrapperVendas } from "./table/table";
import { useState } from "react";
import { VendasServices } from "./services";

const Vendas = ({ vendas }: { vendas: VendaWithActionsAndCliente[] }) => {
  const [vendasState, setVendas] = useState<VendaWithActionsAndCliente[]>(vendas);
  const [loading, setLoading] = useState(false);

  const getVendas = async () => {
    setLoading(true);
    const data = await VendasServices.getVendasWithClientes();
    setVendas(data);
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
          <p>/</p>
        </Crumb>

        <Crumb>
          <UsersIcon />
          <CrumbLink href="#">Vendas</CrumbLink>
          <p>/</p>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">Lista</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <p>Todas as vendas</p>
      <Flex
        css={{ gap: "$8", flexDirection: "column", mt: "$6", mb: "$6" }}
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
            style={{ width: "100%", maxWidth: "410px" }}
            placeholder="Buscar vendas"
          />
          <AddVenda refetch={() => getVendas()} />
          <Button>
            <ExportIcon /> Exportar para Excel
          </Button>
        </Flex>
        <TableWrapperVendas loading={loading} vendas={vendasState} />
      </Flex>
    </Flex>
  );
};

export default Vendas;
