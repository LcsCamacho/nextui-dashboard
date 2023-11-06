import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/connect";
import { Venda, Cliente, Prisma } from "@prisma/client";
import Cors from "cors";
import { runMiddleware } from "../tarefas";

const methodsAllowed = ["GET"];

enum MethodsAlloweds {
  GET = "GET",
  // POST = "POST",
  // DELETE = "DELETE",
  // PUT = "PUT",
}
const cors = Cors({
  methods: [...methodsAllowed, "HEAD"],
});
const services = {
  GET: async (req: NextApiRequest) => {
    if (req.query.id) {
      return await prisma.transacao.findUnique({
        where: {
          id: String(req.query.id),
        },
        include: {
          cliente: Boolean(req.query.withCliente),
          venda: Boolean(req.query.withVenda),
        },
      });
    }
    return await prisma.transacao.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        cliente: Boolean(req.query.withCliente),
        venda: Boolean(req.query.withVenda),
      }
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
    const response = await services[method](req);
    return res.status(200).json(response);
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
