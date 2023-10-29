import { Cliente } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { Content } from "../components/home/content";
import { users } from "../components/accounts/table/data";
import { currentUrl } from "../constants/urlFetch";

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get(currentUrl + "/clientes");
  return {
    props: {
      clientes: data,
    },
  };
};
const Home:NextPage<{ clientes: Cliente[] }> = ({ clientes }) => {
  return <Content clientes={clientes} />;
};

export default Home;
