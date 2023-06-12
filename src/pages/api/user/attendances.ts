// @ts-ignore
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/Utils/prisma";
import { isCurrentTimeBetween, parseTimeStringToDate } from "@/Utils/date";
import { endOfDay, startOfDay } from "date-fns";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const userId = req.query.userId;

  const attendances = await prisma.attendance.findMany({
    where: {
      userId: userId as string,
      createdAt: {
        lte: endOfDay(new Date()) as Date,
        gte: startOfDay(new Date()) as Date
      }

    },
    include: {
      class: true,
    },
  });
console.log(attendances)
  res.status(200).send(attendances);
}
