import Link from "next/link";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { Flex } from "../styles/flex";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { ExportIcon } from "../icons/accounts/export-icon";
import { IProduto } from "./types";
import { TableWrapperProdutos } from "./table/table";
import { useState } from "react";

const Estoque = ({ produtos }: { produtos: IProduto[] }) => {
  const [produtosState, setProdutos] = useState<IProduto[]>(produtos);
  const [loading, setLoading] = useState(false);

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
          <CrumbLink href="#">Produtos</CrumbLink>
          <p>/</p>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">Lista</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <p>Todos os produtos</p>
      <Flex
        css={{ gap: "$8", flexDirection: "column", mt: "$6", mb: "$6" }}
        justify={"between"}
        wrap={"wrap"}
      >
        <Flex
          css={{
            gap: "$6",
            flexWrap: "wrap",
            width: "100%",
            "@smMax": {
              fd: "column",
              gap: "$4",
              jc: "center",
              ai: "start",
            },
          }}
          align={"center"}
        >
          <Input
            css={{
              width: "100%",
              maxWidth: "410px",
              "@smMax": {
                maxWidth: "100%",
              },
            }}
            placeholder="Buscar produtos"
          />
          
        </Flex>
        
        <TableWrapperProdutos
          loading={loading}
          produtos={produtosState}
        />
      </Flex>
    </Flex>
  );
};

export default Estoque;
