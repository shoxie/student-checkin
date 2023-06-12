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
  const { userId } = req.query

  const data = await prisma.class.findMany({
    where: {
      studentIds: {
        has: userId as string
      }
    }
  })
  
  res.status(200).json(data)
}
