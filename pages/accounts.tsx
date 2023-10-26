import React from "react";
import { Accounts } from "../components/accounts";
import axios from "axios";
import { User } from "../components/accounts";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const {
    data: { users },
  } = await axios.get<{ users: User[] }>("http://localhost:3000/api/users");
  return {
    props: {
      users,
    },
  };
};

const accounts = ({ users }: { users: User[] }) => {
  return <Accounts users={users} />;
};

export default accounts;
