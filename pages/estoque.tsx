import axios from "axios";
import { GetServerSideProps, NextPage, InferGetServerSidePropsType } from "next";
import Estoque from "../components/estoque";
import { currentUrl } from "../constants/urlFetch";
import {IProduto} from "../components/estoque/types";

export const getServerSideProps: GetServerSideProps = async () => {
  const {
    data,
  } = await axios.get(currentUrl+"/estoque");
  return {
    props: {
      estoque: data,
    },
  };
};

const EstoquePage:NextPage<{ produto: IProduto[] }> = ({ produto }) => {
  return <Estoque produtos={produto} />;
};

export default Estoque;
