import React from "react";
import { Accounts } from "../components/accounts";
import axios from "axios";
import { User } from "../components/accounts";
import { GetServerSideProps } from "next";
import { Cliente } from "@prisma/client";
import { users } from "../components/table/data";

export const getServerSideProps: GetServerSideProps = async () => {
  const {
    data,
  } = await axios.get("https://primodas.vercel.app/api/clientes");
  return {
    props: {
      clientes: data.length > 0 ? data : users,
    },
  };
};

const accounts = ({ clientes }: { clientes: Cliente[] }) => {
  return <Accounts clientes={clientes} />;
};

export default accounts;
