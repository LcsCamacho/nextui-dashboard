import React from "react";
import { Link } from "@nextui-org/react";
import { Box } from "../styles/box";
import dynamic from "next/dynamic";
import { Flex } from "../styles/flex";
import { TableWrapper } from "../table/table";
import NextLink from "next/link";
import { CardBalance1 } from "./card-balance1";
import { CardClientesCadastrados } from "./card-clientes-cadastrados";
import { CardBalance3 } from "./card-balance3";
import { CardTransactions } from "./card-transactions";
import { users } from "../table/data";
import { Cliente } from "@prisma/client";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

interface Props {
  clientes: Cliente[];
}

export const Content = ({ clientes }: Props) => (
  <Box css={{ overflow: "hidden", height: "100%" }}>
    <Flex
      css={{
        gap: "$8",
        pt: "$5",
        height: "fit-content",
        flexWrap: "wrap",
        "@lg": {
          flexWrap: "nowrap",
        },
        "@sm": {
          pt: "$10",
        },
      }}
      justify={"center"}
    >
      <Flex
        css={{
          px: "$12",
          mt: "$8",
          "@xsMax": { px: "$10" },
          gap: "$12",
        }}
        direction={"column"}
      >
        {/* Card Section Top */}
        <Box>
          <h3 className="text-center text-2xl font-semibold sm:text-left">
            Balanço de Contas
          </h3>
          <Flex
            css={{
              gap: "$10",
              flexWrap: "wrap",
              justifyContent: "center",
              "@sm": {
                flexWrap: "nowrap",
              },
            }}
            direction={"row"}
          >
            <CardBalance1 />
            <CardClientesCadastrados qtdClientesCadastrados={clientes.length} />
            <CardBalance3 />
          </Flex>
        </Box>

        {/* Chart */}
        <Box>
          <h3 className="text-center text-2xl font-semibold sm:text-left">
            Estatísticas
          </h3>
          <Box
            css={{
              width: "100%",
              backgroundColor: "$accents0",
              boxShadow: "$lg",
              borderRadius: "$2xl",
              px: "$10",
              py: "$10",
            }}
          >
            <Chart />
          </Box>
        </Box>
      </Flex>

      {/* Left Section */}
      <Box
        css={{
          px: "$12",
          mt: "$8",
          height: "fit-content",
          "@xsMax": { px: "$10" },
          gap: "$6",
          overflow: "hidden",
        }}
      >
        <h3 className="text-center text-2xl font-semibold sm:text-left">
          Últimos Agentes e Transações
        </h3>
        <Flex
          direction={"column"}
          justify={"center"}
          css={{
            gap: "$8",
            flexDirection: "row",
            flexWrap: "wrap",
            "@sm": {
              flexWrap: "nowrap",
            },
            "@lg": {
              flexWrap: "nowrap",
              flexDirection: "column",
            },
          }}
        >
          <CardTransactions />
        </Flex>
      </Box>
    </Flex>

    {/* Table Latest Users */}
    <Flex
      direction={"column"}
      justify={"center"}
      css={{
        width: "100%",
        py: "$10",
        px: "$10",
        mt: "$8",
        "@sm": { px: "$20" },
      }}
    >
      <Flex justify={"between"} wrap={"wrap"}>
        <h3 className="text-center text-2xl font-semibold sm:text-left">
          Ultimos Usuarios
        </h3>
        <NextLink href="/clientes">
          <Link
            color="primary"
            className="hover:underline cursor-pointer hover:text-primary-dark transition-all text-sm text-center mt-2 sm:mt-0"
          >
            Ver Todos
          </Link>
        </NextLink>
      </Flex>
      <TableWrapper clientes={clientes} />
    </Flex>
  </Box>
);
