import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../libs/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'GET') {
        const assets = await client.asset.findMany({})

        //나중에는 user와 연동하자
        res.status(200).json({ assets })
    }
}
