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
  const data = await prisma.assignment.findFirst({
    where: {
        id: id as string
    },
    include: {
      classMaterial: true,
      user: true
    }
  });

  await prisma.notification.create({
    data: {
      message: `Bài nộp cho ${data?.classMaterial.name} đã được chấm điểm`,
      userId: data?.userId
    }
  })
  
  res.status(200).send(lessons);
}
