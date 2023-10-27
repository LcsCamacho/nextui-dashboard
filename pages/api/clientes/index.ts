import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/connect";
import { users } from "../../../components/accounts/table/data";
import { Cliente, Prisma } from "@prisma/client";
interface ClienteDTO extends Omit<Cliente, "nome"> {
  primeiroNome: string;
  segundoNome: string;
}

const methodsAllowed = ["GET", "POST"];

enum MethodsAlloweds {
  GET = "GET",
  POST = "POST",
}

const services = {
  GET: async () => {
    return await prisma.cliente.findMany();
  },
  POST: async ({
    primeiroNome,
    segundoNome,
    valorMovimentado = 0,
    cidade = "Amparo",
    bairro,
    rua,
    numero,
    complemento,
    email,
    telefone,
    cpf
  }: ClienteDTO) => {
    const data = {
      nome: `${primeiroNome} ${segundoNome}`,
      valorMovimentado,
      cidade,
      bairro: bairro,
      rua: rua,
      numero: numero,
      complemento: complemento,
      email,
      telefone,
      cpf
    };
    return await prisma.cliente.create({
      data,
    });
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method as MethodsAlloweds;
  if (!method) return res.status(400).json({ message: "Method is required" });

  if (!methodsAllowed.includes(method))
    return res.status(405).json({ message: `Method ${method} Not Allowed` });

  try {
    const response = await services[method](req.body);
    return res.status(200).json(response);
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    return res.status(500).json({ message: error.message });
  }
}
