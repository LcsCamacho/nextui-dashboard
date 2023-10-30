import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/connect";
import { Venda, Cliente, Prisma } from "@prisma/client";

const methodsAllowed = ["GET", "POST", "DELETE", "PUT"];

enum MethodsAlloweds {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}

const getVendasByIdCliente = async (id: string, transacao?:boolean) => {
  return await prisma.venda.findMany({
    where: {
      clienteId: id,
    },
    include: {
      cliente: true,
      transacao: transacao, 
    },
  });
};

const services = {
  GET: async (req: NextApiRequest) => {
    console.log(req.query);
    if (req.query.cliId)
      return await getVendasByIdCliente(String(req.query.cliId));

    return await prisma.venda.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        cliente: !!req.query.withClientes && req.query.withClientes === "1",
        transacao: !!req.query.withTransacoes && req.query.withTransacoes === "1",
      }
    });
  },
  POST: async (req: NextApiRequest) => {
    const { clienteId, valor, produto } = req.body;
    await prisma.$transaction([
      prisma.venda.create({
        data: {
          pago: false,
          clienteId,
          valorPago: 0,
          valorTotal: Number(valor),
          produto,
        },
      }),
      prisma.cliente.update({
        where: {
          id: clienteId,
        },
        data: {
          valorMovimentado: {
            increment: Number(valor),
          },
        },
      }),
    ]);
    return { success: true };
  },
  DELETE: async (req: NextApiRequest) => {
    const { id } = req.query;
    await prisma.venda.delete({
      where: {
        id: String(id),
      },
    });
    return { success: true };
  },
  PUT: async (req: NextApiRequest) => {
    const { id } = req.query;
    const { valorPago, pago, valorTotal, clienteId }: Venda = req.body;
    await prisma.$transaction(async (p) => {
      const venda = await p.venda.update({
        where: {
          id: String(id),
        },
        data: {
          valorPago: {
            increment: Number(valorPago),
          },
          pago: Boolean(pago),
          valorTotal: Number(valorTotal),
        },
      })
      await p.transacao.create({
        data: {
          valor: Number(valorPago),
          vendaId: String(id),
          clienteId,
          valorRestante: Number(venda.valorTotal) - Number(venda.valorPago),
        }
      })
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
