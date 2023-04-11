import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'server10/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const totalpost = await prisma.post.aggregate({
      _sum: {
        count: true,
      },
    })

    return res
      .status(200)
      .json({ total: totalpost?._sum.count.toString() || null })
  } catch (e) {
    return res.status(500).json({ message: e })
  }
}
