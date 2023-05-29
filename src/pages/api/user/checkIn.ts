// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/Utils/prisma";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "POST") {
    res.send("Not found");
  }
  const { body } = req;

  const data = await prisma.user.findFirst({
    where: {
        uid: body.uid as string
    }
  })
}
