import { Cliente } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { Accounts } from "../components/accounts";
import { users } from "../components/accounts/table/data";
import { currentUrl } from "../components/constants/urlFetch";

export const getServerSideProps: GetServerSideProps = async () => {
  const {
    data,
  } = await axios.get(currentUrl+"/clientes");
  return {
    props: {
      clientes: data,
    },
  };
};

const clientes:NextPage<{ clientes: Cliente[] }> = ({ clientes }) => {
  return <Accounts clientes={clientes} />;
};

export default clientes;
