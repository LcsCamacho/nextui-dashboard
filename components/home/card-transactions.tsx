import { Avatar, Card, Text } from "@nextui-org/react";
import React from "react";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import { users } from "../table/data";

export const CardTransactions = () => {
  return (
    <Card
      css={{
        mw: "375px",
        height: "auto",
        bg: "$accents0",
        borderRadius: "$xl",
        justifyContent: "start",
        px: "$6",
      }}
    >
      <Card.Body css={{ py: "$10" }}>
        <Flex css={{ gap: "$5" }} justify={"center"}>
          <Text h3 css={{ textAlign: "center" }}>
            Ultimas Transações
          </Text>
        </Flex>
        <Flex css={{ gap: "$6", py: "$4" }} direction={"column"}>
          {users.map((user, index) => {
            if (index > 6) return;
            return (
              <Flex key={index} css={{ gap: "$6" }} align={"center"} justify="between">
                <Avatar
                  size="lg"
                  pointer
                  src={user.avatar}
                  bordered
                  color="gradient"
                  stacked
                />
                <Text span size={"$base"} weight={"semibold"}>
                  {user.name}
                </Text>
                <Text span css={{ color: "$green600" }} size={"$xs"}>
                  4500 R$
                </Text>
                <Text span css={{ color: "$accents8" }} size={"$xs"}>
                  9/20/2023
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Card.Body>
    </Card>
  );
};
