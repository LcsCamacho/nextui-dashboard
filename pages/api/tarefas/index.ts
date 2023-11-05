import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/connect";
import { Prisma, Tarefa } from "@prisma/client";

const methodsAllowed = ["GET", "POST", "PUT", "DELETE"];

enum MethodsAlloweds {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const services = {
  GET: async (req: NextApiRequest) => {
    return await prisma.tarefa.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        projeto: true,
      },
    });
  },
  POST: async (req: NextApiRequest) => {
    const { descricao, nome, projetoId, id:inputId }: Tarefa = req.body;

    const { id } = await prisma.tarefa.create({
      data: {
        id: inputId,
        descricao,
        nome,
        tempo: 0,
        projetoId,
      },
    });
    return { success: true, id };
  },
  PUT: async (req: NextApiRequest) => {
    const { id } = req.query;
    const { tempo }: Tarefa = req.body;
    await prisma.tarefa.update({
      where: {
        id: String(id),
      },
      data: {
        tempo,
      },
    });

    return { success: true, id: String(id) };
  },
  DELETE: async (req: NextApiRequest) => {
    const { id } = req.query;
    await prisma.tarefa.delete({
      where: {
        id: String(id),
      },
    });
    return { success: true };
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
