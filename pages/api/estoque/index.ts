import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/connect";
import {  Celular, Prisma, } from "@prisma/client";
import Cors from "cors";

const methodsAllowed = ["GET", "POST", "DELETE", "PUT"];

enum MethodsAlloweds {
  GET = "GET",
  POST = "POST",

}

const cors = Cors({
  methods: [...methodsAllowed, "HEAD"],
});



const services = {
  GET: async (req: NextApiRequest) => {
    return await prisma.celular.findMany({
      orderBy: {
        createdAt: "desc",
      },
     
    });
  },
  POST: async (req: NextApiRequest) => {
    const produtoCriado = await prisma.celular.create({
      data: {
        ...req.body,
      },
    });
    return { success: true, id: 123 };
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
