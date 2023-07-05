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
  if (req.method !== "POST") {
    res.send("Not found");
  }
  const { body } = req;

  console.log(body);

  let user;

  user = await prisma.user.findFirst({
    where: {
      uid: body.uid as string,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        uid: body.uid,
        role: "student",
        email: `${body.Studentid}@gm.uit.edu.vn`,
        password: body.Studentid,
        name: body.name,
      },
    });
  }

  const classes = await prisma.class.findMany();

  for (let i = 0; i < classes.length; i++) {
    const currentClass = classes[i];

    const isStillInClass = isCurrentTimeBetween(
      currentClass.startTime,
      currentClass.endTime,
      currentClass.day
    );

    if (!isStillInClass) {
      continue;
    } else {
      const attendance = await prisma.attendance.create({
        data: {
          date: new Date(),
          status: "checked-in",
          classId: currentClass.id,
          userId: user.id
        },
      });
      await prisma.notification.create({
        data: {
          message: "Diem danh thanh cong lop " + currentClass.name,
          userId: user.id
        }
      })
    }
  }

  res.status(200).send(user);
}
