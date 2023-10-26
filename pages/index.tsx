import { Cliente } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Content } from "../components/home/content";
import { users } from "../components/table/data";

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get("http://localhost:3000/api/clientes");
  return {
    props: {
      clientes: data.length > 0 ? data : users,
    },
  };
};
const Home = ({ clientes }: { clientes: Cliente[] }) => {
  return <Content clientes={clientes} />;
};

export default Home;
