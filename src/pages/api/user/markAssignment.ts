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
  const { id, score } = req.query;

  const lessons = await prisma.assignment.update({
    where: {
        id: id as string
    },
    data: {
        score: parseFloat(score as string),
        isMarked: true
    }
  });
  
  res.status(200).send(lessons);
}
