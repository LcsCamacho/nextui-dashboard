import { Cliente } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { Content } from "../components/home/content";
import { users } from "../components/accounts/table/data";

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get("https://primodas.vercel.app/api/clientes");
  return {
    props: {
      clientes: data.length > 0 ? data : users,
    },
  };
};
const Home:NextPage<{ clientes: Cliente[] }> = ({ clientes }) => {
  return <Content clientes={clientes} />;
};

export default Home;
