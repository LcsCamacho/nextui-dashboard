import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/connect";
import { Prisma, Projeto } from "@prisma/client";

const methodsAllowed = ["GET", "POST"];

enum MethodsAlloweds {
  GET = "GET",
  POST = "POST",
}

const services = {
  GET: async (req: NextApiRequest) => {
    return await prisma.projeto.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Tarefa: !!req.query.withTarefa && req.query.withTarefa === "1",
      },
    });
  },
  POST: async (req: NextApiRequest) => {
    const { descricao, nome }: Projeto = req.body;

    const { id } = await prisma.projeto.create({
      data: {
        descricao,
        nome,
      },
    });
    return { success: true, id };
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
    const response = await services[method](req);
    return res.status(200).json(response);
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
