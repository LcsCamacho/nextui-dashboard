import { Link, Text } from "@nextui-org/react";
import { Cliente } from "@prisma/client";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useState } from "react";
import { DetailsCliente } from "../accounts/details";
import { TableWrapper } from "../accounts/table/table";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import { CardBalance1 } from "./card-balance1";
import { CardBalance3 } from "./card-balance3";
import { CardClientesCadastrados } from "./card-clientes-cadastrados";
import { CardTransactions } from "./card-transactions";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

interface Props {
  clientes: Cliente[];
}

export const Content = ({ clientes }: Props) => {
  const [clienteSelected, setClienteSelected] = useState<Cliente | null>(null);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [clientesState, setClientesState] = useState(clientes);

  const showDetails = (cliente: Cliente) => {
    setClienteSelected(cliente);
    setShowModalDetails(true);
  };

  return (
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
            <Text
              h3
              css={{
                textAlign: "center",
                "@sm": {
                  textAlign: "inherit",
                },
              }}
            >
              Balanço de Contas
            </Text>
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
              <CardClientesCadastrados
                qtdClientesCadastrados={clientes.length}
              />
              <CardBalance3 />
            </Flex>
          </Box>

          {/* Chart */}
          <Box>
            <Text
              h3
              css={{
                textAlign: "center",
                "@lg": {
                  textAlign: "inherit",
                },
              }}
            >
              Estatísticas
            </Text>
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
          <Text
            h3
            css={{
              textAlign: "center",
              "@lg": {
                textAlign: "inherit",
              },
            }}
          >
            Relatório do Dia
          </Text>
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
          <Text
            h3
            css={{
              textAlign: "center",
              "@lg": {
                textAlign: "inherit",
              },
            }}
          >
            Ultimos Usuarios
          </Text>
          <NextLink href="/clientes">
            <Link
              block
              color="primary"
              css={{
                textAlign: "center",
                "@lg": {
                  textAlign: "inherit",
                },
              }}
            >
              Ver Todos
            </Link>
          </NextLink>
        </Flex>
        <DetailsCliente
          cliente={clienteSelected!}
          isShow={showModalDetails}
          closeHandler={() => setShowModalDetails(false)}
        />
        <TableWrapper
          clientes={clientesState}
          handleClickDetails={showDetails}
        />
      </Flex>
    </Box>
  );
};
