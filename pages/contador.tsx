import { Tarefa } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { Cronometro } from "../components/tarefas";
import axios from "axios";
import { currentUrl } from "../constants/urlFetch";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data } = await axios.get(`${currentUrl}/tarefas`);

    return {
      props: {
        tarefas: data,
      },
    };
  } catch (error) {
    return {
      props: {
        tarefas: [],
      },
    };
  }
};

//nessa pagina vou adicionar um cronometro para regular o tempo das minhas atividades
const ContadorPage: NextPage<{ tarefas: Tarefa[] }> = ({ tarefas }) => {
  return <Cronometro tarefas={tarefas} />;
};

export default ContadorPage;
