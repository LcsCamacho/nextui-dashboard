import { Card, Text } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";

export const CardClientesCadastrados = ({qtdClientesCadastrados}: {
  qtdClientesCadastrados: number
}) => {
  return (
    <Card
      css={{
        mw: "375px",
        bg: "$accents0",
        borderRadius: "$xl",
        px: "$6",
      }}
    >
      <Card.Body css={{ py: "$10" }}>
        <Flex css={{ gap: "$5" }}>
          <Community color={"$accents9"} />
          <Flex direction={"column"}>
            <Text span css={{ color: "" }}>
              Clientes cadastrados
            </Text>
            <Text span size={"$xs"}>
              +{qtdClientesCadastrados} Pessoas
            </Text>
          </Flex>
        </Flex>
        <Flex css={{ gap: "$6", py: "$4" }} align={"center"}>
          <Text span size={"$xl"} weight={"semibold"}>
            {qtdClientesCadastrados} pessoas
          </Text>
          <Text span css={{ color: "$red600" }} size={"$xs"}>
            + 4.5%
          </Text>
        </Flex>
        <Flex css={{ gap: "$12" }} align={"center"}>
          <Box>
            <Text
              span
              size={"$xs"}
              css={{ color: "$green600" }}
              weight={"semibold"}
            >
              {"↓"}
            </Text>
            <Text span size={"$xs"}>
              11,930 R$
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
            <Text span size={"$xs"}>
              54,120 R$
            </Text>
          </Box>
        </Flex>
      </Card.Body>
    </Card>
  );
};
