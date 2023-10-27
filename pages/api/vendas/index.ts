import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/connect";
import { Venda, Cliente, Prisma } from "@prisma/client";

const methodsAllowed = ["GET", "POST", "DELETE"];

enum MethodsAlloweds {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

const services = {
  GET: async (req: NextApiRequest) => {
    console.log(req.query);
    if (req.query.withClientes) {
      return await prisma.venda.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        take: Number(req.query.limit) || undefined,
        include: {
          cliente: true,
        },
      });
    }
    return await prisma.venda.findMany();
  },
  POST: async (req: NextApiRequest) => {
    const { clienteId, valor } = req.body;
    await prisma.$transaction([
      prisma.venda.create({
        data: {
          pago: false,
          clienteId: req.body.clienteId,
          valorPago: 0,
          valorTotal: Number(req.body.valor),
        },
      }),
      prisma.cliente.update({
        where: {
          id: clienteId,
        },
        data: {
          valorMovimentado: {
            increment: Number(valor),
          }
        }
      }),
    ]);
    return {success: true};
  },
  DELETE: async (req: NextApiRequest) => {
    const { id } = req.query;
    await prisma.venda.delete({
      where: {
        id: String(id),
      },
    });
    return { success: true };
  }
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
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
}
