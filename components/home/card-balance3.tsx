import { Card, Text, Loading } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import { VendasServices } from "../vendas/services";

export const CardBalance3 = () => {
  const [valorRecebido, setValorRecebido] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const vendas = await VendasServices.getVendas();
      let countValorRecebido = 0;
      vendas.forEach((venda) => {
        countValorRecebido += venda.valorPago;
      });
      setValorRecebido(countValorRecebido);
      setLoading(false);
    })();
  }, []);
  return (
    <Card
      css={{
        mw: "375px",
        bg: "$green600",
        borderRadius: "$xl",
        px: "$6",
      }}
    >
      <Card.Body css={{ py: "$10" }}>
        <Flex css={{ gap: "$5" }}>
          <Community />
          <Flex direction={"column"}>
            <Text span css={{ color: "white" }}>
              Recebido
            </Text>
            <Text span css={{ color: "white" }} size={"$xs"}>
              30 dias
            </Text>
          </Flex>
        </Flex>
        <Flex css={{ gap: "$6", py: "$4" }} align={"center"}>
          <Text span size={"$xl"} css={{ color: "white" }} weight={"semibold"}>
            {loading && <Loading type="points-opacity" size="lg" color="white" />}
            {!loading && valorRecebido.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
          <Text span css={{ color: "$red600" }} size={"$xs"}>
            + 2.7%
          </Text>
        </Flex>
        <Flex css={{ gap: "$12" }} align={"center"}>
          <Box>
            <Text
              span
              size={"$xs"}
              css={{ color: "$red600" }}
              weight={"semibold"}
            >
              {"↓"}
            </Text>
            <Text span size={"$xs"} css={{ color: "$white" }}>
              100,930 R$
            </Text>
          </Box>
          <Box>
            <Text
              span
              size={"$xs"}
              css={{ color: "$red600" }}
              weight={"semibold"}
            >
              {"↑"}
            </Text>
            <Text span size={"$xs"} css={{ color: "$white" }}>
              54,120 R$
            </Text>
          </Box>
        </Flex>
      </Card.Body>
    </Card>
  );
};
