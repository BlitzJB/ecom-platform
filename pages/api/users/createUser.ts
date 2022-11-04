import type { NextApiRequest, NextApiResponse } from "next"
import prisma from '@db/prisma'


interface Response {
    token?: string
    error?: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
    let body = req.body

    if (!body.email || !body.password) {
        res.status(400).json({error: 'BAD_REQUEST'})
    }

    let user = await prisma.user.create({
        data: {
            email: body.email,
            password: body.password
        }
    })

    let session = await prisma.session.create({
        data: {
            for: user.id,
        }
    })

    res.status(200).json({token: session.id})

}