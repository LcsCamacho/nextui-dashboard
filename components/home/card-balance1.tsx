import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";

export const CardBalance1 = () => {
  return (
    <Card className=" mw-[375px] bg-blue-600 rounded-xl px-6 py-5">
      <CardBody className="py-5">
        <Flex css={{ gap: "$5" }}>
          <Community />
          <Flex direction={"column"}>
            <span className="text-white">A receber</span>
            <span className="text-white">124 clientes</span>
          </Flex>
        </Flex>
        <Flex css={{ gap: "$6", py: "$4" }} align={"center"}>
          <span
            className="
            text-green-800 font-semibold"
          >
            R$15,910
          </span>
          <span className="text-green-800 font-semibold">+ 2.7%</span>
        </Flex>
        <Flex css={{ gap: "$12" }} align={"center"}>
          <Box>
            <span className="text-green-600 font-semibold">{"↓"}</span>
            <span>100,93 R$</span>
          </Box>
          <Box>
            <p className="text-red-600 font-semibold">{"↑"}</p>
            <span>54,120 R$</span>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};
