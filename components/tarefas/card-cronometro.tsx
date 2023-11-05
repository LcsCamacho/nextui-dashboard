import { Button, Card, Row, Text } from "@nextui-org/react";
import { Tarefa } from "@prisma/client";
import { useRef, useState } from "react";
import { Flex } from "../styles/flex";
import { StyledBadge } from "../vendas/table/table.styled";
import { TarefasService } from "./services";
import { PopoverModel } from "../common/popover";
import { AiOutlineDelete } from "react-icons/ai";

export const CardCronometro = ({
  tarefa,
  refresh,
}: {
  tarefa: Tarefa;
  refresh: () => Promise<void>;
}) => {
  const [time, setTime] = useState(tarefa.tempo);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const segundos = time % 60;
  const minutos = Math.floor(time / 60);
  const horas = Math.floor(time / 3600);

  const countRef = useRef<NodeJS.Timer>();

  const startCountDown = () => {
    setIsActive(true);
    countRef.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };

  const pauseCountDown = () => {
    setIsActive(false);
    setIsPaused(true);
    clearTimeout(countRef.current);
  };

  const resetCountDown = () => {
    setIsActive(false);
    clearTimeout(countRef.current);
  };

  const saveCountDown = async () => {
    setIsActive(false);
    setIsPaused(false);
    const response = await TarefasService.saveTime(tarefa.id, time);
    console.log(response);
    refresh();
  };

  return (
    <Card
    isHoverable
    isPressable
    variant="bordered"
      css={{
        position: "relative",
        "&:after": {
          content: "''",
          position: "absolute",
          width: "100%",
          height: "100%",
          inset: 0,
          zIndex: 1,
        },
      }}
    >
      <Flex
        css={{
          position: "absolute",
          top: ".75rem",
          right: ".75rem",
          zIndex: 3,
        }}
        align="center"
        justify="center"
      >
        <PopoverModel
          handleClickConfirm={() => TarefasService.deleteTarefa(tarefa.id).then(() => refresh())}
          icon={<AiOutlineDelete />}
          text="Confirmar"
          color="error"
        />
      </Flex>
      <Card.Body
        css={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          gap: "1rem",
          display: "flex",
          zIndex: 2,
        }}
      >
        <Text h4>{tarefa.nome}</Text>
        <Text h6>{tarefa.descricao}</Text>
        <Flex
          justify="center"
          css={{
            mt: "auto",
          }}
          align="center"
        >
          <StyledBadge
            css={{
              fontSize: "1.5rem",
              padding: ".5rem 1rem",
            }}
            type="primary"
          >{` 
        ${horas < 10 ? `0${horas}` : horas}:
        ${minutos < 10 ? `0${minutos}` : minutos}:
        ${segundos < 10 ? `0${segundos}` : segundos}
        `}</StyledBadge>
        </Flex>
        <Row
          css={{
            gap: "1rem",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          <Button
            onClick={startCountDown}
            color="primary"
            auto
            rounded
            disabled={isActive}
          >
            Iniciar
          </Button>
          <Button
            onClick={resetCountDown}
            color="error"
            auto
            rounded
            disabled={!isActive}
          >
            Parar
          </Button>
          <Button
            onClick={pauseCountDown}
            color="warning"
            auto
            rounded
            disabled={!isActive}
          >
            Pausar
          </Button>
        </Row>
        <Row>
          <Button
            onClick={saveCountDown}
            color="success"
            auto
            rounded
            disabled={isActive}
            css={{ width: "100%" }}
          >
            Salvar tempo
          </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};
