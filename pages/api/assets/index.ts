import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"
import client from '../../../libs/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, income, outcome, price, debt } = req.body;
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method === 'GET') {
      const assets = await client.asset.findMany({
        where:{
          user : session.user
        }
      })
 
      //나중에는 user와 연동하자
      res.status(200).json({ assets })
  }
  if (req.method === 'POST') {
    //try catch로 에러처리 필요
    const asset = await client.asset.create({
        data: {
            title,
            income : +income,
            outcome : +outcome,
            price : +price,
            debt : +debt,
            user : {
              connect : {
                id : session.user.id+""
              }
            }
        }
    })
    res.status(200).json({ asset })
  }
}
