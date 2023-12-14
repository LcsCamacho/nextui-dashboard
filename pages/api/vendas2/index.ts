import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/connect";
import { Venda, Cliente, Prisma, Venda2 } from "@prisma/client";
import Cors from "cors";
import { runMiddleware } from "../tarefas";

const methodsAllowed = ["GET", "POST", "DELETE", "PUT"];

enum MethodsAlloweds {
  GET = "GET",
  POST = "POST",

}

const cors = Cors({
  methods: [...methodsAllowed, "HEAD"],
});

const getVendasById = async (id: string, transacao?: boolean) => {
  return await prisma.venda2.findMany({
    where: {
      id,
    },
  });
};

const services = {
  GET: async (req: NextApiRequest) => {
    console.log(req.query);
    if (req.query.cliId)
      return await getVendasById(String(req.query.cliId));
    

    return await prisma.venda2.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  POST: async (req: NextApiRequest) => {
    const { detalhes, formaPagto, modelo, valorEntrada, valorLiq}:Venda2 = req.body;
    const vendaCriada = await prisma.venda2.create({
      data: {
        detalhes,
        formaPagto,
        modelo,
        valorEntrada,
        valorLiq,
      },
    });
    return { success: true, id: vendaCriada.id };
  },

};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  const method = req.method as MethodsAlloweds;
  console.log(method);
  if (!method) return res.status(400).json({ message: "Method is required" });

  if (!methodsAllowed.includes(method))
    return res.status(405).json({ message: `Method ${method} Not Allowed` });

  try {
    const response = await services[method](req);
    return res.status(200).json(response);
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    // console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
