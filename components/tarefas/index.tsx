import { Col, Button, Grid } from "@nextui-org/react";
import { Tarefa } from "@prisma/client";
import { Flex } from "../styles/flex";
import { AddTarefa } from "./add-tarefa";
import { CardCronometro } from "./card-cronometro";
import { TarefasService } from "./services";
import { useState } from "react";
import { TarefaWithProjeto } from "./types";

export const Cronometro = ({ tarefas }: { tarefas: TarefaWithProjeto[] }) => {
  const [tarefasState, setTarefas] = useState<TarefaWithProjeto[]>(tarefas);
  const [loading, setLoading] = useState(false);

  const getTarefas = async () => {
    try {
      setLoading(true);
      const response = await TarefasService.getTarefas();
      setTarefas(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex align="center" justify="center">
      <Col
        css={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          gap: "1rem",
          display: "flex",
        }}
      >
        <AddTarefa refresh={getTarefas} />
        <Col
          css={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 30%))",
          }}
        >
          {tarefasState.map((tarefa) => {
            if(loading) return <div>Carregando...</div>
            return <CardCronometro key={tarefa.id} refresh={getTarefas} tarefa={tarefa} />;
          })}
        </Col>
      </Col>
    </Flex>
  );
};
