import { useState, useEffect, useRef } from "react";
import { Col, Text, Input, Button } from "@nextui-org/react";
import { Flex } from "../styles/flex";

//cronometro para saber quanto tempo demoro em cada tarefa

export const Cronometro = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [dateInit, setDateInit] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [datePausedInit, setDatePausedInit] = useState(new Date());
  const [datePausedEnd, setDatePausedEnd] = useState(new Date());
  const countRef = useRef<NodeJS.Timer>();

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountDown() {
    setIsActive(true);
    if(isPaused) setDatePausedEnd(new Date())
    if(!isPaused) setDateInit(new Date());
    countRef.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  }

  const pauseCountDown = () => {
    setDatePausedInit(new Date());
    setIsPaused(true);
    clearTimeout(countRef.current);
  }

  function resetCountDown() {
    setIsActive(false);
    console.log(countRef);
    clearTimeout(countRef.current);
    setDateEnd(new Date());
  }


  return (
    <Flex css={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      gap: '1rem'
    }}>
      <Col  css={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      gap: '1rem',
      display: 'flex',
    }}>
        <Text h1>Cronometro</Text>
        <Input
          type="number"
          placeholder="Tempo em horas"
          value={time / 3600}
          label="Tempo em horas"
          labelLeft="Horas"
          disabled
        />
        <Input
          type="number"
          placeholder="Tempo em minutos"
          value={time / 60}
          label="Tempo em minutos"
          labelLeft="Min"
          disabled
        />
        
        <Input
          type="number"
          placeholder="Tempo em segundos"
          value={time % 60}
          label="Tempo em segundos"
          labelLeft="Seg"
          disabled
        />
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
          onClick={pauseCountDown}
          color="secondary"
          auto
          rounded

        >
          Pausar
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
      </Col>
    </Flex>
  );
};
