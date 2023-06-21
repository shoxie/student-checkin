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
  const user = req.body;
  const data = await prisma.user.findMany({
    where: {
      email: user.email,
      password: user.password,
    },
  });
  if (!data) {
    res.status(404).send({ message: "user not found" })
  } else if (data[0].password === user.password) {
    res.status(200).send(data[0]);
  } else {
    res.status(401).send({ message: "wrong password"})
  }
}
