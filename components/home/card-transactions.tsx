import { Avatar, Card, Text } from "@nextui-org/react";
import React from "react";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import { users } from "../accounts/table/data";
import { VendasServices } from "../vendas/services";
import { VendaWithActionsAndCliente } from "../vendas/table/render-cell";

export const CardTransactions = () => {

  const [lastTransactions, setLastTransactions] = React.useState<VendaWithActionsAndCliente[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    
    (async () => {
      const data = await VendasServices.getVendasWithClientesAndLimit(7);
      setLastTransactions(data);
      setLoading(false);
    })();
  }, []);

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
            Ultimas Vendas
          </Text>
        </Flex>
        {/* <Flex css={{ gap: "$6", py: "$4" }} direction={"column"}>
          {lastTransactions.map((t, index) => {
            if(loading) return (
              <Flex key={index} css={{ gap: "$6" }} align={"center"} justify="between">
                <Box css={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                <Text span size={"$base"} weight={"semibold"}>
                  Carregando...
                </Text>
                
              </Flex>

            )
            return (
              <Flex key={index} css={{ gap: "$6" }} align={"center"} justify="between">
                <Avatar
                  size="lg"
                  pointer
                  src={users[0].avatar}
                  bordered
                  color="gradient"
                  stacked
                />
                <Text span size={"$base"} weight={"semibold"}>
                  {t.cliente.nome}
                </Text>
                <Text span css={{ color: "$green600" }} size={"$xs"}>
                  {t.valorTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",

                  })}
                </Text>
                <Text span css={{ color: "$accents8" }} size={"$xs"}>
                  {new Date(t.createdAt).toLocaleString()}
                </Text>
              </Flex>
            );
          })}
        </Flex> */}
      </Card.Body>
    </Card>
  );
};
