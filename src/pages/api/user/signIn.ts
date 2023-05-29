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
  console.log("user", user)
  const data = await prisma.user.findMany({
    where: {
      email: user.email,
      password: user.password,
    },
  });
  if (!data) {
    res.send("User not found");
    return;
  } else {
    res.send(data[0]);
    return;
  }
}
