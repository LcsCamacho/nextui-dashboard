import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/connect";
import { Venda,Cliente, Prisma } from "@prisma/client";

const methodsAllowed = ["GET", "POST"];

enum MethodsAlloweds {
  GET = "GET",
  POST = "POST",
}

interface VendaDTO extends Venda {
  cliente?: Cliente;
}

const services = {
  GET: async (req:NextApiRequest) => {
    console.log(req.query)
    if(req.query.withClientes){
      return await prisma.venda.findMany({
        include:{
          cliente:true
        }
      });
    }
    return await prisma.cliente.findMany();
  },
  POST: async (req:NextApiRequest) => {
    return await prisma.cliente.create({
      data:req.body,
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
    const response = await services[method](req);
    return res.status(200).json(response);
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    return res.status(500).json({ message: error.message });
  }
}
