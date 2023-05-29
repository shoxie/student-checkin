// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/Utils/prisma'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const test = await prisma.user.findMany()
  if (test.length === 0) {
    const account = await prisma.user.create({
      data: {
        name: 'WhiteRose',
        email: '19520377@gm.uit.edu.vn',
        password: "shinniecf5",
        role: "student",
        uid: "b99770aa"
      }
    })
    res.status(200).json(account)
  }
  res.status(200).json(test)
}
