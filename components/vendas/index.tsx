import Link from "next/link";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { Flex } from "../styles/flex";
import { Button, Input, Text } from "@nextui-org/react";
import { ExportIcon } from "../icons/accounts/export-icon";
import { VendaWithActionsAndCliente } from "./table/render-cell";
import { AddVenda } from "./add-venda";

const Vendas = ({ vendas }: { vendas: VendaWithActionsAndCliente }) => {
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
          <CrumbLink href="#">Vendas</CrumbLink>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">Lista</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>Todas as vendas</Text>
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
            placeholder="Buscar vendas"
          />
        </Flex>
        <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
          <AddVenda />
          <Button auto iconRight={<ExportIcon />}>
            Exportar para Excel
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Vendas;
