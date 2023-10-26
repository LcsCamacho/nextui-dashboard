import { Card, Text } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";

export const CardBalance1 = () => {
  return (
    <Card
      css={{
        mw: "375px",
        bg: "$blue600",
        borderRadius: "$xl",
        px: "$6",
      }}
    >
      <Card.Body css={{ py: "$10" }}>
        <Flex css={{ gap: "$5" }}>
          <Community />
          <Flex direction={"column"}>
            <Text span css={{ color: "white" }}>
              A receber
            </Text>
            <Text span css={{ color: "white" }} size={"$xs"}>
              124 clientes
            </Text>
          </Flex>
        </Flex>
        <Flex css={{ gap: "$6", py: "$4" }} align={"center"}>
          <Text span size={"$xl"} css={{ color: "white" }} weight={"semibold"}>
            R$15,910
          </Text>
          <Text span css={{ color: "$green800" }} size={"$xs"}>
            + 2.7%
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
            <Text span size={"$xs"} css={{ color: "$white" }}>
              100,93 R$
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
