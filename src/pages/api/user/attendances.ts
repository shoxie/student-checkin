// @ts-ignore
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/Utils/prisma";
import { isCurrentTimeBetween, parseTimeStringToDate } from "@/Utils/date";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const userId = req.query.userId
  const attendances = await prisma.attendance.findMany({
    where: {
        userId: userId as string
    }
  })
console.log(attendances)

  res.status(200).send(userId);
}
