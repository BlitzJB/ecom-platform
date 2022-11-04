import type { NextApiRequest, NextApiResponse } from "next"
import prisma from '@db/prisma'

interface Response {
    message?: string
    error?: string
}


export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
    let body = req.body

    if (!body.token) {
        res.status(400).json({error: 'BAD_REQUEST'})
    }

    await prisma.session.delete({
        where: {
            id: body.token
        }
    })

    res.status(200).json({message: 'ok'})
}