import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/connect";
import { Venda, Cliente, Prisma, Venda2 } from "@prisma/client";
import Cors from "cors";

const methodsAllowed = ["GET", "POST", "DELETE", "PUT"];

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
    const { detalhes, formaPagto, produtoId, valorEntrada, valorLiq}:Venda2 = req.body;
    const vendaCriada = await prisma.venda2.create({
      data: {
        detalhes,
        formaPagto,
        produtoId,
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
