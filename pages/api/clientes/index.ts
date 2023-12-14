import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/connect";
import { users } from "../../../components/accounts/table/data";
import { Cliente, Prisma } from "@prisma/client";
interface ClienteDTO extends Cliente {}
import Cors from "cors";
import { runMiddleware } from "../tarefas";

const methodsAllowed = ["GET", "POST"];

enum MethodsAlloweds {
  GET = "GET",
  POST = "POST",
}
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const cors = Cors({
  methods: [...methodsAllowed, "HEAD"],
});

const services = {
  GET: async () => {
    return await prisma.cliente.findMany();
  },
  POST: async ({
    nome,
    valorMovimentado = 0,
    cidade = "Amparo",
    bairro,
    rua,
    numero,
    complemento,
    telefone,
    cpf,
  }: ClienteDTO) => {
    const data = {
      nome,
      valorMovimentado,
      cidade,
      bairro: bairro,
      rua: rua,
      numero: numero,
      complemento: complemento,
      telefone,
      cpf,
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
  await runMiddleware(req, res, cors);
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
