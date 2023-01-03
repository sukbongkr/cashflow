import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../libs/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  
  if(!id) return

  if (req.method === 'GET') {
      const assets = await client.asset.findUnique({
        where : {
            id : +id
        }
      })

      //나중에는 user와 연동하자
      res.status(200).json({ assets })
  }
  if (req.method === 'POST') {
    //try catch로 에러처리 필요
    const asset = await client.asset.delete({
       where : {
        id : +id
       }
    })
    res.status(200).json({ asset })
  }
}
